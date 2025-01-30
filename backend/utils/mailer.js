import nodemailer from 'nodemailer';

// Create a reusable transporter object using your SMTP service (Gmail in this case)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to send email
const sendEmail = async (toEmail, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender's email
    to: toEmail, // Receiver's email
    subject: subject,
    text: text, // Email body
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export { sendEmail };
