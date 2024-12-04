const { sendEmail } = require("../services/contact.service");
const asyncHandler = require("../helper/asynchandler");
exports.contactformsubmission = asyncHandler(async (req, res) => {
  const { name, phone, email, message, company } = req.body;

  try {
    await sendEmail(name, phone, email, message, company);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending email" });
  }
});
