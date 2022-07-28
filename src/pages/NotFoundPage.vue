<template>
  <base-container class="mt-header-height not-found-container">
    <div>
      <h1>404 - Not Found</h1>
      <p>Page you are looking for, cannot be found!</p>
      <router-link :to="{name: 'LandingPage'}" class="btn">Back to start</router-link>
    </div>
  </base-container>
</template>

<style scoped>
  .not-found-container {
    padding: var(--space-8);
    text-align: center;
    display: flex;
    min-height: 80vh;
    align-items: center;
    justify-content: center;
  }
  h1 {
    margin-top: var(--space-8);
    font-size: 6rem;
  }
  p {
    font-size: 2rem;
    margin-top: var(--space-6);
  }
  .btn {
    margin: 0 auto;
    margin-top: var(--space-8);
  }
</style>