<template>
  <transition name="pop-in">
    <the-alert v-if="alertMessage" :message="alertMessage" :success="alertIsSuccess"></the-alert>
  </transition>
  
  <div v-if="loading">Loading app</div>
  
  <div v-else>
    <the-header :bright-mode="isLandingPage"></the-header>
    <router-view></router-view>
  </div>

</template>

<script>
import { mapGetters, mapActions } from "vuex";
import TheHeader from "./components/TheHeader";
import TheAlert from "./components/TheAlert";
import axios from './axios';
export default {
  data() {
    return {
      loading: false
    }
  },
  computed: {
    ...mapGetters(['alertIsSuccess', 'alertMessage', 'isAuth', 'user']),
    isLandingPage() {
      return this.$route.name === 'LandingPage'
    }
  },
  components: {
    'the-header': TheHeader,
    'the-alert': TheAlert
  },
  methods: {
    ...mapActions(['logout', 'refreshUser']),
    setupApp() {
      const token = localStorage.getItem('token');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        this.loading = true;
        axios.get('/refresh-user').then(response => {
          const { success, user } = response.data;
          if (success === true) {
            this.refreshUser(user);
          }
        }).catch(() => {
          this.logout();
        }).finally(() => {
          this.runRouterMiddleware();
          this.loading = false;
        })
      }
    },
    runRouterMiddleware() {
      const { requiresGuest } = this.$route.meta;

      if (requiresGuest === true && this.isAuth === true) {
        this.$router.push('/');
      }
    }
  },
  created() {
    this.setupApp();
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600&display=swap");

* {
  box-sizing: border-box;
}

html {
  --font-mon: "Montserrat", sans-serif;

  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-bold: 600;

  --color-purple: #9708cc;
  --color-cloud-blue: #43cbff;
  --color-dark-grey: #0F0E0E;
  --color-bright-grey: #bdbdbd;
  --color-bright: #fff;
  --color-danger: #dc3545;

  --shadow-medium: 0 2px 8px rgba(0, 0, 0, 0.2);

  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;

  --border-radius-medium: 8px;
}

body {
  font-family: var(--font-mon);
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-mon);
}

h1 {
  font-size: 3rem;
  color: var(--color-dark-grey);
}

ul {
  list-style: none; 
}

a {
  text-decoration: none;
  font-family: var(--font-mon);
}

p {
  color: var(--color-dark-grey);
  line-height: 1.3;
}

input, textarea {
  width: 100%;
  font-family: var(--font-mon);
  border-radius: var(--border-radius-medium);
  border: none;
  box-shadow: 0 0 0 1px var(--color-bright-grey);
  border-radius: 50px;
  padding: var(--space-2) var(--space-4);
  font-size: 1.2rem;
  height: 2.5rem;
  transition: all 0.3s;
}

textarea {
  min-height: 10rem;
  border-radius: var(--border-radius-medium);
  resize: none;
}

.mb-6 {
  margin-bottom: var(--space-6);
}

.mb-4 {
  margin-bottom: var(--space-4);
}

.mt-8 {
  margin-top: var(--space-8);
}

.ms-8 {
  margin-left: var(--space-8);
}

input:focus, textarea:focus, .has-error input:focus, .has-error textarea:focus {
  border: none;
  outline: none;
  box-shadow: 0 0 0 2px var(--color-cloud-blue);
}

.has-error input, .has-error textarea {
  box-shadow: 0 0 0 1px var(--color-danger);
}

.relative {
  position: relative;
}

.page-title {
  margin-bottom: var(--space-8)
}

.fade-in-enter-active {
  animation: fade-in 0.3s;
}

.fade-in-leave-active {
  animation: fade-in 0.3s reverse;
}

.pop-in-enter-active {
  animation: pop-in 0.2s;
}

.pop-in-leave-active {
  animation: pop-in 0.1s reverse;
}

@keyframes pop-in {
  from {
    transform: scale(0.5);
    opacity: 0.5
  }
  to {
    transform: scale(1);
    opacity: 1
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

</style>
