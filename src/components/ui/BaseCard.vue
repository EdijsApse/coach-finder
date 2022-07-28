<template>
  <div class="base-card">
    <slot></slot>
  </div>
</template>

<style>
  .base-card {
    box-shadow: var(--shadow-medium);
    padding: var(--space-8);
    border-radius: var(--border-radius-medium);
  }
</style>