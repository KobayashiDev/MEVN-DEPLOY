// const express = require('express');
// const router = express.Router();
// const authController = require('../controllers/authController');


// router.route('/register')
//   .post(authController.register);

// router.route('/login') 
//   .post(authController.login);

// router.route('/logout')
//   .post(authController.logout);
// module.exports = router;


const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

// Các route cần kiểm tra quyền truy cập của admin
router.route('/').get(authController.getUsers); // Chỉ admin mới có thể xem danh sách người dùng

router.route('/:id')
  .put(authMiddleware, authController.editUserById)  // Chỉ admin mới có thể chỉnh sửa người dùng
  .delete(authMiddleware, authController.deleteUserById); // Chỉ admin mới có thể xóa người dùng

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

