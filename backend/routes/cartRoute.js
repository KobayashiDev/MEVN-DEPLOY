// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Route để thêm sản phẩm vào giỏ hàng
router.route('/')
  .post(cartController.addToCart)
  .get(cartController.getCartItems) 
  .delete(cartController.clearCart);

// Route để xóa một sản phẩm khỏi giỏ hàng
router.route('/:productId')
  .delete(cartController.removeCartItem);

module.exports = { path: '/cart', router };
