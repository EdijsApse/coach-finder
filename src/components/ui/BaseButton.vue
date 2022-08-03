<template>
  <button>
    <slot></slot>
  </button>
</template>

<style>
  a.btn {
    display: inline-block;
    line-height: 1.5;
  }
  button , .btn {
    position: relative;
    padding: var(--space-2) var(--space-4);
    font-family: var(--font-mon);
    color: var(--color-bright);
    background-color: var(--color-cloud-blue);
    border-radius: 50px;
    border: none;
    outline: none;
    display: block;
    font-size: 1rem;
    line-height: 1.5;
    height: 2.5rem;
    cursor: pointer;
    overflow: hidden;
  }

  .btn-alternative {
    background-color: var(--color-bright-grey);
    color: var(--color-bright);
  }

  button:after, .btn:after {
    position: absolute;
    content: "";
    z-index: 1;
    background-color: #FFF;
    border-radius: 50px;
  }
  button:hover:after, .btn:hover:after {
    animation: hover-animate 0.3s ease forwards;
  }

@keyframes hover-animate {
  0% {
    width: 0px;
    height: 0px;
    left: 50%;
    top: 50%;
    opacity: 0;
  }
  50% {
    opacity: 0.2;
  }
  100% {
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    opacity: 0;
  }
}

</style>