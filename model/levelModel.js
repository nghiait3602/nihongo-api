const mongoose = require ('mongoose');

capDoSchema = new mongoose.Schema({
    khoaHoc:{
        type: mongoose.Schema.ObjectId,
        ref:'KhoaHoc',
        required: [true, 'cấp độ phải thuộc về khóa học']
    },
    createAt:{
      type:Date,
      default: Date.now()
    }
});

const CapDo = mongoose.model('CapDo', capDoSchema);
module.exports = CapDo;