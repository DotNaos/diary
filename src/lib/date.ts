const longFormatter = new Intl.DateTimeFormat('de-CH', {
	day: '2-digit',
	month: 'long',
	year: 'numeric',
});

const compactFormatter = new Intl.DateTimeFormat('de-CH', {
	day: '2-digit',
	month: '2-digit',
	year: 'numeric',
});

export function formatLongDate(date: Date) {
	return longFormatter.format(date);
}

export function formatCompactDate(date: Date) {
	return compactFormatter.format(date);
}
