<template>
  <li :class="mssageClasses">
    <p>{{ message.message }}</p>
    <date :datetime="message.created_at">{{ message.created }}</date>
  </li>
</template>

<script>

export default {
 props: ['message'],
 computed: {
  mssageClasses() {
    return {
      'my-message': this.message.isMyMessage === true
    };
  }
 }
}
</script>

<style scoped>
  .my-message {
    margin-left: auto;
  }
  .my-message p {
    background-color: var(--color-bright-grey-opacity);
    color: var(--color-dark-grey);
  }
  .my-message date {
    text-align: right;
  }
  li {
    max-width: 75%;
    margin-bottom: var(--space-4);
    width: fit-content;
  }
  p {
    background-color: var(--color-cloud-blue);
    border-radius: var(--border-radius-large);
    padding: var(--space-4);
    color: #FFF;
    font-size: 0.9rem;
  }
  date {
    color: var(--color-bright-grey);
    display: block;
    margin-top: var(--space-2);
    font-size: 0.7rem;
  }
</style>
