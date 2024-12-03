<template>
  <div>
    <h1>Edit Product</h1>
    <form @submit.prevent="onSubmit">
      <!-- Product Name -->
      <div class="ui labeled input fluid">
        <div class="ui label">Name</div>
        <input type="text" v-model="product.name" required />
      </div>
      <br />
      <!-- Product Price -->
      <div class="ui labeled input fluid">
        <div class="ui label">Price</div>
        <input type="number" v-model="product.price" required min="0" step="0.01" />
      </div>
      <br />
      <!-- Category -->
      <div class="ui labeled input fluid">
        <div class="ui label">Category</div>
        <input type="text" v-model="product.category" required />
      </div>
      <br />
      <!-- Brand -->
      <div class="ui labeled input fluid">
        <div class="ui label">Brand</div>
        <input type="text" v-model="product.brand" required />
      </div>
      <br />
      <!-- Sizes -->
      <div class="ui labeled input fluid">
        <div class="ui label">Sizes (comma-separated)</div>
        <input type="text" v-model="sizeInput" placeholder="e.g., S, M, L" required />
      </div>
      <br />
      <!-- Description -->
      <div class="ui labeled input fluid">
        <div class="ui label">Description</div>
        <textarea v-model="descriptionInput" placeholder="Enter description, separated by new lines" rows="5" required></textarea>
      </div>
      <br />
      <!-- Image URL -->
      <div class="ui labeled input fluid">
        <div class="ui label">Image URL</div>
        <input v-model="product.imageUrl" required />
      </div>
      <br />
      <button class="ui primary button" type="submit">Update Product</button>
    </form>
  </div>
</template>


<script>
import { mapGetters } from 'vuex';
import axios from "axios";

export default {
  data() {
    return {
      product: {}, // Product to be edited
      sizeInput: "", // Size string (for editing)
      descriptionInput: "", // Description string (for editing)
    };
  },
  computed: {
    ...mapGetters(['authToken']), // Get token from Vuex
  },
  async mounted() {
    try {
      // Fetch product data from API based on ID
      const productId = this.$route.params.id;
      const response = await axios.get(`https://mevn-deploy-xp07.onrender.com/api/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${this.authToken}`, // Use token from Vuex
        }
      });
      this.product = response.data;
      // Assign initial data to input fields
      this.sizeInput = this.product.size.join(", ");
      this.descriptionInput = this.product.description.join("\n");
    } catch (err) {
      console.error("Error fetching product:", err);
    }
  },
  methods: {
    async onSubmit() {
      try {
        // Prepare the data to send to the server
        const updatedProduct = {
          ...this.product,
          size: this.sizeInput.split(",").map((s) => s.trim()),
          description: this.descriptionInput.split("\n").map((d) => d.trim()),
        };
        // Send the update request
        await axios.put(`https://mevn-deploy-xp07.onrender.com/api/products/${this.product._id}`, updatedProduct, {
          headers: {
            Authorization: `Bearer ${this.authToken}`, // Use token from Vuex
          }
        });
        alert("Product updated successfully!");
        // Redirect to the product management page
        this.$router.push("/management");
      } catch (err) {
        console.error("Error updating product:", err);
      }
    },
  },
};
</script>




  