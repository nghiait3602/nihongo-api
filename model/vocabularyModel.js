const mongoose = require ('mongoose');
const tuVungSchema = new mongoose.Schema({
    baiHoc:{
        type: mongoose.Schema.ObjectId,
        ref:'BaiHoc',
        required: [true, 'tu vung phải liên quan đến bài học']
    },tu:{
        type: String,
        required: [true, 'Không được để trống Từ']
    },phienAm:{
        type: String,
        required: [true, 'Không được để trống phiên âm']
    },dinhNghia:{
        type: String,
        required: [true, 'Không được để trống định nghĩa']
    },loaiTu: {
        type: String,
        required: [true, 'Không được để trống loại từ']
    }
    ,chuDe: {
        type: String,
        required: [true, 'Không được để trống chủ đề']
    },viDu:{
        type: String,
        default: null
    },dichNghiaVD:{
        type: String,
        default: null
    },hinhAnh:{
        type: String,
        required: [true, 'Không được để trống hình ảnh']
    },
    createAt:{
        type:Date,
        default: Date.now()
    }
});

tuVungSchema.pre(/^findOne/, function(next){
    this.populate({
        path:'baiHoc',
        select: 'tenBaiHoc'
    });
    next();
});

const TuVung = mongoose.model('TuVung', tuVungSchema);
module.exports = TuVung;