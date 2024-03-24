const mongoose = require ('mongoose');

const baiHocSchema = new mongoose.Schema({
    tenBaiHoc: {
        type: String,
        required: [true, 'Không được để trống tên bài học']
    },mucTieu: {
        type: String,
        required: [true, 'Không được để trống mục tiêu bài học']
    },noiDung: {
        type: String,
        required: [true, 'Không được để trống nội dung bài học']
    },hinhAnh: {
        type: String,
        required: [true, 'Không được để trống hình ảnh bài học'] 
    },khoaHoc:{
        type: mongoose.Schema.ObjectId,
        ref:'KhoaHoc',
        required: [true, 'bài học phải thuộc về khóa học']
    },
    createAt:{
      type:Date,
      default: Date.now()
    }
},{
    toJSON: {virtuals: true}, 
    toObject: {virtuals: true}
});

baiHocSchema.pre(/^find/, function(next){
    this.populate({
        path: 'khoaHoc',
        select: 'tenKhoahoc'
    });
    next();
});

const BaiHoc = mongoose.model('BaiHoc', baiHocSchema);
module.exports = BaiHoc;
