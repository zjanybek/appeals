import { getToken } from '@/utils/tokenAuth'
import axios from 'axios'

const http = axios.create({
	baseURL: process.env.VUE_APP_API_URL || 'https://dev.moydomonline.ru/api',
	headers: { 'Content-Type': 'application/json' },
})

http.interceptors.request.use(
	config => {
		const token = getToken()
		console.log('token', token)

		if (token) {
			config.headers.Authorization = `Token ${token}`
		}
		return config
	},
	error => Promise.reject(error)
)

http.interceptors.response.use(
	response => response,
	error => {
		if (error.response?.status === 401) {
			localStorage.removeItem('authToken')
			window.location.href = '/login'
		}
		return Promise.reject(error)
	}
)

export default http
