<template>
	<button
		:type="type"
		:disabled="disabled"
		@click="handleClick"
		:class="['button', additionalClass]"
	>
		{{ text }}
	</button>
</template>

<script>
export default {
	props: {
		type: {
			type: String,
		},
		disabled: {
			type: Boolean,
		},
		text: {
			type: String,
			required: true,
		},
		additionalClass: {
			type: String,
			default: '',
		},
	},
	methods: {
		handleClick(event) {
			this.$emit('click', event)
		},
	},
}
</script>

<style lang="scss" scoped>
.button {
	outline: none;
	border: none;

	padding: 12px 16px;
	display: inline-flex;
	justify-content: center;
	align-items: center;

	text-align: center;
	font-family: 'Roboto Flex';
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: 142.857%; /* 142.857% */
	color: var(--text-color-white);

	background-color: var(--primary-color);
	border-radius: 4px;
	box-shadow: 0px 4px 4px 0px rgba(106, 174, 94, 0.25);

	transition: scale 0.2s ease 0s;

	&:active {
		scale: 0.98;
	}

	&:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}
}
</style>
