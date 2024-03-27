const TienTrinhBaiHoc = require('./../model/learningProgressModel');
const BaiHoc = require ('./../model/lessionModel');
const User = require('./../model/userModel');
const factory = require('./handlerFactory');
const catchAsync = require('./../utils/catchAsync');

exports.setBaiHocUserIds = (req,res,next)=>{// dùng để giải quyết vấn đề set id của user và tour khi dùng hàm sài chung model của factory
    //allow nested routes
    if(!req.body.baiHoc) req.body.baiHoc = req.params.baiHocId;
    if(!req.body.user) req.body.user = req.user.id;
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
    const baiHocNext = await BaiHoc.findOne({ _id: { $gt: req.params.baiHocId } });
    //console.log(`bài học tiếp theo: ${baiHocNext._id}`);
    if(!baiHocNext){
        const updatedUser = await User.findByIdAndUpdate(req.user.id,{baiHocTiepTheo: null} ,{
            new: true,
            runValidators: true
        });
        return next();
    }
    const updatedUser = await User.findByIdAndUpdate(req.user.id,{baiHocTiepTheo: baiHocNext._id} ,{
        new: true,
        runValidators: true
    });
    next();
});