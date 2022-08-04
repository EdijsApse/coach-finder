<template>
  <base-container class="landing-container">
    <section class="landing-intro">
      <h1>Find your coach with <b>CoachFinder</b></h1>
      <p>We have more than <span class="number">100</span> coaches<br/>registered in <span class="number">25</span> different fields!</p>
      <form>
        <input type="text" v-model.trim="q" />
        <base-button @click="findCoach">Find coach</base-button>
      </form>
    </section>
  </base-container>
</template>

<script>
  export default {
    data() {
      return {
        q: ''
      }
    },
    methods: {
      findCoach() {
        if (this.q) {
          this.$router.push({ name: 'CoachQueryListPage', params: { q: this.q } })
        } else {
          this.$router.push({ name: 'CoachListPage' })
        }
      }
    }
  }
</script>

<style scoped>
  .landing-container {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 100% !important;
    min-height: 100vh;
    background: var(--color-purple);
    background: linear-gradient(to bottom right, var(--color-purple), var(--color-cloud-blue));
    background-size: 200% 200%;
    animation: animate-background 20s ease infinite;
  }

  @keyframes animate-background {
    0%{background-position:0% 0%}
    25%{background-position:50% 50%}
    50%{background-position:100% 100%}
    75%{background-position:50% 50%}
    100%{background-position:0% 0%}
  }

  .landing-intro h1 {
    font-size: 5rem;
    color: #FFF;
    margin-bottom: var(--space-8);
    font-weight: var(--font-weight-bold);
    line-height: 1.1;
  }
  .landing-intro h1 b {
    display: block;
  }

  .landing-intro p {
    font-size: 2rem;
    color: #FFF;
    margin-bottom: var(--space-8);
    font-weight: var(--font-weight-light);
    line-height: 1.3;
  }

  .landing-intro p span {
    font-weight: var(--font-weight-bold);
  }

  .landing-intro input {
    margin-top: var(--space-2);
    margin-bottom: var(--space-4);
    max-width: 20rem;
  }

  .landing-intro button {
    display: inline-block;
    margin-left: var(--space-4);
  }

  .landing-intro input, .landing-intro input:focus {
    border: none;
    box-shadow: none;
    outline: none;
  }

</style>
