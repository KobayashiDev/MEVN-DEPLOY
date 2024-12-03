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
            "https://mevn-deploy-xp07.onrender.com/api/auth/forgot-password", // API
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
  /* General styling for the container */
  .forgot-password {
    max-width: 400px;
    margin: 50px auto; /* Center the container */
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    font-family: 'Poppins', sans-serif;
  }
  
  /* Header styling */
  .forgot-password h2 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #333;
  }
  
  /* Form element styling */
  .forgot-password form {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 15px;
  }
  
  /* Label styling */
  .forgot-password label {
    text-align: left;
    font-weight: 500;
    margin-bottom: 5px;
    color: #555;
  }
  
  /* Input field styling */
  .forgot-password input[type="email"] {
    width: 100%;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
    transition: border-color 0.3s ease;
  }
  
  /* Input focus state */
  .forgot-password input[type="email"]:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
  
  /* Submit button styling */
  .forgot-password button {
    padding: 10px;
    background-color: #007bff;
    color: white;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  /* Disabled button state */
  .forgot-password button:disabled {
    background-color: #a5c6ff;
    cursor: not-allowed;
  }
  
  /* Button hover effect */
  .forgot-password button:hover:not(:disabled) {
    background-color: #0056b3;
  }
  
  /* Message styling */
  .forgot-password p {
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
  </style>
  
  