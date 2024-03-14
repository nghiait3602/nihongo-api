const crypto = require('crypto');
const bcrypt = require('bcryptjs');
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
      // chỉ sài dc ở CREATE và SAVE!!!
      validator: function(el) {
        return el === this.password;
      },
      message: 'Passwords không trùng khớp'
    }
  },role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },ngaySinh: {
    type: String,
    required: [true, 'Không được để trống ngày sinh']
  },photo: String,
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false
  },
  createAt:{
    type:Date,
    default: Date.now(),
    select: false
  }
});

userSchema.pre('save', async function(next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function(next) {
  
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function(next) {
  // nếu điều kiện truy vấn (this._conditions) có trường _id và không có trường _fields. Điều này ám chỉ rằng lệnh findByIdAndDelete đang được sử dụng, vì nó chỉ cần điều kiện _id và không yêu cầu trường _fields.
  // để đảm bảo admin có thể xóa tài khoản không hoạt động
  if (this._conditions._id && this._fields === undefined) {
    return next();
  }
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000, 
      10
    );

    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function() {
 
  const resetToken = crypto.randomBytes(32).toString('hex');
  
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  console.log({ resetToken }, this.passwordResetToken);
 
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  
  return resetToken;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
