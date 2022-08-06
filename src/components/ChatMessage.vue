<template>
  <li :class="mssageClasses">
    <p>{{ message.message }}</p>
    <date datetime="2018-07-07T20:00:00">2018-07-07T20:00:00</date>
  </li>
</template>

<script>

export default {
 props: ['message'],
 computed: {
  mssageClasses() {
    return {
      'sender': this.message.isMyMessage
    };
  }
 }
}
</script>

<style scoped>
  .sender {
    margin-left: auto;
  }
  .sender p {
    background-color: var(--color-bright-grey-opacity);
    color: var(--color-dark-grey);
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
    text-align: right;
    margin-top: var(--space-2);
    font-size: 0.7rem;
  }
</style>
