# Architecture and dependency findings

## A1 CONFIRMED + FIXED: tracked build output

`public/` was committed: `git ls-files public | wc -l` -> 1023 files, including mirrored source (`public/js/main/*.jsx`), config copies, and the gitignored `js/main/server.js` (see security S1). Deploys rebuild it (gh-pages workflow `publish_dir: ./public`, Vercel CLI). Fixed: `git rm -r --cached public`, added `public/` to `.gitignore`. Commit 8d7cbb22.

Caveat documented in decisions: if the Vercel project is configured to serve a committed directory with no build step, deployment would break; evidence indicates it builds (CI runs `npx webpack` and the Vercel project lists env vars for the build).

## A2 CONFIRMED + FIXED: packagex.json

Zero references anywhere (`grep -rn packagex .` returns nothing). Near-duplicate of package.json with a stale watch script and a `npm run buld` typo. Deleted.

## A3 chart.js@2.9.4: USED, documented

Used in `js/main/components/Views/ProjectsChart.jsx` (`import Chart from "chart.js"`, loaded via Dashboard.jsx on the login app). Uses the v2 options API (`xAxes`, `yAxes`, `tooltips`, `legend.labels.fontColor`, `scaleLabel`, `gridLines`) which was fully renamed in v3/v4. npm audit does NOT flag chart.js. Decision: no upgrade this pass - a v2->v4 migration rewrites the options object and needs visual verification on an auth-gated page. Recommendation logged.

## A4 react-beautiful-dnd: USED, documented

Imported in `js/main/components/Fragments/Todo.jsx` (DragDropContext/Droppable/Draggable drive real drag reorder + Firebase `update`). Deprecated upstream, but migrating to @dnd-kit is a behavior refactor on an auth page, not an audit fix. Recommendation: migrate in a dedicated pass.

## A5 CONFIRMED + FIXED: @studio-freight/lenis renamed

`works.js:2` and `services.js:2` imported the scoped package. Replaced with `lenis@^1.3.27` (the renamed package, same API: constructor/raf/on/destroy all verified in call sites). Commented-out imports in studio.js/contact.js left as comments. Rebuild clean.

## A6 FIXED: @types/chart.js and all @types/* removed

No `.ts`/`.tsx` files exist (`find . -name '*.ts*' -not -path './node_modules/*'` -> empty), so all `@types/*` devDeps were dead. Removed: @types/chart.js, @types/gsap, @types/lozad, @types/react-dom, @types/webpack-dotenv-plugin.

## A7 CONFIRMED + FIXED: dead TypeScript toolchain

No TS sources. Removed `tsconfig.json`, `ts-loader`, `typescript`, the webpack `ts-loader` rule, and `.tsx`/`.ts` resolve extensions. `jest.config.js` still lists ts/tsx in moduleFileExtensions - harmless, left.

## A8 FIXED (earlier): stray comma + devtool

Stray comma in plugins array removed in security commit. `devtool` changed from always-false to `cheap-module-source-map` in development only (production still emits no maps - decision logged).

## A9 CONFIRMED + FIXED: lint script added

`.eslintrc.js` existed but eslint was not installed and the config predated the code (ecmaVersion 12, no JSX, no globals for script-tag vendors). Installed `eslint@8.57.1` + `eslint-plugin-react@7.37.5` (v8 for the legacy .eslintrc format), added `"lint": "eslint js/ --ext .js,.jsx"`, and updated the config: ecmaVersion 2022, jsx, node env, vendored globals (gsap, SplitText, ScrollTrigger, ScrollSmoother, TweenMax, Quint/Quart/Quad, Ease, Magnetic, imagesLoaded, jQuery, $), and ignorePatterns for js/library, public, coverage.

Result: 914 errors -> 58 errors (57 prop-types + 1 untracked file). See findings/tech-debt.md for what was fixed.

## A10 Clean production build verified

`npm run build` compiles with 3 warnings, all pre-existing webpack size advisories (loginpage 1.49 MiB entrypoint, large image/video assets). Zero errors. After the Dotenv/DefinePlugin consolidation the 8 DefinePlugin conflict warnings are also gone (was 19 warnings with .env present).

## ws removed

`ws` was a direct devDep (`>=7.5.10`) with zero require/import references in source. Removed; its `ws` advisory (high, GHSA-58qx/96hv) no longer applies to the direct tree.

## npm audit post-change

Baseline was 48 vulnerabilities (7 low, 22 moderate, 15 high, 4 critical). Direct-dependency changes made: lenis rename, ws/tsconfig/types/ts-loader removal, eslint added. Remaining count to be re-run and pasted in changes notes; most findings are transitive (tar via cacache, websocket-driver, yaml) or breaking-fix packages (swiper 14, uuid 14) that are out of minimal-fix scope.
