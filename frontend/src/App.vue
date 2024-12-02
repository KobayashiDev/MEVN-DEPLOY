<template>
  <div id="app">
    <!-- Thành phần Topbar -->
    <AppTopbar></AppTopbar>
    
    <!-- Thành phần Header -->
    <UserHeader v-if="role === 'user'" />
    <AdminHeader v-else-if="role === 'admin'" />
    <UserHeader v-else />
    
    <router-view></router-view>
   
    <AppFooter></AppFooter>
    
    
    

    
    
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import AppFooter from './components/AppFooter.vue';
import UserHeader from './components/UserHeader.vue';
import AppTopbar from './components/AppTopbar.vue';
import AdminHeader from './components/AdminHeader.vue';

export default {
  components: {
    AppFooter,
    AppTopbar,
    UserHeader,
    AdminHeader,
  },
  computed: {
    ...mapGetters(['userRole']), // Lấy role từ Vuex
    role() {
      return this.userRole; // Đặt alias cho `userRole` để dùng trong template
    },
  },
  created() {
    // Khi component được tạo, lấy role từ localStorage nếu có
    const savedRole = localStorage.getItem('Role');
    if (savedRole && savedRole !== this.userRole) {
      this.setRole(savedRole); // Cập nhật lại role trong Vuex
    }
  },
  methods: {
    ...mapActions(['setUserRole']), // Hành động Vuex để cập nhật role
  },
};
</script>
