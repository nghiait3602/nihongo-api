const mongoose = require('mongoose');
const validator = require('validator');
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Không được để trống name']
  },
  email: {
    type: String,
    required: [true, 'Không được để trống email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Vui lòng nhập đúng địa chỉ email']
  },
  password: {
    type: String,
    required: [true, 'Không được để trống password'],
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'làm ơn xác thực password của bạn'],
    validate: {
      validator: function(el) {
        return el === this.password;
      },
      message: 'Passwords không trùng khớp'
    }
  },rank: {
    type:Number,
    default: 0
  },ngaySinh: {
    type: String,
    required: [true, 'Không được để trống ngày sinh']
  },photo: String,
  createAt:{
    type:Date,
    default: Date.now(),
    select: false
  }
});
const User = mongoose.model('User', userSchema);
module.exports = User;
