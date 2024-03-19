const TienTrinhBaiHoc = require('./../model/learningProgressModel');
const factory = require('./handlerFactory');

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