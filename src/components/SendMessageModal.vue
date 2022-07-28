<template>
  <base-modal mode="small" @click="$emit('close-modal')">
    <template #header>
      <h2>Send message to coach</h2>
    </template>
    <form>
      <div class="form-control">
        <label for="email">Your email address</label>
        <input type="email" id="email" />
      </div>

      <div class="form-control">
        <label for="message">Message</label>
        <textarea id="message"></textarea>
      </div>
      <button>Send</button>
    </form>
  </base-modal>
</template>

<script>
export default {
  emits: ["close-modal"],
};
</script>
