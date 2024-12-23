const mongoose = require("mongoose");

const ServicesolutionSchema = new mongoose.Schema({
  title1: { type: String, required: true },
  title2: { type: String, required: true },
  description: { type: [String], required: true },
  mediaType: { type: String, enum: ["image", "video"] },
  mediaUrls: { type: [String] }, // Can store multiple URLs
});

module.exports = mongoose.model("Servicesolution", ServicesolutionSchema);
