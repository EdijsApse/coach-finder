<template>
  <div>
    <ul>
      <li v-for="page of pages" :key="page" :class="{active: page == currentPage}" @click="$emit('setPage', page)">{{ page }}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: ['pages', 'currentPage'],
    emits: ['setPage']
  }
</script>

<style scoped>
  div {
    width: 100%;
  }
  ul {
    display: flex;
    gap: 0 var(--space-2);
    justify-content: center;
    list-style-type: none;
  }
  li {
    min-width: 3rem;
    border-radius: var(--border-radius-medium);
    padding: var(--space-4) var(--space-4);
    border: 1px solid var(--color-bright-grey);
    font-size: 1;
    text-align: center;
    color: var(--color-cloud-blue);
    transition: all 0.3s;
    cursor: pointer;
  }
  li.active, li:hover {
    background-color: var(--color-cloud-blue);
    color: #FFF;
    border-color: var(--color-cloud-blue);
  }
</style>