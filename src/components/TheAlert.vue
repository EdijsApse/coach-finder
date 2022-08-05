<template>
  <base-card class="alert">
    <div class="alert-header">
      <h6>{{ alertTitle }}</h6>
      <i class="fa-solid fa-circle-xmark close-icon" @click="close"></i>
    </div>
    <div class="alert-body">
      <p>{{ message }}</p>
    </div>
  </base-card>
</template>

<script>
import { mapActions } from 'vuex';

  export default {
    props: ['message', 'success'],
    data() {
      return {
        interval: null
      }
    },
    mounted() {
      this.interval = setInterval(() => {
        this.clearAlertMessage();
      }, 5000);
    },
    unmounted() {
      clearInterval(this.interval);
    },
    computed: {
      alertTitle() {
        return this.success === true ? 'Action successfull' : 'Error occured';
      }
    },
    methods: {
      ...mapActions(['clearAlertMessage']),
      close() {
        clearInterval(this.interval);
        this.clearAlertMessage();
      }
    }
  }
</script>

<style scoped>
  .alert {
    position: fixed;
    top: var(--space-8);
    left: var(--space-8);
    z-index: 101;
    width: 30rem;
    background-color: #FFF;
  }

  .alert-header {
    position: relative;
    margin-bottom: var(--space-4);
  }

  .alert-header h6 {
    font-size: 1.5rem;
  }

  .close-icon {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 1.5rem;
    color: var(--color-cloud-blue);
    cursor: pointer;
    opacity: 0.8;
    transition: all 0.3s;
  }
  .close-icon:hover {
    opacity: 1;
  }
</style>