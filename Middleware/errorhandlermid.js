const errHandler = (req, res, next, err) => {
  console.log(" Error : ", err.message);
  res
    .status(err.statusCode || 500)
    .json({ success: false, message: err.message || "something wen wrong" });
};

module.exports = errHandler;
