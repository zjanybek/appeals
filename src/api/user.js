import http from '@/services/axios'

export const login = async credentials => {
	const response = await http.post('/auth/login/', credentials)
	return response
}
