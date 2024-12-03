// controllers/orderController.js
const Order = require('../models/orderModel');  // Order Model

const orderController = {
  // Create a new order (Checkout)
  createOrder: async (req, res) => {
    try {
      const { userId, cartItems, totalAmount, customer } = req.body;

      // Check customer information
      if (!customer.name || !customer.phone || !customer.address) {
        return res.status(400).json({ message: 'Missing required customer fields' });
      }

      // Check the cart
      if (!cartItems || cartItems.length === 0) {
        return res.status(400).json({ message: 'Cart is empty' });
      }

      // Create a new order
      const newOrder = new Order({
        userId: userId || null,
        cartItems,
        totalAmount,
        customer,
      });

      // Save the order to the database
      const savedOrder = await newOrder.save();

      res.status(201).json({ message: 'Order created successfully', order: savedOrder });
    } catch (err) {
      console.error('Error creating order:', err);
      res.status(500).json({ message: 'Failed to create order', error: err.message });
    }
  },

  // Get all orders by userId
  getOrdersByUserId: async (req, res) => {
    try {
      const { userId } = req.params; // Get userId from route params
      if (!userId) {
        return res.status(400).json({ success: false, message: 'User ID is required.' });
      }

      const orders = await Order.find({ userId }).sort({ createdAt: -1 });

      if (!orders || orders.length === 0) {
        return res.status(404).json({ success: false, message: 'No order history found.' });
      }

      res.json({ success: true, orders });
    } catch (error) {
      console.error('Error fetching order history:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch order history.' });
    }
  },
  
  // Get all orders
  getAllOrder: async (req, res) => {
    try {
      const orders = await Order.find();
      res.json(orders);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  
  // Get order by ID
  getOrderById: async(req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      console.log("Products Data:", order); // Log data for verification
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json(order);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Edit order by ID
  editOrderById: async (req, res) => {
    try {
      const id = req.params.id; // Get ID from URL
      const data = req.body;     // Get new data from the request body

      // Update the order in the DB using findByIdAndUpdate
      await Order.findByIdAndUpdate(id, data);

      // Return success message
      res.json({ message: "Order updated successfully!" });
    } catch (err) {
      res.status(500).send(err);
    }
  },

  // Delete order by ID
  deleteOrderById: async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      await Order.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Order deleted successfully!" });
    } catch (err) {
      res.status(500).json({ error: "Failed to delete order." });
    }
  },
};

module.exports = orderController;
