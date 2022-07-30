<template>
  <span>
    <slot></slot>
  </span>
</template>

<style scoped>
  span {
		padding: var(--space-2) var(--space-4);
		color: var(--color-bright);
		font-size: 0.8rem;
		border-radius: 50px;
		background-color: var(--color-purple);
		font-family: var(--font-mon);
	}
</style>