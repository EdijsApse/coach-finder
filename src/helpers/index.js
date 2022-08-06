import axios from '../axios';
import store from '../store';

async function refreshUserFromToken() {
  const token = localStorage.getItem('token');
  const user = store.getters.user;

  if (!token && user === null) {
    return
  }

  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  await axios.get('/refresh-user').then(response => {
    const { success, user } = response.data;
    if (success === true) {
      store.dispatch('refreshUser', user)
    } else {
      store.dispatch('logout')
    }
  }).catch(() => {
    store.dispatch('logout')
  })
} 

export default {
  refreshUserFromToken: refreshUserFromToken
};