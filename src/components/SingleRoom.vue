<template>
  <li>
    <div class="sinlge-room">
      <div class="img-thumb">
        <img src="../assets/temp-img.jpg" />
      </div>
      <div class="room-details">
        <h6>{{ props.receiver.name}}</h6>
        <date :datetime="props.created_at">{{ props.created }}</date>
      </div>
    </div>
  </li>
</template>

<script setup>
  import { defineProps } from 'vue';
  const props = defineProps(['receiver', 'created_at', 'created']);
</script>

<style scoped>
  li {
    border-radius: var(--border-radius-medium);
  }
  .sinlge-room {
    display: flex;
    padding: var(--space-2);
    align-items: center;
  }

  .img-thumb {
    width: 3rem;
    height: 3rem;
    min-width: 3rem;
    min-height: 3rem;
    border-radius: 3rem;
    margin-right: var(--space-4);
    overflow: hidden;
  }

  .img-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .room-details {
    width: 100%;
  }

  h6 {
    font-size: 0.8rem;
    font-weight: var(--font-weight-bold)
  }

  p {
    font-size: 0.7rem;
    margin: var(--space-1) 0 0 0;
    color: inherit;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  date {
    font-size: 0.6rem;
  }
</style>