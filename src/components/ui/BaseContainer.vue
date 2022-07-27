<template>
  <div class="base-container">
    <slot></slot>
  </div>
</template>

<style scoped>
  .base-container {
    max-width: 1600px;
    width: 100%;
    padding: 0 var(--space-8);
    margin: 0 auto;
  }
</style>