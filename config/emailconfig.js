require("dotenv").config();

const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_APP_EMAIL,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

module.exports = transporter;
