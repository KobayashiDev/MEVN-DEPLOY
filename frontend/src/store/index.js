import { createStore } from 'vuex';

export default createStore({
  state: {
    isLoggedIn: !!localStorage.getItem('authToken'),
    userRole: localStorage.getItem('userRole') || null,
    userId: localStorage.getItem('userId') || null,
    authToken: localStorage.getItem('authToken')
  },
  mutations: {
    setLoggedIn(state, payload) {
      state.isLoggedIn = payload;
    },
    setUserRole(state, role) {
      state.userRole = role;
      localStorage.setItem('userRole', role);
    },
    setUserId(state, userId) {
      state.userId = userId;
      localStorage.setItem('userId', userId);
    },
    setAuthToken(state, token) {
      state.authToken = token;
      if (token) {
        localStorage.setItem('authToken', token);
      } else {
        localStorage.removeItem('authToken');
      }
    }
  },
  actions: {
    login({ commit }, { token, userId, role }) {
      localStorage.setItem('authToken', token);
      localStorage.setItem('userId', userId);
      localStorage.setItem('userRole', role);
      commit('setLoggedIn', true);
      commit('setUserId', userId);
      commit('setUserRole', role);
      commit('setAuthToken', token)
    },
    logout({ commit }) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('userRole');
      commit('setLoggedIn', false);
      commit('setUserRole', null);
      commit('setUserId', null);
      commit('setAuthToken', null);
    },
    setUserRole({ commit }, role) {
      commit('setUserRole', role);
    },
  },
  getters: {
    isLoggedIn: (state) => state.isLoggedIn,
    userRole: (state) => state.userRole,
    userId: (state) => state.userId,
    authToken: (state) => state.authToken
  }
});
