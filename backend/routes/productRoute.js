


const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');
// Route để lấy tất cả sản phẩm
router.route('/')
  .get(productController.getAllProducts)
  .post(productController.addNewProduct);

router.route('/filter')
  .get(productController.filterProducts)

router.route('/:id')
  .get(productController.getProductById)
  .put(authMiddleware, productController.editProductById)
  .delete(authMiddleware, productController.deleteProductById)
module.exports = { path: '/products', router };


