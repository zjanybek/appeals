export function formatPhoneNumber(value) {
	let phoneValue = value.replace(/[^\d]/g, '')

	if (phoneValue.length > 11) {
		phoneValue = phoneValue.slice(0, 11)
	}

	if (phoneValue.length <= 1) {
		return '+7'
	} else if (phoneValue.length <= 4) {
		return `+7 ${phoneValue.slice(1)}`
	} else if (phoneValue.length <= 7) {
		return `+7 ${phoneValue.slice(1, 4)} ${phoneValue.slice(4)}`
	} else if (phoneValue.length <= 9) {
		return `+7 ${phoneValue.slice(1, 4)} ${phoneValue.slice(
			4,
			7
		)} ${phoneValue.slice(7)}`
	} else {
		return `+7 ${phoneValue.slice(1, 4)} ${phoneValue.slice(
			4,
			7
		)} ${phoneValue.slice(7, 9)} ${phoneValue.slice(9)}`
	}
}
