const { check, validationResult } = require("express-validator");
exports.validateContactForm = [
  check("name", "Name is required").notEmpty(),
  check("email", "Please enter a valid email").isEmail(),
  check("phone", "Phone number is required").notEmpty(),
  check("message", "Message is required").notEmpty(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
