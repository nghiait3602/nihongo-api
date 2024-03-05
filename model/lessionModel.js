const mongoose = require ('mongoose');
const baiHocSchema = new mongoose.Schema({
    tenBaihoc: {
        type: String,
        required: [true, 'Không được để trống tên bài học']
    },mucTieu: {
        type: String,
        required: [true, 'Không được để trống mục tiêu bài học']
    },noiDung: {
        type: String,
        required: [true, 'Không được để nội dung bài học']
    },khoaHoc:{
        type: mongoose.Schema.ObjectId,
        ref:'KhoaHoc',
        required: [true, 'bài học phải thuộc về khóa học']
    },
    createAt:{
      type:Date,
      default: Date.now()
    }
});

const BaiHoc = mongoose.model('baiHoc', baiHocSchema);
module.exports = BaiHoc;
