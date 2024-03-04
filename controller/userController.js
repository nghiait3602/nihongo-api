const User = require('../model/userModel');
const catchAsync = require('../utils/catchAsync');
const cacthAsync = require('../utils/catchAsync');

exports.getAllUser = cacthAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: 'Success',
    resutl: users.length,
    data: {
      users,
    },
  });
});
exports.createUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  res.status(200).json({
    status: 'Success',
    data: {
      newUser,
    },
  });
});
