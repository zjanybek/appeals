<template>
	<div v-click-outside-element="onClickOutside" class="dropdown-wrapper">
		<button
			v-if="searchVariant === '1'"
			@click="toggleDropdown"
			type="button"
			class="dropdown-button"
		>
			<span v-if="selectedLabel" class="dropdown-label">
				{{ selectedLabel }}
			</span>
			<span v-else class="dropdown-label_placeholder">
				{{ placeholder }}
			</span>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="12"
				height="7"
				viewBox="0 0 12 7"
				fill="none"
				class="dropdown-icon"
				:class="{ 'rotate-180': isDropdownVisible }"
			>
				<path
					d="M6 6.37509L0 0.375092H1.4H6L10.6 0.375433L12 0.375092L6 6.37509Z"
					fill="#999999"
				/>
			</svg>
		</button>

		<div v-if="searchVariant === '2'" class="input-wrapper">
			<label
				v-if="showLabel"
				:class="{ 'input-wrapper__label_active': isFocused || !!searchQuery }"
				class="input-wrapper__label"
			>
				{{ labelText }}
			</label>

			<div class="input-wrapper__field">
				<div v-if="$slots.icon" class="input-wrapper__icon">
					<slot name="icon"></slot>
				</div>
				<input
					v-if="search || asyncSearch"
					@click="toggleDropdown"
					v-model="searchQuery"
					:type="type"
					:placeholder="showLabel ? '' : placeholder"
					:disabled="disabled"
					autocomplete="off"
					@input="handleInput"
					@focus="isFocused = true"
					@blur="isFocused = false"
					ref="inputRef"
					class="input-wrapper__input"
				/>
				<div v-if="$slots.action_icon" class="input-wrapper__action-icon">
					<slot name="action_icon"></slot>
				</div>
			</div>
		</div>

		<Teleport to="body">
			<ul
				v-if="isDropdownVisible && showSearchDropdown"
				:style="{
					top: `${dropdownPosition.top}px`,
					left: `${dropdownPosition.left}px`,
					width: `${dropdownMenuWidth}px`,
				}"
				ref="dropdownMenu"
				class="dropdown-menu"
			>
				<li
					v-if="searchVariant !== '2' && (search || asyncSearch)"
					class="dropdown-search"
				>
					<input
						v-model="searchQuery"
						type="text"
						placeholder="Search"
						autocomplete="off"
						@input="handleInput"
					/>
				</li>
				<li
					v-for="option in filteredOptions"
					:key="option.id || option"
					@click.prevent="selectItem(option)"
					class="dropdown-item"
				>
					<div v-if="$scopedSlots.option">
						<slot name="option" :option="normalizeOptionForSlot(option)"></slot>
					</div>
					<div v-else>
						{{ getOptionLabel(option) }}
					</div>
				</li>

				<li
					v-if="searchQuery !== '' && filteredOptions.length === 0"
					class="dropdown-no-options"
				>
					<div v-if='isLoading'><span>Загрузка...</span></div>

					<div v-else-if="$scopedSlots['no-options']">
						<slot name="no-options"></slot>
					</div>

					<div v-else>К сожалению, нет подходящих вариантов.</div>
				</li>
			</ul>
		</Teleport>
	</div>
</template>

<script>
import Teleport from 'vue2-teleport'

