const catchAsync = require('./../utils/catchAsync');

exports.upLoad = catchAsync(async (req, res, next) => {
  const data = req.file;
  console.log(data);
  res.send(data);
});
