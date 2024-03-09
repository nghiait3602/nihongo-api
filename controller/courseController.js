const multer = require('multer');
const sharp = require('sharp');
const KhoaHoc = require('./../model/courseModel');
const factory = require('./../controller/handlerFactory');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
      cb(null, true);
    } else {
      cb(new AppError('file này ko phải hình ảnh. Làm ơn hãy sài file hình ảnh', 400), false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

exports.uploadHinhAnhKhoaHoc = upload.single('hinhAnh');

exports.resizeHinhAnhKhoaHoc = catchAsync(async (req, res, next) => {
    if (!req.file) return next();
    
    req.file.filename = `khoahoc-${req.params.id}-${Date.now()}.jpeg`;
    req.body.hinhAnh =req.file.filename;
    await sharp(req.file.buffer)
      .resize(2000, 1500)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/course/${req.file.filename}`);
    next();
});

exports.getAllKhoaHoc = factory.getAll(KhoaHoc);
exports.getKhoaHoc = factory.getOne(KhoaHoc);
exports.createKhoaHoc = factory.createOne(KhoaHoc);
exports.updateKhoahoc = factory.updateOne(KhoaHoc);
exports.deleteKhoahoc = factory.deleteOne(KhoaHoc);