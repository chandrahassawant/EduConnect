// mailer.js
const nodemailer = require('nodemailer');

// Create a transporter object using your email service provider
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'janhvistudent9@gmail.com',
    pass: 'Pass@123'
  }
});

// Function to send email
const sendNotification = async (to, subject, text) => {
  const mailOptions = {
    from: 'janhvistudent9@gmail.com',
    to: 'css1422054@gmail.com',
    subject: subject,
    text: text
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = { sendNotification };
