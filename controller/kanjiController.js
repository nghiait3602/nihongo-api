const multer = require("multer");
const sharp = require("sharp");
const cloudinary = require("cloudinary").v2;
const uploadCloud = require("../config/cloudinaryStorage.config");
const Kanji = require("./../model/kanjiModel");
const factory = require("./handlerFactory");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");
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

exports.uploadHinhAnhKanji = uploadCloud.single("image");

// exports.resizeHinhAnhKanji = catchAsync(async (req, res, next) => {
//     if (!req.file) return next();

//     req.file.filename = `kanji-${req.params.id}-${Date.now()}.jpeg`;
//     req.body.hinhAnhCachViet =req.file.filename;
//     await sharp(req.file.buffer)
//       .resize(2000, 1500)
//       .toFormat('jpeg')
//       .jpeg({ quality: 90 })
//       .toFile(`public/img/kanji/${req.file.filename}`);
//     next();
// });

exports.uploadImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  const data = req.file;
  console.log(data.path);
  req.body.hinhAnhCachViet = data.path;
  next();
});

exports.updateImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  // lấy id của hình
  const nowDoc = await Kanji.findById(req.params.id);
  const resultString = JSON.stringify(nowDoc.hinhAnhCachViet);
  const publicId = resultString.split("/").slice(-2).join("/").slice(0, -5);
  console.log(publicId);
  // xóa hình trên cloud
  cloudinary.uploader.destroy(publicId);
  // update hình mới
  const data = req.file;
  console.log(data.path);
  req.body.hinhAnhCachViet = data.path;
  next();
});

exports.setBaiHocId = (req, res, next) => {
  //allow nested routes
  if (!req.body.baiHoc) req.body.baiHoc = req.params.baiHocId;
  next();
};

exports.getAllKanji = factory.getAll(Kanji);
exports.getKanji = factory.getOne(Kanji);
exports.createKanji = factory.createOne(Kanji);
exports.updateKanji = factory.updateOne(Kanji);
exports.deleteKanji = factory.deleteOne(Kanji);

exports.addDSKanji = catchAsync(async (req, res, next) => {
  const kanji = await Kanji.findById(req.params.id);
  if (!kanji) return next(new AppError("No document found with that ID", 404));
  const userInfo = await User.findById(req.user.id);
  const dsIdKanji = userInfo.kanjiS;
  console.log(`dsIdKanji: ${dsIdKanji}`);
  console.log(`IdKanji: ${req.params.id}`);
  if (dsIdKanji.some((doneKanjiId) => doneKanjiId.equals(req.params.id))) {
    res.status(200).json({
      status: "success",
      data: {
        message: "id đã có trong mảng",
        result: 0
      }
    });
  }else{
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $push: { kanjiS: req.params.id } },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: {
        user: updatedUser,
        result: 1
      },
    });
  }
});
