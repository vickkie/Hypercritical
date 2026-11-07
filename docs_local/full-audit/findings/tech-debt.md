# Technical debt findings

## T1 FIXED (surgical): unused vars and imports

eslint `no-unused-vars` pass after config fix. Fixed the meaningful classes:

- Unused imports: Dashboard.jsx (useMemo, useRef, update, remove, Swal, SearchInput, ProjectSales), AddConsultations (useParams), TodoList (uuidv4), index.js (push), ProjectPage.jsx (whole react-router import), ProjectVanilla.jsx (React/useEffect), contact.js (push), login.js (selectAll helper).
- Dead state/vars: Dashboard (status, inputRef, consultations, searchQuery, dataState, errorMessage reads), Drawer (theme, pages), ProjectContent (restMedia), ProjectPage (currentIndex, urlstate, path), works.js (customWrapper, content, body, thisDOM), studio.js (progressBar, partnerInnerElement), index.js (slideId, heroMedia, playVideo function + jsdoc), services.js (herolargelogo).
- Side-effect bindings converted to bare calls (behavior preserved): cursorme/cursor/elephantcursor/mouseFollower (MouseFollower), herotext/splitText/title (SplitText), darken/playvideotl/progressAnimation (gsap timelines), reeller (Reeller), menuUzi (MenuUzi), gsapHover.
- Unused callback params removed across forEach/addEventListener/lozad/promise sites in index, works, services, process, project, contact, studio, modal, workSlider, multimenu, ProjectVanilla.
- Deleted dead files: js/main/components/Fragments/Header.jsx and AlertDelete.jsx (both marked "duplicated and not in use currently", zero imports; Header also contained latent `handleDrawerOpen`/`open` bugs).

Remaining lint output: 58 errors - 57 `react/prop-types` (components lack PropTypes declarations; stylistic, large surface to add properly) + 1 no-unused-vars in untracked `js/main/server.js`. Logged, not forced.

## T2 FIXED (partial): console.log sweep

Removed clear debug logs: ProjectPage.jsx ("failed"), works.js ("going dark"), Todo.jsx (3: "passed,delete id", "Order updated in Firebase", JSX todo.id log), TodoList.jsx ("update id is"), ProjectHero.jsx (2: "exported", "currentPageData-v1"). Converted LoginPage.jsx error log to console.error. Kept intentional logs: branding greeting ("%c Greetings from Hypercritical"), console.error/warn in catch handlers, Sales/Dashboard status logs ("No data available", "Consultation ... successfully" admin notifications), updateDeployment.js build output, untracked server.js.

## T3 Documented: TODO/FIXME/HACK

Real markers (todo-list CSS class names excluded):

- `js/main/projects/ProjectContent.jsx:12` - `//TODO needs improvements`
- `js/main/components/Sales.jsx:58` - `//TODO :Read data from database`
- `js/main/components/Dashboard.jsx:35` - `//TODO :Read data from database`

## T4 FIXED + documented: dead code

- Deleted: `call-worker.js` (only ref was a commented-out script tag in index.html:19), `includes/call-workers.js` (unreferenced duplicate SW registration), `js/main/components/Firebase/todoAuth.jsx` (zero imports; also used nonexistent `REACT_APP_FIREBASE_*` env names - would throw if ever imported).
- Orphaned (documented, kept): `block.html` (ISP block test tool), `reeler.html` (reeller demo) - not built, not linked.
- `js/library/` vs `js/main/`: library holds vendored third-party scripts loaded by templates; main holds first-party modules - different roles, not duplication.
- Duplicate `assignExp`/`assignLinks` helpers are copy-pasted across page bundles (index, project, studio, services, privacy, terms, process) - documented as refactor opportunity, not fixed (behavior-preserving duplication).

## T5 FIXED + documented: unhandled promises

- `contact.js`: Firebase `set()` on form submit had no rejection handler - added `.catch` logging "Failed to save consultation".
- `js/main/components/Fragments/TodoList.jsx`: `new Promise(async ...)` executor converted to a plain async function (errors now reject correctly instead of becoming unhandled rejections).
- Existing `.catch` chains verified on config fetches (index.js, project.js, contact.js).
- Documented: `onValue` callbacks and fire-and-forget `set()`/`update()` calls elsewhere in dashboard components lack error surfacing - consistent with codebase style, logged not changed.

## T6 NEEDS HUMAN REVIEW: test suite

`npm test` fails at collection:

1. Fixed: stale `import "@testing-library/jest-dom/extend-expect"` (subpath removed in jest-dom v7; the package itself is already imported a line above). Removed.
2. Remaining: `modal.test.jsx` declares `@jest-environment node` but imports `js/main/modal.jsx`, which calls `document.getElementById` at module scope and exports nothing matching `import App` - the test references an `App` default export and asserts on "Partner Button"/"Find out more" that do not exist in the component. `jest-environment-jsdom` is not installed. The test was written against a different module shape; fixing needs an environment decision (install jest-environment-jsdom + docblock change) plus a component export or test rewrite. Flagged NEEDS HUMAN REVIEW, suite left failing as before (pre-existing, not a regression: last test commit 59d9cfdf predates this audit).

## Real bugs surfaced by lint (fixed during architecture pass)

- `js/main/components/Fragments/Todo.jsx`: used `getDatabase`, `ref`, `update` without importing them - ReferenceError on every drag reorder. Added firebase/database import.
- `js/main/components/Fragments/AddConsultations.jsx` + `EditConsultations.jsx`: rendered `{errorMessage}` but the state variable is `error` - error state rendered nothing/crashed. Now renders `{error}` (string).
- `js/main/contact.js`: `classList.remove("clicked")` bare identifier + fake `doubleclicked` event name - fixed to `checkradio.parentElement.classList` + `dblclick`.
- `js/main/MultiMenu.jsx`: 3 `target="_blank"` links without `rel` - added `rel="noopener noreferrer"`; ComponentToRender wrapper functions replaced with direct component references (also fixes remount-on-render and display-name warnings).
- `js/main/projects/ProjectContent.jsx`: invalid `metadata` JSX attribute -> `preload="metadata"`.
- 22 `obj.hasOwnProperty(x)` call sites -> `Object.prototype.hasOwnProperty.call(obj, x)` (no-prototype-builtins).
- `js/main/components/Fragments/TodoForm.jsx`: function declared inside else block hoisted (no-inner-declarations).
