<template>
  <div class="filter-sidebar">
    <!-- Category Filter -->
    <div class="filter-section">
      <h3 class="filter-title">Categories</h3>
      <ul class="filter-list">
        <li v-for="category in categories" :key="category" class="filter-item">
          <label>
            <input
              type="checkbox"
              :value="category"
              v-model="selectedCategorys"
              class="filter-radio"
            />
            {{ category }}
          </label>
        </li>
      </ul>
    </div>

    <!-- Brand Filter -->
    <div class="filter-section">
      <h3 class="filter-title">Brand</h3>
      <ul class="filter-list">
        <li v-for="brand in brands" :key="brand" class="filter-item">
          <label>
            <input
              type="checkbox"
              :value="brand"
              v-model="selectedBrands"
              class="filter-checkbox"
            />
            {{ brand }}
          </label>
        </li>
      </ul>
    </div>

    <!-- Price Filter -->
    <div class="filter-section">
      <h3 class="filter-title">Price</h3>
      <div class="price-range">
        <!-- Giá hiển thị -->
        <div class="price-display">
          <input
            type="text"
            readonly
            :value="'$' + priceRange[0]"
            class="price-input"
          />
          <span>–</span>
          <input
            type="text"
            readonly
            :value="'$' + priceRange[1]"
            class="price-input"
          />
        </div>
        <!-- Thanh trượt giá -->
        <el-slider
          v-model="priceRange"
          range
          :min="minPrice"
          :max="maxPrice"
          :step="1"
          :show-tooltip="false"
          class="price-slider"
        />
      </div>
    </div>

    <!-- Apply Filter Button -->
    <button class="filter-button" @click="applyFilter">FILTER</button>
  </div>
</template>

<script>
import "element-plus/dist/index.css";

export default {
  props: {
    categories: Array,
    brands: Array,
    minPrice: Number,
    maxPrice: Number,
  },
  data() {
    return {
      selectedCategorys: [], // Danh mục được chọn
      selectedBrands: [], // Các thương hiệu được chọn
      priceRange: [this.minPrice, this.maxPrice], // Giá trị mặc định cho thanh trượt
    };
  },
  methods: {
    applyFilter() {
      const filters = {
        category: this.selectedCategorys,
        brand: this.selectedBrands,
        minPrice: this.priceRange[0],
        maxPrice: this.priceRange[1],
      };
      
      this.$emit('filter-applied', filters); // Phát sự kiện filter-applied với các bộ lọc
    }
  }
};
</script>

<style scoped>
/* Kiểu dáng tổng thể */
.filter-sidebar {
  font-family: Arial, sans-serif;
  font-size: 14px;
  background-color: #fff;
  padding: 20px;
  border: 1px solid #ddd;
  width: 200px;
  height: 400px;
  border-radius: 5px;
  margin-top: 35px;
  margin-left: 250px;
  margin-bottom: 100px;
  
  
}

/* Tiêu đề mỗi phần */
.filter-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
}

/* Danh sách bộ lọc */
.filter-list {
  list-style: none;
  padding: 0;
  margin: 0 0 20px 0;
}

.filter-item {
  margin: 5px 0;
}

.filter-radio,
.filter-checkbox {
  margin-right: 10px;
  cursor: pointer;
}

/* Phạm vi giá */
.price-range {
  display: flex;
  flex-direction: column;
}

.price-display {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  gap: 5px;
}

.price-input {
  width: 70px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 3px;
  background-color: #f9f9f9;
}

/* Nút lọc */
.filter-button {
  display: inline-block;
  width: 100%;
  text-align: center;
  padding: 10px 15px;
  font-size: 14px;
  color: #fff;
  background-color: #f0a500;
  border: none;
  cursor: pointer;
  border-radius: 3px;
}

.filter-button:hover {
  background-color: #e08e00;
}
</style>
