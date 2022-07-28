<template>
  <div class="base-container">
    <slot></slot>
  </div>
</template>

<style scoped>
  .base-container {
    max-width: 1200px;
    width: 100%;
    padding: 0 var(--space-8);
    margin: 0 auto;
  }

  .mt-header-height {
    margin-top: 77.01px;
  }

  .page {
    padding: var(--space-8) 0;
  }
</style>