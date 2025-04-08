import express from "express";
import { corsMiddleware, helmetMiddleware, rateLimiter } from "./middleware/security.js";
import { connectDB } from "./config/db.js";
import apiRoutes from "./routes/index.js";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fetch from 'node-fetch';
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '.env') });
console.log("Current directory:", __dirname);
console.log("Environment variables loaded:", process.env.ATLAS_URI ? "ATLAS_URI exists" : "ATLAS_URI is missing");

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER.trim(),
    pass: process.env.EMAIL_APP_PASSWORD.trim()
  }
});

// Verify email configuration on server start
transporter.verify(function (error, success) {
  if (error) {
    console.error('Email configuration error:', {
      error: error.message,
      code: error.code,
      response: error.response,
      auth: {
        user: process.env.EMAIL_USER,
        passwordProvided: !!process.env.EMAIL_APP_PASSWORD
      }
    });
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Email templates
const createInquiryEmailTemplate = (name, subject) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #4a5568; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; }
    .footer { text-align: center; margin-top: 20px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Thank You for Contacting Us</h1>
    </div>
    <div class="content">
      <p>Dear ${name},</p>
      <p>Thank you for your inquiry regarding "${subject}". We have received your message and will get back to you as soon as possible.</p>
      <p>Our team typically responds within 24-48 hours during business days.</p>
      <p>This is an automated response, please do not reply to this email.</p>
    </div>
    <div class="footer">
      <p>Museo de Malaquing Tubig</p>
      <p>123 Heritage Street, San Jose, Malaquing Tubig</p>
    </div>
  </div>
</body>
</html>
`;

const createBookingEmailTemplate = (name, date, time, referenceCode) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #1a1a1a; color: white; padding: 30px 20px; text-align: center; }
    .header h1 { margin: 0; font-size: 28px; }
    .content { padding: 30px 20px; background-color: #ffffff; }
    .booking-details { background-color: #f8f9fa; padding: 20px; margin: 20px 0; border-radius: 8px; }
    .reference-code { background-color: #e9ecef; padding: 15px; text-align: center; margin: 20px 0; border-radius: 8px; }
    .reference-code h2 { color: #1a1a1a; margin: 0; font-size: 24px; }
    .important-info { border-left: 4px solid #ffd700; padding-left: 15px; margin: 20px 0; }
    .footer { text-align: center; margin-top: 30px; padding: 20px; background-color: #f8f9fa; color: #666; }
    .button { display: inline-block; padding: 12px 25px; background-color: #1a1a1a; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
    .qr-code { text-align: center; margin: 20px 0; }
    .social-links { margin-top: 20px; }
    .social-links a { margin: 0 10px; color: #666; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Booking Confirmation</h1>
    </div>
    <div class="content">
      <p>Dear ${name},</p>
      <p>Thank you for choosing to visit Museo de Malaquing Tubig. We're excited to welcome you!</p>
      
      <div class="booking-details">
        <h3>Your Visit Details:</h3>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
      </div>

      <div class="reference-code">
        <p><strong>Your Reference Code:</strong></p>
        <h2>${referenceCode}</h2>
        <p>Please keep this code handy during your visit</p>
      </div>

      <div class="important-info">
        <h3>Important Reminders:</h3>
        <ul>
          <li>Please arrive 15 minutes before your scheduled time</li>
          <li>Bring a valid ID for verification</li>
          <li>Face masks are recommended</li>
          <li>Photography is allowed in designated areas</li>
          <li>Follow our health and safety protocols</li>
        </ul>
      </div>

      <div class="qr-code">
        <p>For contactless entry, save or print this email.</p>
      </div>

      <p>Need to modify your booking? Contact us at:</p>
      <ul>
        <li>Email: info@museodemalaquingtubig.com</li>
        <li>Phone: +63 (123) 456-7890</li>
      </ul>

      <center>
        <a href="https://museodemalaquingtubig.com/visit-guidelines" class="button">View Visitor Guidelines</a>
      </center>
    </div>

    <div class="footer">
      <p><strong>Museo de Malaquing Tubig</strong></p>
      <p>123 Heritage Street, San Jose, Malaquing Tubig</p>
      <div class="social-links">
        <a href="#">Facebook</a> |
        <a href="#">Instagram</a> |
        <a href="#">Twitter</a>
      </div>
      <p style="font-size: 12px; margin-top: 20px;">This is an automated message, please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
`;

const app = express();
const port = process.env.PORT || 5000;

// Apply middleware
app.use(corsMiddleware);
app.use(helmetMiddleware);
app.use(express.json());
app.use(rateLimiter);

// Connect to MongoDB
connectDB();

// API routes
app.use("/api", apiRoutes);

// Route to get all artifacts
app.get("/api/artifacts", async (req, res) => {
  try {
    console.log("Attempting to connect to MongoDB...");
    const db = client.db("MuseoSync");
    console.log("Connected to database");
    const collection = db.collection("artifacts_collection");
    console.log("Accessing collection");
    const artifacts = await collection.find({}).toArray();
    console.log("Found artifacts:", artifacts.length);
    res.status(200).json(artifacts);
  } catch (error) {
    console.error("Detailed error:", error);
    res.status(500).json({ message: "Failed to fetch artifacts", error: error.message });
  }
});

// Route to get available dates
app.get("/api/available-dates", async (req, res) => {
  try {
    const db = client.db("MuseoSync");
    const collection = db.collection("available_dates");
    const availableDates = await collection.find({}).toArray();
    
    if (!availableDates) {
      return res.status(404).json({ message: "No available dates found" });
    }

    console.log("Fetched available dates:", availableDates.length);
    res.status(200).json(availableDates);
  } catch (error) {
    console.error("Error fetching available dates:", error);
    res.status(500).json({ message: "Failed to fetch available dates", error: error.message });
  }
});

// Route to get a single artifact by ID
app.get("/api/artifacts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Fetching artifact with ID:", id);

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid artifact ID format" });
    }

    const db = client.db("MuseoSync");
    const collection = db.collection("artifacts_collection");
    
    const artifact = await collection.findOne({ _id: new ObjectId(id) });
    
    if (!artifact) {
      return res.status(404).json({ message: "Artifact not found" });
    }

    console.log("Found artifact:", artifact.artifact_name);
    res.status(200).json(artifact);
  } catch (error) {
    console.error("Error fetching artifact:", error);
    res.status(500).json({ message: "Failed to fetch artifact", error: error.message });
  }
});

