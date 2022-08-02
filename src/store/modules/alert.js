export default {
  state() {
    return {
      message: '',
      isSuccess: true
    }
  },
  mutations: {
    setAlert(state, { message, success }) {
      state.message = message;
      state.isSuccess = success;
    }
  },
  actions: {
    addSuccessMessage({commit}, message) {
      commit('setAlert', {message: message, success: true});
    },
    addErrorMessage({commit}, message) {
      commit('setAlert', {message: message, success: false});
    },
    clearAlertMessage({commit}) {
      commit('setAlert', {message: '', success: false});
    }
  },
  getters: {
    alertMessage(state) {
      return state.message;
    },
    alertIsSuccess(state) {
      return state.isSuccess;
    }
  }
}