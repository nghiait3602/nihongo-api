const Quizze = require('./../model/quizzeModel');
const factory = require('./handlerFactory');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');

exports.setCauHoiId = (req,res,next)=>{
    //allow nested routes
    if(!req.body.baiHoc) req.body.baiHoc = req.params.baiHocId;
    next();
};

exports.getAllQuizze = factory.getAll(Quizze);
exports.getQuizze = factory.getOne(Quizze);
exports.createQuizze = factory.createOne(Quizze);
exports.updateQuizze = factory.updateOne(Quizze);
exports.deleteQuizze = factory.deleteOne(Quizze);