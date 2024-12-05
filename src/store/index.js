import Vue from 'vue'
import Vuex from 'vuex'
import appeals from './modules/appeals'

import { getUserPremises } from '@/api/listRequests.js'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {},
	getters: {},
	mutations: {},
	actions: {
		async getUserPremises({ commit }, searchValue) {
			try {
				const response = await getUserPremises(searchValue)
			} catch (error) {
				console.error(error)
				this.$toast.open({
					message: 'Произошла ошибка',
					type: 'error',
				})
			}
		},
	},
	modules: {
		appeals,
	},
})
