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

const backend = 'https://mevn-deploy-xp07.onrender.com/api/products/filter';

export default {
  components: { ProductCard },
  props: {
    filters: Object,
    sort: String 
  },
  data() {
    return {
      products: [],
      originalProducts: [] 
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
        this.applySort(); 
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
        this.originalProducts = [...this.products]; 
        this.applySort(); 
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    applySort() {
      if (this.sort === 'price-asc') {
        
        this.products = [...this.originalProducts].sort((a, b) => a.price - b.price);
      } else if (this.sort === 'price-desc') {
        
        this.products = [...this.originalProducts].sort((a, b) => b.price - a.price);
      } else {
        
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
  grid-template-columns: repeat(3, 250px); 
  justify-content: center;
}

.no-products {
  font-size: 18px;
  color: gray;
  text-align: center; 
  
  
  position: absolute;
  top: 40%;
  left: 55%;
  transform: translate(-50%, -50%); 
  
  }
</style>
