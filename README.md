# Diary

Diary ist eine persönliche Wissensbibliothek auf Markdown-Basis.

## Was gerade vorhanden ist

- `src/content/inbox`: rohe Gedanken, Fragmente und unfertige Einfälle
- `src/content/library`: sortierte Einträge, Erkenntnisse und längere Notizen
- Astro-Frontend zum schnellen Lesen, Stöbern und Suchen
- Vercel-Adapter, damit serverlose Erweiterungen später ohne Neustart der Architektur dazukommen

## Entwicklung

```sh
pnpm install
pnpm dev
```

Die lokale Seite läuft danach unter `http://localhost:4321`.

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
