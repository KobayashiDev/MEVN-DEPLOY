
<template>
  <div class="sorting-container">
    <select v-model="selectedSort" @change="applySort" class="sorting-select">
      <option value="default">Default Sorting</option>
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedSort: 'default', // Giá trị mặc định là "Default Sorting"
    };
  },
  methods: {
    applySort() {
      this.$emit('sort-changed', this.selectedSort); // Gửi sự kiện "sort-changed" với giá trị mới
    }
  }
};
</script>
  

<style scoped>
.sorting-container {
  width: 200px;
  margin: 20px 0;
}

.sorting-select {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
}

.sorting-select:focus {
  outline: none;
  border-color: #66afe9;
}
</style>
