const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }, 
  cartItems: { type: Array, required: true }, 
  totalAmount: { type: Number, required: true }, 
  customer: {
    name: { type: String, required: true }, 
    phone: { type: String, required: true }, 
    address: { type: String, required: true } 
  },
  status: { type: String, default: 'pending' }, 
  createdAt: { type: Date, default: Date.now } 
});

module.exports = mongoose.model('orders', OrderSchema);
