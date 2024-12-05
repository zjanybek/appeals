<template>
	<div class="per-page">
		<label for="per-page">
			{{ displayRange }}
		</label>

		<div class="per-page__select">
			<SelectDropdown
				:options="perPageOptions"
				:search="false"
				v-model="selectedPerPage"
				@getSelected="handlePerPageChange"
				:placeholder="'Количество записей'"
			/>
		</div>
	</div>
</template>

<script>
import SelectDropdown from '@/components/UI/SelectDropdown.vue'

export default {
	components: { SelectDropdown },
	props: {
		totalRecords: {
			type: Number,
			required: true,
		},
		initialPerPage: {
			type: Number,
			default: 10,
		},
	},
	data() {
		return {
			selectedPerPage: this.initialPerPage,
			perPageOptions: [10, 20, 50, 100],
		}
	},
	computed: {
		displayRange() {
			return `1–${this.selectedPerPage} из ${this.totalRecords} записей`
		},
	},
	methods: {
		handlePerPageChange() {
			this.$emit('perPageChange', this.selectedPerPage)
		},
		getValue(value) {
			console.log(value)
		},
	},
}
</script>

<style lang="scss" scoped>
.per-page {
	display: flex;
	align-items: center;
	gap: 16px;

	label {
		word-wrap: nowrap;
		white-space: nowrap;
	}

	&__select {
		flex: 0 0 89px;
	}
}
</style>
