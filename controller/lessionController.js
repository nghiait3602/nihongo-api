const cloudinary = require('cloudinary').v2;
const uploadCloud = require('../config/cloudinaryStorage.config');
const baiHoc = require('./../model/lessionModel');
const factory = require('./handlerFactory');
const catchAsync = require('./../utils/catchAsync');

exports.uploadHinhAnhBaiHoc = uploadCloud.single('image');

exports.uploadImage = catchAsync(async (req, res, next) => {
    if (!req.file) return next();
    const data = req.file;
    console.log(data.path);
    req.body.hinhAnh = data.path;
    next();
  });
  
  exports.updateImage = catchAsync(async (req, res, next) => {
    if (!req.file) return next();
    // lấy id của hình
    const nowDoc = await baiHoc.findById(req.params.id);
    const resultString = JSON.stringify(nowDoc.hinhAnh);
    const publicId = resultString.split("/").slice(-2).join("/").slice(0, -5);
    console.log(publicId);
    // xóa hình trên cloud
    cloudinary.uploader.destroy(publicId);
    // update hình mới
    const data = req.file;
    console.log(data.path);
    req.body.hinhAnh = data.path;
    next();
});

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