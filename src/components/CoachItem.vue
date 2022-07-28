<template>
	<li class="mb-6">
		<base-card class="coach-item">
			<div class="coach-img">
				<img src="../assets/temp-img.jpg" :alt="fullname" />
			</div>
			<div class="coach-details">
				<h3>{{ fullname }}</h3>
				<p>{{ excerpt }}</p>
				<div class="coach-actions">
					<base-button @click="showMessageModal = true">Send message</base-button>
					<base-button class="ms-4">View profile</base-button>
				</div>
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
		props: ['id', 'fullname', 'contact', 'excerpt'],
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

<style>
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
		font-size: 1.5rem;
		margin-bottom: var(--space-2);
	}

	.coach-details p {
		font-size: 1.1rem;
		font-weight: var(--font-weight-light);
		margin-bottom: var(--space-2);
	}

	.coach-details .coach-actions {
		margin-left: auto;
		display: flex;
	}

	.coach-details .coach-actions .ms-4 {
		margin-left: var(--space-4);
	}

	.mb-6 {
		margin-bottom: var(--space-6);
	}
</style>