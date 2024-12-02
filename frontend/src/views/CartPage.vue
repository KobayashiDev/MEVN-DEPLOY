<template>
  <div class="cart-container">
    <!-- Bên trái: Giỏ hàng -->
    <div class="cart-items-section">
      <h2>Giỏ hàng của bạn</h2>
      <p>Bạn đang có {{ cartItems.length }} sản phẩm trong giỏ hàng</p>

      <div v-for="item in cartItems" :key="item.id" class="cart-item">
        <!-- Ảnh sản phẩm -->
        <img :src="item.imageUrl" alt="Product Image" class="item-image" />

        <!-- Chi tiết sản phẩm -->
        <div class="item-details">
          <h3>{{ item.name }}</h3>
          <p>Size: {{ item.size }}</p>
          <p>{{ formatPrice(item.price) }}</p>
        </div>

        <!-- Chọn số lượng -->
        <div class="item-quantity">
          <button @click="decreaseQuantity(item)">-</button>
          <span>{{ item.quantity }}</span>
          <button @click="increaseQuantity(item)">+</button>
        </div>
        <button @click="removeItem(item)" class="remove-item">Xóa</button>
      </div>
    </div>

    <!-- Bên phải: Thông tin đơn hàng -->
    <div class="order-summary">
      <h2>Thông tin đơn hàng</h2>
      <p class="total-price">Total amount: <span>{{ formatPrice(totalAmount) }}</span></p>
      
      <router-link to="/checkout">
        <button @click="checkout" class="checkout-button">PAYMENT</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartItems: [], // Giỏ hàng
    };
  },
  computed: {
    // Tính toán tổng số tiền
    totalAmount() {
      return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    },
  },
  methods: {
    // Định dạng giá trị
    formatPrice(value) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(value);
    },
    // Tăng số lượng sản phẩm
    increaseQuantity(item) {
      item.quantity++;
      this.updateCart();
    },
    // Giảm số lượng sản phẩm
    decreaseQuantity(item) {
      if (item.quantity > 1) {
        item.quantity--;
        this.updateCart();
      }
    },
    // Xóa sản phẩm khỏi giỏ hàng
    removeItem(item) {
      this.cartItems = this.cartItems.filter((i) => i.id !== item.id);
      this.updateCart();
    },
    // Cập nhật giỏ hàng vào Local Storage
    updateCart() {
      localStorage.setItem("cart", JSON.stringify(this.cartItems));
    },
    // Lấy giỏ hàng từ Local Storage
    fetchCartItems() {
      const cart = JSON.parse(localStorage.getItem("cart"));
      if (cart) {
        this.cartItems = cart;
      }
    },
    // Thanh toán
    checkout() {
      alert("payment");
    },
  },
  created() {
    // Lấy giỏ hàng khi trang được tạo
    this.fetchCartItems();
  },
};
</script>



  
  <style scoped>
  .cart-container {
    display: flex;
    gap: 40px;
    padding: 20px;
  }
  
  .cart-items-section {
    flex: 2;
    border-right: 1px solid #ddd;
    padding-right: 20px;
  }
  
  .cart-item {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
  }
  
  .item-image {
    width: 80px;
    height: 80px;
    margin-right: 15px;
  }
  
  .item-details {
    flex: 1;
  }
  
  .item-quantity {
    display: flex;
    align-items: center;
    margin-right: 10px;
  }
  
  .item-quantity button {
    padding: 5px 10px;
    border: 1px solid #ddd;
    cursor: pointer;
    background-color: #f5f5f5;
  }
  
  .remove-item {
    color: #f00;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 14px;
    padding: 5px;
  }
  
  .order-note {
    margin-top: 20px;
  }
  
  textarea {
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .order-summary {
    flex: 1;
    padding-left: 20px;
  }
  
  .total-price {
    font-size: 24px;
    color: #333;
  }
  
  .checkout-button {
    display: block;
    width: 100%;
    padding: 15px;
    background-color: #f00;
    color: #fff;
    font-size: 18px;
    border: none;
    cursor: pointer;
    margin-top: 20px;
  }
  
  .shipping-policy {
    background-color: #f1f7ff;
    padding: 10px;
    margin-top: 15px;
    border-radius: 4px;
  }
  </style>
  