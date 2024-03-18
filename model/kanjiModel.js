const mongoose = require ('mongoose');
const kanjiSchema = new mongoose.Schema({
    baiHoc:{
        type: mongoose.Schema.ObjectId,
        ref:'BaiHoc',
        required: [true, 'kanji phải liên quan đến bài học']
    },hanTu:{
        type: String,
        required: [true, 'Không được để trống hán tự']
    },hanViet:{
        type: String,
        required: [true, 'Không được để trống từ hán việt']
    },kunyomi:{
        type: String,
        default: null
    },onyomi:{
        type: String,
        default: null
    },soNet:{
        type: Number,
        required: [true, 'Không được để trống số nét']
    },bo:{
        type: String,
        required: [true, 'Không được để trống bộ']
    },nghia:{
        type: String,
        required: [true, 'Không được để trống nghĩa']
    },viDu:{
        type: String,
        default: null
    },hinhAnhCachViet:{
        type: String,
        required: [true, 'Không được để trống hình ảnh cách viết']
    },
    createAt:{
        type:Date,
        default: Date.now()
    }
});

kanjiSchema.pre(/^findOne/, function(next){
    this.populate({
        path:'baiHoc',
        select: 'tenBaiHoc'
    });
    next();
});

const Kanji = mongoose.model('Kanji', kanjiSchema);
module.exports = Kanji;