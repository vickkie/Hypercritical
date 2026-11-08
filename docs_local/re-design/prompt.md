Hypercritical Backend & Admin Panel — Discovery & Build Plan
By Vickkie ·
Handoff spec for Code Agent. Goal: replace Hypercritical's all-Firebase data layer with a Node/Express API, and scaffold a new admin panel borrowed from promokings-admin's design/structure, as a new repo.
1. Current State (as documented)
Hypercritical today has no custom backend — it's browser-to-Firebase directly:
• Data store: Firebase Realtime Database, single consultations node.
• Auth: Firebase Authentication, gating a HashRouter SPA mounted on login.html (#loginpage) via a PrivateRoute wrapper.
• Admin routes: /login, /dashboard, /sales, /sales/:status?, /edit/:uuid, /newConsultation.
• Dashboard (Dashboard.jsx): onValue listener on consultations, counts status === "Pending" for a badge, renders a bar chart, revenue/top-countries view, todo list.
• Edit flow (EditConsultations.jsx): reads one consultation by UUID, admin updates status (Approved/Pending/Delivered/Canceled/Declined), progress (0–100%), seen, date, agreedAmount, timeline — writes via update().
• Public intake: contact.html → js/main/contact.js writes a new consultation straight into Firebase with status: "Pending" and a generated INV-xxxxxx invoice number. This is the only "creation" path.
• External calls: api.ipify.org + ip-api.com for visitor geolocation (stored as country); local includes/config.json fetch for links.
• server.js: ~40-line static file server only — not an API.
• Access control: entirely Firebase Auth + (presumably) Realtime DB security rules. No server-side enforcement exists today.
2. Target Architecture
contact.html (public form)          Admin SPA (React, promokings-admin-derived)
        │                                        │
        └──────────────┬─────────────────────────┘
                        ▼
              Node/Express API (new)
                        │
                 ┌──────┴──────┐
                 ▼             ▼
            Database      Auth (JWT)
        (consultations,   (admin users)
         invoices, users)
• Backend: Node + Express, REST API.
• Database: swap Firebase RTDB for a relational store (Postgres or MySQL — matches the rest of your stack better than staying NoSQL; flag if you'd rather keep a document store). Single consultations node becomes a proper consultations table, plus a users/admins table for auth.
• Auth: Firebase Auth → JWT-based session auth (access + refresh token), bcrypt-hashed admin credentials. PrivateRoute logic on the frontend stays conceptually the same, just checks a JWT instead of Firebase's client SDK session.
• Real-time updates: onValue listeners have no direct Express equivalent. Two options:
    ◦ Polling (simplest, fine for an admin panel with low write volume) — refetch on interval or on focus.
    ◦ WebSocket/SSE (Socket.IO or native SSE) if you want the live "new consultation just came in" badge behavior preserved exactly.
    ◦ Recommendation: start with polling + manual refresh, add Socket.IO only if the live-badge UX is a hard requirement.
• Admin panel UI: new SPA scaffolded from promokings-admin's layout, nav/drawer pattern, and component conventions (Agent will need to actually read promokings-admin's repo to mirror structure precisely — this plan assumes a similar React + MUI-or-equivalent shell, swap in once the real repo is inspected).
3. Data Model (first pass)
consultations
field
type
notes
id (uuid)
string, PK
replaces Firebase push key
invoice_number
string
INV-xxxxxx, generated server-side on create
status
enum
Pending / Approved / Delivered / Canceled / Declined
progress
int 0–100
project progress slider
seen
boolean

agreed_amount
decimal

timeline
string/date

country
string
from ipify/ip-api lookup, now done server-side on submit
created_at / updated_at
timestamp

...client contact fields

name/email/project details from contact.html — confirm exact field list from the live form
admin_users
field
type
notes
id
PK

email
string, unique

password_hash
string
bcrypt
created_at
timestamp

4. API Surface (mapped 1:1 from existing Firebase operations - this are for guide, free to adjust as needed to fit any need deemed required)
Method
Route
Replaces
POST
/api/auth/login
Firebase Auth sign-in
POST
/api/auth/refresh
token refresh
GET
/api/consultations
onValue on consultations node (supports ?status= filter → replaces /sales/:status?)
GET
/api/consultations/:id
single read for /edit/:uuid
POST
/api/consultations
public contact.html submission — generates invoice number + geolocation server-side
PATCH
/api/consultations/:id
update() from EditConsultations (status/progress/seen/date/amount/timeline)
DELETE
/api/consultations/:id
remove() — confirm this is actually used anywhere in the UI
GET
/api/dashboard/summary
pending count, revenue, top-countries aggregation (currently computed client-side in Dashboard.jsx)
5. Phased Plan
Phase 0 — Discovery (Agent, repo access required)
• Clone/inspect promokings-admin for real folder structure, component library, theming approach, auth pattern already in use there (you've used this pattern before for Zephir/Uzipay too).
• Clone/inspect hypercritical to confirm the exact contact.html field list, confirm whether remove() is used anywhere, confirm env var shape in Firebase/auth.jsx.
• Resolve open questions in §6 below.
Phase 1 — Repo scaffold
• New repo under projects, structure: /api (Express) + /admin (React, from promokings-admin scaffold) as either a monorepo or two repos — confirm preference.
• Wire up DB migrations for consultations + admin_users.
Phase 2 — Backend build
• Auth endpoints + JWT middleware.
• Consultations CRUD endpoints per §4.
• Server-side invoice-number generation + IP geolocation lookup (move off the client).
• Dashboard summary endpoint.
Phase 3 — Admin panel build
Scaffold routes mirroring the current SPA (/dashboard, /sales, /sales/:status?, /edit/:uuid, /newConsultation) wired to the new API instead of Firebase SDK calls.
[ ] Drawer/nav visually matching promokings-admin.
Phase 4 — Cutover
• Point contact.html at the new POST /api/consultations instead of Firebase.
• Data migration: export existing consultations node → import into new DB.
• Decommission Firebase config once verified.
Phase 5 — Verification
• Smoke test full lifecycle: public submission → admin sees it → status/progress edits persist → dashboard counts update.
6. Open Questions (resolve before/during Phase 0)
• Database choice: Postgres vs MySQL vs stay document-oriented (e.g. MongoDB)? Recommend Postgres given your Laravel/relational-heavy stack elsewhere, but Express doesn't require it.
• Monorepo (api + admin) or two separate repos?
• Is a live-update badge (current onValue behavior) a hard requirement, or is polling/manual refresh acceptable?
• Full field list on contact.html beyond what's described (name, email, project type, budget, etc.) — needs pulling from the live form.
• Does remove() (delete) actually get used anywhere in the current admin UI, or only update()?
• Hosting target for the new API (same VPS/Forge/Coolify setup used for belva-spark, or something else)?
• Any requirement to preserve Firebase data history/audit trail, or is a clean cutover fine?
7. Decisions Locked In
Superseding the open questions in §6:
• Database: MongoDB. Data model in §3 shifts from relational tables to collections — consultations and admin_users as Mongo collections, same fields, id becomes Mongo's _id (or a kept UUID string field if you want URL-stable IDs independent of Mongo's ObjectId — confirm in Phase 0).
• Two separate repos, not a monorepo: one for the Express API, one for the admin panel (scaffolded from promokings-admin). Confirm naming convention in Phase 0 (e.g. hypercritical-api / hypercritical-admin, matching the -admin/-backend suffix pattern used on your other projects).
• Hosting: Coolify, self-hosted by you. agents's job is to produce Coolify-deployable artifacts — Dockerfile, docker-compose.yml (or Coolify's expected config), .env.example with every required variable documented — not to deploy or touch the server. No production server access is needed or in scope for this work.
• Remaining §6 items (live-update badge requirement, exact contact.html field list, whether remove() is actually used in the admin UI) are left to Phase 0 discovery, with agents' using its own best judgment once it's actually read the two live repos: default to polling over WebSockets unless the real code shows a hard dependency on instant push updates, and include/exclude a DELETE endpoint based on what's actually wired up in the UI.
• New hard requirement for cutover: this isn't just a Firebase-to-Mongo swap for the consultations node. Any JSON-file-based data/config currently read directly by the frontend (e.g. includes/config.json, and any other static JSON driving content/links/manifest-style data) must also move into the database and be served through the new API — nothing in the rebuilt system should still be a static JSON file being fetched client-side for data that's meant to be managed. Phase 0 discovery should inventory every such JSON file in the repo, not just config.json, so Phase 2/3 can turn each into a proper collection + endpoint.
• Clean cutover confirmed — no requirement to preserve Firebase's history/audit trail through migration.
8. Execution Model — Orchestrator + Sub-Agents (Claude Code)

