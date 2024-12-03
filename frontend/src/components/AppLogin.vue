<template>
  <br><br><br><br>
  <div class="login-container">
    <h2>LOGIN</h2>
    <form @submit.prevent="handleLogin">
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
      <button type="submit">Login</button>
    </form>
    <div class="links">
      <router-link to="/forgot-password">
        <a>Forgot Password?</a>
      </router-link>  | 
      <router-link to="/register">
        <a>Create an Account</a>
      </router-link>
    </div>
  </div>
  <br><br><br>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    ...mapActions({
    login: 'login',
    setUserRole: 'setUserRole',
    setUserId: 'setUserId'
  }),


  async handleLogin() {
  try {
    const response = await axios.post('https://mevn-deploy-xp07.onrender.com/api/auth/login', {
        email: this.email,
        password: this.password
      });

      if (response.data.success) {
        const token = response.data.token;
        const role = response.data.role;
        const userId = response.data.userId;  

        console.log('User role from API:', role);
        console.log('User ID from API:', userId);  

       
        this.login({ token, userId, role });
        this.setUserRole(role);
        this.setUserId(userId);

       
        localStorage.setItem('authToken', token);
        localStorage.setItem('userRole', role);
        localStorage.setItem('userId', userId);

        
        if (role === 'admin') {
          this.$router.push('/management');
        } else {
          this.$router.push('/');
        }
      } else {
        alert('Login failed: ' + response.data.message);
      }
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data.message : error);
      alert('Login failed: ' + (error.response ? error.response.data.message : 'Unknown error'));
    }
  }

  }
};
</script>





  
  <style scoped>

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
  .login-container input[type="password"] {
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
  