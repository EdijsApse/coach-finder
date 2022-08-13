<template>
	<li class="mb-6">
		<base-card class="coach-item">
			<div class="coach-img">
				<img src="../assets/temp-img.jpg" :alt="props.coach.jobtitle" />
			</div>
			<div class="coach-details">
				<router-link :to="{ name: 'CoachViewPage', params: { coachId: props.coach.id }}" class="coach-link">
					<h3>{{ props.coach.user.name }} | <b>{{ props.coach.jobtitle }}</b></h3>
				</router-link>
				<div class="tags">
					<base-tag v-for="(field, index) in props.coach.fields" :key="index">{{ field }}</base-tag>
				</div>
				<div class="badges">
						<base-badge class="mb-4 single-badge" :icon-classes="'fa-solid fa-location-dot'">Provides coaching in: <b>{{ props.coach.location }}</b></base-badge>
						<base-badge class="mb-4 single-badge" :icon-classes="'fa-solid fa-coins'">Asking price: <b>{{ props.coach.price }} EUR / Hour</b></base-badge>
						<base-badge class="single-badge" :icon-classes="'fa-solid fa-calendar-day'">Member Since: <b>{{ props.coach.member_since }}</b></base-badge>
					</div>
				<base-button @click="sendMessageAttempt">Send message</base-button>
			</div>
		</base-card>
		<teleport to="html">
			<transition name="fade-in">
				<send-message-modal v-if="showMessageModal" @close-modal="showMessageModal = false" :coachId="props.coach.id"></send-message-modal>
			</transition>
		</teleport>
	</li>
</template>

<script setup>
	import SendMessageModal from '../components/SendMessageModal.vue';
	import { useStore } from 'vuex';
	import { useRouter } from 'vue-router';
	import { computed, defineProps, ref } from 'vue';

	const store = useStore();
	const router = useRouter();

	const props = defineProps(['coach']);

	const isAuth = computed(() => store.getters.isAuth);

	const showMessageModal = ref(false);

	function sendMessageAttempt () {
		if (isAuth.value) {
			showMessageModal.value = true
		} else {
			router.push({name: 'LoginPage'});
		}
	}
</script>

<style scoped>
	.coach-link {
		color: var(--color-dark-gray);
		transition: color 0.3s;
	}

	.coach-link:hover {
		color: var(--color-cloud-blue);
	}

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
		gap: 0 var(--space-2);
		margin: var(--space-4) 0;
	}

	.badges {
		display: flex;
		gap: 0 var(--space-8);
	}
</style>