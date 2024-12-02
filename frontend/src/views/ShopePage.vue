<!-- Home.vue -->
<template>
  <div class="home-container">
    <!-- Sorting Dropdown Component (đặt trên cùng) -->
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
      selectedSort: 'default', // Giá trị mặc định của lựa chọn sort
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
      this.selectedSort = sort; // Cập nhật giá trị sắp xếp khi người dùng thay đổi lựa chọn
    }
  }
};
</script>

<style scoped>
/* Container chính chứa tất cả các thành phần */
.home-container {
  display: flex;
  flex-direction: column; /* Đặt các thành phần theo chiều dọc */
  gap: 20px; /* Khoảng cách giữa các thành phần */
}

/* Định dạng cho phần nội dung chính (sidebar + product list) */
.main-content {
  display: flex;
  gap: 20px; /* Khoảng cách giữa Sidebar và ProductList */
  margin-left: 130px;
}

/* Định nghĩa kích thước cho Sidebar */
.main-content > FilterSidebar {
  flex: 1; /* Sidebar chiếm 1 phần */
  max-width: 250px; /* Đặt chiều rộng tối đa */
}

/* Định nghĩa kích thước cho ProductList */
.main-content > ProductList {
  flex: 3; /* ProductList chiếm nhiều không gian hơn */
  width: 100%; /* Để ProductList chiếm phần còn lại */
}
.sort{
  margin-left: 675px ;
  margin-top: 30px;
}
</style>

