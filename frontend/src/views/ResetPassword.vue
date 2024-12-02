<template>
    <div class="reset-password">
      <h2>Reset Password</h2>
      <form @submit.prevent="resetPassword">
        <div>
          <label for="password">New Password:</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Enter new password"
            required
          />
        </div>
        <div>
          <label for="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            v-model="confirmPassword"
            placeholder="Confirm new password"
            required
          />
        </div>
        <button type="submit" :disabled="loading">
          {{ loading ? "Resetting..." : "Reset Password" }}
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
        password: "",
        confirmPassword: "",
        token: this.$route.params.token, // Lấy token từ URL
        message: "",
        success: false,
        loading: false,
      };
    },
    methods: {
      async resetPassword() {
        if (this.password !== this.confirmPassword) {
          this.message = "Passwords do not match!";
          this.success = false;
          return;
        }
        this.loading = true;
        this.message = "";
        try {
          const response = await axios.post(
            "http://localhost:5000/api/auth/reset-password", // Đường dẫn API
            {
              token: this.token,
              newPassword: this.password,
            }
          );
          this.message = response.data.message;
          this.success = true;
        } catch (error) {
          this.message =
            error.response?.data?.message || "Failed to reset password.";
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
  