const mongoose = require ('mongoose');
const tienTrinhBaiHocSchema = new mongoose.Schema({
    baiHoc:{
        type: mongoose.Schema.ObjectId,
        ref:'BaiHoc',
        required: [true, 'tiến trình bài học phải liên quan đến bài học']
    },user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'tiến trình bài học phải liên quan đến bài học user']
    },diemSo:{
        type: Number,
        default: 0
    }
    ,baiHocHoanhThanh:{
        type: Boolean,
        default: false
    },
    createAt:{
      type:Date,
      default: Date.now()
    }
});
const TienTrinhBaiHoc = mongoose.model('tienTrinhBaiHoc',tienTrinhBaiHocSchema);
module.exports = TienTrinhBaiHoc;