import { createStore } from 'vuex';

export default createStore({
  state: {
    isLoggedIn: !!localStorage.getItem('authToken'),
    userRole: localStorage.getItem('userRole') || null, // Lấy userRole từ localStorage khi khởi tạo
    userId: localStorage.getItem('userId') || null, // Lấy userId từ localStorage
    authToken: localStorage.getItem('authToken')
  },
  mutations: {
    setLoggedIn(state, payload) {
      state.isLoggedIn = payload;
    },
    setUserRole(state, role) {
      state.userRole = role;
      localStorage.setItem('userRole', role); // Lưu userRole vào localStorage khi cập nhật
    },
    setUserId(state, userId) {
      state.userId = userId;
      localStorage.setItem('userId', userId); // Lưu userId vào localStorage
    },
  },
  actions: {
    login({ commit }, { token, userId, role }) {
      localStorage.setItem('authToken', token);
      localStorage.setItem('userId', userId);
      localStorage.setItem('userRole', role);
      commit('setLoggedIn', true);
      commit('setUserId', userId);
      commit('setUserRole', role);
    },
    logout({ commit }) {
      localStorage.removeItem('authToken'); // Xóa token khỏi localStorage
      localStorage.removeItem('userId'); // Xóa userId khỏi localStorage
      localStorage.removeItem('userRole'); // Xóa userRole khỏi localStorage
      commit('setLoggedIn', false); // Đặt trạng thái là chưa đăng nhập
      commit('setUserRole', null); // Xóa vai trò khi đăng xuất
      commit('setUserId', null); // Xóa userId khi đăng xuất
    },
    setUserRole({ commit }, role) {
      commit('setUserRole', role); // Lưu vai trò vào Vuex
    },
  },
  getters: {
    isLoggedIn: (state) => state.isLoggedIn,
    userRole: (state) => state.userRole, // Lấy vai trò người dùng
    userId: (state) => state.userId, // Lấy userId
    authToken: (state) => state.authToken
  }
  
});
