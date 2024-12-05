import http from '@/services/axios'

export const getListRequests = async params => {
	const response = await http.get('/appeals/v1.0/appeals/', {
		params: params,
	})
	return response.data
}

export const getUserPremises = async searchValue => {
	const response = await http.get('/geo/v2.0/user-premises/', {
		params: { search: searchValue },
	})
	return response.data
}

export const getApartments = async params => {
	const response = await http.get('/geo/v1.0/apartments/', {
		params: params,
	})
	return response.data
}

export const createRequest = async data => {
	const response = await http.post('/appeals/v1.0/appeals/', data)
	return response.data
}

export const editRequest = async data => {
	const response = await http.patch('/appeals/v1.0/appeals/', data)
	return response.data
}
