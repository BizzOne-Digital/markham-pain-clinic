const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_APP_PASSWORD,
  },
});

const sendEnquiryNotification = async (enquiry) => {
  const html = `
    <h2>New Enquiry - Markham Pain Clinic</h2>
    <p><strong>Name:</strong> ${enquiry.name}</p>
    <p><strong>Email:</strong> ${enquiry.email}</p>
    <p><strong>Phone:</strong> ${enquiry.phone || 'N/A'}</p>
    <p><strong>Type:</strong> ${enquiry.type}</p>
    <p><strong>Preferred Date:</strong> ${enquiry.preferredDate || 'N/A'}</p>
    <p><strong>Message:</strong></p>
    <p>${enquiry.message || 'N/A'}</p>
  `;

  return transporter.sendMail({
    from: `"Markham Pain Clinic Website" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL,
    replyTo: enquiry.email,
    subject: `New ${enquiry.type} enquiry from ${enquiry.name}`,
    html,
  });
};

const sendEnquiryConfirmation = async (enquiry) => {
  const html = `
    <h2>Thank you for contacting Markham Pain Clinic</h2>
    <p>Hi ${enquiry.name},</p>
    <p>We have received your ${enquiry.type} request and our team will get back to you shortly.</p>
    <p>If your enquiry is urgent, please call our clinic directly.</p>
    <br/>
    <p>Warm regards,</p>
    <p>Markham Pain Clinic Team</p>
  `;

  return transporter.sendMail({
    from: `"Markham Pain Clinic" <${process.env.SMTP_USER}>`,
    to: enquiry.email,
    subject: 'We received your enquiry - Markham Pain Clinic',
    html,
  });
};

module.exports = { transporter, sendEnquiryNotification, sendEnquiryConfirmation };
