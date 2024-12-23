require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const multer = require("multer");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const contactusRouter = require("./routes/contact.route");
const testRouter = require("./routes/test.routes");
const errHandler = require("./Middleware/errorhandlermid");
// const headerContentRoutes = require("./routes/headerContentRoutes");
const ServiceSolutionRoutes = require("./routes/servicesolutions.routes");
// Middleware
const corsOptions = {
  origin: "http://localhost",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
};
app.use(cors(corsOptions));
// app.use(express.static(path.join(__dirname, "FE")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Set the views directory where your EJS files are located
app.set("views", path.join(__dirname, "views")); // views folder ki path define karo

// Set EJS as the view engine
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));

// Routes
app.use("/api/contactus", contactusRouter);
app.use("/api", testRouter);
// app.use("/api/header", headerContentRoutes);
app.use("/api/Service", ServiceSolutionRoutes);
//error handlers middleware
app.use(errHandler);

module.exports = app;
