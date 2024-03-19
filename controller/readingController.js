const BaiTapDoc = require('./../model/readingModel');
const factory = require('./handlerFactory');

exports.setBaiHocId = (req,res,next)=>{
    //allow nested routes
    if(!req.body.baiHoc) req.body.baiHoc = req.params.baiHocId;
    next();
};

exports.getAllBaiTapDoc = factory.getAll(BaiTapDoc);
exports.getBaiTapDoc = factory.getOne(BaiTapDoc);
exports.createBaiTapDoc = factory.createOne(BaiTapDoc);
exports.updateBaiTapDoc = factory.updateOne(BaiTapDoc);
exports.deleteBaiTapDoc = factory.deleteOne(BaiTapDoc);