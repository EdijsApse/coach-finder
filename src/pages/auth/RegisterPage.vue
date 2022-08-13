<template>
  <base-container class="mt-header-height page auth-page">
    <base-card class="max-90 relative">
      
      <transition name="fade-in">
        <base-loader v-if="loading"></base-loader>
      </transition>

      <h1 class="page-title">Create account</h1>
      <form @submit.prevent="register">
        
        <base-form-control :errors="errors" field="name" id="name" label="First name">
          <input type="text" id="name" v-model="name" />
        </base-form-control>

        <base-form-control :errors="errors" field="surname" id="surname" label="Last name">
          <input type="text" id="surname" v-model="surname" />
        </base-form-control>

        <base-form-control :errors="errors" field="email" id="email" label="Email address">
          <input type="email" id="email" v-model="email" />
        </base-form-control>

        <base-form-control :errors="errors" field="password" id="password" label="Password">
          <input type="password" id="password" v-model="password" />
        </base-form-control>

        <base-form-control :errors="errors" field="confirm_password" id="confirm_password" label="Confirm password">
          <input type="password" id="confirm_password" v-model="confirm_password" />
        </base-form-control>

        <div class="form-actions">
          <base-button type="submit">Create</base-button>
          <router-link :to="{name: 'LoginPage'}" class="btn btn-alternative">Login</router-link>
        </div>
      </form>
      <div class="auth-alternative">
        <span></span>
        <p>Register with social media</p>
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
    </base-card>
  </base-container>
</template>

<script setup>
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  import axios from '../../axios';
  import { ref } from 'vue';

  const store = useStore();
  const router = useRouter();

  const name = ref('');
  const surname = ref('');
  const password = ref('');
  const email = ref('');
  const confirm_password = ref('');
  const loading = ref(false);
  const errors = ref([]);

  function register() {
    const user = {
      name: name.value,
      surname: surname.value,
      password: password.value,
      email: email.value,
      confirm_password: confirm_password.value
    };

    loading.value = true;
    errors.value = [];

    axios.post('/register', user)
    .then(response => {
      const { success, errors: responseErrors, user, token } = response.data;
      if (success === false) {
        errors.value = responseErrors;
      } else {
        store.dispatch('login', {user, token});
        router.push({name: 'CoachListPage'});
        store.dispatch('addSuccessMessage', 'Welcome to CoachFinder platform. Find your coach or become one!');
      }
    })
    .finally(() => {
      loading.value = false;
    })
  }
</script>
