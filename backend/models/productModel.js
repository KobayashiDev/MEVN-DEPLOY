const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Tên sản phẩm
  price: { type: Number, required: true }, // Giá hiện tại
  originalPrice: { type: Number }, // Giá gốc (nếu có giảm giá)
  imageUrl: { type: String }, // URL hình ảnh sản phẩm
  isOnSale: { type: Boolean, default: false }, // Sản phẩm đang giảm giá hay không
  category: { type: String, required: true }, // Danh mục sản phẩm (e.g., Men, Women, Kids)
  brand: { type: String, required: true }, // Thương hiệu (e.g., Diesel, Calvin Klein)
  size: [String],
  description: [String],
});

module.exports = mongoose.model('products', productSchema);
