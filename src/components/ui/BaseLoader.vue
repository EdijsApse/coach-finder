<template>
  <div class="loader-wrapper">
    <div class="loader"></div>
  </div>
</template>

<style scoped>
  .loader-wrapper {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    top: 0;
    border-radius: inherit;
    background-color: rgba(255, 255, 255, 0.5);
    left: 0;
    z-index: 1;
  }
  .loader {
    display: block;
    width: 5rem;
    height: 5rem;
    border: 10px solid rgba(0, 0, 0, 0.1);
    border-top: 10px solid var(--color-cloud-blue);
    border-radius: 5rem;
    animation: rotate 1s ease-in-out infinite;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
