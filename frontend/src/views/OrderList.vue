<template>
  <div>
    <h1>Danh sách đơn hàng</h1>

    <!-- Tìm kiếm đơn hàng theo ID -->
    <div>
      <input 
        type="text" 
        v-model="searchQuery" 
        placeholder="Tìm kiếm theo ID đơn hàng..." 
        @input="searchOrders"
      />
    </div>

    <table class="order-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Khách hàng</th>
          <th>Tổng số tiền</th>
          <th>Trạng thái</th>
          <th colspan="2">Menu</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(order, index) in filteredOrders" :key="index">
          <td>{{ order._id }}</td>
          <td>{{ order.customer.name }}</td>
          <td>{{ formatCurrency(order.totalAmount) }}</td>
          <td>{{ order.status }}</td>
          <td><button @click.prevent="onDelete(order._id)">Remove</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios"; // Import axios
import { mapGetters } from 'vuex'; // Import mapGetters từ Vuex

export default {
  data() {
    return {
      orders: [], // Danh sách đơn hàng
      searchQuery: "", // Từ khóa tìm kiếm
      filteredOrders: [], // Danh sách đơn hàng đã lọc theo từ khóa tìm kiếm
    };
  },
  created() {
    this.fetchOrders(); // Lấy danh sách đơn hàng khi component được tạo
  },
  computed: {
    ...mapGetters(['authToken']), // Lấy token từ Vuex
  },
  
  methods: {
    // Lấy danh sách đơn hàng
    async fetchOrders() {
      try {
        const response = await axios.get("http://localhost:5000/api/orders", {
          headers: {
            Authorization: `Bearer ${this.authToken}`, // Thêm Authorization header với token từ Vuex
          },
        });
        this.orders = response.data; // Gán dữ liệu vào mảng orders
        this.filteredOrders = this.orders; // Khởi tạo filteredOrders với tất cả các đơn hàng
      } catch (error) {
        console.error("Lỗi khi tải đơn hàng", error);
      }
    },
    
    // Tìm kiếm đơn hàng theo ID
    searchOrders() {
      if (this.searchQuery === "") {
        this.filteredOrders = this.orders; // Nếu không có từ khóa tìm kiếm, hiển thị tất cả đơn hàng
      } else {
        // Lọc theo ID đơn hàng
        this.filteredOrders = this.orders.filter(order =>
          order._id.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
    },
    
    // Xóa một đơn hàng
    async onDelete(orderId) {
      if (confirm("Bạn có chắc muốn xóa đơn hàng này?")) {
        try {
          // Gửi yêu cầu DELETE tới server với header Authorization
          await axios.delete(`http://localhost:5000/api/orders/${orderId}`, {
            headers: {
              Authorization: `Bearer ${this.authToken}`, // Thêm Authorization header với token từ Vuex
            },
          });

          // Cập nhật danh sách đơn hàng sau khi xóa
          this.orders = this.orders.filter((order) => order._id !== orderId);
          this.searchOrders(); // Cập nhật danh sách đã lọc sau khi xóa

          alert("Đã xóa đơn hàng thành công!");
        } catch (err) {
          console.error("Lỗi khi xóa đơn hàng:", err);
          alert("Không thể xóa đơn hàng. Vui lòng thử lại.");
        }
      }
    },
    
    // Định dạng tiền tệ
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
  /* CSS cho bảng đơn hàng */
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
  