const dns = require("dns");
const nodemailer = require("nodemailer");

const dnsPromises = dns.promises;
dns.setDefaultResultOrder("ipv4first");

const createTransporter = async () => {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error("SMTP email settings are missing. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, and MAIL_FROM.");
  }

  const [ipv4Host] = await dnsPromises.resolve4(host);

//   return nodemailer.createTransport({
//     host: ipv4Host || host,
//     port,
//     secure: port === 465,
//     requireTLS: port === 587,
//     auth: { user, pass },
//     tls: {
//       servername: host,
//       minVersion: "TLSv1.2",
//     },
//     connectionTimeout: 30000,
//     greetingTimeout: 30000,
//     socketTimeout: 30000,
//   });
// };

const transporter = nodemailer.createTransport({
  host: ipv4Host || host,
  port,
  secure: port === 465,
  requireTLS: port === 587,
  auth: { user, pass },
  tls: {
    servername: host,
    minVersion: "TLSv1.2",
  },
  connectionTimeout: 30000,
  greetingTimeout: 30000,
  socketTimeout: 30000,
});

await transporter.verify();
console.log("SMTP connected successfully");

return transporter;

};

const sendPasswordResetOtp = async ({ to, otp }) => {
  const transporter = await createTransporter();
  const from = process.env.MAIL_FROM || process.env.SMTP_USER;

  await transporter.sendMail({
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
};

module.exports = { sendPasswordResetOtp };