The phases in §5 have real parallelism once dependencies are respected. Structure execution as one orchestrator plus dedicated sub-agents, tracker-first, with strict evidence gates (no sub-agent marks a task done without a concrete artifact proving it — a passing request, a migrated row count, a commit hash).

Orchestrator

Owns a single tracker file (e.g. docs/EXECUTION_TRACKER.md) listing every sub-agent task, its status, its dependencies, and its evidence pointer.
Dispatches sub-agents only when their declared dependencies are marked done-with-evidence in the tracker.
Never writes code itself — sequencing and verification only.
Final gate before Phase 4 (cutover): orchestrator re-reads all evidence, confirms nothing is marked done without it, before authorizing the cutover task.

Sub-agents and their tracks

Agent	Scope	Depends on	Can run parallel with
A — Discovery: promokings-admin	Read-only. Inventories folder structure, component library, theming, nav/drawer pattern, auth pattern. Writes docs/discovery-admin-source.md. No commits, no mutation.	none	B
B — Discovery: hypercritical	Read-only. Confirms full contact.html field list, every static JSON file (not just config.json), whether remove() is used anywhere in the admin UI, exact shape of Firebase/auth.jsx. Writes docs/discovery-hypercritical.md. No commits, no mutation.	none	A
C — Backend scaffold (hypercritical-api)	New repo. Express app, Mongo models/collections from §3 (as revised by B’s findings), JWT middleware, CRUD + dashboard-summary endpoints from §4.	B	D, E
D — Admin scaffold (hypercritical-admin)	New repo. React SPA mirroring promokings-admin’s structure from A, routes from existing SPA, wired to C’s API once C exposes endpoints (can scaffold UI shell before that).	A	C, E
E — Data migration script	Exports Firebase consultations node + every JSON file B found, transforms into Mongo documents per the locked schema.	B (schema), C (target DB live)	D
F — Verification / smoke test	Full lifecycle: public submission → admin sees it → status/progress edits persist → dashboard counts update. Also confirms no static JSON is still being fetched client-side.	C, D, E	— (runs last)

