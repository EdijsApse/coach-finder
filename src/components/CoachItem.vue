<template>
	<li class="mb-6">
		<base-card class="coach-item">
			<div class="coach-img">
				<img src="../assets/temp-img.jpg" :alt="title" />
			</div>
			<div class="coach-details">
				<h3>{{ name }} | <b>{{ title }}</b></h3>
				<div class="tags">
					<base-tag v-for="(tag, index) in tags" :key="index">{{ tag }}</base-tag>
				</div>
				<base-badge class="mb-4" :icon-classes="'fa-solid fa-location-dot'">{{ location }}</base-badge>
				<base-button @click="showMessageModal = true">Send message</base-button>
			</div>
		</base-card>
		<teleport to="html">
			<send-message-modal v-if="showMessageModal" @close-modal="showMessageModal = false"></send-message-modal>
		</teleport>
	</li>
</template>

<script>
	import SendMessageModal from '../components/SendMessageModal.vue';

	export default {
		props: ['id', 'name', 'title', 'location', 'tags'],
		components: {
			'send-message-modal': SendMessageModal
		},
		data() {
			return {
				showMessageModal: false,
			}
		}
	}
</script>

<style scoped>
	.coach-item {
		display: flex;
	}

	.coach-img img {
		width: 8rem;
		height: 8rem;
		min-width: 8rem;
		min-height: 8rem;
		border-radius: 8rem;
		overflow: hidden;
		margin-right: var(--space-8);
		object-fit: cover;
		object-position: center;
	}

	.coach-details h3 {
		font-size: 1.2rem;
		margin-bottom: var(--space-2);
	}

	.coach-details h3 b {
		font-weight: var(--font-weight-bold);
	}

	.coach-details .coach-actions {
		margin-left: auto;
		display: flex;
	}

	.coach-details .coach-actions .ms-4 {
		margin-left: var(--space-4);
	}
	
	.tags {
		display: flex;
		margin: var(--space-4) -0.25rem;
	}
</style>