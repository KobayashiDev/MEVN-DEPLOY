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
       
        <tr v-for="(product, index) in products" :key="index">
         
          <td><img :src="product.imageUrl" alt="Product Image" class="product-img" /></td>
          
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
      products: [], 
    };
  },
  computed: {
    ...mapGetters(['authToken']), 
  },
  async mounted() {
   
    try {
      const response = await axios.get("https://mevn-deploy-xp07.onrender.com/api/products", {
        headers: {
          Authorization: `Bearer ${this.authToken}`, 
        }
      });
      this.products = response.data;
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  },
  methods: {
    
    formatCurrency(value) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(value);
    },
    async onDelete(productId) {
      if (confirm("Are you sure you want to delete this product?")) {
        try {
          
          await axios.delete(`https://mevn-deploy-xp07.onrender.com/api/products/${productId}`, {
            headers: {
              Authorization: `Bearer ${this.authToken}`, 
            }
          });

          
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
