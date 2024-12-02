<template>
    <div class="forgot-password">
      <h2>Forgot Password</h2>
      <form @submit.prevent="submitEmail">
        <div>
          <label for="email">Email:</label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <button type="submit" :disabled="loading">
          {{ loading ? "Sending..." : "Send Reset Link" }}
        </button>
      </form>
      <p v-if="message" :class="{ success: success, error: !success }">
        {{ message }}
      </p>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        email: "",
        message: "",
        success: false,
        loading: false,
      };
    },
    methods: {
      async submitEmail() {
        this.loading = true;
        this.message = "";
        try {
          const response = await axios.post(
            "https://mevn-deploy-xp07.onrender.com/api/auth/forgot-password", // Đường dẫn API
            { email: this.email }
          );
          this.message = response.data.message;
          this.success = true;
        } catch (error) {
          this.message =
            error.response?.data?.message || "Failed to send reset link.";
          this.success = false;
        } finally {
          this.loading = false;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .success {
    color: green;
  }
  .error {
    color: red;
  }
  </style>
  