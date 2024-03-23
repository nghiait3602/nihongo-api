const catchAsync = require('./../utils/catchAsync');

exports.upLoad = catchAsync(async (req, res, next) => {
  const data = req.file;
  console.log(data.path);
  res.send('Test');
});
