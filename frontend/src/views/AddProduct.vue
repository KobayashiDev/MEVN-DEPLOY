<template>
  <div>
    <h1>Add New Product</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label for="name">Product Name:</label>
        <input
          type="text"
          v-model="product.name"
          id="name"
          required
        />
      </div>

      <div>
        <label for="price">Price:</label>
        <input
          type="number"
          v-model="product.price"
          id="price"
          required
        />
      </div>

      <div>
        <label for="originalPrice">Original Price:</label>
        <input
          type="number"
          v-model="product.originalPrice"
          id="originalPrice"
        />
      </div>

      <div>
        <label for="imageUrl">Image URL:</label>
        <input
          type="text"
          v-model="product.imageUrl"
          id="imageUrl"
        />
      </div>

      <div>
        <label for="category">Category:</label>
        <input
          type="text"
          v-model="product.category"
          id="category"
          required
        />
      </div>

      <div>
        <label for="brand">Brand:</label>
        <input
          type="text"
          v-model="product.brand"
          id="brand"
          required
        />
      </div>

      <div>
        <label for="size">Size (comma separated):</label>
        <input
          type="text"
          v-model="sizeInput"
          id="size"
        />
      </div>

      <div>
        <label for="description">Description (comma separated):</label>
        <input
          type="text"
          v-model="descriptionInput"
          id="description"
        />
      </div>

      <div>
        <label for="isOnSale">On Sale:</label>
        <input
          type="checkbox"
          v-model="product.isOnSale"
          id="isOnSale"
        />
      </div>

      <button type="submit">Add Product</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      product: {
        name: "",
        price: 0,
        originalPrice: 0,
        imageUrl: "",
        category: "",
        brand: "",
        size: [],
        description: [],
        isOnSale: false,
      },
      sizeInput: "", // Temporary variable to input the size list
      descriptionInput: "", // Temporary variable to input the description list
    };
  },
  methods: {
    async submitForm() {
      try {
        // Process size and description input into arrays
        this.product.size = this.sizeInput.split(",").map((s) => s.trim());
        this.product.description = this.descriptionInput
          .split(",")
          .map((d) => d.trim());

        // Send POST request to the backend API
        const response = await axios.post(
          "https://mevn-deploy-xp07.onrender.com/api/products", // Change URL if backend runs on a different port
          this.product
        );

        // Display success message
        alert(response.data.message || "Product added successfully!");
        this.$router.push('/management')
        // Reset form after successful addition
        this.resetForm();
      } catch (err) {
        // Handle error and display message
        alert(err.response?.data?.message || "Failed to add product.");
        console.error(err);
      }
    },
    resetForm() {
      this.product = {
        name: "",
        price: 0,
        originalPrice: 0,
        imageUrl: "",
        category: "",
        brand: "",
        size: [],
        description: [],
        isOnSale: false,
      };
      this.sizeInput = "";
      this.descriptionInput = "";
    },
  },
};
</script>

<style scoped>
/* Center the entire form on the screen */
div {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  font-family: Arial, sans-serif;
}

/* Form header */
h1 {
  font-size: 28px;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

/* Overall form */
form {
  width: 100%;
  max-width: 500px;
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Input fields */
form div {
  margin-bottom: 15px;
}

/* Label */
label {
  display: block;
  font-size: 14px;
  color: #555;
  margin-bottom: 5px;
}

/* Input and checkbox */
input[type="text"],
input[type="number"],
input[type="checkbox"] {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

/* Checkbox */
input[type="checkbox"] {
  width: auto;
  margin-top: 10px;
}

/* Submit button */
button[type="submit"] {
  width: 100%;
  padding: 10px 15px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button[type="submit"]:hover {
  background-color: #0056b3;
}

/* Hover effect for input fields */
input[type="text"]:hover,
input[type="number"]:hover,
input[type="checkbox"]:hover {
  border-color: #007bff;
  outline: none;
}

input[type="text"]:focus,
input[type="number"]:focus {
  border-color: #007bff;
  box-shadow: 0 0 3px rgba(0, 123, 255, 0.5);
}

/* Responsive */
@media (max-width: 600px) {
  form {
    padding: 15px;
  }

  button[type="submit"] {
    font-size: 14px;
  }
}
</style>
