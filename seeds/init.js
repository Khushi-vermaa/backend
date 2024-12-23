const mongoose = require("mongoose");
const ServiceAndSolution = require("../models/serviceSolutionModel.js");
const serviceSolutionsdata = require("./data.js");
// connection with mongodb

const DB_URI = "mongodb://localhost:27017/synergicpac";

// MongoDB connection setup
mongoose
  .connect(DB_URI)

  .then(() => {
    console.log("MongoDB connected successfully");
    return seedDB();
  })
  .then(() => {
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });

const seedDB = async () => {
  try {
    // Pehle existing campgrounds ko delete karenge (optional)
    await ServiceAndSolution.deleteMany({});

    // Ab fakeCampgrounds array ko insert karenge
    await ServiceAndSolution.insertMany(serviceSolutionsdata);

    console.log("All campgrounds inserted successfully!");
  } catch (err) {
    console.error("Error inserting campgrounds:", err);
  }
};
