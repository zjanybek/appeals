<template>
	<div>
		<FullLoading v-if="isLoading" />
		<Modal
			v-else
			:isShow="isOpenModal"
			:title="title"
			@close="closeModal"
			subtitle="Новая"
		>
			<div class="create-request">
				<div class="create-request__line">
					<div>
						<SelectDropdown
							v-model="data.premise_id"
							:options="premises"
							:reduce="value => value.id"
							:search="true"
							:asyncSearch="true"
							@search-input="getUserPremises"
							searchVariant="2"
							label="address"
							labelText="Дом"
						/>
					</div>
					<div>
						<SelectDropdown
							v-model="data.apartment_id"
							:options="apartments"
							:reduce="value => value.id"
							:search="true"
							:asyncSearch="true"
							:disabled="data.premise_id === null"
							@search-input="getApartments"
							type="number"
							searchVariant="2"
							label="number"
							labelText="Квартира"
						/>
					</div>
					<div>
						<DatePickerWrapper
							v-model="data.due_date"
							:value-type="'format'"
							:format="dateFormat"
							:type="'datetime'"
							label="Выберите дату и время"
						/>
					</div>
				</div>
				<div class="create-request__line-second">
					<div>
						<Input
							v-model="data.applicant.last_name"
							type="text"
							label="Фамилия"
							placeholder="Фамилия"
						/>
					</div>
					<div>
						<Input
							v-model="data.applicant.first_name"
							type="text"
							label="Имя"
							placeholder="Имя"
						/>
					</div>
					<div>
						<Input
							v-model="data.applicant.patronymic_name"
							type="text"
							label="Отчество"
							placeholder="Отчество"
						/>
					</div>
					<div>
						<Input
							v-model="data.applicant.username"
							@input="onInput"
							size="20"
							maxlength="16"
							type="tel"
							label="Телефон"
							placeholder="Телефон"
						/>
					</div>
				</div>
				<div>
					<Textarea
						v-model="data.description"
						:height="'132px'"
						label="Описание заявки"
						placeholder="Описание заявки"
					/>
				</div>
			</div>

			<template #footer>
				<Button @click="handleEdit" :disabled="!readyCreate" text="Создать" />
			</template>
		</Modal>
	</div>
</template>

<script>
import Modal from '../Modal.vue'
import Button from '@/components/UI/Button.vue'
import SelectDropdown from '@/components/UI/SelectDropdown.vue'
import Textarea from '@/components/UI/Textarea.vue'
import Input from '@/components/UI/Input.vue'
import DatePickerWrapper from '@/components/DatePickerWrapper.vue'
import FullLoading from '@/components/UI/FullLoading.vue'

import { formatPhoneNumber } from '@/utils/formatPhoneNumber.js'
import { formatDate } from '@/utils/formatDate.js'
import {
	getUserPremises,
	getApartments,
	createRequest,
} from '@/api/listRequests.js'
import { mapActions } from 'vuex'

export default {
	name: 'Edit',
	components: {
		DatePickerWrapper,
		Modal,
		Button,
		SelectDropdown,
		Input,
		Textarea,
		FullLoading,
	},
	props: ['isOpenModal', 'item'],
	data() {
		return {
			premises: [],
			apartments: [],

			isLoading: true,

			data: {},

			dateFormat: 'DD.MM.YYYY HH:mm',
		}
	},

	created() {
		this.initializeData(this.item)
	},
	async mounted() {
		try {
			await this.getUserPremises(this.item.premise?.address)
			await this.getApartments()
		} finally {
			this.isLoading = false
		}
	},
	computed: {
		title() {
			return `Заявка № ${this.item.number} (от ${formatDate(
				this.item.created_at,
				'DD.MM.YYYY'
			)})`
		},
		readyCreate() {
			const values = [
				this.data.premise_id,
				this.data.apartment_id,
				...Object.values(this.data.applicant),
				this.data.description,
				this.data.due_date,
			]

			return values.every(value => value !== null && value !== '')
		},
	},
	methods: {
		...mapActions('appeals', ['editAppeal']),

		initializeData(item) {
			if (item) {
				const formatedDueDate = item.due_date
					? formatDate(item.due_date, 'DD.MM.YYYY HH:mm')
					: ''
				const formatedNumber = item.applicant?.username
					? formatPhoneNumber(item.applicant.username)
					: ''

				this.data = {
					premise_id: item.premise?.id ?? null,
					apartment_id: item.apartment?.id ?? null,
					applicant: {
						last_name: item.applicant?.last_name ?? '',
						first_name: item.applicant?.first_name ?? '',
						patronymic_name: item.applicant?.patronymic_name ?? '',
						username: formatedNumber,
					},
					description: item.description ?? '',
					due_date: formatedDueDate,
					status_id: item.status.id ?? null,
				}
			}
		},

		closeModal() {
			this.$emit('closeModal')
		},

		onInput(value) {
			this.data.applicant.username = formatPhoneNumber(value)
		},

		async getUserPremises(value) {
			const searchValue = value ? value : null

			try {
				const response = await getUserPremises(searchValue)
				this.premises = response.results
				this.isLoading = false
			} catch (error) {
				console.error(error)
				this.$toast.open({
					message: 'Произошла ошибка',
					type: 'error',
				})
			}
		},

		async getApartments(value) {
			const searchValue = value ? value : null

			try {
				const response = await getApartments({
					premise_id: this.data.premise_id,
					search: searchValue,
				})
				this.apartments = response.results
				this.isLoading = false
			} catch (error) {
				console.error(error)
				this.$toast.open({
					message: 'Произошла ошибка',
					type: 'error',
				})
			}
		},

		async handleEdit() {
			this.isLoading = true
			try {
				const response = await this.editAppeal(this.data)
				this.closeModal()
			} catch (error) {
				console.error(error)
				this.$toast.open({
					message: 'Произошла ошибка',
					type: 'error',
				})
			} finally {
				this.isLoading = false
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.create-request {
	display: grid;
	row-gap: 32px;

	&__line {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 16px 14px;
	}

	&__line-second {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 16px;
	}
}
</style>
