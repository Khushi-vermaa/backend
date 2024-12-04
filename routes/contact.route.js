const express = require("express");
const router = express.Router();
const { contactformsubmission } = require("../controllers/contact.controller");
const { validateContactForm } = require("../Middleware/datavalidation");
//routes
router.post("/contact", validateContactForm, contactformsubmission);
router.get("/test", (req, res) => {
  res.send("Hello from the test route");
});
module.exports = router;
