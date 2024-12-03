// controllers/orderController.js
const Order = require('../models/orderModel');

const orderController = {
  createOrder: async (req, res) => {
    try {
      const { userId, cartItems, totalAmount, customer } = req.body;

      if (!customer.name || !customer.phone || !customer.address) {
        return res.status(400).json({ message: 'Missing required customer fields' });
      }

      if (!cartItems || cartItems.length === 0) {
        return res.status(400).json({ message: 'Cart is empty' });
      }

      const newOrder = new Order({
        userId: userId || null,
        cartItems,
        totalAmount,
        customer,
      });

      const savedOrder = await newOrder.save();

      res.status(201).json({ message: 'Order created successfully', order: savedOrder });
    } catch (err) {
      console.error('Error creating order:', err);
      res.status(500).json({ message: 'Failed to create order', error: err.message });
    }
  },

  getOrdersByUserId: async (req, res) => {
    try {
      const { userId } = req.params;
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

  getAllOrder: async (req, res) => {
    try {
      const orders = await Order.find();
      res.json(orders);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getOrderById: async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      console.log("Products Data:", order);
      if (!order) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(order);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  editOrderById: async (req, res) => {
    try {
      const id = req.params.id;
      const data = req.body;

      await Order.findByIdAndUpdate(id, data);

      res.json({ message: "Product updated successfully!" });
    } catch (err) {
      res.status(500).send(err);
    }
  },

  deleteOrderById: async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        return res.status(404).json({ message: "Product not found" });
      }

      await Order.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Product deleted successfully!" });
    } catch (err) {
      res.status(500).json({ error: "Failed to delete product." });
    }
  },
};

module.exports = orderController;
