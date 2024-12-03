// controllers/productController.js
const Product = require('../models/productModel');

const productController = {
  // Get all products
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Product filter
  filterProducts: async (req, res) => {
    try {
      const { category, brand, minPrice, maxPrice } = req.query;

      // Create query object for MongoDB
      const filter = {};

      // Add filter condition for `category`
      if (category) {
        filter.category = category;
      }

      // Add filter condition for `brand`
      if (brand) {
        filter.brand = brand;
      }

      // Add filter condition for `price`
      if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) {
          filter.price.$gte = Number(minPrice); // Price greater than or equal to minPrice
        }
        if (maxPrice) { 
          filter.price.$lte = Number(maxPrice); // Price less than or equal to maxPrice
        }
      }

      // Perform query to search based on the conditions
      const products = await Product.find(filter);
      res.json(products);
      console.log("Query Params:", req.query);
      console.log("Parsed Filter:", filter);

    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Get product by ID
  getProductById: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      console.log("Products Data:", product); // Log data for verification
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Edit product by ID
  editProductById: async (req, res) => {
    try {
      const id = req.params.id; // Get ID from URL
      const data = req.body;     // Get new data from the request body

      // Update the product in the DB using findByIdAndUpdate
      await Product.findByIdAndUpdate(id, data);

      // Return success message
      res.json({ message: "Product updated successfully!" });
    } catch (err) {
      res.status(500).send(err);
    }
  },

  // Delete product by ID
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

  // Add new product
  addNewProduct: async (req, res) => {
    try {
      const product = req.body;
      console.log('Received Product:', product); // Log data received from frontend
      await Product.create(product);
      res.json({ message: 'Product added successfully!' });
    } catch (err) {
      res.status(500).json({ message: 'Failed to add product', error: err.message });
    }
  }
  
};

module.exports = productController;
