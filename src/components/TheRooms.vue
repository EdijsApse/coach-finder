<template>
  <base-card class="p-2 relative min-h-65">
    <h3>Recent chats</h3>
    <transition name="fade-in">
      <base-loader v-if="props.loading"></base-loader>
    </transition>
    <ul v-if="props.rooms.length">
      <single-room class="room" v-for="room in props.rooms" :key="room.id" v-bind="room" @click="emits('set-active-room', room)" :class="{'active': (props.activeRoom && room.id === props.activeRoom.id)}"></single-room>
    </ul>
    <p class="no-rooms" v-else-if="!loading && rooms.length === 0">No rooms found</p>
  </base-card>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import SingleRoom from './SingleRoom';

const props = defineProps(['loading', 'rooms', 'activeRoom']);
const emits = defineEmits(['set-active-room']);

</script>

<style scoped>
  .no-rooms {
    text-align: center;
  }
  .min-h-65 {
    min-height: 65vh;
  }
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