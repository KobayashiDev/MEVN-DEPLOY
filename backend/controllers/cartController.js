// controllers/cartController.js
const Cart = require('../models/cartModel');
const Product = require('../models/productModel'); // Model Product

const cartController = {
  // Thêm sản phẩm vào giỏ hàng
  addToCart: async (req, res) => {
    try {
      const { name, quantity, size, imageUrl } = req.body;

      // Kiểm tra nếu thông tin cần thiết bị thiếu
      if (!name || !quantity || !size || !imageUrl) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      // Lấy sản phẩm từ database dựa trên tên và size
      const product = await Product.findOne({ name, size });
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      // Kiểm tra xem sản phẩm có giảm giá không
      const priceToUse = product.salePrice || product.price; // Sử dụng giá giảm giá nếu có, nếu không lấy giá gốc

      // Tính toán giá cho sản phẩm trong giỏ hàng
      const calculatedPrice = priceToUse * quantity;

      // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa (theo `name` và `size`)
      let cartItem = await Cart.findOne({ name, size });

      if (cartItem) {
        // Nếu sản phẩm đã có trong giỏ hàng -> tăng số lượng và tính lại giá
        cartItem.quantity += quantity; // Tăng số lượng
        cartItem.price = priceToUse * cartItem.quantity; // Cập nhật lại giá dựa trên số lượng mới
        await cartItem.save();
      } else {
        // Nếu sản phẩm chưa có trong giỏ hàng -> tạo mới
        cartItem = new Cart({
          name,
          quantity,
          price: calculatedPrice, // Lưu giá đã tính vào giỏ hàng
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

  // Lấy tất cả sản phẩm trong giỏ hàng
  getCartItems: async (req, res) => {
    try {
      const cartItems = await Cart.find(); // Trả về toàn bộ giỏ hàng (không lọc theo userId)
      res.status(200).json(cartItems);
    } catch (err) {
      console.error('Error fetching cart items:', err);
      res.status(500).json({ message: 'Failed to fetch cart items', error: err.message });
    }
    
  },
  // Xóa sản phẩm trong giỏ hàng
removeCartItem: async (req, res) => {
    const { productId } = req.params; // Lấy productId từ tham số URL
    try {
      // Tìm và xóa sản phẩm theo productId
      const result = await Cart.deleteOne({ _id: productId });
  
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Sản phẩm không tồn tại trong giỏ hàng' });
      }
  
      res.status(200).json({ message: 'Sản phẩm đã được xóa khỏi giỏ hàng' });
    } catch (err) {
      console.error('Error removing cart item:', err);
      res.status(500).json({ message: 'Lỗi khi xóa sản phẩm khỏi giỏ hàng', error: err.message });
    }
  },
  clearCart: async (req, res) => {
    try {
      // Sử dụng deleteMany để xóa toàn bộ sản phẩm trong giỏ hàng
      const result = await Cart.deleteMany({});

      res.status(200).json({
        message: 'Tất cả sản phẩm trong giỏ hàng đã được xóa',
        deletedCount: result.deletedCount, // Số lượng sản phẩm đã bị xóa
      });
    } catch (err) {
      console.error('Error clearing cart:', err);
      res.status(500).json({ message: 'Lỗi khi xóa toàn bộ giỏ hàng', error: err.message });
    }
  },
  
};

module.exports = cartController;
