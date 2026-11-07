# Decisions log

Unguided calls made during the audit, dated, with evidence.

## 2026-11-07: Copy pattern narrowing scoped to js/library

- `{ from: "js" }` was narrowed to `{ from: "js/library" }` instead of dropping js entirely because HTML templates reference `js/library/*` files directly (verified via grep of script srcs). No template references `js/main/*` (those are webpack entries bundled to public/*.bundle.js).
- Config copies (server.js, .babelrc, .babel.config.json, tsconfig.json, README.md) removed entirely; none are referenced by templates.

## 2026-11-07: BACKEND_DATABASE_URL removed from DefinePlugin

- Grep showed zero usage in client source; DefinePlugin only substitutes referenced identifiers, so nothing reached bundles (verified post build). Removed the entry so future use cannot leak a backend secret. No rotation needed: value never shipped.

## 2026-11-07: CSP kept 'unsafe-inline' for script-src and style-src

- Every HTML template ships inline scripts (partytown bootstrap, config) and style-loader injects inline style tags. Nonce based CSP is not feasible without restructuring the templates. Documented as accepted residual risk.

## 2026-11-07: Commit convention

- AGENTS.md / agents.md does NOT exist in repo root (verified: `ls agents.md AGENTS.md` -> "No such file or directory").
- Fallback commit convention in use: `type(scope): message` (e.g. `chore(audit): scaffold tracker and plan`).
- No repo rules file found, so no project commit rules to mirror.
