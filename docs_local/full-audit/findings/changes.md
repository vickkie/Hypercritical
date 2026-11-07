# Changes log

One entry per commit on audit/full-review-2026-11. 1:1 with `git log`.

## c20f339d chore(audit): scaffold tracker and plan

- What: docs_local/full-audit scaffold (plan.md, tracker.md, decisions.md, findings/*.md).
- Why: audit bookkeeping required before fixes.
- Evidence: file listing in repo.

## 0ce427fd fix(security): stop deploying source and config, remove secret define, drop debug log

- What: webpack.config.js copy patterns narrowed to js/library and runtime assets; removed server.js/.babelrc/.babel.config.json/tsconfig.json/README.md copies; removed stray comma in plugins array; removed BACKEND_DATABASE_URL DefinePlugin entry; js/main/login.js console.log and unused selectors removed.
- Why: source and backend config files were publicly served from public/; backend secret name must not be injectable into client bundles; debug log of password input element.
- Evidence: findings/security.md S1, S2, S3. Post build `ls public/` and `grep -rl DATABASE_URL public/*.bundle.js` (empty).

## 193dfcc5 fix(functional): repair broken links, dead widgets, and page errors

- What: repointed dead membership_signup nav links to contact in 10 templates and MultiMenu.jsx; removed dead Tidio widget script; fixed country Promise bug in contact.js; replaced manual DefinePlugin with Dotenv systemvars; added missing LDR_LLL1_0.png dithering texture and favicon to 404 page; removed menu chunk from 404; fixed offline.html font path; guarded .thirtyworks listener in project.js; .gitignore gains .env* via vercel CLI.
- Why: membership_signup never existed (404 on every nav click), tidio widget 404s upstream, country field stored a Promise, DefinePlugin broke Firebase outside Vercel, missing assets and mount points produced console errors.
- Evidence: findings/functional.md F1-F9; post-fix Playwright sweep of all 12 built pages shows zero console errors.

## 8d7cbb22 chore(repo): stop tracking built public output

- What: git rm -r --cached public (1023 generated files), added public/ to .gitignore.
- Why: build output was tracked, duplicating source and deploying backend/config files.
- Evidence: findings/architecture-deps.md A1.

## 5c58e2dc chore(deps): drop dead toolchain, rename lenis, add eslint

- What: removed packagex.json, ws, tsconfig, ts-loader, typescript, all @types/*, ts webpack rule and ts/tsx resolve extensions; replaced @studio-freight/lenis with lenis@^1.3.27 in works.js and services.js; installed eslint 8 and eslint-plugin-react; modernized .eslintrc; added lint script; dev-only source maps.
- Why: dead config and renamed/deprecated packages; no lint coverage despite an .eslintrc existing.
- Evidence: findings/architecture-deps.md A2, A5-A9. Build clean, 3 baseline size warnings.

## f1153cca fix(debt): lint-driven bug fixes, dead code removal, debug log sweep

- What: fixed missing firebase imports in Todo.jsx, undefined errorMessage renders, bare classList plus fake dblclick event, invalid metadata attr, target blank rel, menu remount wrappers, 22 hasOwnProperty sites, TodoForm inner declaration, async promise executor; removed unused imports/vars/params; deleted Header.jsx, AlertDelete.jsx, todoAuth.jsx, call-worker.js, includes/call-workers.js; removed debug logs; added firebase write rejection handler; removed dead Tidio polling; untracked coverage/.
- Why: eslint pass surfaced latent runtime bugs and dead code.
- Evidence: findings/tech-debt.md T1-T5; npm run lint now reports 58 errors (57 prop-types plus 1 untracked file) down from 914.

## Open items

- T6 npm test: NEEDS HUMAN REVIEW (findings/tech-debt.md).
- chart.js 2.x and react-beautiful-dnd: documented upgrades deferred (decisions.md).
- http://ip-api.com mixed content in geolocation fetch: documented (functional F4).
- SEO and performance recommendations: documented only, per audit scope.
