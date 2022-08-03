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

<script>
  import axios from '../../axios';
  import { mapActions } from 'vuex';

  export default {
    data() {
      return {
        name: '',
        surname: '',
        password: '',
        email: '',
        confirm_password: '',
        loading: false,
        errors: []
      }
    },
    methods: {
      ...mapActions(['login', 'addSuccessMessage']),
      register() {
        const user = {
          name: this.name,
          surname: this.surname,
          password: this.password,
          email: this.email,
          confirm_password: this.confirm_password
        };

        this.loading = true;
        this.errors = [];
        axios.post('/register', user).then(response => {
          const { success, errors, user, token } = response.data;
          if (success === false) {
            this.errors = errors;
          } else {
            this.login({user, token});
            this.$router.push({name: 'CoachListPage'});
            this.addSuccessMessage('Welcome to CoachFinder platform. Find your coach or become one!')
          }
        }).catch(err => {
          console.log(err);
        }).finally(() => {
          this.loading = false
        })
      }
    }
  }
</script>
