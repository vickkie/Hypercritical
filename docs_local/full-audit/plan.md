# Full audit and fix run: Hypercritical

Evidence gated audit and fix run on repository vickkie/Hypercritical (ref main).
Webpack 5 multi page static site: HTML templates, React islands in js/main/, Tailwind CSS, deployed to Vercel via vercel.json.
Mode: unguided, single local branch audit/full-review-2026-11, commit as you go, no push, no merge, no PR.

## Evidence standard

Every confirmed finding needs file path plus line range, pasted command output (npm audit, grep, curl -I, lighthouse), or a reproducible failure. Otherwise mark UNVERIFIED with the check needed. No guesses.

## Phase order

Discovery before implementation, per category.

Approved for implementation, in order:

1. Security
2. Broken links and functional
3. Architecture and dependencies
4. Technical debt

Audit only (document recommendations, no code changes):

5. SEO
6. Performance and Core Web Vitals

## Repo specific leads to verify

### Security (first)

- webpack.config.js CopyWebpackPlugin patterns (lines ~17-38) copy server.js, .babelrc, .babel.config.json, tsconfig.json, README.md, and the whole js/ source directory into public/ (the deploy output). Verify public/ is the Vercel served dir; if so, source and config files are publicly served. Fix by narrowing copy patterns.
- webpack.config.js:181-195 DefinePlugin inlines FIREBASE_* env vars and BACKEND_DATABASE_URL into production bundles. Firebase client keys in a bundle are normal; BACKEND_DATABASE_URL inlined into client JS is a potential secret exposure. Check where it is used; if it ships to the browser, log NEEDS HUMAN REVIEW (document location and scope, do NOT rotate).
- js/main/login.js:9 console.log(passwordInput) logs the password input element. Remove the console.log and the unused email/password/passwordInput selectors (lines 6-9).
- vercel.json has no headers. Add security headers (CSP, HSTS, X-Frame-Options or frame-ancestors, X-Content-Type-Options, Referrer-Policy, Permissions-Policy) via the vercel.json headers key. CSP must be compatible with inline scripts and partytown (~partytown dir is copied). Verify against built pages before committing.
- server.js is dev only (comment says use http-server). No headers needed there, but confirm it is not the prod server; document.
- Run npm audit, paste output. Suspects: chart.js@2.9.4, react-beautiful-dnd (deprecated), @studio-freight/lenis (renamed to lenis), ws in devDeps.
- Check js/main/contact.js (~line 133) and js/main/index.js (~line 689) for token/key handling; check .github/workflows/test.yml and webpack.yml for secret references (should be ${{ secrets.* }} only).
- XSS/injection: grep innerHTML, dangerouslySetInnerHTML, document.write in js/. js/main/login.js:12 sets innerHTML (static string, low risk). Verify all sinks.
- belva-cms, SQL injection, belva.on-forge.com items: not applicable to this repo. Mark N/A in tracker with reason.

### Functional

- Crawl all internal links across the 13 HTML pages (index, contact, services, works, studio, terms, privacy, process, project, login, 404, block, reeler, offline). vercel.json rewrites /:path* to /:path*.html then falls back to /404. Verify each nav link resolves under that scheme; check block.html, reeler.html, call-worker.js are reachable or orphaned.
- Serve public/ (or npm run build then npm start) and check: nav incl. mobile menu (js/main/MultiMenu.jsx), contact form submit/validation (js/main/contact.js), service worker hypercritical-worker.js registration and offline.html fallback, console errors per page. Playwright if available, else curl status crawl plus manual DOM checks. Log every 404/500/JS error with evidence.

### Architecture and dependencies

- public/ contains committed build output duplicating source (public/js/main/..., public/js/main/server.js). Verify whether public/ is gitignored or tracked; if tracked build artifacts are committed, recommend and add ignore rules and remove from index (document decision in decisions.md).
- packagex.json: likely dead duplicate of package.json. Verify nothing references it, then remove.
- chart.js@2.9.4: check usage (grep chart in js/). Upgrade to v4 or remove if unused. react-beautiful-dnd deprecated: check usage, replace with @dnd-kit or remove if unused. @studio-freight/lenis renamed to lenis. @types/chart.js@2.x mismatched. Verify each is actually imported before changing.
- tsconfig.json and ts-loader exist. Check if any .ts/.tsx files exist; if none, dead config (document, optionally remove).
- webpack.config.js has a stray comma at line 40 (orphaned comma in plugins array). devtool: false always; consider source-map only for dev (log decision).
- No lint script despite .eslintrc.js. Add "lint": "eslint js/ --ext .js,.jsx" and run it; fix or log findings.
- Verify npm run build produces a clean production build with no warnings; paste output.

### Technical debt

- Unused vars/imports: js/main/login.js; run eslint no-unused-vars across js/.
- console.log sweep across js/; remove debug logs, keep intentional error logging.
- TODO/FIXME/HACK grep across repo; log each with location.
- Duplicate/dead code: js/library/ contents vs js/main/; call-worker.js vs hypercritical-worker.js; check which is registered.
- Unhandled promises: grep fetch( and .then( without .catch in js/main/contact.js, index.js, Firebase components.
- jest.config.js and __tests__/ exist. Run npm test, log pass/fail; fix failing tests only if the fix is unambiguous, else NEEDS HUMAN REVIEW.

### SEO (audit only)

- Check each HTML template for title, meta description, canonical, OG/Twitter tags, single H1, img alt text; check robots.txt and sitemap.xml in public/ or copied assets. Document recommendations only.

### Performance (audit only)

- Run Lighthouse (mobile) against the built site if tooling available; otherwise document statically: render blocking bundles per page, chart.js/gsap/swiper/firebase bundle weight, lozad lazy loading usage, font loading. Recommendations only.

## Unguided decision rules

Every non obvious call gets a dated decisions.md entry with evidence.

STOP and flag (NEEDS HUMAN REVIEW, skip commit) for: any exposed rotate worthy secret (esp. BACKEND_DATABASE_URL if it reaches the client bundle), anything touching production data or deploy config beyond adding headers, any auth change that could lock out users (Firebase auth in js/main/components/Firebase/ and LoginPage.jsx; audit, do not restructure auth flow).

One commit per checklist item or tight cluster; changes.md entry per commit (what/why/evidence/hash).

No push, no merge, no PR.

## Completion criteria

- tracker.md: every item is Fixed+Verified / Documented (audit only) / N-A-with-reason / NEEDS HUMAN REVIEW.
- findings/*.md: evidence for every item.
- changes.md: 1:1 with git log on the branch.
- decisions.md: every unguided call.
