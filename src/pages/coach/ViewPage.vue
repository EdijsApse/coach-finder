<template>
  <base-container class="mt-header-height page">
    <base-card class="coach-page-header">
			<div class="image">
				<img src="../../assets/temp-img.jpg" :alt="title" />
			</div>
			<div class="details">
				<h1>{{ name }} | <b>{{ title }}</b></h1>
				<div class="tags">
					<base-tag v-for="(tag, index) in tags" :key="index">{{ tag }}</base-tag>
				</div>
			</div>
		</base-card>
    <base-card class="info-container">
      <h2>About me</h2>
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim rerum deleniti distinctio deserunt repudiandae odit veritatis inventore earum obcaecati, magnam eius iure velit tenetur, commodi aspernatur accusamus facilis id? Esse.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim rerum deleniti distinctio deserunt repudiandae odit veritatis inventore earum obcaecati, magnam eius iure velit tenetur, commodi aspernatur accusamus facilis id? Esse.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim rerum deleniti distinctio deserunt repudiandae odit veritatis inventore earum obcaecati, magnam eius iure velit tenetur, commodi aspernatur accusamus facilis id? Esse.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim rerum deleniti distinctio deserunt repudiandae odit veritatis inventore earum obcaecati, magnam eius iure velit tenetur, commodi aspernatur accusamus facilis id? Esse.</p>
    </base-card>
    <base-button class="mt-8" @click="showMessageModal = true">Send message</base-button>
    <teleport to="html">
			<send-message-modal v-if="showMessageModal" @close-modal="showMessageModal = false"></send-message-modal>
		</teleport>
  </base-container>
</template>

<script>
  import SendMessageModal from '../../components/SendMessageModal.vue';

  export default {
    components: {
      SendMessageModal
    },
    data() {
      return {
        showMessageModal: false,
        id: 'c1',
        name: 'Gatis',
        title: 'WEB Developer mentor',
        location: 'Latvia',
        tags: ['Full Stack Developer', 'Front End developer', 'Back End Developer']
      }
    }
  }
</script>

<style scoped>
  .coach-page-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: var(--space-8);
  }

  .coach-page-header .image {
    width: 15rem;
    height: 15rem;
    border-radius: 15rem;
    max-width: 15rem;
    max-height: 15rem;
    overflow: hidden;
  }

  .coach-page-header .image img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .details {
    margin-top: var(--space-8);
  }

  .details h1 {
    font-size: 2rem;
  }
  .details h1 b {
    font-weight: var(--font-weight-bold);
  }

  .details .tags {
    display: flex;
    justify-content: center;
    margin: var(--space-8) 0;
    margin-bottom: 0;
    gap: 0 var(--space-2);
  }

  h2 {
    font-size: 1.6rem;
    font-weight: var(--font-weight-light);
    margin-bottom: var(--space-6);
  }

  h2:after {
    display: block;
    content: "";
    background-color: var(--color-cloud-blue);
    height: 3px;
    border-radius: 3px;
    width: 5rem;
    margin-top: var(--space-2);
  }

  .info-container p {
    line-height: 1.3;
    font-size: 1.1rem;
  }
</style>