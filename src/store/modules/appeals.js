import { getListRequests, getUserPremises, createRequest, editRequest } from '@/api/listRequests.js'

const state = {
	items: [],
	isLoading: true,
}

const getters = {
	items: state => state.items,
}

const mutations = {
	SET_ITEMS(state, items) {
		state.items = items
	},
	SET_LOADING(state, isLoading) {
		state.isLoading = isLoading
	},
}

const actions = {
	async getAppeals({ commit, state }, params = {}) {
		commit('SET_LOADING', true)
		const {
			perPage = 10,
			currentPage = 1,
			search = '',
			premiseId = null,
		} = params

		const requestParams = {
			page_size: perPage,
			page: currentPage,
			search,
			premise_id: premiseId,
		}

		try {
			const response = await getListRequests(requestParams)

			if (Array.isArray(response.results)) {
				commit('SET_ITEMS', response.results)
			}
			return response
		} catch (error) {
			throw error
		} finally {
			commit('SET_LOADING', false)
		}
	},

	async storeAppeal({ commit, dispatch }, data) {
    try {
      const response = await createRequest(data)

      await dispatch('getAppeals')

    } catch (error) {
      throw error
    }
  },

	async editAppeal({ commit, dispatch }, data) {
    try {
      const response = await editRequest(data)

      await dispatch('getAppeals')

    } catch (error) {
      throw error
    }
  },
	
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters,
}
