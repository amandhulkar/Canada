const dns = require("dns");
const nodemailer = require("nodemailer");

dns.setDefaultResultOrder("ipv4first");

let transporter;

const createTransporter = () => {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error("SMTP email settings are missing. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, and MAIL_FROM.");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    requireTLS: port === 587,
    auth: { user, pass },
    tls: {
      servername: host,
      minVersion: "TLSv1.2",
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });
};

const getTransporter = () => {
  if (!transporter) {
    transporter = createTransporter();
  }

  return transporter;
};

const sendPasswordResetOtp = async ({ to, otp }) => {
  const from = process.env.MAIL_FROM || process.env.SMTP_USER;

  try {
    await getTransporter().sendMail({
      from,
      to,
      subject: "Your FindTemplates password reset OTP",
      text: `Your FindTemplates password reset OTP is ${otp}. It expires in 10 minutes.`,
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827">
          <h2>Password reset OTP</h2>
          <p>Your FindTemplates password reset OTP is:</p>
          <p style="font-size:28px;font-weight:700;letter-spacing:6px;color:#4f46e5">${otp}</p>
          <p>This OTP expires in 10 minutes.</p>
        </div>
      `,
    });
  } catch (error) {
    transporter = null;
    throw error;
  }
};

module.exports = { sendPasswordResetOtp };
