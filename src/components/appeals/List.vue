<template>
	<div v-if="items">
		<div class="table-container">
			<table class="table">
				<thead>
					<tr>
						<th>#</th>
						<th>Создана</th>
						<th>Адрес</th>
						<th>Заявитель</th>
						<th>Описание</th>
						<th>Срок</th>
						<th>Статус</th>
					</tr>
				</thead>
				<tbody class="table-body">
					<tr v-for="item in items" :key="item.id">
						<td class="table-body__line">
							<span @click="handleClickEdit(item)" class="table-body__id">{{
								item.number
							}}</span>
						</td>
						<td>{{ formatDate(item.created_at, 'DD.MM.YYYY') }}</td>
						<td>{{ item.premise?.address }}</td>
						<td>
							{{ item.applicant.first_name }}
							{{ item.applicant.last_name }}
						</td>
						<td>
							<span class="table-body__line-description">
								{{ item.description }}
							</span>
						</td>
						<td>{{ formatDate(item.due_date, 'DD.MM.YYYY HH:mm') }}</td>
						<td>{{ item.status.name }}</td>
					</tr>
				</tbody>
			</table>
		</div>

		<Edit
			v-if="selectedItem"
			:isOpenModal="isOpenModal"
			:item="selectedItem"
			@closeModal=";(isOpenModal = false), (selectedItem = null)"
		/>
	</div>
</template>

<script>
import Edit from './Edit.vue'

import { formatDate } from '@/utils/formatDate.js'

export default {
	name: '',
	components: { Edit },
	props: ['items'],
	data() {
		return {
			isOpenModal: false,

			selectedItem: null,
		}
	},

	mounted() {},

	methods: {
		formatDate,

		handleClickEdit(item) {
			this.selectedItem = item

			this.isOpenModal = true
		},
	},
}
</script>

<style lang="scss" scoped>
.table-container {
	width: 100%;

	font-family: 'Roboto Flex', 'Inter', sans-serif;
	background-color: #fff;

	overflow: hidden;

	border-radius: 8px;
}

.table {
	width: 100%;
	border-collapse: collapse;
}

.table thead th {
	padding: 10px;
	text-align: left;

	font-size: 14px;
	font-weight: 400;
	line-height: 142.857%; /* 142.857% */
	color: var(--text-color-green);

	border-bottom: 1px solid #dddfe0;
}

.table tbody tr {
	transition: background-color 0.2s;
}

.table tbody tr:hover {
	background-color: #f9f9f9;
}

.table tbody td {
	padding: 8px 10px;
	word-wrap: break-word;

	font-family: 'Inter';
	font-size: 14px;
	font-weight: 400;
	line-height: 142.857%; /* 142.857% */
	color: var(--text-color-base);

	border-bottom: 1px solid #dddfe0;

	&:first-child {
		padding: 14px 4px;
	}
}

.table-body {
	&__id {
		padding: 4px 14px;
		text-align: center;

		font-family: 'Inter';
		font-size: 14px;
		font-weight: 400;
		line-height: 142.857%; /* 142.857% */
		color: var(--text-color-white);

		background-color: var(--primary-color);
		border-radius: 4px;

		cursor: pointer;
	}

	&__line-description {
		display: inline-block;

		max-width: 244px;

		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
}
</style>
