<template>
  <header :class="brightHeader">
    <router-link :to="{name: 'LandingPage'}" class="logo">
      <img v-if="brightMode" class="logo" alt="Coach finder" src="../assets/logo.png" />
      <img v-else class="logo" alt="Coach finder" src="../assets/dark-logo.png"/>
    </router-link>
    <nav>
      <ul class="ms-8">
        <li>
          <router-link :to="{name: 'CoachListPage'}">Coaches</router-link>
        </li>
        <li v-if="isAuth">
          <router-link :to="{name: 'MessagesPage'}">Messages</router-link>
        </li>
      </ul>
      <ul v-if="!isAuth">
        <li>
          <router-link :to="{name: 'LoginPage'}">Login</router-link>
        </li>
        <li>
          <router-link :to="{name: 'RegisterPage'}">Register</router-link>
        </li>
      </ul>
      <ul v-else>
        <li>
          <base-button @click="logoutUser">Logout</base-button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
  import { useStore } from 'vuex';
  import { defineProps, computed } from 'vue';
  
  const store = useStore();
  const props = defineProps(['bright-mode']);

  const isAuth = computed(() => store.getters.isAuth);

  const brightHeader = computed(() => {
    return {
      'bright-header': props.brightMode
    }
  })

  function logoutUser() {
    store.dispatch('logout')
    window.location = '/';
  }
</script>

<style scoped>
header {
  position: fixed;
  display: flex;
  top: 0px;
  left: 0px;
  width: 100%;
  padding: var(--space-4) var(--space-8);
  background-color: var(--color-bright);
  box-shadow: 0px 0px 6px 0px var(--color-dark-grey);
  z-index: 2;
}
.logo {
  display: inline-block;
  width: 8rem;
}
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

li {
  display: inline-block;
  padding: 0 var(--space-4);
}

li a {
  color: var(--color-dark-grey);
  font-size: 1.2rem;
}

li a:after {
  display: block;
  content: "";
  width: 0px;
  height: 2px;
  background-color: var(--color-dark-grey);
  margin: 0 auto;
  margin-top: 5px;
  transition: width 0.3s;
}

li  a:hover:after {
  width: 100%;
}

.bright-header {
  background-color: transparent;
  box-shadow: none;
}

.bright-header li a {
  color: var(--color-bright);
}

.bright-header li a:after {
  background-color: var(--color-bright);
}
</style>
