import nodemailer, { type TransportOptions } from "nodemailer"
import dotenv from "dotenv"

dotenv.config()

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "support@xbitaitrade.com",
    pass: "your-16-digit-google-app-password" // You'll need to generate this
  },
  debug: true,
  logger: true,
} as unknown as TransportOptions)

// Add a function to test the base64 encoding
const testBase64Password = () => {
  const originalPass = process.env.EMAIL_PASSWORD || '';
  const encodedPass = Buffer.from(originalPass).toString('base64');
  console.log('Testing password encoding:', {
    original: originalPass,
    encoded: encodedPass,
    decoded: Buffer.from(encodedPass, 'base64').toString()
  });
};

// Temporarily disable email functionality
export const sendWelcomeEmail = async (userEmail: string, userName: string) => {
  console.log('Email service disabled. Would have sent welcome email to:', {
    to: userEmail,
    name: userName
  });
  return true; // Return success without sending
};

export const testEmailConnection = async () => {
  console.log('Email service disabled. Skipping connection test.');
  return true; // Return success without testing
};

export const testEmailConfig = async () => {
  console.log('Email service disabled. Skipping config test.');
  return true; // Return success without testing
}; 