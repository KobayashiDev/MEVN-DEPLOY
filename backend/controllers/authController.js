const bcrypt = require("bcrypt");

const User = require("../models/userModel");

const jwt = require("jsonwebtoken");

const nodemailer = require('nodemailer');

const crypto = require("crypto");

require('dotenv').config();

const authController = {
  register: async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    // Check if mandatory fields are not sent
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    try {
      // Check if email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ success: false, message: "Email is already in use." });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const user = new User({ firstName, lastName, email, password: hashedPassword });

      // Save the user to the database
      await user.save();

      // Create a JWT token after successful registration
      const token = jwt.sign(
        { 
          userId: user._id,  // Payload: user information to be encoded (here, user ID)
          role: user.role    // Add role to token to manage permissions
        }, 
        process.env.JWT_SECRET,  // Secret key from .env file (or can be hardcoded)
        { expiresIn: '1h' } // Token expiration time (e.g., 1 hour)
      );

      // Return a successful response with the token
      res.status(201).json({
        success: true,
        message: "User registered successfully.",
        token: token  // Return the token to the client
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

      // Create a JWT token after successful login
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.json({
        success: true,
        token: token,
        role: user.role, // Return the user's role
        userId: user._id // Ensure userId is returned in the response
      });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  },
  getUsers: async (req, res) => {
    try {
      const users = await User.find(); // Get all users from the database
      res.status(200).json(users); // Return the list of users
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  },
  editUserById: async (req, res) => {
    try {
      const id = req.params.id; // Get ID from the URL
      const data = req.body;     // Get new data from the request body

      // Update user in the DB using findByIdAndUpdate
      await User.findByIdAndUpdate(id, data);

      // Return a success message
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
      // Check if email exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found." });
      }

      // Create a reset password token
      const resetToken = crypto.randomBytes(32).toString("hex");
      const resetTokenExpiry = Date.now() + 15 * 60 * 1000; // Expires in 15 minutes

      // Update token and expiration on the user
      user.resetToken = resetToken;
      user.resetTokenExpiry = resetTokenExpiry;
      await user.save();

      // Create email
      const transporter = nodemailer.createTransport({
        service: "Gmail", // Or another SMTP server
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

      // Send email
      await transporter.sendMail(mailOptions);

      res.status(200).json({ success: true, message: "Password reset email sent." });
    } catch (error) {
      console.error("Error in forgotPassword:", error);
      res.status(500).json({ success: false, message: "Server error." });
    }
  },

  // Reset password
  resetPassword: async (req, res) => {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ success: false, message: "Token and new password are required." });
    }

    try {
      
      const user = await User.findOne({
        resetToken: token,
        resetTokenExpiry: { $gt: Date.now() }, 
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
  getUserInfo: async (req, res) => {
    try {
      // Verify JWT from Authorization header
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.userId;
  
      // Find user by ID
      const user = await User.findById(userId, '-password'); // Exclude the password field from result
      if (!user) return res.status(404).json({ success: false, message: "User not found." });
  
      res.status(200).json({ success: true, user });
    } catch (err) {
      res.status(500).json({ success: false, message: "Server error.", error: err.message });
    }
  },
  changePassword: async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    try {
      // Verify JWT from Authorization header
      const token = req.headers.authorization.split(' ')[1]; // Get token from header
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode JWT token
      const userId = decoded.userId; // Get userId from decoded token

      // Find user by ID
      const user = await User.findById(userId); // Find user by ID in the database
      if (!user) return res.status(404).json({ message: "User not found." });

      // Check old password
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Old password is incorrect." });
      }

      // Hash new password and update
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save(); // Save updated password to database

      res.status(200).json({ message: "Password updated successfully." });
    } catch (error) {
      console.error("Error updating password:", error);
      res.status(500).json({ message: "Server error." });
    }
  },
};

module.exports = authController;
