import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const sharedFields = z.object({
	title: z.string(),
	summary: z.string(),
	created: z.coerce.date(),
	updated: z.coerce.date().optional(),
	tags: z.array(z.string()).default([]),
	featured: z.boolean().default(false),
});

const inbox = defineCollection({
	loader: glob({ base: './src/content/inbox', pattern: '**/*.md' }),
	schema: sharedFields.extend({
		kind: z.enum(['spark', 'fragment', 'question', 'seed']),
		state: z.enum(['raw', 'reviewed']).default('raw'),
	}),
});

const library = defineCollection({
	loader: glob({ base: './src/content/library', pattern: '**/*.md' }),
	schema: sharedFields.extend({
		kind: z.enum(['insight', 'idea', 'life', 'journal']),
		origin: z.enum(['manual', 'agent']).default('manual'),
	}),
});

export const collections = { inbox, library };
