const express = require("express");
const router = express.Router();
const { contactformsubmission } = require("../controllers/contact.controller");
const { validateContactForm } = require("../Middleware/datavalidation");
//routes
router.post("/", validateContactForm, contactformsubmission);

module.exports = router;
