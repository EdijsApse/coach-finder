<template>
  <div :class="formControlClasses">
    <label :for="id">{{ label }}</label>
    <slot></slot>
    <base-error v-if="errMessage">{{ errMessage }}</base-error>
  </div>
</template>

<script>
  export default {
    props: ['errors', 'field', 'id', 'label'],
    computed: {
      errMessage() {
        const error = this.errors.find(err => err.field === this.field);
        return error ? error.message : null;
      },
      formControlClasses() {
        return {
          'form-control': true,
          'has-error': this.errMessage !== null
        }
      }
    }
  }
</script>

<style scoped>
  .form-control {
    margin-bottom: var(--space-6);
  }

  .form-control label {
    display: block;
    font-family: var(--font-mon);
    font-size: 1.1rem;
    margin-bottom: var(--space-4);
    font-weight: var(--font-weight-light);
  }
</style>