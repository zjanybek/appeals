<template>
	<div :class="['loading-overlay', { fixed: fullPage, absolute: !fullPage }]">
		<span class="sr-only">Loading...</span>
		<div class="dot-container">
			<span class="dot" />
			<span class="dot" />
			<span class="dot" />
			<span class="dot" />
		</div>
	</div>
</template>

<script>
export default {
	name: 'FullLoading',
	props: {
		fullPage: {
			type: Boolean,
			default: false,
		},
	},
}
</script>

<style scoped>
.sr-only {
	display: none;
}

.loading-overlay {
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	top: 0;

	width: 100%;
	height: 100%;

	z-index: 1030;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgba(255, 255, 255, 0.9); /* White with opacity */
}

.dot-container {
	display: inline-flex;
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

.fixed {
	position: fixed;
}

.absolute {
	position: absolute;
}
</style>
