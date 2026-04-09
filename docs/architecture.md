# Diary architecture

## Today

- Markdown files are the source of truth
- `src/content/inbox` holds raw notes
- `src/content/library` holds curated notes
- Astro renders the reading experience

## Later

- Vercel serverless endpoints can receive new inbox notes
- an AI curation run can read from the repo and write back into it
- GitHub stays the permanent store for everything

## Principle

The site should be disposable.

The content should not be.
