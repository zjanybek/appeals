<template>
	<div :class="['loading-spinner', { 'loading-spinner_center': center }]">
		<span :class="['spinner', { spinner_big: variants === 'big' }]">
			<svg viewBox="0 0 50 50">
				<circle
					class="path"
					cx="25"
					cy="25"
					r="20"
					fill="none"
					stroke-width="5"
				></circle>
			</svg>
			<span class="sr-only">Загружается...</span>
		</span>
	</div>
</template>

<script>
export default {
	name: 'LoadingSpinner',
	props: {
		center: {
			type: Boolean,
			default: false,
		},
		variants: {
			type: String,
			default: '',
		},
	},
}
</script>

<style scoped>
.sr-only {
	display: none;
}

.loading-spinner {
	display: block;
}

.loading-spinner_center {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
}

.spinner {
	display: inline-block;
	width: 16px;
	height: 16px;
	animation: rotate 2s linear infinite;
}

.spinner_center {
	display: flex;
	justify-content: center;
	align-items: center;
}

.spinner_big {
	width: 48px;
	height: 48px;
}

.spinner svg {
	fill: currentColor;
	-o-object-fit: contain;
	object-fit: contain;
	width: 100% !important;
	height: 100% !important;
	display: block;
	overflow: visible;
}

.path {
	stroke: var(--primary-color);
	stroke-linecap: round;
	animation: dash 1.5s ease-in-out infinite;
}

@keyframes rotate {
	100% {
		transform: rotate(360deg);
	}
}

@keyframes dash {
	0% {
		stroke-dasharray: 1, 150;
		stroke-dashoffset: 0;
	}
	50% {
		stroke-dasharray: 90, 150;
		stroke-dashoffset: -35;
	}
	100% {
		stroke-dasharray: 90, 150;
		stroke-dashoffset: -124;
	}
}
</style>
