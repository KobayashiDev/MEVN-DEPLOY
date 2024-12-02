  // controllers/productController.js
const Product = require('../models/productModel');

const productController = {
  // Lấy tất cả sản phẩm
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Bộ lọc sản phẩm
  filterProducts: async (req, res) => {
    try {
      const { category, brand, minPrice, maxPrice } = req.query;

      // Tạo query object cho MongoDB
      const filter = {};

      // Thêm điều kiện lọc theo `category`
      if (category) {
        filter.category = category;
      }

      // Thêm điều kiện lọc theo `brand`
      if (brand) {
        filter.brand = brand;
      }

      // Thêm điều kiện lọc theo `price`
      if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) {
          filter.price.$gte = Number(minPrice); // Giá lớn hơn hoặc bằng minPrice
        }
        if (maxPrice) { 
          filter.price.$lte = Number(maxPrice); // Giá nhỏ hơn hoặc bằng maxPrice
        }
      }

      // Thực hiện query tìm kiếm theo điều kiện
      const products = await Product.find(filter);
      res.json(products);
      console.log("Query Params:", req.query);
      console.log("Parsed Filter:", filter);

    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  getProductById: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      console.log("Products Data:", product); // Log dữ liệu để kiểm tra
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  editProductById: async (req, res) => {
    try {
      const id = req.params.id; // Lấy ID từ URL
      const data = req.body;     // Lấy dữ liệu mới từ body của request

      // Cập nhật sản phẩm trong DB bằng findByIdAndUpdate
      await Product.findByIdAndUpdate(id, data);

      // Trả về thông báo thành công
      res.json({ message: "Product updated successfully!" });
    } catch (err) {
      res.status(500).send(err);
    }
  },
  deleteProductById: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Product deleted successfully!" });
    } catch (err) {
      res.status(500).json({ error: "Failed to delete product." });
    }
  },
  addNewProduct: async (req, res) => {
    try {
      const product = req.body;
      console.log('Received Product:', product); // Log dữ liệu nhận từ frontend
      await Product.create(product);
      res.json({ message: 'Product added successfully!' });
    } catch (err) {
      res.status(500).json({ message: 'Failed to add product', error: err.message });
    }
  }
  
};

module.exports = productController;
