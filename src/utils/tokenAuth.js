import { decryptToken, encryptToken } from '@/utils/crypto'

export const saveToken = token => {
	const encryptedToken = encryptToken(token)
	localStorage.setItem('authToken', encryptedToken)
}

export const getToken = () => {
	const encryptedToken = localStorage.getItem('authToken')
	if (encryptedToken) {
		return decryptToken(encryptedToken)
	}
	return null
}
