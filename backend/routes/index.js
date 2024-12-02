const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Đọc tất cả các file route trừ `index.js` và tự động thêm vào router
fs.readdirSync(__dirname).forEach((file) => {
  if (file !== 'index.js') {
    const route = require(path.join(__dirname, file));
    router.use(route.path, route.router);  // Sử dụng `path` được export từ mỗi module route
  }
});

module.exports = router;
