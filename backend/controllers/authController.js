const bcrypt = require("bcrypt");

const User = require("../models/userModel");

const jwt = require("jsonwebtoken");

const nodemailer = require('nodemailer');

const crypto = require("crypto");


require('dotenv').config();

const authController = {
  register: async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    try {
      
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ success: false, message: "Email is already in use." });
      }

      
      const hashedPassword = await bcrypt.hash(password, 10);

      
      const user = new User({ firstName, lastName, email, password: hashedPassword });

    
      await user.save();

      
      const token = jwt.sign(
        { 
          userId: user._id,  
          role: user.role    
        }, 
        
        process.env.JWT_SECRET,  
        { expiresIn: '1h' } 
      );

      
      res.status(201).json({
        success: true,
        message: "User registered successfully.",
        token: token  
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

    
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.json({
        success: true,
        token: token,
        role: user.role, 
        userId: user._id 
      });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  },
  getUsers: async (req, res) => {
    try {
      const users = await User.find(); 
      res.status(200).json(users); 
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  },
  editUserById: async (req, res) => {
    try {
      const id = req.params.id; 
      const data = req.body;     

      
      await User.findByIdAndUpdate(id, data);

      
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
      
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found." });
      }

      
      const resetToken = crypto.randomBytes(32).toString("hex");
      const resetTokenExpiry = Date.now() + 15 * 60 * 1000; 

      
      user.resetToken = resetToken;
      user.resetTokenExpiry = resetTokenExpiry;
      await user.save();

      
      const transporter = nodemailer.createTransport({
        service: "Gmail", 
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

      
      await transporter.sendMail(mailOptions);

      res.status(200).json({ success: true, message: "Password reset email sent." });
    } catch (error) {
      console.error("Error in forgotPassword:", error);
      res.status(500).json({ success: false, message: "Server error." });
    }
  },

  
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

      
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      user.resetToken = undefined; 
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
      
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.userId;
  
     
      const user = await User.findById(userId, '-password'); 
      if (!user) return res.status(404).json({ success: false, message: "User not found." });
  
      res.status(200).json({ success: true, user });
    } catch (err) {
      res.status(500).json({ success: false, message: "Server error.", error: err.message });
    }
  },
  changePassword: async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    try {
     
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET); 
      const userId = decoded.userId; 

     
      const user = await User.findById(userId); 
      if (!user) return res.status(404).json({ message: "User not found." });

      
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Old password is incorrect." });
      }

      
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save(); 

      res.json({ message: "Password changed successfully!" });
    } catch (err) {
      console.error("Error changing password:", err.message);
      res.status(500).json({ message: "Server error. Please try again later." });
    }
  }
  
  
};

module.exports = authController;
