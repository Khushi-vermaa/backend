const transporter = require("../config/emailconfig");

const sendEmail = async (name, phone, email, message) => {
  console.log("service", name, phone, email, message);

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
    //template for user
    const emailTemplateForUser = `
  <div style="font-family: 'Arial', sans-serif; padding: 20px; background-color: #f9f9f9; border-radius: 8px; max-width: 600px; margin: 0 auto; border: 1px solid #ddd;">
    <h1 style="color: #4A90E2; font-size: 26px; text-align: center; margin-bottom: 20px;">✨ Thank You for Reaching Out! ✨</h1>
    <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
      <p style="font-size: 1.2em; color: #333; text-align: center; margin-bottom: 20px;">
        <strong style="color: #e74c3c;">Your message has been received, and we will get back to you soon! 💬</strong>
      </p>
      <p style="font-size: 1.2em; color: #333; margin-bottom: 10px;">
        <strong style="color: #e74c3c;">Name:</strong> ${name}
      </p>
      <p style="font-size: 1.2em; color: #333; margin-bottom: 10px;">
        <strong style="color: #e74c3c;">Email:</strong> ${email}
      </p>
      <p style="font-size: 1.2em; color: #333; margin-bottom: 10px;">
        <strong style="color: #e74c3c;">Phone Number:</strong> ${phone}
      </p>
      <p style="font-size: 1.2em; color: #333; margin-bottom: 10px;">
        <strong style="color: #e74c3c;">Message:</strong> ${message || "N/A"}
      </p>
      <p style="font-size: 1.2em; color: #333; text-align: center; margin-top: 20px;">
        We appreciate your interest in heavensJourney! 🌟<br/>
        Our team will review your request and respond shortly. In the meantime, feel free to explore our services. 🙏
      </p>
    </div>
    <footer style="margin-top: 20px; text-align: center; font-size: 0.9em; color: #7f8c8d;">
      <p>&copy; ${new Date().getFullYear()} heavens Journey. All rights reserved.</p>
      <p>📞 For any immediate assistance, please contact us at <a href="mailto:heavensjourney22@gmail.com">heavensjourney22@gmail.com</a>.</p>
    </footer>
  </div>`;

    const mailOptions = {
      from: process.env.GMAIL_APP_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: "New Contact Form Submission",
      html: emailTemplateForRecipients,
    };
    // Send email to the user
    const mailOptionsForUser = {
      from: process.env.GMAIL_APP_EMAIL,
      to: email,
      subject: "Thank You for Your Submission",
      html: emailTemplateForUser,
    };
    await transporter.sendMail(mailOptions);
    await transporter.sendMail(mailOptionsForUser);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

module.exports = { sendEmail };
