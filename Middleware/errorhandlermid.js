const errHandler = (err, req, res, next) => {
  console.log("Error: ", err.message);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Something went wrong",
  });
};

module.exports = errHandler;
