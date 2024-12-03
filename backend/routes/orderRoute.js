
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');

router.route('/')
  .post(orderController.createOrder)
  .get(orderController.getAllOrder)


router.route('/:userId')
  .get(orderController.getOrdersByUserId) 
  

router.route('/:id')  
.put(orderController.editOrderById)
.delete(authMiddleware, orderController.deleteOrderById)
.get(orderController.getOrderById )
                         

module.exports = { path: '/orders', router };
