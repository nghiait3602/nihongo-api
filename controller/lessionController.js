const baiHoc = require('./../model/lessionModel');
const factory = require('./handlerFactory');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');

exports.setKhoaHocId = (req,res,next)=>{
    //allow nested routes
    if(!req.body.khoaHoc) req.body.khoaHoc = req.params.khoaHocId;
    next();
};

exports.getAllBaiHoc = factory.getAll(baiHoc);
exports.getBaiHoc = factory.getOne(baiHoc);
exports.createBaiHoc = factory.createOne(baiHoc);
exports.updateBaiHoc = factory.updateOne(baiHoc);
exports.deleteBaiHoc = factory.deleteOne(baiHoc);