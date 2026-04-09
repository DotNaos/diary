import { getCollection, type CollectionEntry } from 'astro:content';

import type { Bucket } from './taxonomy';
import { withBase } from './paths';

export interface EntryPreview {
	bucket: Bucket;
	slug: string;
	title: string;
	summary: string;
	created: Date;
	tags: string[];
	kind: string;
	featured: boolean;
	href: string;
}

export type EntryRecord =
	| { bucket: 'library'; entry: CollectionEntry<'library'> }
	| { bucket: 'inbox'; entry: CollectionEntry<'inbox'> };

export async function getLibraryEntries() {
	const entries = await getCollection('library');
	return sortByNewest(entries);
}

export async function getInboxEntries() {
	const entries = await getCollection('inbox');
	return sortByNewest(entries);
}

export async function getLibraryPreviews() {
	const entries = await getLibraryEntries();
	return entries.map((entry) => toPreview('library', entry));
}

export async function getInboxPreviews() {
	const entries = await getInboxEntries();
	return entries.map((entry) => toPreview('inbox', entry));
}

export async function getAllPreviews() {
	const [library, inbox] = await Promise.all([getLibraryPreviews(), getInboxPreviews()]);
	return sortByNewest([...library, ...inbox]);
}

export async function getLatestEntryRecord(bucket?: Bucket): Promise<EntryRecord | null> {
	if (bucket === 'library') {
		const [entry] = await getLibraryEntries();
		return entry ? { bucket: 'library', entry } : null;
	}

	if (bucket === 'inbox') {
		const [entry] = await getInboxEntries();
		return entry ? { bucket: 'inbox', entry } : null;
	}

	const [library, inbox] = await Promise.all([getLibraryEntries(), getInboxEntries()]);
	const combined: EntryRecord[] = [
		...library.map((entry) => ({ bucket: 'library' as const, entry })),
		...inbox.map((entry) => ({ bucket: 'inbox' as const, entry })),
	];

	const [latest] = sortByNewest(combined);
	return latest ?? null;
}

export function collectTagCounts(entries: EntryPreview[]) {
	const counts = new Map<string, number>();

	for (const entry of entries) {
		for (const tag of entry.tags) {
			counts.set(tag, (counts.get(tag) ?? 0) + 1);
		}
	}

	return [...counts.entries()]
		.map(([tag, count]) => ({ tag, count }))
		.sort((left, right) => right.count - left.count || left.tag.localeCompare(right.tag, 'de'));
}

function toPreview(
	bucket: Bucket,
	entry: CollectionEntry<'library'> | CollectionEntry<'inbox'>,
): EntryPreview {
	return {
		bucket,
		slug: entry.id,
		title: entry.data.title,
		summary: entry.data.summary,
		created: entry.data.created,
		tags: entry.data.tags,
		kind: entry.data.kind,
		featured: entry.data.featured,
		href: withBase(`/${bucket}/${entry.id}/`),
	};
}

function sortByNewest<
	T extends
		| { created: Date }
		| { data: { created: Date } }
		| { entry: { data: { created: Date } } },
>(entries: T[]) {
	return [...entries].sort((left, right) => {
		const leftDate =
			'created' in left
				? left.created
				: 'data' in left
					? left.data.created
					: left.entry.data.created;
		const rightDate =
			'created' in right
				? right.created
				: 'data' in right
					? right.data.created
					: right.entry.data.created;
		return rightDate.getTime() - leftDate.getTime();
	});
}
