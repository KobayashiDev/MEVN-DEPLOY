<template>
  
  <div class="product-card">
    
    
    <div class="image-container">
      <div v-if="product.isOnSale" class="sale-badge">SALE</div>
      <img :src="product.imageUrl" alt="Product Image" class="product-image" />
      <router-link :to="{ name: 'ProductDetail', params: { id: product._id } }">
        <button class="add-to-cart-button">QUICK VIEW</button>
      </router-link>
      
    </div>


    <span class="category">{{ product.category }}</span>
    <h3 class="product-name">{{ product.name }}</h3>
    
    <div class="price-section">
      <p v-if="product.isOnSale" class="sale-price">${{ product.price }}</p>
      <p v-else class="normal-price">${{ product.price }}</p>
      <p class="original-price" v-if="product.isOnSale"><del>${{ product.originalPrice }}</del></p>
    </div>
  </div>
</template> 

<script>


export default {
  props: {
    product: Object
  }
}
</script>

<style scoped>
.image-container {
  position: relative;
}

.add-to-cart-button {
  position: absolute;
  bottom: 30px; /* Đặt nút cách đáy hình ảnh */
  left: 50%;
  transform: translateX(-50%) translateY(20px); /* Đặt nút ra ngoài và ẩn đi */
  padding: 10px 20px;
  background-color: rgba(0, 0, 0, 0.5); /* Nền mờ */
  color: white;
  border: none;
  cursor: pointer;
  opacity: 0; /* Ẩn nút ban đầu */
  transition: opacity 0.2s ease, transform 0.3s ease; /* Hiệu ứng mờ dần và di chuyển */
}

.image-container:hover .add-to-cart-button {
  opacity: 1; /* Hiển thị nút khi hover vào container */
  transform: translateX(-50%) translateY(0); /* Di chuyển nút lên vị trí ban đầu */
}

.add-to-cart-button:hover {
  background-color: rgba(0, 0, 0, 0.8); /* Thay đổi màu khi hover */
}
.product-card {
  background-color: #fff;
  padding: 15px;
  text-align: center;
  position: relative;
  transition: transform 0.3s;
  margin: auto;
}

.product-card:hover {
  transform: translateY(-4px);
}

.sale-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: #f39c12;
  color: #fff;
  padding: 5px 10px;
  font-size: 12px;
  border-radius: 4px;
}

.product-image {
  width: 100%;
  height: auto;
  
  margin-bottom: 10px;
}

.category {
  font-size: 12px;
  color: #888;
  display: block;
  margin-bottom: 5px;
  text-transform: uppercase;
}

.product-name {
  font-size: 14px;
  color: #333;
  margin: 0 0 5px;
}

.price-section {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.sale-price {
  color: #e74c3c;
  font-size: 16px;
  font-weight: bold;
}

.normal-price {
  color: #333;
  font-size: 16px;
  font-weight: bold;
}

.original-price {
  color: #888;
  font-size: 12px;
}
</style>