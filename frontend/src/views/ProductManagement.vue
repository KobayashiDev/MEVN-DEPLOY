<template>
  <div>
    <h1>Product Table</h1>
    <table class="ui celled table">
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Price</th>
          <th>Category</th>
          <th>Brand</th>
          <th>Sizes</th>
          <th>Description</th>
          <th colspan="3">Menu</th>
        </tr>
      </thead>
      <tbody>
        <!-- Lặp qua danh sách sản phẩm và hiển thị từng sản phẩm -->
        <tr v-for="(product, index) in products" :key="index">
          <!-- Hiển thị hình ảnh -->
          <td><img :src="product.imageUrl" alt="Product Image" class="product-img" /></td>
          <!-- Hiển thị thông tin -->
          <td>{{ product.name }}</td>
          <td>{{ formatCurrency(product.price) }}</td>
          <td>{{ product.category }}</td>
          <td>{{ product.brand }}</td>
          <td>{{ product.size.join(', ') }}</td>
          <td>
            <span v-for="(desc, idx) in product.description" :key="idx">
              {{ desc }}<br />
            </span>
          </td>
          <td>
            <!-- Dùng router-link với name và params -->
            <router-link
              class="ui button yellow"
              :to="{ name: 'Edit', params: { id: product._id } }"
            >
              <button>Edit</button>
            </router-link>
          </td>
          <td><button @click.prevent="onDelete(product._id)">Remove</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from "axios";

export default {
  data() {
    return {
      products: [], //list of product
    };
  },
  computed: {
    ...mapGetters(['authToken']), // Lấy token từ Vuex
  },
  async mounted() {
    // Lấy dữ liệu sản phẩm từ API khi component được mount
    try {
      const response = await axios.get("http://localhost:5000/api/products", {
        headers: {
          Authorization: `Bearer ${this.authToken}`, // Sử dụng token từ Vuex
        }
      });
      this.products = response.data;
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  },
  methods: {
    // Format giá sản phẩm
    formatCurrency(value) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(value);
    },
    async onDelete(productId) {
      if (confirm("Are you sure you want to delete this product?")) {
        try {
          // Gửi yêu cầu DELETE tới server với header Authorization
          await axios.delete(`http://localhost:5000/api/products/${productId}`, {
            headers: {
              Authorization: `Bearer ${this.authToken}`, // Sử dụng token từ Vuex
            }
          });

          // Xóa sản phẩm khỏi danh sách `products` (không cần reload toàn bộ trang)
          this.products = this.products.filter(
            (product) => product._id !== productId
          );

          alert("Product deleted successfully!");
        } catch (err) {
          console.error("Error deleting product:", err);
          alert("Failed to delete product. Please try again.");
        }
      }
    },
  },
};
</script>

<style scoped>

table.ui.celled.table {
  width: 100%;
  border-collapse: collapse;
}

table.ui.celled.table th,
table.ui.celled.table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

.product-img {
  max-width: 100px;
  max-height: 100px;
  object-fit: cover;
}
</style>
