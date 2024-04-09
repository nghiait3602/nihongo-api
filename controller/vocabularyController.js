const multer = require('multer');
const sharp = require('sharp');
const cloudinary = require('cloudinary').v2;
const uploadCloud = require('../config/cloudinaryStorage.config');
const TuVung = require('./../model/vocabularyModel');
const factory = require('./handlerFactory');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const User = require('./../model/userModel');

// const multerStorage = multer.memoryStorage();

// const multerFilter = (req, file, cb) => {
//     if (file.mimetype.startsWith('image')) {
//       cb(null, true);
//     } else {
//       cb(new AppError('file này ko phải hình ảnh. Làm ơn hãy sài file hình ảnh', 400), false);
//     }
// };

// const upload = multer({
//     storage: multerStorage,
//     fileFilter: multerFilter
// });

exports.uploadHinhAnhTuVung = uploadCloud.single('image');

// exports.resizeHinhAnhTuVung = catchAsync(async (req, res, next) => {
//     if (!req.file) return next();
    
//     req.file.filename = `vocabulary-${req.params.id}-${Date.now()}.jpeg`;
//     req.body.hinhAnh =req.file.filename;
//     await sharp(req.file.buffer)
//       .resize(2000, 1500)
//       .toFormat('jpeg')
//       .jpeg({ quality: 90 })
//       .toFile(`public/img/vocabulary/${req.file.filename}`);
//     next();
// });

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
  const nowDoc = await TuVung.findById(req.params.id);
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

exports.setBaiHocId = (req,res,next)=>{
    //allow nested routes
    if(!req.body.baiHoc) req.body.baiHoc = req.params.baiHocId;
    next();
};

exports.getAllTuVung = factory.getAll(TuVung);
exports.getTuVung = factory.getOne(TuVung);
exports.createTuVung = factory.createOne(TuVung);
exports.updateTuVung = factory.updateOne(TuVung);
exports.deleteTuVung = factory.deleteOne(TuVung);

exports.selectTuVungTheoChuDe = catchAsync( async (req,res,next)=>{
  const chuDeDaChon = req.query.chuDeDaChon;
  if (!chuDeDaChon) {
    next(
      new AppError(
        'làm ơn hãy chọn 1 chủ đề',
        400
      )
    );
  }
  console.log(`chủ đề đã chọn: ${chuDeDaChon}`);
  const selectChuDe = await TuVung.find({chuDe: { $regex: chuDeDaChon, $options: 'i' }})
  res.status(200).json({
    status: 'success',
    data: {
      selectChuDe
    }
});
});

exports.addDSTuVung = catchAsync( async (req,res,next)=>{
  const tuVung = await TuVung.findById(req.params.id);
  if(!tuVung) return next(new AppError('No document found with that ID', 404));
  const userInfo = await User.findById(req.user.id);
  const dsIdTuVung = userInfo.tuVungS;
  console.log(`dsIdTuVung: ${dsIdTuVung}`);
  console.log(`IdTuVung: ${req.params.id}`);
  if(dsIdTuVung.some(doneTuVungId => doneTuVungId.equals(req.params.id))) return next();
  const updatedUser = await User.findByIdAndUpdate(req.user.id,{$push: { tuVungS: req.params.id }} ,{
    new: true,
    runValidators: true
});
  console.log('đã thêm id vào danh sách');
  next();
});