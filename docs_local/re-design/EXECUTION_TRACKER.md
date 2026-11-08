# Execution tracker: backend and admin rebuild

Spec: docs_local/re-design/prompt.md. Locked decisions: MongoDB, two repos, Coolify artifacts only, polling over websockets, JSON files move to DB, clean cutover.

| Agent | Scope | Status | Evidence |
|-------|-------|--------|----------|
| A | Discovery: promokings-admin conventions | Done | hypercritical-admin/docs/discovery-admin-source.md |
| B | Discovery: hypercritical fields/JSON | Done | contact.js fields (name,email,message,budget,consultationType,uuid,status,seen,country,comment,date); remove() used in Sales.jsx/Dashboard.jsx imports; JSON inventory: includes/config.json, config-data.json, project-data.json, site.webmanifest, manifest.json |
| C | Backend scaffold hypercritical-api | Done | /home/quinzel/projects/hypercritical-api, 6 commits on main, node --check + route smoke passed |
| D | Admin scaffold hypercritical-admin | Done | /home/quinzel/projects/hypercritical-admin, 6 commits on main, npm run build -> dist/ |
| E | Migration script | Done | hypercritical-api/scripts/migrate.js (FIREBASE_EXPORT_PATH), seed.js upserts includes/*.json into Config collection |
| F | Verification / smoke test | Done | Live Mongo (docker): login->token, public create INV-537148, list auth, GET uuid, PATCH status/progress/seen, dashboard counts update, refresh token, config GET (seeded JSON served), DELETE, logout, unauth 401. All passed. |

Cutover note: contact.js repoint to POST /api/consultations is Phase 4 and needs the deployed API URL; tracked as follow-up, snippet to be provided.

## Reconciled contract items

- POST /api/auth/logout added to hypercritical-api (commit b212870).
- Admin uses uuid path params; API supports uuid OR _id via $or.
- Consultation seen is String ("Unread"/"Read"), timeline String, status enum matches spec.

## Follow-ups for owner

- Phase 4 cutover: repoint js/main/contact.js from Firebase to POST {API}/api/consultations once API is deployed; body {name,email,message,budget,consultationType} only.
- Seed: ADMIN_EMAIL/ADMIN_PASSWORD env then npm run seed to create admin and push includes/*.json into Config.
- Migrate: export RTDB consultations node to JSON, set FIREBASE_EXPORT_PATH, run npm run migrate.
- Frontend config fetches (includes/config.json etc) still read static files until cutover wiring is done.
