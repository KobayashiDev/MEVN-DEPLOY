const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }, // ID người dùng nếu có
  cartItems: { type: Array, required: true }, // Danh sách sản phẩm
  totalAmount: { type: Number, required: true }, // Tổng số tiền
  customer: {
    name: { type: String, required: true }, // Họ và tên
    phone: { type: String, required: true }, // Số điện thoại
    address: { type: String, required: true } // Địa chỉ
  },
  status: { type: String, default: 'pending' }, // Trạng thái thanh toán
  createdAt: { type: Date, default: Date.now } // Thời gian tạo đơn hàng
});

module.exports = mongoose.model('orders', OrderSchema);
