export const bucketLabels = {
	library: 'Bibliothek',
	inbox: 'Inbox',
} as const;

export const libraryKindLabels = {
	insight: 'Erkenntnis',
	idea: 'Projektidee',
	life: 'Leben',
	journal: 'Tagebuch',
} as const;

export const inboxKindLabels = {
	spark: 'Funke',
	fragment: 'Fragment',
	question: 'Frage',
	seed: 'Samen',
} as const;

export type Bucket = keyof typeof bucketLabels;

export function getKindLabel(bucket: Bucket, kind: string) {
	if (bucket === 'library') {
		return libraryKindLabels[kind as keyof typeof libraryKindLabels];
	}

	return inboxKindLabels[kind as keyof typeof inboxKindLabels];
}
