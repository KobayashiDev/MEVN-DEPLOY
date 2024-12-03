const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  price: { type: Number, required: true }, 
  originalPrice: { type: Number }, 
  imageUrl: { type: String }, 
  isOnSale: { type: Boolean, default: false }, 
  category: { type: String, required: true }, 
  brand: { type: String, required: true }, 
  size: [String],
  description: [String],
});

module.exports = mongoose.model('products', productSchema);
