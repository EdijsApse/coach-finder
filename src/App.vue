<template>
  <the-header :bright-mode="isLandingPage"></the-header>
  <router-view></router-view>
</template>

<script>
import { mapActions } from "vuex";
import axios from "./axios";
import TheHeader from "./components/TheHeader";

export default {
  data() {
    return {
      loading: false
    }
  },
  computed: {
    isLandingPage() {
      return this.$route.name === 'LandingPage'
    }
  },
  components: {
    'the-header': TheHeader
  },
  methods: {
    ...mapActions(['logout', 'refreshUser']),
    setupApp() {
      const token = localStorage.getItem('token');
      if (token) {
        axios.get('/refresh-user').then(response => {
          const { success, user } = response.data;
          if (success === true) {
            this.refreshUser(user);
          }
        }).catch(() => {
          this.logout();
        }).finally(() => {
          this.loading = false;
        })
      }
    }
  },
  mounted() {
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

.page-title {
  margin-bottom: var(--space-8)
}

</style>
