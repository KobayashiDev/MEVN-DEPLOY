// controllers/cartController.js
const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

const cartController = {
  addToCart: async (req, res) => {
    try {
      const { name, quantity, size, imageUrl } = req.body;

      if (!name || !quantity || !size || !imageUrl) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const product = await Product.findOne({ name, size });
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      const priceToUse = product.salePrice || product.price;

      const calculatedPrice = priceToUse * quantity;

      let cartItem = await Cart.findOne({ name, size });

      if (cartItem) {
        cartItem.quantity += quantity;
        cartItem.price = priceToUse * cartItem.quantity;
        await cartItem.save();
      } else {
        cartItem = new Cart({
          name,
          quantity,
          price: calculatedPrice,
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

  getCartItems: async (req, res) => {
    try {
      const cartItems = await Cart.find();
      res.status(200).json(cartItems);
    } catch (err) {
      console.error('Error fetching cart items:', err);
      res.status(500).json({ message: 'Failed to fetch cart items', error: err.message });
    }
  },

  removeCartItem: async (req, res) => {
    const { productId } = req.params;
    try {
      const result = await Cart.deleteOne({ _id: productId });

      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Product not found in cart' });
      }

      res.status(200).json({ message: 'Product removed from cart' });
    } catch (err) {
      console.error('Error removing cart item:', err);
      res.status(500).json({ message: 'Error removing product from cart', error: err.message });
    }
  },

  clearCart: async (req, res) => {
    try {
      const result = await Cart.deleteMany({});

      res.status(200).json({
        message: 'All products in the cart have been deleted',
        deletedCount: result.deletedCount,
      });
    } catch (err) {
      console.error('Error clearing cart:', err);
      res.status(500).json({ message: 'Error clearing cart', error: err.message });
    }
  },
};

module.exports = cartController;
