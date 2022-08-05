<template>
  <base-modal mode="small" @click="$emit('close-modal')" class="relative">
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

<script>
import axios from '../axios';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      loading: false,
      errors: [],
      message: ''
    }
  },
  props: ['coachId'],
  emits: ["close-modal"],
  methods: {
    ...mapActions(['addErrorMessage', 'addSuccessMessage']),
    sendMessage() {
      this.loading = true;
      this.errors = [];
      axios.post(`/coaches/${this.coachId}/send-message`, { message: this.message })
      .then((res) => {
        const { success, message, errors } = res.data;
        
        this.errors = errors ?? [];

        if (success === true) {
          this.addSuccessMessage(message);
          this.$emit('close-modal');

        } else if (success === false) {
          this.addErrorMessage(message);  
        }
      })
      .catch(() => {
        this.addErrorMessage('Message not sent! Try again later!')
      })
      .finally(() => {
        this.loading = false;
      })
    }
  }
};
</script>
