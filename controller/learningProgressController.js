const TienTrinhBaiHoc = require('./../model/learningProgressModel');
const BaiHoc = require ('./../model/lessionModel');
const User = require('./../model/userModel');
const Kanji = require('./../model/kanjiModel');
const TuVung = require('./../model/vocabularyModel');
const NguPhap = require('./../model/grammarModel');
const KhoaHoc = require('./../model/courseModel');
const factory = require('./handlerFactory');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const { find } = require('./../model/learningProgressModel');

exports.setBaiHocUserIds = (req,res,next)=>{// dùng để giải quyết vấn đề set id của user và tour khi dùng hàm sài chung model của factory
    //allow nested routes
    if(!req.body.baiHoc) req.body.baiHoc = req.params.baiHocId;
    if(!req.body.user) req.body.user = req.user.id;
    next();
};

exports.findIdTienTrinhOnBaiHoc = catchAsync(async (req, res, next) => {
    if(req.params.id) return next();
    //console.log(`iD Bài học: ${req.params.baiHocId}; iD user: ${req.user.id}`);
    const nowTienTrinh = await TienTrinhBaiHoc.findOne({baiHoc: req.params.baiHocId , user: req.user.id});
    if (!nowTienTrinh) return next(new AppError('Tiến trình có id bài học và id user này không tồn tại',400));
    //console.log(`Tiến trình: ${nowTienTrinh._id}`);
    req.params.id = nowTienTrinh._id;
    next();
});

exports.getAllTienTrinhBaiHoc = factory.getAll(TienTrinhBaiHoc);
exports.createTienTrinhBaiHoc = factory.createOne(TienTrinhBaiHoc);
exports.getTienTrinhBaiHoc = factory.getOne(TienTrinhBaiHoc);
exports.updateTienTrinhBaiHoc = factory.updateOne(TienTrinhBaiHoc);
exports.deleteTienTrinhBaiHoc = factory.deleteOne(TienTrinhBaiHoc);

exports.nextLession = catchAsync(async (req, res, next) => {
    const currentLesson = await BaiHoc.findById(req.params.baiHocId);
    let nextLessonId = null;
    let currentCourseId = currentLesson.khoaHoc;
    let currentLessonId = req.params.baiHocId;
    const completedLessonIds = [];
    const dsTienTrinh = await TienTrinhBaiHoc.find({ user: req.user.id });
    dsTienTrinh.forEach((el) => completedLessonIds.push(el.baiHoc._id));
    // console.log('--------new---------');
    // completedLessonIds.forEach((BaiHoc)=>{
    //     console.log(`IdBaiHocHoanThanh: ${BaiHoc}`);
    // });
    while (!nextLessonId){
        let nextLessonInCurrentCourse = await BaiHoc.findOne({ _id: { $gt: currentLessonId }, khoaHoc: currentCourseId });
        if (nextLessonInCurrentCourse && !completedLessonIds.some(completedLessonId => completedLessonId.equals(nextLessonInCurrentCourse._id))) {
            console.log(`nextLessonInCurrentCourse: ${nextLessonInCurrentCourse._id}`);
            nextLessonId = nextLessonInCurrentCourse._id;
            break;
        } else if(completedLessonIds.some(completedLessonId => completedLessonId.equals(nextLessonInCurrentCourse._id))){
            currentLessonId = nextLessonInCurrentCourse._id;
        }
        else {
            const nextCourse = await KhoaHoc.findOne({_id: { $gt: currentCourseId },
        });
        if (nextCourse) {
            const firstLessonInNextCourse = await BaiHoc.findOne({
              khoaHoc: nextCourse._id,
            }).sort({ _id: 1 });
            if (!completedLessonIds.includes(firstLessonInNextCourse._id)) {
                nextLessonId = firstLessonInNextCourse._id;
                currentCourseId = nextCourse._id;
              }
            }else {
                break;
            }
        }
    }
    const updatedUser = await User.findByIdAndUpdate(req.user.id,{baiHocTiepTheo: nextLessonId} ,{
        new: true,
        runValidators: true
    });
    next();
});

// exports.addKanjiNguPhapTuVung = catchAsync(async (req, res, next) => {
//     let lessionId = null;
//     if(req.params.baiHocId) lessionId = req.params.baiHocId;
//     //tìm thông tin tiến trình
//     if(req.params.id) {
//         const tienTrinh = await TienTrinhBaiHoc.findById(req.params.id); 
//         if(!tienTrinh) return next(new AppError('id của tiến trình này không tồn tại',400));
//         //console.log(`tientrinh: ${tienTrinh.baiHoc._id}`);
//         lessionId = tienTrinh.baiHoc._id;
//     }
    
//     //tìm danh sách iD từ vựng của bài học đó và cập nhập
//     const tuVung = await TuVung.find({baiHoc:lessionId});
//     if(tuVung){
//         //console.log(`TuVung: ${tuVung}`);
//         const dsTuVung = tuVung.map(el=>el._id);
//         //console.log(`dsIdTuVung: ${dsTuVung}`);
//         req.body.tuVungS = dsTuVung;
//     }
    
//     //tìm danh sách iD ngữ pháp của bài học đó và cập nhập
//     const nguPhap = await NguPhap.find({baiHoc:lessionId});
//     if(nguPhap){
//         //console.log(`nguphap: ${nguPhap}`);
//         const dsNguPhap = nguPhap.map(el=>el._id);
//         //console.log(`dsIdnguphap: ${dsNguPhap}`);
//         req.body.nguPhapS = dsNguPhap;
//     }
    
//     //tìm danh sách iD kanji của bài học đó và cập nhập
//     const kanji = await Kanji.find({baiHoc:lessionId});
//     if(kanji){
//         //console.log(`kanji: ${kanji}`);
//         const dsKanji = kanji.map(el=>el._id);
//         //console.log(`dsIdKanji: ${dsKanji}`);
//         req.body.kanjiS = dsKanji;
//     }
//     next();
// });

exports.addDSNguoiHoc = catchAsync(async (req, res, next) => {
    const baiHocInfo = await BaiHoc.findById(req.params.baiHocId);
    if (!baiHocInfo) return next(new AppError("No document found with that ID", 404));
    const khoaHocInfo = await KhoaHoc.findById(baiHocInfo.khoaHoc);
    const dsNguoiHoc = khoaHocInfo.dsNguoiHoc;
    //console.log(`dsNguoiHoc: ${dsNguoiHoc}`);
    if(dsNguoiHoc.some((userID) => userID.equals(req.user.id))) return next ();
    const updatedDS = await KhoaHoc.findByIdAndUpdate(
        baiHocInfo.khoaHoc,
        { $push: { dsNguoiHoc: req.user.id } },
        {
          new: true,
          runValidators: true,
        }
    );
    next();
});