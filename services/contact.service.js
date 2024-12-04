require("dotenv").config();
const transporter = require("../config/emailconfig");

const sendEmail = async (name, phone, email, message, company) => {
  console.log("service", name, phone, email, message, company);

  if (!process.env.GMAIL_APP_EMAIL || !process.env.ADMIN_EMAIL) {
    throw new Error(
      "Environment variables GMAIL_APP_EMAIL or ADMIN_EMAIL are missing"
    );
  }

  try {
    const emailTemplateForRecipients = `
<div style="font-family: 'Arial', sans-serif; padding: 20px; background-color: #f4f4f4; border-radius: 8px; max-width: 600px; margin: 0 auto;">
   <h1 style="color: #2c3e50; font-size: 24px; text-align: center;">New Contact Form Submission</h1>
   
   <div style="background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
     <p style="font-size: 1.2em; color: #34495e; margin-bottom: 10px;">
       <strong style="color: #e74c3c;">I Need Help In:</strong> ${
         message || "N/A"
       }
     </p>
     
     <p style="font-size: 1.2em; color: #34495e; margin-bottom: 10px;">
       <strong style="color: #e74c3c;">Company Name:</strong> ${
         company || "N/A"
       }
     </p>

     <p style="font-size: 1.2em; color: #34495e; margin-bottom: 10px;">
       <strong style="color: #e74c3c;">Name:</strong> ${name}
     </p>

     <p style="font-size: 1.2em; color: #34495e; margin-bottom: 10px;">
       <strong style="color: #e74c3c;">Email:</strong> ${email}
     </p>

     <p style="font-size: 1.2em; color: #34495e; margin-bottom: 10px;">
       <strong style="color: #e74c3c;">Phone Number:</strong> ${phone}
     </p>
   </div>
   
   <footer style="margin-top: 20px; text-align: center; font-size: 0.9em; color: #7f8c8d;">
     <p>&copy; ${new Date().getFullYear()} Printer Solutions. All rights reserved.</p>
   </footer>
 </div>
`;

    const mailOptions = {
      from: process.env.GMAIL_APP_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: "New Contact Form Submission",
      html: emailTemplateForRecipients,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

module.exports = { sendEmail };
 