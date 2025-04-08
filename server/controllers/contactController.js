import { client } from "../config/db.js";
import { transporter } from "../config/email.js";
import { createInquiryEmailTemplate } from "../utils/emailTemplates.js";
import fetch from 'node-fetch';

const db = client.db("MuseoSync");
const inquiriesCollection = db.collection("inquiries");
const logbookCollection = db.collection("Logbook");

export const submitInquiry = async (req, res) => {
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

    const result = await inquiriesCollection.insertOne(inquiry);

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
};

export const submitLogbook = async (req, res) => {
  const { name, gender, address } = req.body;

  if (!name || !gender || !address) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const sanitizedData = {
      name: name.trim(),
      gender: gender.trim(),
      address: address.trim(),
      timestamp: new Date(),
    };
    const result = await logbookCollection.insertOne(sanitizedData);
    res.status(200).json({ message: "Data submitted successfully!", result });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: "Failed to insert data" });
  }
}; 