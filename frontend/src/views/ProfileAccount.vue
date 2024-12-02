<template>
    <div class="user-card">
      <h3>User Profile</h3>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>First Name:</strong> {{ user.firstName }}</p>
      <p><strong>Last Name:</strong> {{ user.lastName }}</p>
      <a  @click.prevent="changePassword">Change Password</a>
      <button @click="deleteAccount">Delete Account</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { mapGetters } from 'vuex';
  export default {
    data() {
      return {
        user: {}, // Lưu thông tin user
      };
    },
    computed: {
      ...mapGetters(["authToken"])
    },
    methods: {
      async fetchUserInfo() {
        try {
          
          const response = await axios.get('https://mevn-deploy-xp07.onrender.com/api/auth/user-info', {
            headers: {
              Authorization: `Bearer ${this.authToken}`,
            },
          });
          this.user = response.data.user; // Cập nhật thông tin user
        } catch (err) {
          console.error("Error fetching user info:", err.response?.data?.message || err.message);
          alert("Failed to load user information. Please login again.");
        }
      },
      changePassword() {
        this.$router.push('/change');
      },
      deleteAccount() {
        if (confirm("Are you sure you want to delete your account?")) {
          alert("Account deleted!");
          // Thực hiện logic xóa tài khoản tại đây
        }
      },
    },
    created() {
      this.fetchUserInfo(); // Gọi API khi component được tạo
    },
  };
  </script>
  
  <style scoped>
  .user-card {
    width: 300px;
    margin: 50px auto;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    background-color: #f8f9fa;
    text-align: center;
  }
  .user-card h3 {
    margin-bottom: 10px;
    font-weight: bold;
  }
  .user-card a {
    display: block;
    margin: 10px 0;
    text-decoration: none;
    color: #007bff;
  }
  .user-card a:hover {
    text-decoration: underline;
  }
  .user-card button {
    border: none;
    color: white;
    background-color: #dc3545;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
  }
  .user-card button:hover {
    background-color: #c82333;
  }
  </style>
  