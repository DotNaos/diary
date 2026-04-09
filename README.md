# Diary

Diary ist eine persönliche Wissensbibliothek auf Markdown-Basis.

## Was gerade vorhanden ist

- `src/content/inbox`: rohe Gedanken, Fragmente und unfertige Einfälle
- `src/content/library`: sortierte Einträge, Erkenntnisse und längere Notizen
- Astro-Frontend zum schnellen Lesen, Stöbern und Suchen
- GitHub-Pages-Deploy per GitHub Actions

## Entwicklung

```sh
pnpm install
pnpm dev
```

Die lokale Seite läuft danach unter `http://localhost:4321`.

## Deployment

Das Repository ist für GitHub Pages vorbereitet.

- Push auf `main` startet automatisch den Deploy-Workflow.
- Die Seite wird dann unter `https://dotnaos.github.io/diary/` veröffentlicht.
- Neue Markdown-Dateien unter `src/content/inbox` oder `src/content/library` erscheinen nach dem nächsten Push automatisch auf der Seite.

## Agentation Feedback

Für visuelles Feedback in der laufenden Seite:

```sh
pnpm agentation:mcp
```

Dann erscheint die Agentation-Toolbar in der lokalen Entwicklungsansicht. Die Toolbar ist nur in Development aktiv.

## Struktur

```text
src/
  content/
    inbox/
    library/
  components/
  layouts/
  lib/
  pages/
docs/
  architecture.md
```

## Nächster Ausbau

- Inbox-Einwürfe per serverloser Route annehmen
- Kurationslauf auf Vercel oder GitHub Actions ausführen
- neue Einträge direkt zurück ins Repository schreiben
