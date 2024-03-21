const CapDo = require('./../model/levelModel');
const factory = require('./handlerFactory');

exports.setKhoaHocId = (req,res,next)=>{
    //allow nested routes
    if(!req.body.khoaHoc) req.body.khoaHoc = req.params.khoaHocId;
    next();
};

exports.getAllCapDo = factory.getAll(CapDo);
exports.creatCapDo = factory.createOne(CapDo);