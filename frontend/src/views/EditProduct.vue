<template>
  <div>
    <h1>Edit Product</h1>
    <form @submit.prevent="onSubmit">
      <!-- Tên sản phẩm -->
      <div class="ui labeled input fluid">
        <div class="ui label">Name</div>
        <input type="text" v-model="product.name" required />
      </div>
      <br />
      <!-- Giá sản phẩm -->
      <div class="ui labeled input fluid">
        <div class="ui label">Price</div>
        <input type="number" v-model="product.price" required min="0" step="0.01" />
      </div>
      <br />
      <!-- Danh mục -->
      <div class="ui labeled input fluid">
        <div class="ui label">Category</div>
        <input type="text" v-model="product.category" required />
      </div>
      <br />
      <!-- Thương hiệu -->
      <div class="ui labeled input fluid">
        <div class="ui label">Brand</div>
        <input type="text" v-model="product.brand" required />
      </div>
      <br />
      <!-- Kích cỡ -->
      <div class="ui labeled input fluid">
        <div class="ui label">Sizes (comma-separated)</div>
        <input type="text" v-model="sizeInput" placeholder="e.g., S, M, L" required />
      </div>
      <br />
      <!-- Mô tả -->
      <div class="ui labeled input fluid">
        <div class="ui label">Description</div>
        <textarea v-model="descriptionInput" placeholder="Enter description, separated by new lines" rows="5" required></textarea>
      </div>
      <br />
      <!-- Hình ảnh -->
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
      product: {}, // Sản phẩm cần chỉnh sửa
      sizeInput: "", // Chuỗi kích cỡ (để chỉnh sửa)
      descriptionInput: "", // Chuỗi mô tả (để chỉnh sửa)
    };
  },
  computed: {
    ...mapGetters(['authToken']), // Lấy token từ Vuex
  },
  async mounted() {
    try {
      // Lấy thông tin sản phẩm từ API dựa trên ID
      const productId = this.$route.params.id;
      const response = await axios.get(`http://localhost:5000/api/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${this.authToken}`, // Sử dụng token từ Vuex
        }
      });
      this.product = response.data;
      // Gán dữ liệu ban đầu cho các trường input
      this.sizeInput = this.product.size.join(", ");
      this.descriptionInput = this.product.description.join("\n");
    } catch (err) {
      console.error("Error fetching product:", err);
    }
  },
  methods: {
    async onSubmit() {
      try {
        // Chuẩn bị dữ liệu để gửi lên server
        const updatedProduct = {
          ...this.product,
          size: this.sizeInput.split(",").map((s) => s.trim()),
          description: this.descriptionInput.split("\n").map((d) => d.trim()),
        };
        // Gửi yêu cầu cập nhật sản phẩm
        await axios.put(`http://localhost:5000/api/products/${this.product._id}`, updatedProduct, {
          headers: {
            Authorization: `Bearer ${this.authToken}`, // Sử dụng token từ Vuex
          }
        });
        alert("Product updated successfully!");
        // Chuyển hướng về trang danh sách sản phẩm
        this.$router.push("/management");
      } catch (err) {
        console.error("Error updating product:", err);
      }
    },
  },
};
</script>

<style scoped>
/* Style cho form, nếu cần thiết */
</style>

  