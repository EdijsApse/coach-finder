<template>
  <base-container class="mt-header-height page auth-page">
    <base-card class="max-90 relative">
      <transition name="fade-in">
        <base-loader v-if="loading"></base-loader>
      </transition>
      <h1 class="page-title">Login</h1>
      <form @submit.prevent="login">
        
        <base-form-control :errors="errorsArray" field="email" id="email" label="Email address">
          <input type="email" id="email" v-model="email" />
        </base-form-control>

        <base-form-control :errors="errorsArray" field="password" id="password" label="Password">
          <input type="password" id="password" v-model="password" />
        </base-form-control>

        <div class="form-actions">
          <base-button type="submit">Login</base-button>
          <router-link :to="{name: 'RegisterPage'}" class="btn btn-alternative">Create account</router-link>
        </div>

      </form>
      <div class="auth-alternative">
        <span></span>
        <p>Login with social media</p>
        <span></span>
      </div>
      <div class="social-auth">
        <span class="auth-icon">
          <i class="fa-brands fa-facebook-f"></i>
        </span>
        <span class="auth-icon">
          <i class="fa-brands fa-google"></i>
        </span>
        <span class="auth-icon">
          <i class="fa-brands fa-linkedin-in"></i>
        </span>
        <span class="auth-icon">
          <i class="fa-brands fa-twitter"></i>
        </span>
      </div>
      <div class="forget-link">
        <p>Forget your password?</p>
        <a href="reset">Click here to reset it</a>
      </div>
    </base-card>
  </base-container>
</template>

<script setup>
  import { ref } from 'vue';
  import { useStore } from 'vuex';
  import axios from '../../axios';
  import { useRouter } from 'vue-router';

  const store = useStore();
  const router = useRouter();

  const loading = ref(false);
  const errorsArray = ref([]);
  const email = ref('');
  const password = ref('');

  function login() {
    const credentials = {
      email: email.value,
      password: password.value
    };

    loading.value = true;
    errorsArray.value = [];

    axios.post('/login', credentials)
    .then((response) => {
      const { success, errors, user, token, message } = response.data;

      if (success === false && errors) {
        errorsArray.value = errors;
      } else if (success === true) {
        store.dispatch('login', {user, token});
        store.dispatch('addSuccessMessage', 'Welcome to CoachFinder website!');
        router.push({name: 'CoachListPage'});
      } else if (message) {
        store.dispatch('addErrorMessage', message);
      }
    })
    .finally(() => {
      loading.value = false;
    })
  }
</script>

<style>
.page-title {
  text-align: center;
}
.auth-page .max-90 {
  max-width: 30rem;
  margin: 0 auto;
}
.auth-page input {
  width: 100%;
}
.auth-page .auth-alternative {
  margin: var(--space-6) 0;
  display: flex;
  align-items: center;
}
.auth-page .auth-alternative p {
  white-space: nowrap;
  margin: 0 var(--space-4);
}
.auth-page .auth-alternative span {
  height: 2px;
  background-color: var(--color-bright-grey);
  width: 100%;
}
.auth-page button, .auth-page .btn-alternative {
  text-align: center;
  min-width: 8rem;
}
.auth-page .form-actions {
  display: flex;
  justify-content: space-between;
}
.auth-page .social-auth {
  display: flex;
  justify-content: center;
  gap: 0 var(--space-6);
}
.auth-page .auth-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 2.5rem;
  border: 1px solid var(--color-cloud-blue);
  background-color: var(--color-cloud-blue);
  cursor: pointer;
  transition: background-color 0.3s;
}
.auth-page .auth-icon i {
  font-size: 1.2rem;
  color: #fff;
  transition: color 0.3s;
}
.auth-page .auth-icon:hover {
  background-color: #fff;
}
.auth-page .auth-icon:hover i {
  color: var(--color-cloud-blue);
}
.auth-page .forget-link {
  margin-left: auto;
  margin-top: var(--space-6);
}
.auth-page .forget-link p {
  color: var(--color-dark-grey);
}
.auth-page .forget-link a {
  display: block;
  color: var(--color-cloud-blue);
  text-decoration: none;
  margin-top: var(--space-2);
}
</style>
