const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // Lấy token từ header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Authorization token missing or invalid." });
    }

    // Lấy token từ header
    const token = authHeader.split(" ")[1];

    // Xác minh token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded); // Xem thông tin trong token
    // Kiểm tra role
    if (decoded.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied. Admins only." });
    }

    // Gắn thông tin người dùng đã xác thực vào req
    req.user = decoded;

    // Cho phép đi tiếp
    next();
  } catch (error) {
    console.error("Error in authMiddleware:", error.message);
    return res.status(401).json({ success: false, message: "Invalid or expired token." });
  }
};

module.exports = authMiddleware;
