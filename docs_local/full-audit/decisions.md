# Decisions log

Unguided calls made during the audit, dated, with evidence.

## 2026-11-07: Commit convention

- AGENTS.md / agents.md does NOT exist in repo root (verified: `ls agents.md AGENTS.md` -> "No such file or directory").
- Fallback commit convention in use: `type(scope): message` (e.g. `chore(audit): scaffold tracker and plan`).
- No repo rules file found, so no project commit rules to mirror.
