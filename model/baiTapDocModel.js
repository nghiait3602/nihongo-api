const mongoose = require ('mongoose');
const baiTapDocSchema = new mongoose.Schema({
    baiHoc:{
        type: mongoose.Schema.ObjectId,
        ref:'BaiHoc',
        required: [true, 'bài tập đọc phải liên quan đến bài học']
    },tenBaiDoc:{
        type: String,
        required: [true, 'Không được để trống tên bài đọc']
    },vanBanTiengNhat:{
        type: String,
        required: [true, 'Không được để trống văn bản tiếng nhật']
    },tinhHuong:{
        type: String,
        required: [true, 'Không được để trống tình huống bài đọc']
    },dichNghia:{
        type: String,
        required: [true, 'Không được để trống dịch nghĩa']
    },
    createAt:{
        type:Date,
        default: Date.now()
    }
});

const BaiTapDoc = mongoose.model('baiTapDoc', baiTapDocSchema);
module.exports = BaiTapDoc;