const bcrypt = require("bcrypt");

const User = require("../models/userModel");

const jwt = require("jsonwebtoken");

const nodemailer = require('nodemailer');

const crypto = require("crypto");


require('dotenv').config();

const authController = {
  register: async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    // Kiểm tra nếu các trường bắt buộc không được gửi lên
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    try {
      // Kiểm tra nếu email đã tồn tại
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ success: false, message: "Email is already in use." });
      }

      // Mã hóa mật khẩu
      const hashedPassword = await bcrypt.hash(password, 10);

      // Tạo mới người dùng
      const user = new User({ firstName, lastName, email, password: hashedPassword });

      // Lưu người dùng vào cơ sở dữ liệu
      await user.save();

      // Tạo token JWT sau khi người dùng được đăng ký thành công
      const token = jwt.sign(
        { 
          userId: user._id,  // Payload: thông tin người dùng cần mã hóa (ở đây là ID người dùng)
          role: user.role    // Thêm role vào token để quản lý quyền hạn
        }, 
        
        process.env.JWT_SECRET,  // Khóa bí mật từ tệp .env (hoặc bạn có thể cứng hóa trực tiếp)
        { expiresIn: '1h' } // Thời gian hết hạn của token (ví dụ: 1 giờ)
      );

      // Trả về phản hồi thành công và token
      res.status(201).json({
        success: true,
        message: "User registered successfully.",
        token: token  // Trả về token cho client
      });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ success: false, message: "Server error." });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ success: false, message: 'User not found' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: 'Invalid credentials' });
      }

      // Tạo token JWT sau khi người dùng đăng nhập thành công
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.json({
        success: true,
        token: token,
        role: user.role, // Trả về role của user
        userId: user._id // Đảm bảo trả về userId trong response
      });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  },
  getUsers: async (req, res) => {
    try {
      const users = await User.find(); // Lấy tất cả người dùng từ cơ sở dữ liệu
      res.status(200).json(users); // Trả về danh sách người dùng
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  },
  editUserById: async (req, res) => {
    try {
      const id = req.params.id; // Lấy ID từ URL
      const data = req.body;     // Lấy dữ liệu mới từ body của request

      // Cập nhật sản phẩm trong DB bằng findByIdAndUpdate
      await User.findByIdAndUpdate(id, data);

      // Trả về thông báo thành công
      res.json({ message: "User updated successfully!" });
    } catch (err) {
      res.status(500).send(err);
    }
  },
  deleteUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "User deleted successfully!" });
    } catch (err) {
      res.status(500).json({ error: "Failed to delete User." });
    }
  },
  forgotPassword: async (req, res) => {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required." });
    }

    try {
      // Kiểm tra email có tồn tại không
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found." });
      }

      // Tạo token reset mật khẩu
      const resetToken = crypto.randomBytes(32).toString("hex");
      const resetTokenExpiry = Date.now() + 15 * 60 * 1000; // Hết hạn sau 15 phút

      // Cập nhật token và hạn vào user
      user.resetToken = resetToken;
      user.resetTokenExpiry = resetTokenExpiry;
      await user.save();

      // Tạo email
      const transporter = nodemailer.createTransport({
        service: "Gmail", // Hoặc SMTP server khác
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const resetUrl = `mevn-deploy.vercel.app/reset-password/${resetToken}`;
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Password Reset Request",
        html: `<p>You requested a password reset. Click the link below to reset your password:</p>
               <a href="${resetUrl}">${resetUrl}</a>
               <p>This link will expire in 15 minutes.</p>`,
      };

      // Gửi email
      await transporter.sendMail(mailOptions);

      res.status(200).json({ success: true, message: "Password reset email sent." });
    } catch (error) {
      console.error("Error in forgotPassword:", error);
      res.status(500).json({ success: false, message: "Server error." });
    }
  },

  // Đặt lại mật khẩu
  resetPassword: async (req, res) => {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ success: false, message: "Token and new password are required." });
    }

    try {
      // Tìm người dùng theo token và kiểm tra hạn token
      const user = await User.findOne({
        resetToken: token,
        resetTokenExpiry: { $gt: Date.now() }, // Token phải còn hạn
      });

      if (!user) {
        return res.status(400).json({ success: false, message: "Invalid or expired token." });
      }

      // Mã hóa mật khẩu mới và cập nhật user
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      user.resetToken = undefined; // Xóa token sau khi dùng
      user.resetTokenExpiry = undefined;
      await user.save();

      res.status(200).json({ success: true, message: "Password reset successfully." });
    } catch (error) {
      console.error("Error in resetPassword:", error);
      res.status(500).json({ success: false, message: "Server error." });
    }
  },
  
  
};

module.exports = authController;
