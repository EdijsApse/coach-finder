<template>
  <div>
    <i :class="iconClasses"></i>
    <span>
      <slot></slot>
    </span>
</div>
</template>

<script>
  export default {
    props: ['icon-classes']
  }
</script>

<style scoped>
  i {
		font-size: 1.1rem;
		margin-right: var(--space-2);
	}
  span {
		font-family: var(--font-mon);
		font-size: 1rem;
	}
</style>