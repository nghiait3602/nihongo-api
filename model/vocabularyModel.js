const mongoose = require ('mongoose');
const tuVungSchema = new mongoose.Schema({
    baiHoc:{
        type: mongoose.Schema.ObjectId,
        ref:'BaiHoc',
        required: [true, 'tu vung phải liên quan đến bài học']
    },tu:{
        type: String,
        required: [true, 'Không được để trống Từ']
    },phatAm:{
        type: String,
        required: [true, 'Không được để trống phát âm']
    },dinhNghia:{
        type: String,
        required: [true, 'Không được để trống định nghĩa']
    },viDu:{
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

const TuVung = mongoose.model('tuVung', tuVungSchema);
module.exports = TuVung;