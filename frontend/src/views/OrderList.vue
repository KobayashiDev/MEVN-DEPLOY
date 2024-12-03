<template>
  <div>
    <h1>Order List</h1>

    <!-- Search orders by ID -->
    <div>
      <input 
        type="text" 
        v-model="searchQuery" 
        placeholder="Search by order ID..." 
        @input="searchOrders"
      />
    </div>

    <table class="order-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Customer</th>
          <th>Total Amount</th>
          <th>Address</th>
          <th>Status</th>
          <th colspan="2">Menu</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(order, index) in filteredOrders" :key="index">
          <td>{{ order._id }}</td>
          <td>{{ order.customer.name }}</td>
          <td>{{ formatCurrency(order.totalAmount) }}</td>
          <td>{{ order.customer.address }}</td>
          <td>{{ order.status }}</td>
          <td><button @click.prevent="onDelete(order._id)">Remove</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios"; // Import axios
import { mapGetters } from 'vuex'; // Import mapGetters from Vuex

export default {
  data() {
    return {
      orders: [], // List of orders
      searchQuery: "", // Search keyword
      filteredOrders: [], // List of filtered orders based on the search query
    };
  },
  created() {
    this.fetchOrders(); // Fetch orders when the component is created
  },
  computed: {
    ...mapGetters(['authToken']), // Get token from Vuex
  },
  
  methods: {
    // Fetch orders
    async fetchOrders() {
      try {
        const response = await axios.get("https://mevn-deploy-xp07.onrender.com/api/orders", {
          headers: {
            Authorization: `Bearer ${this.authToken}`, // Add Authorization header with token from Vuex
          },
        });
        this.orders = response.data; // Assign data to orders array
        this.filteredOrders = this.orders; // Initialize filteredOrders with all orders
      } catch (error) {
        console.error("Error loading orders", error);
      }
    },
    
    // Search orders by ID
    searchOrders() {
      if (this.searchQuery === "") {
        this.filteredOrders = this.orders; // If no search keyword, display all orders
      } else {
        // Filter by order ID
        this.filteredOrders = this.orders.filter(order =>
          order._id.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
    },
    
    // Delete an order
    async onDelete(orderId) {
      if (confirm("Are you sure you want to delete this order?")) {
        try {
          // Send DELETE request to the server with Authorization header
          await axios.delete(`https://mevn-deploy-xp07.onrender.com/api/orders/${orderId}`, {
            headers: {
              Authorization: `Bearer ${this.authToken}`, // Add Authorization header with token from Vuex
            },
          });

          // Update the orders list after deletion
          this.orders = this.orders.filter((order) => order._id !== orderId);
          this.searchOrders(); // Update the filtered list after deletion

          alert("Order deleted successfully!");
        } catch (err) {
          console.error("Error deleting order:", err);
          alert("Unable to delete the order. Please try again.");
        }
      }
    },
    
    // Format currency
    formatCurrency(value) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(value);
    },
  },
};
</script>

<style scoped>
/* CSS for the order table */
.order-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.order-table th, .order-table td {
  padding: 12px 15px;
  text-align: left;
  border: 1px solid #ddd;
}

.order-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.order-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.order-table tr:hover {
  background-color: #e6f7ff;
}

.order-table td button,
.order-table .ui.button {
  padding: 6px 12px;
  background-color: #ffcc00;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.order-table td button:hover,
.order-table .ui.button:hover {
  background-color: #ff9900;
}

.order-table td button:focus,
.order-table .ui.button:focus {
  outline: none;
}

.order-table td a {
  text-decoration: none;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}
</style>
