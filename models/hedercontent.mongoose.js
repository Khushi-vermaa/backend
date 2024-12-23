// models/HeaderContent.js
const mongoose = require("mongoose");

const headerContentSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: true,
    },
    paragraph: {
      type: String,
      required: true,
    },
    video: String, // Path for video
    image: String, // Path for image
  },
  { timestamps: true }
);

module.exports = mongoose.model("HeaderContent", headerContentSchema);
