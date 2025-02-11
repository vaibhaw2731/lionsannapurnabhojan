
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

export async function sendThankYouEmail(name: string, email: string) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Thank You for Your Donation - Lions Dhandhania Annapurna Bhojan Sewa',
    text: `Dear ${name},\n\nThank you for providing food to the needy from Lions Dhandhania Annapurna Bhojan Sewa. Your contribution will help us serve meals to those in need.\n\nYou can also come to our address at 123 Main Street, City, State to be part of the sewa.\n\nBest regards,\nLions Dhandhania Annapurna Bhojan Sewa`,
    html: `<p>Dear ${name},</p><p>Thank you for providing food to the needy from Lions Dhandhania Annapurna Bhojan Sewa. Your contribution will help us serve meals to those in need.</p><p>You can also come to our address at <strong>123 Main Street, City, State</strong> to be part of the sewa.</p><p>Best regards,<br>Lions Dhandhania Annapurna Bhojan Sewa</p>`
  };

  return transporter.sendMail(mailOptions);
}
