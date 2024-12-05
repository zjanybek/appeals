<template>
	<div class="pagination-container">
		<!-- Кнопка "Предыдущая" -->
		<button
			class="pagination-button"
			@click="changePage(currentPage - 1)"
			:disabled="currentPage === 1"
		>
			<div class="icon">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="5"
					height="8"
					viewBox="0 0 5 8"
					fill="none"
				>
					<path
						d="M4.16669 7.5L0.666687 4L4.16669 0.5L4.98335 1.31667L2.30002 4L4.98335 6.68333L4.16669 7.5Z"
						fill="#6C757D"
					/>
				</svg>
			</div>
			<!-- <span class="pagination-label">Предыдущая</span> -->
		</button>

		<!-- Пагинация -->
		<ul class="pagination-pages">
			<li
				v-for="(page, index) in pageButtons"
				:key="page === '...' ? 'ellipsis-' + index : page"
				class="pagination-item"
			>
				<button
					:class="[
						'page-button',
						{ active: currentPage === page, ellipsis: page === '...' },
					]"
					@click="changePage(page)"
					:disabled="page === '...' || currentPage === page"
				>
					{{ page }}
				</button>
			</li>
		</ul>

		<!-- Кнопка "Следующая" -->
		<button
			class="pagination-button"
			@click="changePage(currentPage + 1)"
			:disabled="currentPage === totalPages"
		>
			<!-- <span class="pagination-label">Следующая</span> -->
			<div class="icon">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="6"
					height="8"
					viewBox="0 0 6 8"
					fill="none"
				>
					<path
						d="M3.40004 4L0.333374 0.933333L1.26671 0L5.26671 4L1.26671 8L0.333374 7.06667L3.40004 4Z"
						fill="#6C757D"
					/>
				</svg>
			</div>
		</button>
	</div>
</template>

<script>
export default {
	props: {
		currentPage: {
			type: Number,
			required: true,
		},
		totalPages: {
			type: Number,
			required: true,
		},
		label: {
			type: Boolean,
			default: true,
		},
		visibleStartPage: {
			type: Boolean,
			default: true,
		},
		visibleEndPage: {
			type: Boolean,
			default: true,
		},
		maxVisiblePages: {
			type: Number,
			default: 5,
		},
	},
	computed: {
		pageButtons() {
			const buttons = []
			const halfMaxVisible = Math.floor(this.maxVisiblePages / 2)
			const fixedVisiblePages = 5
			let startPage, endPage

			if (this.currentPage <= halfMaxVisible + 1) {
				startPage = 1
				endPage = Math.min(this.totalPages, this.maxVisiblePages)
			} else if (
				this.currentPage > halfMaxVisible + 1 &&
				this.currentPage < this.totalPages - halfMaxVisible
			) {
				startPage = this.currentPage - Math.floor(fixedVisiblePages / 2)
				endPage = startPage + fixedVisiblePages - 1
			} else {
				startPage = Math.max(1, this.totalPages - this.maxVisiblePages + 1)
				endPage = this.totalPages
			}

			if (this.visibleStartPage && startPage > 1) {
				buttons.push(1, '...')
			}

			buttons.push(
				...Array.from(
					{ length: endPage - startPage + 1 },
					(_, i) => startPage + i
				)
			)

			if (this.visibleEndPage && endPage < this.totalPages) {
				buttons.push('...', this.totalPages)
			}

			return buttons
		},
	},
	methods: {
		changePage(page) {
			if (page !== '...' && page >= 1 && page <= this.totalPages) {
				this.$emit('getValue', page)
			}
		},
	},
}
</script>

<style scoped lang="scss">
.pagination-container {
	display: flex;
	align-items: center;
	gap: 10px;
}

.pagination-button {
	display: flex;
	align-items: center;
	justify-content: center;

	width: 46px;
	height: 32px;

	padding: 10px 16px;
	cursor: pointer;
	background-color: transparent;
}

.pagination-label {
	margin-left: 5px;
}

.pagination-pages {
	display: flex;
	gap: 6px;
}

.page-button {
	border: none;
	outline: none;

	display: flex;
	align-items: center;
	justify-content: center;

	width: 32px;
	height: 32px;

	color: var(--text-color-gray);

	border-radius: 50%;
	background-color: transparent;

	cursor: pointer;
	transition: background-color 0.3s;

	&:hover:not(.active, .ellipsis) {
		border: 1px solid gray;
	}

	&:disabled {
		cursor: not-allowed;
	}

	&.active {
		background-color: var(--primary-color);
		color: var(--text-color-white);
	}
}

.page-button.ellipsis {
	cursor: text;
}
</style>
