const express = require("express");
const router = express.Router();
const multer = require("multer");
// const fs = require("fs");
const path = require("path");
const {
  createServiceSolution,
  getallservicesolutionControllers,
  getserviceSolutionByID,
  editServiceSolution,
} = require("../controllers/serviceSolutionController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/images"); // store the files in uploads->images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file names
  },
});
const upload = multer({ storage });

//Routes
router.post("/", upload.array("mediaUrls"), createServiceSolution);
router.get("/", getallservicesolutionControllers);
router.get("/:id", getserviceSolutionByID);
router.patch("/:id", upload.array("mediaUrls"), editServiceSolution);
//create service and solution
module.exports = router;
