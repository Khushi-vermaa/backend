const asyncHandler = require("../helper/asynchandler");
exports.testing = asyncHandler(async (req, res) => {
  res.send("Hello from the test route! Your app is working fine.");
});
