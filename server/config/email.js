import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

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

export { transporter }; 