const mongoose = require ('mongoose');
const nguPhapSchema = new mongoose.Schema({
    baiHoc:{
        type: mongoose.Schema.ObjectId,
        ref:'BaiHoc',
        required: [true, 'ngữ pháp phải liên quan đến bài học']
    },cauTruc:{
        type: String,
        required: [true, 'Không được để trống cấu trúc ngữ pháp']
    },tinhHuong:{
        type: String,
        required: [true, 'Không được để trống tình huống sử dụng ngữ pháp']
    },dinhNghia:{
        type: String,
        required: [true, 'Không được để trống định nghĩa ngữ pháp']
    },viDu:{
        type: String,
        default: null
    },
    createAt:{
        type:Date,
        default: Date.now()
    }
});

const NguPhap = mongoose.model('NguPhap', nguPhapSchema);
module.exports = NguPhap;