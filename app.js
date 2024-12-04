require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const contactusRouter = require("./routes/contact.route");
const errorHandler = require("./Middleware/errorhandlermid");
// Middleware
app.use(
  cors({
    origin: "https://beta.synergiapac.com/",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));

// Routes
app.use("/api", contactusRouter);

//error handlers middleware
app.use(errorHandler);
module.exports = app;
