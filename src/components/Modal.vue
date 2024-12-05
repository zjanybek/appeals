<template>
	<Teleport to="body">
		<transition name="fade">
			<div class="modal" v-if="isShow">
				<div class="modal__backdrop" @click="closeModal()" />

				<div class="modal__dialog">
					<div class="modal__header">
						<div v-if="isCloseble" class="modal__close-action">
							<button @click="closeModal" class="modal__close-button">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									aria-hidden="true"
									viewBox="0 0 24 24"
									role="img"
								>
									<path
										vector-effect="non-scaling-stroke"
										stroke="var(--icon-color, #001e00)"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-miterlimit="10"
										stroke-width="1.5"
										d="M4 4l16 16m0-16L4 20"
									></path>
								</svg>
							</button>
						</div>

						<div class="modal__header-content">
							<div v-if="title" class="modal__title">{{ title }}</div>
							<div v-if="subtitle">{{ subtitle }}</div>
						</div>

						<div v-if="$slots.header" class="modal__header-slot">
							<slot name="header" />
						</div>
					</div>

					<div class="modal__body">
						<slot />
					</div>

					<div class="modal__footer">
						<slot name="footer" />
					</div>

					<div v-if="isLoading" class="modal-overlay-loading">
						<span class="sr-only">Loading...</span>
						<div class="dot-container">
							<span class="dot" />
							<span class="dot" />
							<span class="dot" />
							<span class="dot" />
						</div>
					</div>
				</div>
			</div>
		</transition>
	</Teleport>
</template>

<script>
import Teleport from 'vue2-teleport'

export default {
	name: 'Modal',
	components: {
		Teleport,
	},
	props: {
		isShow: {
			type: Boolean,
		},
		isCloseble: {
			type: Boolean,
			default: true,
		},
		isLoading: {
			type: Boolean,
			default: false,
		},
		title: {
			type: [String, Number],
		},
		subtitle: {
			type: [String, Number],
		},
	},
	data() {
		return {}
	},
	methods: {
		closeModal() {
			this.$emit('close', false)
		},
	},
	watch: {
		isShow(newValue) {
			if (newValue) {
				document.documentElement.classList.add('lock')
			} else {
				document.documentElement.classList.remove('lock')
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.modal {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 2000;

	padding: 24px 0 0 0;

	display: flex;
	flex-direction: row;
	align-items: flex-end;
	justify-content: center;

	@media (min-width: 744.98px) and (min-height: 475.98px) {
		padding: 40px;
		align-items: center;
	}

	&__backdrop {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 1050;
		overflow: hidden;
		background-color: rgba(0, 0, 0, 0.6);
	}

	&__dialog {
		position: relative;
		z-index: calc(1050 + 11);

		width: 100vw;
		max-width: 100vw;

		height: 100%;
		max-height: 100%;

		display: flex;
		flex-direction: column;
		flex: 1 1 auto;

		overflow: hidden;

		background-color: #fff;

		border-top-right-radius: 15px;
		border-top-left-radius: 15px;

		@media (min-width: 744.98px) {
			width: 100%;
			max-width: 750px;

			height: auto;

			border-radius: 8px;
		}
	}

	&__close-action {
		margin-bottom: 12px;

		display: flex;
		justify-content: flex-end;
	}

	&__close-button {
		outline: none;
		border: none;

		width: 24px;
		height: 24px;
		color: #181818;
	}

	&__header {
		padding: 24px 32px 0;
	}

	&__header-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		column-gap: 8px;
	}

	&__title {
		font-size: 16px;
		font-weight: 500;
		line-height: 150%; /* 150% */
		color: var(--text-color-base, #333);
	}

	&__body {
		line-height: 1.2;

		padding: 24px 32px 1px;

		flex: 1 1 auto;

		overflow: hidden auto;

		display: flex;
		flex-direction: column;
	}

	&__footer {
		padding: 24px 32px 24px;
		display: flex;
		justify-content: flex-end;
	}
}
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
}

.sr-only {
	display: none;
}

.modal-overlay-loading {
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	top: 0;
	z-index: 1030;

	width: 100%;
	height: 100%;

	display: flex;
	justify-content: center;
	align-items: center;

	background-color: rgba(255, 255, 255, 0.9);
}

.dot-container {
	display: inline-flex;
	flex: 0 0 48px;
	height: 48px;
	width: 48px;
	justify-content: space-between;
	align-items: center;
}

.dot {
	border-radius: 50%;
	flex: 0 0 5px;
	width: 5px;
	height: 5px;
	background-color: #24a322; /* Green color */
	margin: calc(2px * 2);
}

.dot:nth-child(1) {
	animation: preloader 0.7s ease-in-out alternate infinite;
}

.dot:nth-child(2) {
	animation: preloader 0.7s ease-in-out alternate 0.3s infinite;
}

.dot:nth-child(3) {
	animation: preloader 0.7s ease-in-out alternate 0.5s infinite;
}

.dot:nth-child(4) {
	animation: preloader 0.7s ease-in-out alternate 0.8s infinite;
}

@keyframes preloader {
	100% {
		transform: scale(2);
	}
}
</style>
