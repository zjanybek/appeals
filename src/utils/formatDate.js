export function formatDate(inputDate, outputFormat) {
	const date = new Date(inputDate)

	const day = String(date.getDate()).padStart(2, '0')
	const month = String(date.getMonth() + 1).padStart(2, '0')
	const year = date.getFullYear()
	const hours = String(date.getHours()).padStart(2, '0')
	const minutes = String(date.getMinutes()).padStart(2, '0')

	const dateParts = {
		DD: day,
		MM: month,
		YYYY: year,
		HH: hours,
		mm: minutes,
	}

	return outputFormat.replace(/DD|MM|YYYY|HH|mm/g, match => dateParts[match])
}

// "2024-12-22T15:30:00Z"
// formatDate(inputDate, "DD.MM.YYYY HH:mm");
// formatDate(inputDate, "YYYY-MM-DD HH:mm");
// formatDate(inputDate, "MM/DD/YYYY HH:mm");
