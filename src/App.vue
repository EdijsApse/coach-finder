<template>
  <the-header></the-header>
  <landing-page></landing-page>
</template>

<script>
import TheHeader from "./components/TheHeader";
import LandingPage from "./pages/LandingPage";

export default {
  components: {
    'the-header': TheHeader,
    'landing-page': LandingPage,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600&family=Roboto:wght@300;400;600&display=swap");

* {
  box-sizing: border-box;
}

html {
  --font-mon: "Montserrat", sans-serif;
  --font-rob: "Roboto", sans-serif;

  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-bold: 600;

  --color-purple: #9708cc;
  --color-cloud-blue: #43cbff;
  --color-dark-grey: #2c3333;
  --color-bright: #fff;

  --shadow-medium: 0 2px 8px rgba(0, 0, 0, 0.2);

  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;

  --border-radius-medium: 8px;
}

body {
  font-family: var(--font-rob);
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-mon);
}

ul {
  list-style: none; 
}

a {
  text-decoration: none;
  font-family: var(--font-mon);
}

input {
  font: inherit;
  border-radius: var(--border-radius-medium);
  border: 1px solid var(--color-dark-grey);
  border-radius: 50px;
  padding: var(--space-2) var(--space-4);
  font-size: 1.2rem;
  height: 2.5rem;
  transition: all 0.3s;
}

</style>
