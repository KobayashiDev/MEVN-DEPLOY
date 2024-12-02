<template>
    <form @submit.prevent="checkout" class="checkout-form">
      <!-- Thông tin khách hàng -->
      <div class="customer-info">
        <h3>Thông tin khách hàng</h3>
        
        <input 
          type="text" 
          v-model="customer.name" 
          placeholder="Họ và tên" 
          required 
        />
        <input 
          type="text" 
          v-model="customer.phone" 
          placeholder="Số điện thoại" 
          required 
        />
        <textarea 
          v-model="customer.address" 
          placeholder="Địa chỉ nhận hàng" 
          required
        ></textarea>
       </div> 
  
      <!-- Giỏ hàng -->
      <div class="cart-info">
        <h3>Giỏ hàng</h3>
        <ul class="cart-list">
            <li v-for="item in cartItems" :key="item._id" class="cart-item">
            <div class="cart-item-wrapper">
                <div class="item-image-container">
                <img :src="item.imageUrl" :alt="item.name" class="item-thumbnail" />
                <span class="item-quantity">{{ item.quantity }}</span>
                </div>
                <div class="item-details">
                <p class="item-name">{{ item.name }}</p>
                <p class="item-price">{{ formatCurrency(item.price) }}</p>
                </div>
            </div>
            </li>
        </ul>
        </div>
  
      <!-- Tổng tiền -->
      <div class="order-summary">
        <h3>Tổng tiền: {{ formatCurrency(totalAmount) }}</h3>
        <button type="submit" class="checkout-button">Thanh toán</button>
      </div>
    </form>
  </template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      cartItems: [], 

      
      customer: {
        name: '',
        phone: '',
        address: '',
        
      }
    };
  },
  methods: {
    async fetchCartItems() {
      const cart = JSON.parse(localStorage.getItem("cart"));
      if (cart) {
        this.cartItems = cart;
      }
    },
    
    async checkout() {
  try {
    const userId = this.$store.getters.userId || null; // Lấy userId từ Vuex

    // Gửi yêu cầu thanh toán
    const response = await axios.post('https://mevn-deploy-xp07.onrender.com/api/orders', {
      userId,
      cartItems: this.cartItems,
      totalAmount: this.totalAmount,
      customer: this.customer
    });

      if (response.data) {
        // Hiển thị thông báo thanh toán thành công
        alert('Thanh toán thành công!');
        
        // Xóa giỏ hàng sau khi thanh toán
        localStorage.removeItem('cart');
        this.cartItems = []; // Xóa dữ liệu giỏ hàng trong giao diện
        this.$router.push("/")
      } else {
        alert('Thanh toán thất bại: ' + response.data.message);
      }
    } catch (error) {
      console.error('Thanh toán lỗi:', error);
      alert('Đã xảy ra lỗi khi thanh toán.');
    }
  },

    formatCurrency(value) {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    }
  },
  computed: {
    totalAmount() {
      return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    }
  },
  mounted() {
    this.fetchCartItems();
  }
};

  
</script>
<style scoped>
.checkout-form {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  max-width: 800px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
}

.customer-info,
.cart-info {
  flex: 1 1 48%;
}

.order-summary {
  flex: 1 1 100%;
  text-align: right;
}

input,
textarea,
select {
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  margin-right: 30px;
}

.discount-section {
  display: flex;
  gap: 10px;
}

.checkout-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.item-image {
    height: 100px;
}

.cart-info {
  padding: 10px;
}

.cart-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.cart-item {
  margin-bottom: 15px;
}

.cart-item-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
}

.item-image-container {
  position: relative;
  width: 50px;
  height: 50px;
}

.item-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}

.item-quantity {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #999;
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}

.item-details {
  flex: 1;
}

.item-name {
  margin: 0;
  font-size: 14px;
  color: #333;
  margin-bottom: 4px;
  line-height: 1.3;
}

.item-price {
  margin: 0;
  font-size: 14px;
  color: #666;
}

</style>

  

  