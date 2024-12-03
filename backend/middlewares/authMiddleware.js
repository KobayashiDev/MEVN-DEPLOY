const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Authorization token missing or invalid." });
    }

    
    const token = authHeader.split(" ")[1];

    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    
    if (decoded.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied. Admins only." });
    }

    req.user = decoded;

    // Cho phép đi tiếp
    next();
  } catch (error) {
    console.error("Error in authMiddleware:", error.message);
    return res.status(401).json({ success: false, message: "Invalid or expired token." });
  }
};

module.exports = authMiddleware;
