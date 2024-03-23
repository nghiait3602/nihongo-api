const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const AppError = require('./../utils/appError');

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
      cb(null, true);
    } else {
      cb(new AppError('file này ko phải hình ảnh. Làm ơn hãy sài file hình ảnh', 400), false);
    }
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const multerStorage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ['jpg', 'png'],
  params: {
    folder: 'nihongoapp',
  },
});

const uploadCloud = multer({ storage: multerStorage, fileFilter: multerFilter });

module.exports = uploadCloud;
