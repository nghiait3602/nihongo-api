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
    },hinhAnh:{
        type: String,
        default: 'noimage'
    },
    createAt:{
        type:Date,
        default: Date.now()
    }
},{
    toJSON: {virtuals: true}, 
    toObject: {virtuals: true}
});

// bug ko xuất dc danh sách bài học dc nhưng ko ảnh hưởng đến api tổng thể bug nhẹ
khoaHocSchema.virtual('dsBaiHoc', {
    ref: 'BaiHoc',
    foreignField: 'khoaHoc',
    localField: '_id'
});

const KhoaHoc = mongoose.model('KhoaHoc', khoaHocSchema);
module.exports = KhoaHoc;