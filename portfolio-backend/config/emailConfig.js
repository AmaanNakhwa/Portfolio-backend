// config/emailConfig.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // Replace with your email service
  auth: {
    user: process.env.EMAIL_USERNAME, // Replace with your email
    pass: process.env.EMAIL_PASSWORD // Replace with your email password
  }
});

module.exports = transporter;