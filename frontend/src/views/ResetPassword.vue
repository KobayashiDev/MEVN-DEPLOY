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
            "https://mevn-deploy-xp07.onrender.com/api/auth/reset-password", // Đường dẫn API
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
  /* Container styling */
  .reset-password {
    max-width: 400px;
    margin: 50px auto; /* Center the container */
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    font-family: 'Poppins', sans-serif;
  }
  
  /* Heading styling */
  .reset-password h2 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #333;
  }
  
  /* Form styling */
  .reset-password form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  /* Label styling */
  .reset-password label {
    text-align: left;
    font-weight: 500;
    color: #555;
    display: block;
    margin-bottom: 5px;
  }
  
  /* Input field styling */
  .reset-password input[type="password"] {
    width: 100%;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
    transition: border-color 0.3s ease;
  }
  
  /* Input focus effect */
  .reset-password input[type="password"]:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
  
  /* Button styling */
  .reset-password button {
    padding: 10px;
    background-color: #007bff;
    color: white;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  /* Disabled button styling */
  .reset-password button:disabled {
    background-color: #a5c6ff;
    cursor: not-allowed;
  }
  
  /* Button hover effect */
  .reset-password button:hover:not(:disabled) {
    background-color: #0056b3;
  }
  
  /* Message styling */
  .reset-password p {
    font-size: 14px;
    margin-top: 10px;
  }
  
  /* Success message */
  .success {
    color: green;
  }
  
  /* Error message */
  .error {
    color: red;
  }
  
  /* Responsive Design */
  @media (max-width: 500px) {
    .reset-password {
      padding: 15px;
      margin: 20px auto;
    }
  
    .reset-password h2 {
      font-size: 20px;
    }
  
    .reset-password button {
      font-size: 14px;
    }
  }
  </style>
  
  