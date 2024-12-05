<template>
	<div>
		<Button @click="isOpenCreateModal = true" text="Создать" />
		<Modal
			:isShow="isOpenCreateModal"
			:isLoading="isLoading"
			@close="handleCloseModal"
			title="Создание заявки"
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
							:isLoading="isSelectedLoading"
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
							:isLoading="isSelectedLoading"
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
							:format="dateFormat"
							:value-format="'YYYY-MM-DDTHH:mm:ssZ'"
							:type="'datetime'"
							label="Срок"
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
						/>
					</div>
				</div>
				<div>
					<Textarea
						v-model="data.description"
						:height="'132px'"
						label="Описание заявки"
					/>
				</div>
			</div>

			<template #footer>
				<Button @click="handleCreate" :disabled="!readyCreate" text="Создать" />
			</template>
		</Modal>
	</div>
</template>

<script>
import DatePickerWrapper from '@/components/DatePickerWrapper.vue'
import Button from '@/components/UI/Button.vue'
import Input from '@/components/UI/Input.vue'
import SelectDropdown from '@/components/UI/SelectDropdown.vue'
import Textarea from '@/components/UI/Textarea.vue'
import Modal from '../Modal.vue'

import { formatPhoneNumber } from '@/utils/formatPhoneNumber.js'
import { mapActions } from 'vuex'

import {
	createRequest,
	getApartments,
	getUserPremises,
} from '@/api/listRequests.js'

const createInitialData = () => ({
	premise_id: null,
	apartment_id: null,
	applicant: {
		last_name: '',
		first_name: '',
		patronymic_name: '',
		username: '',
	},
	description: '',
	due_date: '',
	status_id: 1,
})

export default {
	name: '',
	components: {
		DatePickerWrapper,
		Modal,
		Button,
		SelectDropdown,
		Input,
		Textarea,
	},

	data() {
		return {
			isOpenCreateModal: false,
			isLoading: false,

			isSelectedLoading: false,

			premises: [],
			apartments: [],

			data: createInitialData(),

			placeholderDate: 'Срок',

			dateFormat: 'DD.MM.YYYY HH:mm',
		}
	},

	mounted() {},
	computed: {
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
		...mapActions('appeals', ['storeAppeal']),

		async getUserPremises(value) {
			this.isSelectedLoading = true

			const searchValue = value ? value : null

			try {
				const response = await getUserPremises(searchValue)
				this.premises = response.results
			} catch (error) {
				console.error(error)
				this.$toast.open({
					message: 'Произошла ошибка',
					type: 'error',
				})
			} finally {
				this.isSelectedLoading = false
			}
		},

		async getApartments(value) {
			this.isSelectedLoading = true

			const searchValue = value ? value : null

			try {
				const response = await getApartments({
					premise_id: this.data.premise_id,
					search: searchValue,
				})
				this.apartments = response.results
			} catch (error) {
				console.error(error)
				this.$toast.open({
					message: 'Произошла ошибка',
					type: 'error',
				})
			} finally {
				this.isSelectedLoading = false
			}
		},

		onInput(value) {
			this.data.applicant.username = formatPhoneNumber(value)
		},

		handleCloseModal() {
			this.isOpenCreateModal = false
			this.data = createInitialData()
		},

		async handleCreate() {
			this.isLoading = true
			try {
				const response = await this.storeAppeal(this.data)

				this.handleCloseModal()
				this.$toast.open('Заявка успешно создано')
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
