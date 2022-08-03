import axios from "axios";
import store from "../store";
import router from "../router";

let headers = {};

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 1000,
  headers: headers
})

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      store.dispatch('logout');
      router.go({ name: 'LoginPage' });
    }
    return error;
  }
);

export default instance;