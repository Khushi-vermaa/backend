const http = require("http");
const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config(); // Load environment variables from .env

const PORT = process.env.PORT || 8000;
const DB_URI = process.env.MONGODB_URI; // MongoDB URI stored in .env file

// MongoDB connection setup
mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
    startServer(); // Start server after DB connection is established
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit the process with an error code if DB connection fails
  });

// Creating HTTP server using express app
const server = http.createServer(app);

// Function to start the server
function startServer() {
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

// Graceful shutdown for server
process.on("SIGINT", () => {
  console.log("Shutting down the server...");
  server.close(() => {
    console.log("Closed all server connections");
    mongoose.connection.close(() => {
      console.log("MongoDB connection closed");
      process.exit(0); // Exit the process successfully
    });
  });
});
