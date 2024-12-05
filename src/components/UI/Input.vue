<template>
	<div class="input-body">
		<div
			:class="{ 'input-wrapper_active': isFocused || !!value }"
			class="input-wrapper"
		>
			<label
				:class="{
					'input-label_active': isFocused || !!value,
					'input-label_with-icon': $slots.icon,
				}"
				class="input-label"
			>
				{{ label }}
			</label>
			<div class="input-field">
				<div v-if="$slots.icon" class="input-icon">
					<slot name="icon"></slot>
				</div>

				<input
					:type="type"
					:value="value"
					:size="size"
					:required="required"
					:maxlength="maxlength"
					@input="handleInput"
					@change="handleChange"
					@focus="onFocus"
					@blur="onBlur"
					class="input-element"
					:class="{
						'input-element_with-icon': $slots.icon,
					}"
				/>
				<div v-if="$slots.action_icon" class="input-action-icon">
					<slot name="action_icon"></slot>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		value: {
			type: [String, Number],
			default: '',
		},
		label: {
			type: String,
		},
		type: {
			type: String,
			default: 'text',
		},
		size: {
			type: String,
		},
		required: {
			type: String,
		},
		maxlength: {
			type: String,
		},

		debounce: {
			type: Boolean,
			default: false,
		},
		debounceDelay: {
			type: Number,
			default: 300,
		},
	},
	data() {
		return {
			isFocused: false,

			debounceTimeout: null,
		}
	},
	methods: {
		handleInput(event) {
			if (this.debounce) {
				clearTimeout(this.debounceTimeout)
				this.debounceTimeout = setTimeout(() => {
					this.$emit('input', event.target.value)
				}, this.debounceDelay)
			} else {
				this.$emit('input', event.target.value)
			}
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
}

.input-label {
	position: absolute;
	left: 0;
	top: 16px;
	z-index: 2;

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

	&_with-icon {
		left: 32px;
	}
}

.input-field {
	position: relative;
}

.input-icon,
.input-action-icon {
	position: absolute;
	top: 16px;
	width: 24px;
	height: 24px;
	overflow: hidden;
}

.input-icon {
	left: 0;
}

.input-action-icon {
	right: 0;
}

.input-element {
	width: 100%;
	border: none;
	outline: none;

	max-height: 56px;

	padding: 16px 28px 16px 0;

	font-family: 'Roboto Flex';
	font-size: 14px;
	font-weight: 400;
	line-height: 20px;

	border-bottom: 1px solid #ccc;
	background-color: var(--bg-color);

	&_with-icon {
		padding-left: 32px;
	}

	&::placeholder {
		color: transparent;
	}
}
</style>
