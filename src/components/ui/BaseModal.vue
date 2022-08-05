<template>
  <dialog open class="modal">
		<base-card class="modal-body" :class="mode" @click.stop>
			<div class="modal-header">
				<slot name="header"></slot>
			</div>
			<div class="modal-content">
				<slot></slot>
			</div>
		</base-card>
	</dialog>
</template>

<script>
	export default {
		props: {
			mode: {
				type: String,
				default: 'large',
				required: false
			}
		},

	}
</script>

<style>
  dialog {
    border: none;
  }
	.modal {
		background-color: rgba(0,0,0, 0.5);
		position: fixed;
		display: flex;
		justify-content: center;
		align-items: flex-start;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 100;
		padding: var(--space-8);
		overflow-y: hidden;
	}

	.modal-header {
		border-bottom: 2px solid var(--color-bright-grey);
		margin-bottom: var(--space-8);
	}

	.modal-header h2 {
		font-size: 2rem;
		padding-bottom: var(--space-6);
	}

	.modal-body {
		margin-top: 77.01px;
		width: 100%;
		background-color: #FFF;
	}

	.modal-body.large {
		max-width: 70rem;
	}

	.modal-body.small {
		max-width: 50rem;
	}

	.modal-body.small input, .modal-body.small textarea {
		width: 100%;
	}

	.modal-body button {
		min-width: 7rem;
	}
</style>