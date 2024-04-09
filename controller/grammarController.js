const Grammar = require('./../model/grammarModel');
const factory = require('./handlerFactory');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const User = require('./../model/userModel');

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

exports.addDSNguPhap = catchAsync( async (req,res,next)=>{
    const nguPhap = await Grammar.findById(req.params.id);
    if(!nguPhap) return next(new AppError('No document found with that ID', 404));
    const userInfo = await User.findById(req.user.id);
    const dsIdNguPhap = userInfo.nguPhapS;
    console.log(`dsIdNguPhap: ${dsIdNguPhap}`);
    console.log(`IdNguPhap: ${req.params.id}`);
    if(dsIdNguPhap.some(doneNguPhapId => doneNguPhapId.equals(req.params.id))){
      res.status(200).json({
        status: "success",
        data: {
          message: "id đã có trong mảng",
          result: 0
        }
      });
    }else{
      const updatedUser = await User.findByIdAndUpdate(req.user.id,{$push: { nguPhapS: req.params.id }} ,{
        new: true,
        runValidators: true
      });
      res.status(200).json({
        status: "success",
        data: {
          user: updatedUser,
          result: 1
        },
      });
    }
  });