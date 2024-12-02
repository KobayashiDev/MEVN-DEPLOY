// src/store.js

import { createStore } from 'vuex';

export default createStore({
  state: {
    cartItems: []  // Giỏ hàng sẽ được lưu trữ ở đây
  },
  mutations: {
    addToCart(state, product) {
      // Kiểm tra nếu sản phẩm đã có trong giỏ hàng không
      const existingProduct = state.cartItems.find(item => item.id === product.id && item.selectedSize === product.selectedSize);
      if (existingProduct) {
        // Nếu có thì tăng số lượng
        existingProduct.quantity += product.quantity;
      } else {
        // Nếu chưa có thì thêm sản phẩm mới vào giỏ
        state.cartItems.push(product);
      }
    },
    updateQuantity(state, { product, quantity }) {
      const item = state.cartItems.find(item => item.id === product.id && item.selectedSize === product.selectedSize);
      if (item) {
        item.quantity = quantity;
      }
    },
    removeFromCart(state, product) {
      state.cartItems = state.cartItems.filter(item => item.id !== product.id || item.selectedSize !== product.selectedSize);
    }
  },
  actions: {
    addToCart({ commit }, product) {
      commit('addToCart', product);
    },
    updateQuantity({ commit }, payload) {
      commit('updateQuantity', payload);
    },
    removeFromCart({ commit }, product) {
      commit('removeFromCart', product);
    }
  },
  getters: {
    cartItems: (state) => state.cartItems,
    totalAmount: (state) => state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }
});
