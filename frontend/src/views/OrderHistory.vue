<template>
  <div>
    <h1>Your Order History</h1>
    <div v-if="orders.length === 0">
      <p>You have no order history.</p>
    </div>
    <ul v-else>
      <li v-for="order in orders" :key="order._id">
        <h3>Order ID: {{ order._id }}</h3>
        
        <!-- Display each product in cartItems -->
        <h4>Items:</h4>
        <ul>
          <li v-for="item in order.cartItems" :key="item._id">
            <p>Name: {{ item.name }}</p>
            <img :src="item.imageUrl" alt="Product Image" width="100" />
            <p>Quantity: {{ item.quantity }}</p>
            <p>Price: ${{ item.price }}</p>
            <p>Size: {{ item.size }}</p>
          </li>
        </ul>
        
        <!-- Display total amount -->
        <p>Total Amount: ${{ order.totalAmount }}</p>
        <p>Date: {{ new Date(order.createdAt).toLocaleString() }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      orders: []
    };
  },
  async created() {
    const userId = this.$store.getters.userId  // Get userId from route params
    
    if (!userId) {
      alert('User ID is missing. Please log in again.');
      this.$router.push('/login');
      return;
    }

    try {
      // Send userId through route params instead of query params
      const response = await axios.get(`https://mevn-deploy-xp07.onrender.com/api/orders/${userId}`);
      
      if (response.data.success) {
        this.orders = response.data.orders; // Assign order history to `orders`
      } else {
        alert('No orders found.');
      }
    } catch (error) {
      console.error('Failed to fetch order history:', error.response?.data?.message || error);
      alert('Failed to fetch order history.');
    }
  }
};
</script>

<style scoped>
/* General layout for the entire page */
div {
  font-family: 'Arial', sans-serif;
  color: #333;
  margin: 20px auto;
  max-width: 800px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Main title */
h1 {
  text-align: center;
  color: #4CAF50;
  margin-bottom: 20px;
  font-size: 28px;
}

/* No order history */
p {
  text-align: center;
  font-size: 16px;
  color: #999;
}

/* Order list */
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 15px;
  transition: transform 0.2s, box-shadow 0.2s;
}

/* Hover effect for each order */
li:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Order header */
h3 {
  font-size: 20px;
  color: #333;
  margin-bottom: 10px;
}

/* Order details */
p {
  margin: 5px 0;
  font-size: 16px;
}

p span {
  font-weight: bold;
  color: #555;
}

/* Total amount color */
p:nth-of-type(2) {
  color: #e91e63;
  font-weight: bold;
}

/* Date */
p:last-of-type {
  font-size: 14px;
  color: #777;
  font-style: italic;
}
</style>
