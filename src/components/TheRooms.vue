<template>
  <base-card class="p-2">
    <h3>Recent chats</h3>
    <ul>
      <single-room class="room active"></single-room>
      <single-room class="room"></single-room>
      <single-room class="room"></single-room>
    </ul>
  </base-card>
</template>

<script>
import SingleRoom from './SingleRoom';

export default {
  components: {
    'single-room': SingleRoom
  }
}
</script>

<style scoped>
  .p-2 {
    padding: var(--space-2)
  }

  h3 {
    text-align: center;
    font-size: 1.3rem;
    margin-bottom: var(--space-4);
    margin-top: var(--space-2);
  }

  h3:after {
    content: '';
    display: block;
    width: 5rem;
    height: 3px;
    background-color: var(--color-cloud-blue);
    border-radius: 3px;
    margin: 0 auto;
    margin-top: var(--space-4);
  }
  
  .room {
    color: var(--color-dark-grey);
    background-color: #FFF;
    cursor: pointer;
    transition: all 0.3s;
  }

  .room:hover, .room.active {
    color: var(--color-bright) !important;
    background-color: var(--color-cloud-blue);
  }

  .room::after {
    content: "";
    display: block;
    height: 2px;
    background-color: var(--color-bright-grey);
    opacity: 0.2;
    border-radius: 2px;
    width: 100%;
    margin: var(--space-2) 0;
  }
  .room:last-of-type::after {
    display: none;
  }
</style>