const TienTrinhBaiHoc = require("./../model/learningProgressModel");
const BaiHoc = require("./../model/lessionModel");
const User = require("./../model/userModel");
const Kanji = require("./../model/kanjiModel");
const TuVung = require("./../model/vocabularyModel");
const NguPhap = require("./../model/grammarModel");
const KhoaHoc = require("./../model/courseModel");
const factory = require("./handlerFactory");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.setBaiHocUserIds = (req, res, next) => {
  // dùng để giải quyết vấn đề set id của user và tour khi dùng hàm sài chung model của factory
  //allow nested routes
  if (!req.body.baiHoc) req.body.baiHoc = req.params.baiHocId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllTienTrinhBaiHoc = factory.getAll(TienTrinhBaiHoc);
exports.createTienTrinhBaiHoc = factory.createOne(TienTrinhBaiHoc);
exports.getTienTrinhBaiHoc = factory.getOne(TienTrinhBaiHoc);
exports.updateTienTrinhBaiHoc = factory.updateOne(TienTrinhBaiHoc);
exports.deleteTienTrinhBaiHoc = factory.deleteOne(TienTrinhBaiHoc);

exports.nextLession = catchAsync(async (req, res, next) => {
  //const me = await User.findById(req.user.id);
  //console.log(`me: ${me}`);
  const nowLession = await BaiHoc.findById(req.params.baiHocId);
  const baiHocNext = await BaiHoc.findOne({
    _id: { $gt: req.params.baiHocId },
    khoaHoc: nowLession.khoaHoc,
  });
  //console.log(`bài học tiếp theo: ${baiHocNext._id}`);
  if (!baiHocNext) {
    const khoaHocNext = await KhoaHoc.findOne({
      _id: { $gt: nowLession.khoaHoc },
    });
    if (khoaHocNext) {
      const khoaHocOfBaiHocNext = await BaiHoc.findOne({
        khoaHoc: khoaHocNext._id,
      }).sort({ _id: 1 });
      const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        { baiHocTiepTheo: khoaHocOfBaiHocNext._id },
        {
          new: true,
          runValidators: true,
        }
      );
    } else {
      const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        { baiHocTiepTheo: null },
        {
          new: true,
          runValidators: true,
        }
      );
    }
    return next();
  }
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    { baiHocTiepTheo: baiHocNext._id },
    {
      new: true,
      runValidators: true,
    }
  );
  next();
});

exports.findIdTienTrinhOnBaiHoc = catchAsync(async (req, res, next) => {
  if (req.body.baiHoc || req.body.user) return next();

  const nowTienTrinh = await TienTrinhBaiHoc.findOne({
    baiHoc: req.params.baiHocId,
    user: req.user.id,
  });
  if (!nowTienTrinh)
    return next(
      new AppError("Tiến trình có id bài học và id user này không tồn tại", 400)
    );

  req.params.id = nowTienTrinh._id;
  next();
});

exports.addKanjiNguPhapTuVung = catchAsync(async (req, res, next) => {
  let lessionId = null;
  if (req.params.baiHocId) lessionId = req.params.baiHocId;
  //tìm thông tin tiến trình
  if (req.params.id) {
    const tienTrinh = await TienTrinhBaiHoc.findById(req.params.id);
    if (!tienTrinh)
      return next(new AppError("id của tiến trình này không tồn tại", 400));
    //console.log(`tientrinh: ${tienTrinh.baiHoc._id}`);
    lessionId = tienTrinh.baiHoc._id;
  }

  //tìm danh sách iD từ vựng của bài học đó và cập nhập
  const tuVung = await TuVung.find({ baiHoc: lessionId });
  if (tuVung) {
    //console.log(`TuVung: ${tuVung}`);
    const dsTuVung = tuVung.map((el) => el._id);
    //console.log(`dsIdTuVung: ${dsTuVung}`);
    req.body.tuVungS = dsTuVung;
  }

  //tìm danh sách iD ngữ pháp của bài học đó và cập nhập
  const nguPhap = await NguPhap.find({ baiHoc: lessionId });
  if (nguPhap) {
    //console.log(`nguphap: ${nguPhap}`);
    const dsNguPhap = nguPhap.map((el) => el._id);
    //console.log(`dsIdnguphap: ${dsNguPhap}`);
    req.body.nguPhapS = dsNguPhap;
  }

  //tìm danh sách iD kanji của bài học đó và cập nhập
  const kanji = await Kanji.find({ baiHoc: lessionId });
  if (kanji) {
    //console.log(`kanji: ${kanji}`);
    const dsKanji = kanji.map((el) => el._id);
    //console.log(`dsIdKanji: ${dsKanji}`);
    req.body.kanjiS = dsKanji;
  }
  next();
});
