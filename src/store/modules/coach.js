export default {
  state() {
    return {
      coaches: []
    }
  },
  mutations: {
    setCoaches(state, coaches) {
      state.coaches = coaches;
    }
  },
  actions: {
    addCoaches({ commit }, coaches) {
      commit('setCoaches', coaches);
    },
    appendCoaches({ commit, state }, coaches) {
      const newCoachesList = [...state.coaches, ...coaches];
      commit('setCoaches', newCoachesList);
    }
  },
  getters: {
    coaches(state) {
      return state.coaches;
    }
  }
}