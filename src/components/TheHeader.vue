<template>
  <header>
    <a href="/">
      <img class="logo" alt="Coach finder" src="../assets/logo.png" />
    </a>
    <nav>
      <ul>
        <li>
          <a href="#">Coaches</a>
        </li>
        <li>
          <a href="#">Requests</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
header {
  position: fixed;
  display: flex;
  top: 0px;
  left: 0px;
  width: 100%;
  padding: var(--space-4) var(--space-8);
}
.logo {
  display: inline-block;
  width: 8rem;
}
nav {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

li {
  display: inline-block;
  padding: 0 var(--space-4);
}

li a {
  color: var(--color-bright);
  font-size: 1.2rem;
}

li a:after {
  display: block;
  content: "";
  width: 0px;
  height: 2px;
  background-color: var(--color-bright);
  margin: 0 auto;
  margin-top: 5px;
  transition: width 0.3s;
}

li  a:hover:after {
  width: 100%;
}
</style>
