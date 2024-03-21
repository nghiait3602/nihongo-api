const catchAsync = require('../utils/catchAsync');
const CapDo = require('./../model/levelModel');
const factory = require('./handlerFactory');

exports.setKhoaHocId = (req, res, next) => {
  //allow nested routes
  if (!req.body.khoaHoc) req.body.khoaHoc = req.params.khoaHocId;
  next();
};

exports.getAllCapDo = catchAsync(async (req, res, next) => {
  const capdo = await CapDo.find();
  res.status(200).json({
    status: 'success',
    data: {
      id: 'introl',
      capdo,
    },
  });
});
exports.creatCapDo = factory.createOne(CapDo);
