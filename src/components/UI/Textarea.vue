<template>
	<div class="input-body">
		<div
			:class="{ 'input-wrapper_active': isFocused || !!value }"
			class="input-wrapper"
		>
			<label
				:class="{ 'input-label_active': isFocused || !!value }"
				class="input-label"
			>
				{{ label }}
			</label>
			<div class="input-field">
				<div v-if="$slots.icon" class="input-icon">
					<slot name="icon"></slot>
				</div>
				<textarea
					:cols="cols"
					:rows="rows"
					:value="value"
					:style="{ height: height }"
					@input="$emit('input', $event.target.value)"
					@focus="onFocus"
					@blur="onBlur"
					class="input-element"
				></textarea>
				<slot name="action-icon"></slot>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		value: {
			type: String,
			default: '',
		},
		placeholder: {
			type: String,
			default: '',
		},
		label: {
			type: String,
		},
		cols: {
			type: [String, Number],
			default: '',
		},
		rows: {
			type: [String, Number],
			default: '',
		},
		height: {
			type: String,
		},
	},
	data() {
		return {
			isFocused: false,
		}
	},
	methods: {
		handleInput(event) {
			this.$emit('input', event.target.value)
		},
		handleChange(event) {
			this.$emit('change', event.target.value)
		},
		onFocus() {
			this.isFocused = true
		},
		onBlur() {
			this.isFocused = false
		},
	},
}
</script>

<style lang="scss" scoped>
.input-body {
	padding-top: 3px;
	margin-top: 2px;
}

.input-wrapper {
	position: relative;

	display: flex;
	flex-direction: column;
	gap: 4px;
}

.input-label {
	position: absolute;
	left: 0;
	top: 16px;

	height: 18px;

	font-family: 'Roboto Flex';
	font-size: 14px;
	font-weight: 400;
	line-height: 150%;
	color: #999;

	transition: all 0.3s ease;
	pointer-events: none;

	&_active {
		top: 0px;
		font-size: 12px;
		color: var(--color-primary, #50b053);
	}
}

.input-field {
	display: flex;
	align-items: center;
	column-gap: 8px;
}

.input-icon {
	width: 24px;
	height: 24px;
	overflow: hidden;
}

.input-element {
	flex: 1;
	border: none;
	outline: none;

	resize: vertical;

	padding: 16px 0;

	font-family: 'Roboto Flex';
	font-size: 14px;
	font-weight: 400;
	line-height: 20px; /* 142.857% */

	border-bottom: 1px solid #ccc;
	background-color: var(--bg-color);

	&::placeholder {
		color: transparent;
	}
}

.input-field slot[name='icon'],
.input-field slot[name='action-icon'] {
	margin: 0 8px;
}

.input-field slot[name='icon'] {
	color: gray;
}
</style>