// Route to submit logbook data
app.post("/api/submit-logbook", async (req, res) => {
  const { name, gender, address } = req.body;

  if (!name || !gender || !address) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const db = client.db("MuseoSync");
    const collection = db.collection("Logbook");
    const sanitizedData = {
      name: name.trim(),
      gender: gender.trim(),
      address: address.trim(),
      timestamp: new Date(),
    };
    const result = await collection.insertOne(sanitizedData);
    res.status(200).json({ message: "Data submitted successfully!", result });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: "Failed to insert data" });
  }
});

// Route to handle inquiries/contact form submissions
app.post("/api/inquiries", async (req, res) => {
  try {
    const { fullName, email, subject, message, submittedAt, recaptchaToken } = req.body;

    if (!fullName || !email || !subject || !message || !recaptchaToken) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Verify reCAPTCHA token
    const recaptchaVerification = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
    });

    const recaptchaData = await recaptchaVerification.json();
    
    if (!recaptchaData.success) {
      console.error("reCAPTCHA verification failed:", recaptchaData["error-codes"] || "No error codes provided");
      return res.status(400).json({ 
        message: "reCAPTCHA verification failed",
        details: recaptchaData["error-codes"] || []
      });
    }

    const db = client.db("MuseoSync");
    const collection = db.collection("inquiries");
    
    const inquiry = {
      fullName: fullName.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
      submittedAt: new Date().toISOString(),
      status: "New",
      statusHistory: [{
        status: "New",
        timestamp: new Date().toISOString(),
        note: "Inquiry received"
      }]
    };

    const result = await collection.insertOne(inquiry);

    // Send confirmation email
    try {
      console.log('Attempting to send email with config:', {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Thank you for your inquiry - Museo de Malaquing Tubig"
      });

      const mailResult = await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Thank you for your inquiry - Museo de Malaquing Tubig",
        html: createInquiryEmailTemplate(fullName, subject)
      });

      console.log('Email sent successfully:', mailResult);
    } catch (emailError) {
      console.error("Error sending confirmation email:", {
        error: emailError,
        errorCode: emailError.code,
        errorCommand: emailError.command,
        errorResponse: emailError.response,
        emailConfig: {
          from: process.env.EMAIL_USER,
          to: email
        }
      });
      // Don't return error to client, as the inquiry was still saved
    }
    
    res.status(201).json({ 
      message: "Inquiry submitted successfully",
      inquiry: { ...inquiry, _id: result.insertedId }
    });
  } catch (error) {
    console.error("Error submitting inquiry:", error);
    res.status(500).json({ message: "Failed to submit inquiry", error: error.message });
  }
});

// Route to create a new booking
app.post("/api/bookings", async (req, res) => {
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

    const db = client.db("MuseoSync");
    
    // Check if the selected time slot is still available
    const availableDatesCollection = db.collection("available_dates");
    
    // Log the query we're about to make
    console.log('Searching for date in MongoDB:', {
      query_date: formattedSelectedDate
    });
    
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
    const bookingsCollection = db.collection("bookings");
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
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
