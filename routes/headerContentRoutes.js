// routes/headerContentRoutes.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const headerContentController = require("../controllers/hedercontent.controller");

const router = express.Router();

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Store files in uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file names
  },
});
const upload = multer({ storage });

// Create header content (POST)
router.post(
  "/",
  upload.single("media"),
  headerContentController.createHeaderContent
);
// Update header content (PUT)
router.get("/", headerContentController.getHeaderContent);
router.put(
  "/",
  upload.single("media"),
  headerContentController.updateHeaderContent
);

module.exports = router;
