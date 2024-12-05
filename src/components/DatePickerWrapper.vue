<template>
	<div class="date-picker-wrapper">
		<label :class="{ active: isFocused || !!value }" class="date-picker-label">
			{{ label }}
		</label>
		<DatePicker
			v-bind="$attrs"
			v-model="internalValue"
			@focus="onFocus"
			@blur="onBlur"
			placeholder=" "
		/>
	</div>
</template>

<script>
import DatePicker from 'vue2-datepicker'

export default {
	components: { DatePicker },
	props: {
		value: {
			type: [String, Date],
			required: false,
		},
		label: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			isFocused: false,
			internalValue: this.value,
		}
	},
	watch: {
		internalValue(newValue) {
			this.$emit('input', newValue)
		},
		value(newValue) {
			this.internalValue = newValue
		},
	},
	methods: {
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
.date-picker-wrapper {
	padding-top: 3px;
	margin-top: 2px;
	position: relative;
	display: inline-block;
	width: 100%;
}

.date-picker-label {
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
	z-index: 2;

	&.active {
		top: 0px;
		font-size: 12px;
		color: var(--color-primary, #50b053);
	}
}
</style>
