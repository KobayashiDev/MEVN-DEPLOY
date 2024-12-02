const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    resetToken: { type: String },          // Thêm trường mới
    resetTokenExpiry: { type: Date },      // Thêm trường mới
  });
  
  module.exports = mongoose.model('users', userSchema);