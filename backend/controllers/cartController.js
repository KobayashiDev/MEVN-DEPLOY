// controllers/cartController.js
const Cart = require('../models/cartModel');
const Product = require('../models/productModel'); // Product Model

const cartController = {
  // Add product to the cart
  addToCart: async (req, res) => {
    try {
      const { name, quantity, size, imageUrl } = req.body;

      // Check if any required information is missing
      if (!name || !quantity || !size || !imageUrl) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      // Get product from the database based on name and size
      const product = await Product.findOne({ name, size });
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      // Check if the product has a discount
      const priceToUse = product.salePrice || product.price; // Use sale price if available, otherwise use original price

      // Calculate price for the product in the cart
      const calculatedPrice = priceToUse * quantity;

      // Check if the product is already in the cart (based on `name` and `size`)
      let cartItem = await Cart.findOne({ name, size });

      if (cartItem) {
        // If the product is already in the cart -> increase the quantity and recalculate price
        cartItem.quantity += quantity; // Increase quantity
        cartItem.price = priceToUse * cartItem.quantity; // Update price based on new quantity
        await cartItem.save();
      } else {
        // If the product is not in the cart -> create a new item
        cartItem = new Cart({
          name,
          quantity,
          price: calculatedPrice, // Save the calculated price to the cart
          size,
          imageUrl,
        });
        await cartItem.save();
      }

      res.status(200).json({ message: 'Product added to cart successfully', cartItem });
    } catch (err) {
      console.error('Error adding to cart:', err);
      res.status(500).json({ message: 'Failed to add product to cart', error: err.message });
    }
  },

  // Get all products in the cart
  getCartItems: async (req, res) => {
    try {
      const cartItems = await Cart.find(); // Return the entire cart (not filtered by userId)
      res.status(200).json(cartItems);
    } catch (err) {
      console.error('Error fetching cart items:', err);
      res.status(500).json({ message: 'Failed to fetch cart items', error: err.message });
    }
  },
  
  // Remove product from the cart
  removeCartItem: async (req, res) => {
    const { productId } = req.params; // Get productId from the URL parameters
    try {
      // Find and remove product by productId
      const result = await Cart.deleteOne({ _id: productId });
  
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Product does not exist in the cart' });
      }
  
      res.status(200).json({ message: 'Product has been removed from the cart' });
    } catch (err) {
      console.error('Error removing cart item:', err);
      res.status(500).json({ message: 'Error removing product from cart', error: err.message });
    }
  },

  // Clear all products in the cart
  clearCart: async (req, res) => {
    try {
      // Use deleteMany to remove all products in the cart
      const result = await Cart.deleteMany({});

      res.status(200).json({
        message: 'All products in the cart have been removed',
        deletedCount: result.deletedCount, // Number of products deleted
      });
    } catch (err) {
      console.error('Error clearing cart:', err);
      res.status(500).json({ message: 'Error clearing the entire cart', error: err.message });
    }
  },
};

module.exports = cartController;
