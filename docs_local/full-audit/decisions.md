# Decisions log

Unguided calls made during the audit, dated, with evidence.

## 2026-11-07: Copy pattern narrowing scoped to js/library

- `{ from: "js" }` was narrowed to `{ from: "js/library" }` instead of dropping js entirely because HTML templates reference `js/library/*` files directly (verified via grep of script srcs). No template references `js/main/*` (those are webpack entries bundled to public/*.bundle.js).
- Config copies (server.js, .babelrc, .babel.config.json, tsconfig.json, README.md) removed entirely; none are referenced by templates.

## 2026-11-07: BACKEND_DATABASE_URL removed from DefinePlugin

- Grep showed zero usage in client source; DefinePlugin only substitutes referenced identifiers, so nothing reached bundles (verified post build). Removed the entry so future use cannot leak a backend secret. No rotation needed: value never shipped.

## 2026-11-07: CSP kept 'unsafe-inline' for script-src and style-src

- Every HTML template ships inline scripts (partytown bootstrap, config) and style-loader injects inline style tags. Nonce based CSP is not feasible without restructuring the templates. Documented as accepted residual risk.

## 2026-11-07: membership_signup repointed to contact

- The Join link targeted a page that never existed (no file, no git history). No signup capability exists in the codebase (auth is sign-in only, internal dashboard). Repointed to `contact` as the only conversion surface, rather than removing the menu item or guessing at a new page. If a real membership/signup page is built later the link should be restored.

## 2026-11-07: manual DefinePlugin replaced by dotenv-webpack systemvars

- The manual DefinePlugin overrode dotenv-webpack values with undefined whenever shell env lacked the vars, breaking Firebase outside Vercel (including CI gh-pages builds). Single source of truth is now Dotenv with `systemvars: true`: `.env` file for CI/local, real env vars on Vercel. Removes 8 conflict warnings and the undefined-config failure mode.

## 2026-11-07: dead Tidio widget script removed

- code.tidio.co/f1y79gyqdaoifsyjsg3va1jmuwklonpm.js returns 404 upstream; the chat widget has been dead in production. Removing the script tag only removes a guaranteed 404. If the team still wants chat they need a fresh Tidio key; the dormant iframe-manipulation code in contact.js is null-guarded and can be re-enabled.

## 2026-11-07: ip-api.com left as HTTP, documented

- The geolocation fetch uses http://ip-api.com (free tier is HTTP only) which is mixed content on the HTTPS site. Fixing the Promise bug makes `country` correct where the fetch can run, but in production it will be null until an HTTPS geo provider is chosen. Left unchanged pending owner decision on provider.

## 2026-11-07: menu chunk removed from 404 page only

- 404.html has no `.menuUzi` mount point so the chunk produced a console error and dead weight. Other pages keep `menu` - the mount point exists there.

## 2026-11-07: Commit convention

- AGENTS.md / agents.md does NOT exist in repo root (verified: `ls agents.md AGENTS.md` -> "No such file or directory").
- Fallback commit convention in use: `type(scope): message` (e.g. `chore(audit): scaffold tracker and plan`).
- No repo rules file found, so no project commit rules to mirror.
