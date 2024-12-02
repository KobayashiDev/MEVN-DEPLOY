<!-- ProductList.vue -->
<template>
  <div class="product-list">
    <div v-if="filteredProducts.length === 0" class="no-products">
      No product found
    </div>
    <ProductCard v-for="product in filteredProducts" :key="product._id" :product="product" />
  </div>
</template>

<script>
import axios from 'axios';
import ProductCard from './ProductCard.vue';

const backend = 'http://localhost:5000/api/products/filter';

export default {
  components: { ProductCard },
  props: {
    filters: Object,
    sort: String // Nhận giá trị sắp xếp từ Home.vue
  },
  data() {
    return {
      products: [],
      originalProducts: [] // Lưu trữ danh sách sản phẩm gốc
    };
  },
  watch: {
    filters: {
      handler() {
        this.fetchProducts();
      },
      deep: true
    },
    sort: {
      handler() {
        this.applySort(); // Áp dụng sắp xếp mỗi khi `sort` thay đổi
      }
    }
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get(backend, { params: this.filters });
        this.products = response.data;
        this.originalProducts = [...this.products]; // Lưu trữ sản phẩm gốc
        this.applySort(); // Áp dụng sắp xếp sau khi lấy dữ liệu
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    applySort() {
      if (this.sort === 'price-asc') {
        // Sắp xếp theo giá tăng dần
        this.products = [...this.originalProducts].sort((a, b) => a.price - b.price);
      } else if (this.sort === 'price-desc') {
        // Sắp xếp theo giá giảm dần
        this.products = [...this.originalProducts].sort((a, b) => b.price - a.price);
      } else {
        // Khi là Default Sorting, quay lại sản phẩm gốc (không sắp xếp)
        this.products = [...this.originalProducts];
      }
    }
  },
  computed: {
    filteredProducts() {
      return this.products;
    }
  }
};
</script>



<style scoped>

.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  
  padding: 20px ;
  grid-template-columns: repeat(3, 250px); /* 3 cột cố định */
  justify-content: center;
}

.no-products {
  font-size: 18px;
  color: gray;
  text-align: center; /* Căn giữa chữ theo chiều ngang */
  
  /* Để căn giữa theo chiều dọc */
  position: absolute;
  top: 40%;
  left: 55%;
  transform: translate(-50%, -50%); /* Dịch chuyển từ vị trí trung tâm của phần tử */
  
  }
</style>
