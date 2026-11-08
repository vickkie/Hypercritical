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

## 2026-11-07: public/ removed from git index

- 1023 generated files were committed including mirrored source/config (security S1). gh-pages and Vercel both rebuild public/ (workflow runs npx webpack and publishes ./public; Vercel project carries build env vars). Untracked via git rm -r --cached plus .gitignore. Residual risk: if the Vercel project is set to serve a committed directory with no build step, its deploy config must switch to building first - flagged for the owner.

## 2026-11-07: chart.js and react-beautiful-dnd left at current majors

- Both are imported and functional. chart.js v2->v4 is a full options-API rewrite and dnd migration to @dnd-kit is a behavior refactor; both live behind auth where this audit cannot verify rendering. Documented as recommendations rather than forcing breaking migrations.

## 2026-11-07: TypeScript toolchain removed entirely

- Zero .ts/.tsx files. Removed tsconfig, ts-loader, typescript, all @types/*, the webpack rule and ts/tsx resolve extensions. If TS is wanted later, restore via git history.

## 2026-11-07: devtool set to cheap-module-source-map in dev only

- Was hardcoded false for all modes. Dev now gets maps; production still emits none.

## 2026-11-07: dead duplicated components deleted

- Header.jsx and AlertDelete.jsx were both marked "duplicated and not in use currently" with zero imports (Header also had latent undefined-handler bugs). Deleted rather than patched. call-worker.js, includes/call-workers.js and components/Firebase/todoAuth.jsx deleted as dead code. block.html and reeler.html kept as orphaned dev utilities.

## 2026-11-07: remaining lint errors left as documented debt

- 57 react/prop-types findings remain (adding PropTypes to every component is a large stylistic change with no runtime benefit). 1 no-unused-vars in untracked js/main/server.js. Baseline recorded so the script can gate future regressions.

## 2026-11-07: Commit convention

- AGENTS.md / agents.md does NOT exist in repo root (verified: `ls agents.md AGENTS.md` -> "No such file or directory").
- Fallback commit convention in use: `type(scope): message` (e.g. `chore(audit): scaffold tracker and plan`).
- No repo rules file found, so no project commit rules to mirror.
