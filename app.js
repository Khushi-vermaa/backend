require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const contactusRouter = require("./routes/contact.route");
const errorHandler = require("./Middleware/errorhandlermid");
// Middleware
app.use(
  cors({
    origin: "https://synergiapac.com/",
  })
);
app.use(express.static(path.join(__dirname, "FE")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));

// Routes
app.use("/api", contactusRouter);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "FE", "index.html"));
});
//error handlers middleware
app.use(errorHandler);
module.exports = app;
