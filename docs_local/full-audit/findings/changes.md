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
