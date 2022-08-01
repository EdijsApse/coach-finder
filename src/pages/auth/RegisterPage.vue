<template>
  <base-container class="mt-header-height page auth-page">
    <base-card class="max-90">
      <h1 class="page-title">Create account</h1>
      <form @submit.prevent="register">
        <div class="form-control">
          <label for="name">First name</label>
          <input type="text" id="name" />
        </div>
        <div class="form-control">
          <label for="surname">Last name</label>
          <input type="text" id="surname" />
        </div>
        <div class="form-control">
          <label for="email">Email address</label>
          <input type="email" id="email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" id="password" />
        </div>
        <div class="form-control">
          <label for="confirm_password">Confirm password</label>
          <input type="password" id="confirm_password" />
        </div>
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
        <sapn class="auth-icon">
          <i class="fa-brands fa-google"></i>
        </sapn>
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
