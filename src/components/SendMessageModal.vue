<template>
  <base-modal mode="small" @click="emits('close-modal')" class="relative">
    <transition name="fade-in">
      <base-loader v-if="loading"></base-loader>
    </transition>
    <template #header>
      <h2>Send message to coach</h2>
    </template>
    <form @submit.prevent="sendMessage">
      <base-form-control :errors="errors" field="message" id="message" label="Message">
        <textarea v-model="message"></textarea>
      </base-form-control>
      <base-button>Send</base-button>
    </form>
  </base-modal>
</template>

<script setup>
import axios from '../axios';
import { useStore } from 'vuex';
import { ref, defineProps, defineEmits } from 'vue';

const store = useStore();
const props = defineProps(['coachId']);
const emits = defineEmits(['close-modal']);

const loading = ref(false);
const errors = ref([]);
const message = ref('');

function sendMessage() {
  loading.value = true;
  errors.value = [];
  axios.post(`/coaches/${props.coachId}/send-message`, { message: message.value })
  .then((res) => {
    const { success, message: responseMessage, errors: responseErrors } = res.data;
    
    errors.value = responseErrors ?? [];

    if (success === true) {
      store.dispatch('addSuccessMessage', responseMessage);
      emits('close-modal');
    } else if (success === false) {
      store.dispatch('addErrorMessage', responseMessage); 
    }
  })
  .catch(() => {
    store.dispatch('addErrorMessage', 'Message not sent! Try again later!');
  })
  .finally(() => {
    loading.value = false;
  })
}
</script>
