const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


require('dotenv').config(); // Nạp biến môi trường từ .env
const apiRoutes = require('./routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sử dụng biến môi trường từ .env
const mongoURI = process.env.MONGODB_URI; // Lấy chuỗi kết nối MongoDB từ .env
const PORT = process.env.PORT || 5000; // Lấy cổng từ .env, mặc định là 5000 nếu không có

mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));



app.use('/api', apiRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
