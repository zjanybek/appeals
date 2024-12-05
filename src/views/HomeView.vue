<template>
	<div class="home">
		<div class="home__main-container">
			<div class="home__top">
				<h1 class="home__title">Список заявок</h1>
			</div>

			<div class="home__content">
				<div class="home__action-button">
					<Create />
				</div>

				<div class="home__filters">
					<div>
						<Input
							v-model="params.search"
							:debounce="true"
							:debounceDelay="300"
							type="search"
							label="Поиск (№ заявки, название)"
						>
							<template #action_icon>
								<img src="/images/search-icon.svg" alt="" />
							</template>
						</Input>
					</div>

					<div>
						<SelectDropdown
							:options="premises"
							:reduce="value => value.id"
							:search="true"
							:asyncSearch="true"
							@search-input="getPremises"
							@getSelected="data.premise_id = $event"
							searchVariant="2"
							label="address"
							labelText="Дом"
						/>
					</div>
				</div>

				<div class="home__body">
					<div v-if="isLoading" class="home__loading">
						<LoadingSpinner variants="big" :center="true" />
					</div>

					<template v-else>
						<List :items="items" />
					</template>
				</div>

				<div class="home__bottom">
					<div>
						<RecordsPerPageSelector
							:totalRecords="totalRecords"
							@perPageChange="params.perPage = $event"
						/>
					</div>
					<div>
						<Pagination
							:total-pages="totalPages"
							:current-page="params.currentPage"
							@getValue="params.currentPage = $event"
						></Pagination>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Pagination from '@/components/Pagination.vue'
import RecordsPerPageSelector from '@/components/RecordsPerPageSelector.vue'
import LoadingSpinner from '@/components/UI/LoadingSpinner.vue'
import Create from '@/components/appeals/Create.vue'
import List from '@/components/appeals/List.vue'

import Button from '@/components/UI/Button.vue'
import Input from '@/components/UI/Input.vue'
import SelectDropdown from '@/components/UI/SelectDropdown.vue'
import Textarea from '@/components/UI/Textarea.vue'

import { getUserPremises } from '@/api/listRequests.js'
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
	name: 'HomeView',
	components: {
		Button,
		Input,
		Textarea,
		SelectDropdown,
		Pagination,
		RecordsPerPageSelector,
		Create,
		LoadingSpinner,
		List,
	},
	data() {
		return {
			searchValue: null,

			premises: [],

			totalRecords: 0,
			totalPages: 0,

			params: {
				search: null,
				premiseId: null,
				currentPage: 1,
				perPage: 10,
			},
		}
	},
	computed: {
		...mapState('appeals', ['isLoading']),
		...mapGetters('appeals', ['items']),
	},
	methods: {
		...mapActions('appeals', ['getAppeals']),

		async getPremises(value) {
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
			}
		},

		async getData() {
			try {
				const response = await this.getAppeals(this.params)

				this.totalRecords = response.count
				this.totalPages = response.pages
				this.currentPage = response.page
				this.perPage = response.page_size
			} catch (error) {
				console.error('Ошибка:', error)
				this.$toast.open({
					message: 'Произошла ошибка',
					type: 'error',
				})
			}
		},
	},
	mounted() {
		this.getData()
	},

	watch: {
		params: {
			handler(newValue, oldValue) {
				this.getData()
			},
			deep: true,
		},
	},
}
</script>

<style lang="scss" scoped>
.home {
	padding: 24px 0 80px;

	&__top {
		margin-bottom: 24px;
	}

	&__title {
		font-size: 20px;
		font-weight: 400;
		line-height: 120%; /* 120% */
		color: var(--none, #454545);
	}

	&__loading {
		padding: 54px 0;
	}

	&__content {
		padding: 10px 20px;

		display: flex;
		flex-direction: column;
		row-gap: 32px;

		background-color: #fff;
		border-radius: 8px;
	}

	&__action-button {
		display: flex;
		justify-content: flex-end;
	}

	&__filters {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 16px;
	}

	&__body {
	}

	&__bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
}
</style>
