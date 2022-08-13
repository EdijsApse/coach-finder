<template>
  <base-card class="alert">
    <div class="alert-header">
      <h6>{{ alertTitle }}</h6>
      <i class="fa-solid fa-circle-xmark close-icon" @click="close"></i>
    </div>
    <div class="alert-body">
      <p>{{ props.message }}</p>
    </div>
  </base-card>
</template>

<script setup>
import { useStore } from 'vuex';
import { defineProps, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps(['message', 'success'])
const store = useStore();

const alertTitle = computed(() => props.success === true ? 'Action successfull' : 'Error occured')

let interval = null;

function close() {
  clearInterval(interval);
  store.dispatch('clearAlertMessage');
}

onMounted(() => {
  interval = setInterval(() => {
    store.dispatch('clearAlertMessage');
  }, 5000);
})

onUnmounted(() => {
  clearInterval(interval);
})

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