

<template>
    <footer class="footer">
      <div class="footer-container">
        <!-- Cột thông tin liên hệ -->
        <div class="footer-column">
          <h3>Contact information</h3>
          <p>Email: duongdtgch220254@fpt.edu.vn</p>
          <p>Điện thoại: (+84) 0852847743</p>
          <p>Địa chỉ: 123 Đường ABC, TP.HCM</p>
        </div>
  
        <!-- Cột điều hướng -->
        <div class="footer-column">
          <h3>Customer Support</h3>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/faq">FQA</a></li>
            <li><a href="/terms">Terms of Use</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
          </ul>
        </div>
  
        <!-- Cột liên kết mạng xã hội -->
        <div class="footer-column">
    <h3>Follow Us</h3>
    <ul class="social-links">
      <li>
        <a href="https://www.facebook.com/profile.php?id=100026058398977" target="_blank" rel="noopener noreferrer">
          <i class="fab fa-facebook-f"></i>
        </a>
      </li>
      <li>
        <a href="https://www.instagram.com/jerryy_dev/profilecard/?igsh=MTVvZ3Z3azdnbDQyMw==" target="_blank" rel="noopener noreferrer">
          <i class="fab fa-instagram"></i>
        </a>
      </li>
      <li>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <i class="fab fa-twitter"></i>
        </a>
      </li>
    </ul>
  </div>
  
        <!-- Cột đăng ký nhận tin -->
        <div class="footer-column">
          <h3>Newsletter</h3>
          <form @submit.prevent="subscribe">
            <input type="email" v-model="email" placeholder="email@gmail.com" required />
            <button type="submit">SUBSCRIBE</button>
          </form>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  import '@fortawesome/fontawesome-free/css/all.css';

  export default {
    data() {
      return {
        email: ''
      };
    },
    methods: {
      subscribe() {
        // Xử lý đăng ký nhận tin bằng email
        alert(`Đã đăng ký nhận tin bằng email: ${this.email}`);
        this.email = ''; // Xóa trường email sau khi gửi
      }
    }
  };
  </script>
  
  <style scoped>
  .footer {
    background-color: #000000;
    color: #fff;
    padding: 20px 0;
    font-family: Arial, sans-serif;
  }
  
  .footer-container {
    max-width: 1200px;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  
  .footer-column {
    width: 100%;
    max-width: 250px;
    margin-bottom: 20px;
  }
  
  .footer-column h3 {
    margin-bottom: 10px;
    font-size: 18px;
    color: #ff5555;
  }
  
  .footer-column p,
  .footer-column li,
  .footer-column input,
  .footer-column button {
    font-size: 14px;
    line-height: 1.6;
    color: #ccc;
  }
  
  .footer-column ul {
    list-style-type: none;
    padding: 0;
  }
  
  .footer-column ul li {
    margin-bottom: 8px;
  }
  
  .footer-column ul li a {
    color: #ccc;
    text-decoration: none;
    transition: color 0.3s;
  }
  
  .footer-column ul li a:hover {
    color: #ff5555;
  }
  
  .footer-column input[type="email"] {
    width: 100%;
    padding: 8px;
    margin-top: 10px;
    border-radius: 4px;
    border: none;
  }
  
  .footer-column button {
    margin-top: 10px;
    padding: 8px 16px;
    background-color: #ff5555;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .footer-column button:hover {
    background-color: #ff3333;
  }
  
  .social-links {
    display: flex;
    gap: 10px;
  }
  
  
  .social-links a {
    color: #ccc;
    font-size: 20px;
    transition: color 0.3s;
    
  }
  
  .social-links a:hover {
    color: #ff5555;
  }

  .social-links li {

    margin-right: 10px;
  }

 
  
  /* Responsive footer */
  @media (max-width: 768px) {
    .footer-container {
      flex-direction: column;
      align-items: center;
    }
    .footer-column {
      width: 100%;
      text-align: center;
      max-width: none;
    }
  }
  </style>
  