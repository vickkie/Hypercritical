# Security findings

Evidence collected during audit. Entries in chronological order.

## S1 CONFIRMED: CopyWebpackPlugin deployed source and config files

Before fix, `webpack.config.js` lines 26-33 copied `server.js`, `.babelrc`, `.babel.config.json`, `tsconfig.json`, `README.md`, and the whole `js/` tree into `public/` (the deploy output dir, `output.path` at line 219 and `npm start` serves `http-server public`).

Evidence that copies reached deploy output and git:

```
$ git ls-files public | grep -iE "server|babel|tsconfig|README"
public/.babel.config.json
public/.babelrc/.babelrc
public/README.md
public/js/main/server.js
public/server.js
public/tsconfig.json
```

`public/js/main/server.js` was a minified copy of `js/main/server.js`, an Express/firebase-admin backend file that reads `../../secure/serviceAccountKey.json` and `process.env.FIREBASE_DATABASE_URL`. No secrets are inline in that file, but backend source and internal structure were publicly served. The broad `js/` copy would also deploy `js/main/.env` or `secure/` content if it ever lands under `js/` (both are gitignored, so deploy was the only leak path).

Verification after fix: production build output contains only `public/js/library/` (the only js path referenced by HTML, verified by `grep -rhoE 'js/[a-zA-Z0-9._/-]+' *.html | sort -u`), and `ls public/` shows no `server.js`, `.babelrc`, `.babel.config.json`, `tsconfig.json`, or `README.md`.

Fix: narrowed copy patterns to `js/library` only and removed the config file copies.

## S2 CONFIRMED (no live exposure): BACKEND_DATABASE_URL DefinePlugin entry

`webpack.config.js:192` defined `process.env.BACKEND_DATABASE_URL` for client bundles. Evidence it never reached the browser: `grep -rn "BACKEND_DATABASE_URL" js/` returns zero references outside webpack.config.js, and after build `grep -rl "DATABASE_URL" public/*.bundle.js` returns nothing.

Removed the DefinePlugin entry anyway as hardening so a future `process.env.BACKEND_DATABASE_URL` reference cannot silently ship a backend secret to the client.

## S3 CONFIRMED + FIXED: login.js debug log

`js/main/login.js` logged the password input element and selected unused nodes:

```js
const email = select(".inputLogin1");
const password = select(".inputLogin2");
const passwordInput = select(".inputLogin2");
console.log(passwordInput);
```

Fixed: removed lines 6-9. `titlePage` is still used by the mobile `innerHTML` assignment.

## S4 CONFIRMED + FIXED: no security headers

`vercel.json` had rewrites only. Added a `headers` block: CSP (allowlists unpkg, cdnjs, code.tidio.co, googletagmanager for scripts; firebaseio, firebasedatabase, googleapis, GA, tidio, ipify, ip-api for connect-src; tidio frame-src; worker-src 'self' blob: for partytown; 'unsafe-inline' required for script-src and style-src due to inline partytown bootstrap and style-loader injected styles), HSTS, X-Frame-Options DENY, X-Content-Type-Options nosniff, Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy. JSON validity verified with `node -e "JSON.parse(...)"`.

Residual risk: 'unsafe-inline' script-src is required by inline bootstrap scripts in every HTML template (partytown config etc.); removing it would need nonces which html-webpack-plugin minification does not support here. Documented, not a blocker.

## S5 CONFIRMED: server.js is dev only

`server.js:1` comment: `//TEST ON LOCAL--USE HTTP-SERVER INSTEAD`. `package.json` start script uses `http-server public`. Not the production server. No headers added there. Deploy targets are Vercel (CLI) and GitHub Pages (workflow publishes `./public`), both static.

## S6 npm audit (baseline, before dep work)

```
48 vulnerabilities (7 low, 22 moderate, 15 high, 4 critical)
```

Notable: `tar <=7.5.20` critical (via cacache), `websocket-driver <=0.7.4` critical, `ws 8.0.0-8.20.1` high, `uuid <11.1.1` moderate (fix forces breaking uuid@14), `yaml` moderate, `swiper` breaking upgrade offered. Full `npm audit` table recorded in decisions notes; dependency changes handled under architecture-deps.

## S7 CONFIRMED OK: token and key handling

- `js/main/contact.js:133` and `js/main/index.js:689` use `process.env.FIREBASE_*` for client-side `initializeApp` config. Firebase web API keys are public identifiers by design (security is via Firebase Rules/App Check, not key secrecy). Not a finding.
- Workflows reference secrets only via `${{ secrets.* }}` (test.yml, webpack.yml verified). `webpack.yml` writes a build-time `.env`; `.env` is gitignored.
- `js/main/server.js` (gitignored, was deployed via broad copy - see S1) uses `secure/serviceAccountKey.json` which does not exist in the repo and was never committed. `git ls-files | grep -i secure` returns nothing.

## S8 XSS sinks

Sinks verified:

- `assignExp(config)` in index.js:112, project.js:122, studio.js:446, services.js:312, privacy.js:84, terms.js:83, process.js:97 sets `element.innerHTML = config[key]` where config comes from `includes/config-data.json`, a first-party static file shipped with the site. Low risk (author controlled), sink documented.
- `dangerouslySetInnerHTML` in ProjectContent.jsx:163,208 (`pageData.aim`, `pageData.solution`), workSlider.jsx:76 (`selectedProject.heading`), modal.jsx:113 (`selectedPartner.intro`). Data sources are local project/partner data files. Low risk, documented.
- login.js:12 `titlePage.innerHTML = "H.C"` static string, safe.
- index.js:982 `menuItem3.innerHTML = '...'` static markup, safe.
- code-anime/item.js:146 sets innerHTML to a generated random string, internal.
- works.js:172 `element.innerHTML = ""` clearing, safe.

Recommendation (documented): if `includes/config-data.json` or project data ever accepts external input, add sanitization (e.g. DOMPurify) at the sink.

## S9 N/A

belva-cms, SQL injection, belva.on-forge.com items: not applicable to this repo (separate project). No SQL anywhere in the codebase.