Parallel execution order

A and B run concurrently — both read-only, no shared state.
Once A and B report done-with-evidence: C and D start concurrently (separate repos, no file overlap); E starts as soon as B’s schema is locked, concurrent with C/D.
F runs only after C, D, and E all report done-with-evidence.

Guardrails

Discovery agents (A, B) are strictly read-only — no commits, no edits to hypercritical or promokings-admin, output confined to new docs/discovery-*.md files.
Build agents (C, D, E) work only inside their own new repos — never touch hypercritical or promokings-admin source directly.
No agent gets Coolify/production access at any point — Dockerfile/compose/.env.example are deliverables, not deployment actions.
Every “done” status in the tracker must cite its evidence inline (file path, test output, or command result) — a status with no evidence pointer is treated as not done.
Bandwidth guardrail — revised

Only the actual movement of heavy media/binary assets waits for your go-ahead. Nothing else in the plan blocks on it — the orchestrator keeps dispatching every other sub-agent task end-to-end without pausing for a decision.

Gated — waits for go-ahead (everything else proceeds without it):

Full clone of promokings-admin or hypercritical if either repo’s media/binary payload (images, fonts, video, design exports) is large — Agent A/B default to shallow clone or sparse checkout of source + config, and queue a [DEFERRED - bandwidth] tracker entry only for the media pull itself, not for the discovery task as a whole. Discovery proceeds immediately on source/config; the media pull sits queued.
Exporting the Firebase consultations node if it contains embedded/attached media — the JSON/field export runs immediately; only the binary attachments (if any) get queued.
Data migration (Agent E) — schema-shaped data (text/numbers/relations) migrates immediately; any binary assets bundled in records get split out and queued separately so they don’t hold up the rest of E’s work.

Not gated — runs automatically, no pause:

All discovery reads (source, config, structure, auth patterns).
Repo scaffolding, schema/model writes, API endpoint code, admin UI component code (C, D).
npm/yarn install — not treated as heavy by default.
Docker builds for the Coolify deliverables (C) — proceed normally; only flag if a base image or dependency turns out to be unusually large, and even then don’t block, just note it.
Verification/smoke tests (F).

Tracker entry for a gated item:
[DEFERRED - bandwidth] <specific media/asset task> — est. size: <X> — rest of <parent task> proceeding — awaiting: go-ahead on unmetered connection