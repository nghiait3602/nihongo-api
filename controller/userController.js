const multer = require('multer');
const sharp = require('sharp');
const cloudinary = require('cloudinary').v2;
const uploadCloud = require('../config/cloudinaryStorage.config');
const User = require('../model/userModel');
const handlerFactory = require('./handlerFactory');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

// const multerStorage = multer.memoryStorage();

// const multerFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image')) {
//     cb(null, true);
//   } else {
//     cb(new AppError('đây không phải là file image', 400), false);
//   }
// };

// const upload = multer({
//   storage: multerStorage,
//   fileFilter: multerFilter
// });

exports.uploadUserPhoto = uploadCloud.single('image');

// exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
//   if (!req.file) return next();

//   req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

//   await sharp(req.file.buffer)
//     .resize(500, 500)
//     .toFormat('jpeg')
//     .jpeg({ quality: 90 })
//     .toFile(`public/img/users/${req.file.filename}`);

//   next();
// });

exports.uploadImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  const data = req.file;
  console.log(data.path);
  req.body.photo = data.path;
  next();
});

exports.updateImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  // lấy id của hình
  let query = User.findById(req.user.id);
  if(req.params.id){
    query = User.findById(req.params.id);
  }
  const nowDoc = await query;
  const resultString = JSON.stringify(nowDoc.photo);
  const publicId = resultString.split("/").slice(-2).join("/").slice(0, -5);
  console.log(publicId);
  // xóa hình trên cloud
  cloudinary.uploader.destroy(publicId);
  // update hình mới
  const data = req.file;
  console.log(data.path);
  req.body.photo = data.path;
  next();
});

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
      if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
  };
  
exports.getMe = (req, res, next) => {
    req.params.id = req.user.id;
    next();
};
exports.updateMe = catchAsync(async (req, res, next) => {
    // 1) Create error if user POSTs password data
    if (req.body.password || req.body.passwordConfirm) {
      return next(
        new AppError(
          'route này không phải cho update password . làm ơn sử dụng /updateMyPassword.',
          400
        )
      );
    }
  
    // 2) Filtered out unwanted fields names that are not allowed to be updated
    const filteredBody = filterObj(req.body, 'name', 'email', 'ngaySinh', 'photo');
    //if (req.file) filteredBody.photo = req.file.filename;
  
    // 3) Update user document
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
      new: true,
      runValidators: true
    });
  
    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser
      }
    });
  });
exports.deleteMe = catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false });
  
    res.status(204).json({
      status: 'success',
      data: null
    });
  });
// đây chỉ là demo
//chỉ dành cho admin
exports.getAllUser = handlerFactory.getAll(User);
exports.getUser = handlerFactory.getOne(User, {path: 'tienTrinhCuaToi'});
exports.createUser = handlerFactory.createOne(User);
exports.updateUser = handlerFactory.updateOne(User);
exports.deleteUser = handlerFactory.deleteOne(User);
