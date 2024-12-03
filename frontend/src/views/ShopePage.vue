
<template>
  <div class="home-container">
   
     <div class="sort">
        <SortDropdown @sort-changed="handleSortChanged" />
     </div>
    

    <div class="main-content">
      <!-- Sidebar -->
      <FilterSidebar
        :categories="categories"
        :brands="brands"
        :min-price="minPrice"
        :max-price="maxPrice"
        @filter-applied="handleFilterApplied"
      />

      <!-- Product List -->
      <ProductList :filters="filters" :sort="selectedSort" />
    </div>
  </div>
</template>

<script>
import FilterSidebar from '@/components/FilterSidebar.vue';
import ProductList from '@/components/ProductList.vue';
import SortDropdown from '@/components/SortDropdown.vue';

export default {
  components: { FilterSidebar, ProductList, SortDropdown },
  data() {
    return {
      categories: ["Men", "Women", "Kid"],
      brands: ["Calvin Klein", "Diesel", "Polo", "Tommy Hilfiger"],
      minPrice: 0,
      maxPrice: 1000,
      selectedSort: 'default', 
      filters: {
        category: [],
        brand: [],
        minPrice: 0,
        maxPrice: 1000
      }
    };
  },
  methods: {
    handleFilterApplied(filters) {
      this.filters = filters;
    },
    handleSortChanged(sort) {
      this.selectedSort = sort; 
    }
  }
};
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column; 
  gap: 20px; 
}


.main-content {
  display: flex;
  gap: 20px; 
  margin-left: 130px;
}


.main-content > FilterSidebar {
  flex: 1; 
  max-width: 250px; 
}


.main-content > ProductList {
  flex: 3; 
  width: 100%; 
}
.sort{
  margin-left: 675px ;
  margin-top: 30px;
}
</style>

