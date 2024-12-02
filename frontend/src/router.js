import { createRouter, createWebHistory } from 'vue-router';
import store from './store';  // Nếu bạn sử dụng Vuex để quản lý trạng thái đăng nhập

import AppLogin from '@/components/AppLogin.vue';
import HomePage from './views/HomePage.vue';
import ShopePage from './views/ShopePage.vue';
import AppRegister from './components/AppRegister.vue';
import CartPage from './views/CartPage.vue';
import ProductDetail from './views/ProductDetail.vue';
import CheckOut from './views/CheckOut.vue';
import OrderHistory from './views/OrderHistory.vue';
import ProductManagement from './views/ProductManagement.vue';
import EditProduct from './views/EditProduct.vue';
import AddProduct from './views/AddProduct.vue';
import OrderList from './views/OrderList.vue';
import UserManagement from './views/UserManagement.vue';
import ForgotPassword from './views/ForgotPassword.vue';
import ResetPassword from './views/ResetPassword.vue';

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/login', name: 'Login', component: AppLogin },
  { path: '/shop', name: 'Shop', component: ShopePage },
  { path: '/register', name: 'Register', component: AppRegister },
  { path: '/cart', name: 'Cart', component: CartPage },
  { path: "/product/:id", name: "ProductDetail", component: ProductDetail },
  { path: "/checkout", name:"CheckOut", component: CheckOut },
  { path:"/history", name: "OrderHistory", component: OrderHistory },
  { path: "/management", name: "Management", component: ProductManagement },
  { path: "/edit/:id", name: "Edit", component: EditProduct },
  { path: "/add", name: "Add", component: AddProduct },
  { path: "/orderlist", name: "orderlist", component: OrderList },
  { path: "/usermanagement", name: "UserManagerment", component: UserManagement },
  { path: "/forgot-password", component: ForgotPassword },
  { path: "/reset-password/:token", component: ResetPassword },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active'
});

// Navigation guard
router.beforeEach((to, from, next) => {
  const isLoggedIn = store.getters.isLoggedIn;  // Kiểm tra trạng thái đăng nhập từ Vuex
  const userRole = store.getters.userRole;  // Lấy quyền của người dùng từ Vuex hoặc `localStorage`

  // Nếu chưa đăng nhập và truy cập vào trang yêu cầu phải đăng nhập
  if (to.path === '/management' || to.path === '/usermanagement' || to.path === '/orderlist') {
    if (!isLoggedIn) {
      alert('Bạn cần đăng nhập để truy cập trang này.');
      next('/login');  // Điều hướng về trang login
    } else if (userRole !== 'admin') {
      alert('Bạn không có quyền truy cập trang này.');
      next('/');  // Điều hướng về trang chủ nếu không phải là admin
    } else {
      next();  // Cho phép truy cập nếu đã đăng nhập và là admin
    }
  } else {
    next();  // Cho phép truy cập vào tất cả các trang khác
  }
});

export default router;
