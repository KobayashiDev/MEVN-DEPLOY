// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');


router.route('/')
  .post(cartController.addToCart)
  .get(cartController.getCartItems) 
  .delete(cartController.clearCart);


router.route('/:productId')
  .delete(cartController.removeCartItem);

module.exports = { path: '/cart', router };
