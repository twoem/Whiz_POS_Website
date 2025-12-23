const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const dotenv = require('dotenv');
const templates = require('./templates');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

app.post('/send-email', async (req, res) => {
  const { type, to, data } = req.body;

  if (!type || !to || !data) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  let subject = '';
  let htmlContent = '';

  switch (type) {
    case 'welcome':
      subject = 'Welcome to Whiz POS - Account Under Review';
      htmlContent = templates.wrapTemplate(templates.welcomeEmail(data), subject);
      break;
    case 'approval':
      subject = 'Whiz POS Account Approved';
      htmlContent = templates.wrapTemplate(templates.approvalEmail(data), subject);
      break;
    case 'rejection':
      subject = 'Whiz POS Account Update';
      htmlContent = templates.wrapTemplate(templates.rejectionEmail(data), subject);
      break;
    case 'reset-password':
      subject = 'Reset Your Password';
      htmlContent = templates.wrapTemplate(templates.resetPasswordEmail(data), subject);
      break;
    default:
      return res.status(400).json({ error: 'Invalid email type' });
  }

  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      replyTo: process.env.REPLY_TO,
      subject,
      html: htmlContent,
    });

    console.log('Message sent: %s', info.messageId);
    res.status(200).json({ message: 'Email sent successfully', messageId: info.messageId });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Email service running on port ${PORT}`);
});
