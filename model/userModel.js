const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Không được để trống name'],
  },
  email: {
    type: String,
    required: [true, 'Không được để trống email'],
    unique: true,
    lowercase: true,
  },
});
const User = mongoose.model('User', userSchema);
module.exports = User;
