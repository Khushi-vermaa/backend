// test.routes.js
const express = require("express");
const router = express.Router();
const testingController = require("../controllers/test.controller");

// Default Test Route
router.get("/test", testingController.testing); // Yeh route default test route bana dega
module.exports = router;