export default {
	components: {
		Teleport,
	},
	props: {
		searchVariant: {
			type: String,
			default: '1',
		},
		options: {
			type: Array,
			required: true,
		},
		label: {
			type: String,
			default: null,
		},
		labelText: {
			type: String,
			default: null,
		},
		type: {
			type: String,
			default: 'text',
		},
		isLoading: {
			type: Boolean,
		},
		disabled: {
			type: Boolean,
		},
		placeholder: {
			type: String,
			default: 'Select',
		},
		search: {
			type: Boolean,
			default: false,
		},
		asyncSearch: {
			type: Boolean,
			default: false,
		},
		value: {
			type: [Object, String, Number],
			default: null,
		},
		getOptionLabel: {
			type: Function,
			default(option) {
				console.log('option', option)

				if (typeof option === 'object') {
					if (!option.hasOwnProperty(this.label)) {
						console.warn(
							`[Dropdown]: Label key "${this.label}" does not exist.`
						)
					}
					return option[this.label]
				}
				return option
			},
		},
		reduce: {
			type: Function,
			default: option => option,
		},
	},
	data() {
		return {
			isDropdownVisible: false,
			searchQuery: this.value ? this.getOptionLabel(this.value) : '',
			selectedLabel: this.value ? this.getOptionLabel(this.value) : '',
			debounceTimeout: null,

			isFocused: false,

			dropdownPosition: { top: 0, left: 0 },
		}
	},
	computed: {
		filteredOptions() {
			if (this.asyncSearch) {
				return this.options
			} else if (this.search) {
				return this.options.filter(item => {
					const value = this.label ? item[this.label] : item
					return value
						.toString()
						.toLowerCase()
						.includes(this.searchQuery.toLowerCase())
				})
			}
			return this.options
		},

		showLabel() {
			return this.searchVariant === '2' && this.labelText
		},

		showSearchDropdown() {
			return (
				!(this.searchVariant === '2' && !this.searchQuery) &&
				this.isDropdownVisible
			)
		},

		dropdownMenuWidth() {
			const element = this.$refs.inputRef

			if (element) {
				const width = element.offsetWidth
				return width
			}
		},
	},
	methods: {
		onClickOutside(event) {
			this.isDropdownVisible = false
		},

		toggleDropdown(event) {
			const rect = event.currentTarget.getBoundingClientRect()

			this.dropdownPosition = {
				top: rect.bottom + window.scrollY + 5,
				left: rect.left + window.scrollX,
			}

			if (this.searchVariant === '2' && this.searchQuery) {
				this.isDropdownVisible = true
			} else {
				this.isDropdownVisible = !this.isDropdownVisible
			}

			if (this.searchVariant !== '2') {
				this.$nextTick(() => {
					const dropdownMenu = this.$refs.dropdownMenu
					if (dropdownMenu) {
						dropdownMenu.style.width = `${rect.width}px`
					}
				})
			}
		},

		closeDropdown() {
			this.isDropdownVisible = false
		},
		getSelected(value) {
			this.$emit('getSelected', value)
		},
		selectItem(item) {
			const value = typeof this.reduce === 'function' ? this.reduce(item) : item
			this.selectedLabel = this.getOptionLabel(item)
			this.searchQuery = this.selectedLabel
			this.$emit('input', value)
			this.isDropdownVisible = false

			this.getSelected(value)
		},
		handleInput(event) {
			if (this.searchVariant === '2' && this.searchQuery !== '') {
				this.isDropdownVisible = true
			}

			clearTimeout(this.debounceTimeout)
			this.debounceTimeout = setTimeout(() => {
				if (this.asyncSearch) {
					this.$emit('search-input', this.searchQuery)
				}
			}, 300)
		},
		normalizeOptionForSlot(option) {
			return typeof option === 'object' ? option : { [this.label]: option }
		},
	},
	watch: {
		value: {
			immediate: true,
			handler(newValue) {
				if (newValue && this.options?.length > 0) {
					const selectedOption = this.options.find(
						option => this.reduce(option) === newValue
					)

					if (selectedOption) {
						this.selectedLabel = this.getOptionLabel(selectedOption)
						this.searchQuery = this.selectedLabel
					} else {
						this.selectedLabel = ''
						this.searchQuery = ''
					}
				}
			},
		},
	},
}
</script>

<style lang="scss" scoped>
.dropdown-wrapper {
	position: relative;
	overflow: visible;

	padding-top: 3px;
	margin-top: 2px;
}

.dropdown-button {
	outline: none;
	border: none;

	display: inline-flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	padding: 16px 12px 16px 0;

	font-family: 'Roboto Flex';
	font-size: 14px;
	color: #333;
	background-color: #fff;
	border-bottom: 1px solid #ddd;
	border-radius: 5px;
	cursor: pointer;
}

.dropdown-label {
	flex-grow: 1;
	text-align: left;

	font-size: 14px;
	font-weight: 400;
	line-height: 142.857%; /* 142.857% */
	color: var(--text-color-base);

	&_placeholder {
		color: var(--text-color-weak, #999);
	}
}

.dropdown-icon {
	width: 12px;
	height: 6px;
	transition: transform 0.3s;

	&.rotate-180 {
		transform: rotate(180deg);
	}
}

.dropdown-menu {
	position: absolute;
	top: 100%;
	left: 0;
	width: 100%;

	max-height: 300px;
	overflow-y: auto;

	margin-top: 5px;
	padding: 5px;
	background-color: #fff;
	border: 1px solid #ddd;
	border-radius: 5px;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	z-index: 9999;
}

.dropdown-search {
	input {
		width: 100%;
		padding: 16px 0;
		margin-bottom: 5px;

		font-family: 'Roboto Flex';
		font-size: 14px;
		color: #333;

		border: 1px solid #ccc;
		border-radius: 5px;
	}
}

.dropdown-item {
	padding: 8px;
	color: #333;
	cursor: pointer;
	border-radius: 5px;

	&:hover {
		background-color: #f0f0f0;
	}
}

.dropdown-no-options {
	text-align: center;
	padding: 10px;
	color: #999;
}

.input-wrapper {
	position: relative;

	display: flex;
	flex-direction: column;
	row-gap: 4px;

	&__label {
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

	&__field {
		display: flex;
		align-items: center;
		column-gap: 8px;
	}

	&__input {
		outline: none;
		border: none;

		width: 100%;
		max-height: 56px;

		padding: 16px 12px 16px 0;

		font-family: 'Roboto Flex';
		font-size: 14px;
		font-weight: 400;
		line-height: 20px;
		color: #333;

		border-bottom: 1px solid #ccc;
		background-color: var(--bg-color);

		&::placeholder {
			color: #999;
		}

		&:disabled {
			opacity: 0.5;
		}
	}

	&__icon {
		width: 24px;
		height: 24px;
		overflow: hidden;
	}

	&__action-icon {
		width: 24px;
		height: 24px;
		overflow: hidden;
	}
}
</style>
