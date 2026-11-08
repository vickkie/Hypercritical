# Tracker

Status legend: Fixed+Verified | Documented (audit only) | N/A with reason | NEEDS HUMAN REVIEW | UNVERIFIED | In progress

## Security

| # | Item | Status | Evidence |
|---|------|--------|----------|
| S1 | CopyWebpackPlugin copies source/config into public/ | Fixed+Verified | findings/security.md S1 |
| S2 | DefinePlugin inlines BACKEND_DATABASE_URL into client bundle | Fixed+Verified | findings/security.md S2 (never reached bundle; define removed) |
| S3 | login.js console.log(passwordInput) and unused selectors | Fixed+Verified | findings/security.md S3 |
| S4 | vercel.json security headers | Fixed+Verified | findings/security.md S4 |
| S5 | server.js dev only confirmation | Documented | findings/security.md S5 |
| S6 | npm audit | Documented | findings/security.md S6 (dep fixes under A items) |
| S7 | Token/key handling in contact.js and index.js; workflow secrets | Documented | findings/security.md S7 |
| S8 | XSS sinks: innerHTML, dangerouslySetInnerHTML, document.write | Documented | findings/security.md S8 |
| S9 | belva-cms / SQLi / belva.on-forge.com | N/A | Not this repo; items belong to a different project |

## Functional

| # | Item | Status | Evidence |
|---|------|--------|----------|
| F1 | Internal link crawl across 13 HTML pages under vercel.json rewrite scheme | Fixed+Verified | findings/functional.md F1 |
| F2 | block.html, reeler.html, call-worker.js reachable or orphaned | Documented | findings/functional.md F2 (orphaned, left in place) |
| F3 | Nav and mobile menu (MultiMenu.jsx) | Fixed+Verified | findings/functional.md F3 |
| F4 | Contact form submit/validation | Fixed+Verified | findings/functional.md F4 |
| F5 | Service worker registration and offline fallback | Fixed+Verified | findings/functional.md F5 |
| F6 | Per page console errors | Fixed+Verified | findings/functional.md F6-F9 |

## Architecture and dependencies

| # | Item | Status | Evidence |
|---|------|--------|----------|
| A1 | public/ tracked build output | Fixed+Verified | findings/architecture-deps.md A1 |
| A2 | packagex.json dead duplicate | Fixed+Verified | findings/architecture-deps.md A2 |
| A3 | chart.js 2.9.4 usage | Documented | findings/architecture-deps.md A3 (in use, v2 API, no advisory; upgrade deferred) |
| A4 | react-beautiful-dnd usage | Documented | findings/architecture-deps.md A4 (in use; migration is a refactor) |
| A5 | @studio-freight/lenis rename | Fixed+Verified | findings/architecture-deps.md A5 |
| A6 | @types/chart.js mismatch | Fixed+Verified | findings/architecture-deps.md A6 |
| A7 | tsconfig and ts-loader dead config | Fixed+Verified | findings/architecture-deps.md A7 |
| A8 | webpack stray comma line 40; devtool false | Fixed+Verified | findings/architecture-deps.md A8 |
| A9 | lint script missing | Fixed+Verified | findings/architecture-deps.md A9 |
| A10 | Clean production build | Fixed+Verified | findings/architecture-deps.md A10 |

## Technical debt

| # | Item | Status | Evidence |
|---|------|--------|----------|
| T1 | Unused vars/imports (eslint no-unused-vars) | Fixed+Verified | findings/tech-debt.md T1 |
| T2 | console.log sweep | Fixed+Verified | findings/tech-debt.md T2 |
| T3 | TODO/FIXME/HACK grep | Documented | findings/tech-debt.md T3 |
| T4 | Dead code: js/library vs js/main; call-worker vs hypercritical-worker | Fixed+Verified | findings/tech-debt.md T4 |
| T5 | Unhandled promises | Fixed+Verified | findings/tech-debt.md T5 |
| T6 | npm test | NEEDS HUMAN REVIEW | findings/tech-debt.md T6 (jest env + stale test shape) |

## SEO (audit only)

| # | Item | Status | Evidence |
|---|------|--------|----------|
| E1 | Per page title/meta/canonical/OG/H1/alt | Documented | findings/seo.md |
| E2 | robots.txt and sitemap.xml | Documented | findings/seo.md (both missing; recommendation) |

## Performance (audit only)

| # | Item | Status | Evidence |
|---|------|--------|----------|
| P1 | Lighthouse or static perf review | Documented | findings/performance.md |
