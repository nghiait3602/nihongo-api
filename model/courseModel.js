const mongoose = require ('mongoose');
const khoaHocSchema = new mongoose.Schema({
    tenKhoahoc: {
        type: String,
        required: [true, 'Không được để trống tên khóa học']
    },moTa: {
        type: String,
        required: [true, 'Không được để trống mô tả khóa học']
    },capDo: {
        type:Number,
        default: 5,
        enum:{
            values:[5, 4, 3, 2, 1],
            message:'Chỉ được nhập cấp độ từ 5->1'
        }
    },hinhAnh: String,
    createAt:{
        type:Date,
        default: Date.now()
    }
});

const KhoaHoc = mongoose.model('khoaHoc', khoaHocSchema);
module.exports = KhoaHoc;