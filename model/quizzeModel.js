const mongoose = require ('mongoose');
const cauHoiSchema = new mongoose.Schema({
    baiHoc:{
        type: mongoose.Schema.ObjectId,
        ref:'BaiHoc',
        required: [true, 'câu hỏi phải liên quan đến bài học']
    },cauHoi:{
        type: String,
        required: [true, 'Không được để trống câu hỏi']
    },cauTraLoi:{
        type: [String],
        default:[]
    },cauTraLoiDung:{
        type: String,
        required: [true, 'Không được để trống câu trả lời đúng']
    },diem:{
        type: Number,
        default: 0
    },
    createAt:{
        type:Date,
        default: Date.now()
    }
});

const CauHoi = mongoose.model('CauHoi', cauHoiSchema);
module.exports = CauHoi;