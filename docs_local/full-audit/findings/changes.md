# Changes log

One entry per commit on audit/full-review-2026-11. 1:1 with `git log`.

## c20f339d chore(audit): scaffold tracker and plan

- What: docs_local/full-audit scaffold (plan.md, tracker.md, decisions.md, findings/*.md).
- Why: audit bookkeeping required before fixes.
- Evidence: file listing in repo.

## <pending> fix(security): stop deploying source and config, remove secret define, drop debug log

- What: webpack.config.js copy patterns narrowed to js/library and runtime assets; removed server.js/.babelrc/.babel.config.json/tsconfig.json/README.md copies; removed stray comma in plugins array; removed BACKEND_DATABASE_URL DefinePlugin entry; js/main/login.js console.log and unused selectors removed.
- Why: source and backend config files were publicly served from public/; backend secret name must not be injectable into client bundles; debug log of password input element.
- Evidence: findings/security.md S1, S2, S3. Post build `ls public/` and `grep -rl DATABASE_URL public/*.bundle.js` (empty).

## <pending> fix(functional): repair broken links, dead widgets, and page errors

- What: repointed dead membership_signup nav links to contact in 10 templates and MultiMenu.jsx; removed dead Tidio widget script; fixed country Promise bug in contact.js; replaced manual DefinePlugin with Dotenv systemvars; added missing LDR_LLL1_0.png dithering texture and favicon to 404 page; removed menu chunk from 404; fixed offline.html font path; guarded .thirtyworks listener in project.js; .gitignore gains .env* via vercel CLI.
- Why: membership_signup never existed (404 on every nav click), tidio widget 404s upstream, country field stored a Promise, DefinePlugin broke Firebase outside Vercel, missing assets and mount points produced console errors.
- Evidence: findings/functional.md F1-F9; post-fix Playwright sweep of all 12 built pages shows zero console errors.
