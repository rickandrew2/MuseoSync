import { client } from "../config/db.js";
import { transporter } from "../config/email.js";
import { createBookingEmailTemplate } from "../utils/emailTemplates.js";
import fetch from 'node-fetch';

const db = client.db("MuseoSync");
const availableDatesCollection = db.collection("available_dates");
const bookingsCollection = db.collection("bookings");

export const getAvailableDates = async (req, res) => {
  try {
    const availableDates = await availableDatesCollection.find({}).toArray();
    
    if (!availableDates) {
      return res.status(404).json({ message: "No available dates found" });
    }

    console.log("Fetched available dates:", availableDates.length);
    res.status(200).json(availableDates);
  } catch (error) {
    console.error("Error fetching available dates:", error);
    res.status(500).json({ message: "Failed to fetch available dates", error: error.message });
  }
};

export const createBooking = async (req, res) => {
  try {
    const { visitor_name, email, selected_date, selected_time, recaptchaToken } = req.body;

    if (!visitor_name || !email || !selected_date || !selected_time || !recaptchaToken) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Format the date to YYYY-MM-DD to match MongoDB format
    const formattedSelectedDate = new Date(selected_date).toISOString().split('T')[0];
    
    console.log('Booking request details:', {
      received_date: selected_date,
      formatted_date: formattedSelectedDate,
      time: selected_time
    });

    // Verify reCAPTCHA token
    console.log("Attempting reCAPTCHA verification with token:", recaptchaToken.substring(0, 20) + "...");
    
    const recaptchaVerification = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
    });

    const recaptchaData = await recaptchaVerification.json();
    console.log("reCAPTCHA verification response:", recaptchaData);

    if (!recaptchaData.success) {
      console.error("reCAPTCHA verification failed:", recaptchaData["error-codes"] || "No error codes provided");
      return res.status(400).json({ 
        message: "reCAPTCHA verification failed",
        details: recaptchaData["error-codes"] || []
      });
    }

    // Check if the selected time slot is still available
    const dateDoc = await availableDatesCollection.findOne({
      date: formattedSelectedDate
    });
    
    console.log('MongoDB query result:', {
      found: !!dateDoc,
      dateDoc: dateDoc ? {
        date: dateDoc.date,
        timeSlots: dateDoc.timeSlots.map(slot => ({
          time: slot.time,
          isAvailable: slot.isAvailable,
          currentBookings: slot.currentBookings
        }))
      } : null
    });

    if (!dateDoc) {
      return res.status(400).json({ message: "Selected date is not available" });
    }

    // Find the specific time slot
    const timeSlot = dateDoc.timeSlots.find(slot => slot.time === selected_time);
    
    if (!timeSlot) {
      return res.status(400).json({ message: "Selected time slot not found" });
    }

    if (!timeSlot.isAvailable || timeSlot.currentBookings >= timeSlot.maxCapacity) {
      return res.status(400).json({ message: "Selected time slot is not available" });
    }

    // Create the booking
    const booking = {
      visitor_name,
      email,
      selected_date: formattedSelectedDate,
      selected_time,
      status: "Confirmed",
      statusHistory: [{
        status: "Confirmed",
        timestamp: new Date().toISOString(),
        note: "Booking confirmed"
      }],
      timestamp: new Date().toISOString(),
      reference_code: "MMDT" + Math.random().toString(36).substr(2, 6).toUpperCase()
    };

    const result = await bookingsCollection.insertOne(booking);

    // Update the available_dates collection to increment currentBookings
    await availableDatesCollection.updateOne(
      {
        date: formattedSelectedDate,
        "timeSlots.time": selected_time
      },
      {
        $inc: { "timeSlots.$.currentBookings": 1 }
      }
    );

    // Send confirmation email
    try {
      const formattedDate = new Date(formattedSelectedDate).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      const formattedTime = selected_time.replace(/:00$/, ''); // Remove :00 from time if present

      await transporter.sendMail({
        from: {
          name: 'Museo de Malaquing Tubig',
          address: process.env.EMAIL_USER
        },
        to: email,
        subject: `Booking Confirmation - Reference: ${booking.reference_code}`,
        html: createBookingEmailTemplate(visitor_name, formattedDate, formattedTime, booking.reference_code)
      });

      console.log('Booking confirmation email sent successfully');
    } catch (emailError) {
      console.error("Error sending booking confirmation email:", emailError);
      // Don't return error to client, as the booking was still saved
    }

    res.status(201).json({ 
      message: "Booking created successfully", 
      booking: { ...booking, _id: result.insertedId } 
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Failed to create booking", error: error.message });
  }
}; 