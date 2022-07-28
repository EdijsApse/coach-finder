<template>
  <header :class="brightHeader">
    <router-link :to="{name: 'LandingPage'}" class="logo">
      <img v-if="brightMode" class="logo" alt="Coach finder" src="../assets/logo.png" />
      <img v-else class="logo" alt="Coach finder" src="../assets/dark-logo.png"/>
    </router-link>
    <nav>
      <ul>
        <li>
          <router-link :to="{name: 'CoachListPage'}">Coaches</router-link>
        </li>
        <li>
          <a href="#">Requests</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
  export default {
    props: ['bright-mode'],
    computed: {
      logoSrc() {
        return this.brightMode ? '../assets/logo.png' : '../assets/dark-logo.png';
      },
      brightHeader() {
        return {
          'bright-header': this.brightMode
        }
      }
    }
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
  justify-content: center;
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
