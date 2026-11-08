# Performance findings (audit only, no code changes)

Static analysis of the build output and webpack config. No Lighthouse run (headless local; recommendations verified against bundles directly).

## Bundle weight

- `loginpage.bundle.js` is 1.49 MiB minified: largest modules are `@firebase/database` (551 KiB), `firebase/auth` (459 KiB), `chart.js` (433 KiB) - all loaded eagerly on the login page entrypoint.
- Every HTML page loads its page bundle plus the shared `menu.bundle.js`. No code splitting: `splitChunks` is not configured, so shared code (firebase, gsap usage, React) is duplicated per-entry where imported.
- `output.filename` is `[name].bundle.js` with no `[contenthash]` - combined with SW precaching this serves stale bundles after deploys (observed live during verification).
- Firebase: both `initializeApp` and full `firebase/database` + `firebase/auth` are bundled in index.js and contact.js chunks (not just login). The public marketing pages pay the firebase cost for a single consultation-form write; consider a dynamic `import()` so firebase loads on submit, and check whether auth is needed outside the login entrypoint.

## Asset weight

- CopyWebpackPlugin ships the full `assets/` tree: multiple multi-MB PNGs (e.g. `0_0_Free Standing iPhone Pro Mockup.psd_01.png` 3.8 MiB, `iPhone Stone Hands Mockup DKgoodart.psd_10.png` 4.1 MiB) and videos (`ghero.mp4` 10.1 MiB, `world-*.mp4`). webpack asset-size warnings flag these. Most have `.webp` twins - audit that templates/lozad sources reference the webp variants and consider dropping the uncompressed originals from deploy.
- `js/library/` ships vendored libs that may be redundant: `TweenMax.min.js` AND `gsap.min.js` (GSAP 2 vs 3 - different APIs, check both are actually needed), `jquery-3.6.0.min.js`, `vue.min.js` (Vue runtime on a React/vanilla site - check usage), plus local copies of react/react-dom UMD builds that duplicate the bundled React 18.

## Render path

- Every page loads several `<script>` tags synchronously or deferred in the head/footer (jquery, TweenMax, gsap cdn + local copies, scrolltrigger, scrollsmoother, split-text, multi-menu, includes/*.js) plus 1-2 webpack bundles. The head contains multiple render-blocking stylesheet links per page (css/*.css per page). Recommend: defer non-critical vendor scripts, and confirm both local and CDN copies of gsap are not double-loaded (cdnjs gsap.min.js AND js/library/gsap.min.js appear in the script inventory).
- Fonts: local woff/woff2 in `fonts/` - `SpaceGrotesk.woff2` + woff and several others; check `font-display: swap` in css @font-face rules.

## Runtime

- `lozad` lazy loading is used (`.lozad` observer in page entries) - good; verify `loading="lazy"`/lozad attributes cover the heavy works-page images.
- Service worker `hypercritical-worker.js` precaches into `Hypercritical-offline` - combined with unversioned bundle names this is a stale-content risk; a cache version bump or contenthash filenames would fix it.
- Partytown correctly offloads the GTM script (`type="text/partytown"`) - good.

## Build hygiene (already fixed during audit)

- 8 DefinePlugin conflict warnings removed; production `devtool: false` retained (dev-only `cheap-module-source-map` added) so no sourcemaps ship.

## Recommendations summary

1. Add `optimization.splitChunks` (or at least a vendor chunk) so firebase/react/vendor code is shared between page bundles.
2. `import()` firebase inside the contact-form submit handler instead of top-level in the marketing bundles.
3. contenthash filenames + SW cache versioning to prevent stale bundles.
4. Defer/dedupe vendored scripts; drop unused libs (vue.min.js, TweenMax vs gsap3, local react UMD duplicates) after verifying no template references them.
5. Serve webp/avif variants by default; exclude multi-MB PNG/MP4 originals from the deploy copy where a compressed twin exists.
