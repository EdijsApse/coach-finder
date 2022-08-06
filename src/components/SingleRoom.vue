<template>
  <li>
    <div class="sinlge-room">
      <div class="img-thumb">
        <img src="../assets/temp-img.jpg" />
      </div>
      <div class="room-details">
        <h6>Edijs Apse</h6>
        <p>Some single message</p>
        <date datetime="2018-07-07T20:00:00">2018-07-07T20:00:00</date>
      </div>
    </div>
  </li>
</template>

<style scoped>
  li {
    border-radius: var(--border-radius-medium);
  }
  .sinlge-room {
    display: flex;
    padding: var(--space-2);
  }

  .img-thumb {
    width: 3rem;
    height: 3rem;
    min-width: 3rem;
    min-height: 3rem;
    border-radius: 3rem;
    margin-right: var(--space-4);
    overflow: hidden;
  }

  .img-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .room-details {
    width: 100%;
  }

  h6 {
    font-size: 0.8rem;
    font-weight: var(--font-weight-bold)
  }

  p {
    font-size: 0.7rem;
    margin: var(--space-1) 0 0 0;
    color: inherit;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  date {
    font-size: 0.6rem;
  }
</style>