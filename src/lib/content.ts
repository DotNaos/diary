import { getCollection, type CollectionEntry } from 'astro:content';

import type { Bucket } from './taxonomy';

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
		href: `/${bucket}/${entry.id}/`,
	};
}

function sortByNewest<T extends { created: Date } | { data: { created: Date } }>(entries: T[]) {
	return [...entries].sort((left, right) => {
		const leftDate = 'data' in left ? left.data.created : left.created;
		const rightDate = 'data' in right ? right.data.created : right.created;
		return rightDate.getTime() - leftDate.getTime();
	});
}
