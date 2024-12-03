

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');


router.route('/').get(authController.getUsers); 

router.route('/:id')
  .put(authMiddleware, authController.editUserById)  
  .delete(authMiddleware, authController.deleteUserById); 

// Các route xác thực không yêu cầu quyền admin
router.route('/register')
  .post(authController.register);

router.route('/login')
  .post(authController.login);

router.route('/forgot-password')
  .post(authController.forgotPassword);

router.route('/reset-password')
  .post(authController.resetPassword);
  
router.route('/user-info')
  .get(authController.getUserInfo);

  router.route('/change')
  .post(authController.changePassword)



module.exports = { path: '/auth', router };

