const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Explicitly specifying the SMTP server host
    port: 587, // Use 465 for SSL/TLS
    secure: false, // Use true for port 465
    auth: {
        user: 'janhvistudent9@gmail.com', // Replace with your Gmail address
        pass: 'Pass@123' // Replace with your App Password
    }
});
// Example of sending an email
transporter.sendMail({
    from: 'your-email@gmail.com',
    to: 'recipient@example.com',
    subject: 'Test Email',
    text: 'Hello, this is a test email sent using Nodemailer!'
}, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
});

module.exports = transporter;
