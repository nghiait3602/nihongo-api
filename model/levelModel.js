const mongoose = require ('mongoose');

capDoSchema = new mongoose.Schema({
    capDo:{
      type: String,
      require: [true, 'phải có tên cấp độ']
    },dsKhoaHoc:[{
      type: mongoose.Schema.ObjectId,
      ref:'KhoaHoc'
  }],
    createAt:{
      type:Date,
      default: Date.now()
    }
});

const CapDo = mongoose.model('CapDo', capDoSchema);
module.exports = CapDo;