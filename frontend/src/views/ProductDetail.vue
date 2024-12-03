<template>
  <div class="product-detail">
    <!-- Hình ảnh sản phẩm -->
    <div class="image-section">
      <div class="badge" v-if="product.isOnSale">SALE</div>
      <img :src="product.imageUrl" alt="Product Image" class="product-image" />
    </div>

    <!-- Thông tin sản phẩm -->
    <div class="info-section">
      <h1 class="product-title">{{ product.name }}</h1>
      <div class="price-section">
        <p v-if="product.isOnSale" class="sale-price">${{ product.price }}</p>
        <p v-else class="normal-price">${{ product.price }}</p>
        <p class="original-price" v-if="product.isOnSale">
          <del>${{ product.originalPrice }}</del>
        </p>
      </div>

      <!-- Chọn size -->
      <div class="size-options">
        <button
          v-for="size in product.size"
          :key="size"
          @click="selectSize(size)"
          :class="{ active: selectedSize === size }"
        >
          Size {{ size }}
        </button>
      </div>

      <!-- Điều khiển số lượng và thêm vào giỏ hàng -->
      <div class="actions">
        <div class="quantity-controls">
          <div class="quantity-container">
            <button class="quantity-btn" @click="changeQuantity(-1)" :disabled="quantity === 1">-</button>
            <span class="quantity-display">{{ quantity }}</span>
            <button class="quantity-btn" @click="changeQuantity(1)">+</button>
          </div>
        </div>
        <button class="add-to-cart" @click="addToCart">ADD TO CART</button>
      </div>

      <!-- Mô tả sản phẩm -->
      <div class="product-description">
        <h3>Description:</h3>
        <ul>
          <li v-for="desc in product.description" :key="desc">{{ desc }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'; 

export default {
  data() {
    return {
      product: {}, 
      selectedSize: null, 
      quantity: 1, 
    };
  },
  methods: {
    async fetchProduct() {
      const productId = this.$route.params.id; 
      try {
        const response = await axios.get(`https://mevn-deploy-xp07.onrender.com/api/products/${productId}`);
        this.product = response.data;
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    },
    selectSize(size) {
      this.selectedSize = size; 
    },
    changeQuantity(amount) {
      const newQuantity = this.quantity + amount;
      if (newQuantity >= 1) {
        this.quantity = newQuantity;
      }
    },
    addToCart() {
      if (!this.selectedSize) {
        alert("Please select a size before adding to cart!");
        return;
      }

      
      const cartItem = {
        id: this.product.id, 
        name: this.product.name, 
        price: this.product.isOnSale ? this.product.price : this.product.originalPrice, 
        size: this.selectedSize, 
        quantity: this.quantity, 
        imageUrl: this.product.imageUrl, 
      };

      
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

     
      const existingItemIndex = cart.findIndex(
        (item) => item.id === cartItem.id && item.size === cartItem.size
      );

      if (existingItemIndex !== -1) {
        
        cart[existingItemIndex].quantity += cartItem.quantity;
      } else {
        
        cart.push(cartItem);
      }

     
      localStorage.setItem("cart", JSON.stringify(cart));

      alert("Product added to cart successfully!");
    },
  },
  created() {
    this.fetchProduct(); 
  },
};
</script>





<style scoped>
.product-detail{
  display: flex;
  gap: 20px;
  padding: 20px;
}

.image-section {
  flex: 1;
  position: relative;
  margin-top: 20px;
  margin-left: 200px;
}

.badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: red;
  color: white;
  padding: 5px 10px;
  font-weight: bold;
  border-radius: 5px;
}

.product-image {
  max-width: 100%;
  border: 1px solid #ddd;
  border-radius: 10px;
}

.info-section {
  margin-right: 600px;
}

.product-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.price-section {
  margin: 10px 0;
}

.original-price {
  text-decoration: line-through;
  margin-right: 10px;
  color: gray;
}

.discounted-price {
  color: red;
  font-size: 20px;
  font-weight: bold;
}

.size-options button {
  padding: 10px 15px;
  margin: 5px;
  border: 1px solid #ccc;
  background-color: white;
  cursor: pointer;
  transition: 0.3s;
}

.size-options button.active {
  border-color: black;
  font-weight: bold;
}

.actions button {
  margin: 10px 5px;
  padding: 10px 20px;
  
  
  border: none;
  cursor: pointer;
  transition: 0.3s;
}



.product-description {
  margin-top: 20px;
}

.product-description ul {
  list-style-type: disc;
  padding-left: 20px;
}
.add-to-cart{
  border-radius: 30px;
  width: 200px;
  height: 50px;
  background-color: #000;
  color: white;
  

}
.add-to-cart:hover {
    background-color: rgb(49, 49, 49); 
    
    
    
}
.actions{
  display: flex;
}


.quantity-container {
  display: inline-flex;
  align-items: center;
  border: 1px solid #000; 
  border-radius: 30px; 
  padding: 2px 5px; 
  background-color: white;
  margin-top: 12px;
}


.quantity-btn {
  background-color: transparent;
  border: none;
  font-size: 12px; 
  font-weight: bold;
  width: 20px; 
  height: 20px; 
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #000;
}





.quantity-display {
  margin: 0 5px; 
  font-size: 12px; 
  font-weight: bold;
}

.price-section{
  display: flex;
  gap:15px
}

</style>
