# Tracker

Status legend: Fixed+Verified | Documented (audit only) | N/A with reason | NEEDS HUMAN REVIEW | UNVERIFIED | In progress

## Security

| # | Item | Status | Evidence |
|---|------|--------|----------|
| S1 | CopyWebpackPlugin copies source/config into public/ | In progress | pending |
| S2 | DefinePlugin inlines BACKEND_DATABASE_URL into client bundle | In progress | pending |
| S3 | login.js console.log(passwordInput) and unused selectors | In progress | pending |
| S4 | vercel.json security headers | In progress | pending |
| S5 | server.js dev only confirmation | In progress | pending |
| S6 | npm audit | In progress | pending |
| S7 | Token/key handling in contact.js and index.js; workflow secrets | In progress | pending |
| S8 | XSS sinks: innerHTML, dangerouslySetInnerHTML, document.write | In progress | pending |
| S9 | belva-cms / SQLi / belva.on-forge.com | N/A | Not this repo; items belong to a different project |

## Functional

| # | Item | Status | Evidence |
|---|------|--------|----------|
| F1 | Internal link crawl across 13 HTML pages under vercel.json rewrite scheme | In progress | pending |
| F2 | block.html, reeler.html, call-worker.js reachable or orphaned | In progress | pending |
| F3 | Nav and mobile menu (MultiMenu.jsx) | In progress | pending |
| F4 | Contact form submit/validation | In progress | pending |
| F5 | Service worker registration and offline fallback | In progress | pending |
| F6 | Per page console errors | In progress | pending |

## Architecture and dependencies

| # | Item | Status | Evidence |
|---|------|--------|----------|
| A1 | public/ tracked build output | In progress | pending |
| A2 | packagex.json dead duplicate | In progress | pending |
| A3 | chart.js 2.9.4 usage | In progress | pending |
| A4 | react-beautiful-dnd usage | In progress | pending |
| A5 | @studio-freight/lenis rename | In progress | pending |
| A6 | @types/chart.js mismatch | In progress | pending |
| A7 | tsconfig and ts-loader dead config | In progress | pending |
| A8 | webpack stray comma line 40; devtool false | In progress | pending |
| A9 | lint script missing | In progress | pending |
| A10 | Clean production build | In progress | pending |

## Technical debt

| # | Item | Status | Evidence |
|---|------|--------|----------|
| T1 | Unused vars/imports (eslint no-unused-vars) | In progress | pending |
| T2 | console.log sweep | In progress | pending |
| T3 | TODO/FIXME/HACK grep | In progress | pending |
| T4 | Dead code: js/library vs js/main; call-worker vs hypercritical-worker | In progress | pending |
| T5 | Unhandled promises | In progress | pending |
| T6 | npm test | In progress | pending |

## SEO (audit only)

| # | Item | Status | Evidence |
|---|------|--------|----------|
| E1 | Per page title/meta/canonical/OG/H1/alt | In progress | pending |
| E2 | robots.txt and sitemap.xml | In progress | pending |

## Performance (audit only)

| # | Item | Status | Evidence |
|---|------|--------|----------|
| P1 | Lighthouse or static perf review | In progress | pending |
