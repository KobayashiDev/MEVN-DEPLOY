<template>
  <br><br><br><br>
  <div class="login-container">
    <h2>Register</h2>
    <form @submit.prevent="handleRegister">
      <input 
        v-model="firstName" 
        placeholder="First Name" 
        required
      />
      <input 
        v-model="lastName" 
        placeholder="Last Name" 
        required
      />
      <input 
        type="email" 
        v-model="email" 
        placeholder="Email Address" 
        required 
      />
      <input 
        type="password" 
        v-model="password" 
        placeholder="Password" 
        required
      />
      <button type="submit">Register</button>
    </form>
    <div class="links">
      <router-link to="/login">
        <a>Already have an account?</a>
      </router-link>
    </div>
  </div>
  <br><br><br>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    };
  },
  methods: {
    async handleRegister() {
      // Kiểm tra thông tin nhập vào (như email hợp lệ, mật khẩu đủ mạnh)
      if (!this.firstName || !this.lastName || !this.email || !this.password) {
        alert("All fields are required.");
        return;
      }

      try {
        const response = await axios.post("https://mevn-deploy-xp07.onrender.com/api/auth/register", {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,  // Gửi mật khẩu đã được nhập, server sẽ mã hóa mật khẩu
        });

        if (response.data.success) {
          alert("Registration successful!");
          this.$router.push("/login"); // Điều hướng đến trang login
        } else {
          alert("Registration failed. Please try again.");
        }
      } catch (error) {
        console.error("Registration error:", error);
        alert("Error registering user.");
      }
    },
  },
};
</script>

    
    <style scoped>
    /* Basic styling for the login form */
    .login-container {
      width: 100%;
      max-width: 400px;
      margin: auto;
      background-color: #fff;
      border-radius: 8px;
      
    }
    
    .login-container h2 {
      margin-bottom: 20px;
      font-size: 24px;
      font-family: 'Montserrat', sans-serif;
    }
    
    .login-container input[type="email"],
    .login-container input[type="password"] 
   {
      width: 100%;
      padding: 12px 15px;
      margin: 8px 0;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
    }

    .login-container input{
        width: 100%;
      padding: 12px 15px;
      margin: 8px 0;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box; 
    }
    
    .login-container button {
      width: 100%;
      padding: 12px 15px;
      margin: 10px 0;
      background-color: #000000;
      border: none;
      color: white;
      font-size: 16px;
      cursor: pointer;
    }
    
    .login-container button:hover {
      background-color: #424242;
    }
    
    .login-container .links {
      margin-top: 15px;
      font-size: 14px;
      text-align: center;
      
    }
    
    .login-container .links a {
      color: #000000;
      text-decoration: none;
    }
    
    .login-container .links a:hover {
      text-decoration: underline;
    }
    </style>
    