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
    tuVungS: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'TuVung',
        default: null
      }
    ],
    nguPhapS: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'NguPhap',
        default: null
      }
    ],
    kanjiS: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Kanji',
        default: null
      }
    ],
    dsCauTraLoi: [
      {
        iDCauHoi:{
          type: mongoose.Schema.ObjectId,
          ref: 'CauHoi'
        },
        cauTraLoi: String
      }
    ],
    createAt:{
      type:Date,
      default: Date.now
    }
});

tienTrinhBaiHocSchema.index({ baiHoc: 1, user: 1 }, { unique: true });

tienTrinhBaiHocSchema.pre(/^find/, function(next){
    this.populate({
        path:'baiHoc',
        select: 'tenBaiHoc'
    });
    next();
});
const TienTrinhBaiHoc = mongoose.model('TienTrinhBaiHoc',tienTrinhBaiHocSchema);
module.exports = TienTrinhBaiHoc;