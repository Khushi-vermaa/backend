require("dotenv").config();
console.log(
  process.env.GMAIL_APP_EMAIL,
  "and ",
  process.env.GMAIL_APP_PASSWORD
);
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_APP_EMAIL,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

module.exports = transporter;
