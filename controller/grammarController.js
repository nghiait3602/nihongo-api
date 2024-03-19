const Grammar = require('./../model/grammarModel');
const factory = require('./handlerFactory');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');

exports.setNguPhapId = (req,res,next)=>{
    //allow nested routes
    if(!req.body.baiHoc) req.body.baiHoc = req.params.baiHocId;
    next();
};

exports.getAllGrammar = factory.getAll(Grammar);
exports.getGrammar = factory.getOne(Grammar);
exports.createGrammar = factory.createOne(Grammar);
exports.updateGrammar = factory.updateOne(Grammar);
exports.deleteGrammar = factory.deleteOne(Grammar);