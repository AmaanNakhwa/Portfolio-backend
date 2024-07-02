// utils/emailUtils.js
const transporter = require('../config/emailConfig');

const sendContactNotificationEmail = async (contactDetails) => {
  const { name, email, message } = contactDetails;
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USERNAME, // Sender address
      to: process.env.ADMIN_EMAIL, // List of receivers (admin email)
      subject: 'New Contact Form Submission', // Subject line
      text: `You have a new contact form submission from ${name} (${email}): ${message}`, // Plain text body
      html: `<p>You have a new contact form submission from <b>${name} (${email})</b>:<br>${message}</p>` // HTML body content
    });

    console.log('Contact form submission email sent successfully.');
  } catch (error) {
    console.error('Error sending contact form submission email:', error);
  }
};

module.exports = sendContactNotificationEmail;