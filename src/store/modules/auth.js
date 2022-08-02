export default {
  state() {
    return {
      isAuth: false,
      user: null
    }
  },
  mutations: {
    loginUser(state, user) {
      state.user = user;
      state.isAuth = true;
    },
    logoutUser(state) {
      state.user = null;
      state.isAuth = false;
    }
  },
  actions: {
    logout({ commit }) {
      commit('logoutUser');
      localStorage.removeItem('token');
    },
    login({ commit }, { user, token }) {
      commit('loginUser', user);
      localStorage.setItem('token', token);
    },
    refreshUser({ commit }, user) {
      commit('loginUser', user);
    }
  },
  getters: {
    user(state) {
      return state.user
    },
    isAuth(state) {
      return state.isAuth
    }
  }
}