// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');
// Route để tạo đơn hàng mới (Checkout)
router.route('/')
  .post(orderController.createOrder)
  .get(orderController.getAllOrder)

// Route để lấy đơn hàng theo userId (Sử dụng route params)
router.route('/:userId')
  .get(orderController.getOrdersByUserId) // Lấy đơn hàng theo userId từ route params
  

router.route('/:id')  
.put(orderController.editOrderById)
.delete(authMiddleware, orderController.deleteOrderById)
.get(orderController.getOrderById )
                         

module.exports = { path: '/orders', router };
