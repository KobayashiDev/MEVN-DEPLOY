<!-- Home.vue -->
<template>
  <div class="home-container">
    <!-- Sorting Dropdown Component (placed at the top) -->
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
      selectedSort: 'default', // Default value for the sort option
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
      this.selectedSort = sort; // Update the sort value when the user changes the selection
    }
  }
};
</script>

<style scoped>
/* Main container holding all components */
.home-container {
  display: flex;
  flex-direction: column; /* Arrange components vertically */
  gap: 20px; /* Space between components */
}

/* Styling for the main content (sidebar + product list) */
.main-content {
  display: flex;
  gap: 20px; /* Space between Sidebar and ProductList */
  margin-left: 130px;
}

/* Define size for Sidebar */
.main-content > FilterSidebar {
  flex: 1; /* Sidebar takes 1 part */
  max-width: 250px; /* Set a maximum width */
}

/* Define size for ProductList */
.main-content > ProductList {
  flex: 3; /* ProductList takes more space */
  width: 100%; /* Let ProductList take the remaining space */
}
.sort{
  margin-left: 675px ;
  margin-top: 30px;
}
</style>

