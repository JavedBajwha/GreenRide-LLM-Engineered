# Environment Contract

## Purpose

This document defines the approved environment-variable contract for AI-assisted work in the current repository.

## Current Scope

The approved contract currently covers the local backend runtime and the minimum local development shape needed for application work.

This contract also defines the current boundary between:
- approved local development assumptions
- not-yet-approved staging or production assumptions
- future frontend/runtime configuration expansion
- the first auth foundation slice and its provisional local-development auth settings

## Approved Backend Variables

| Variable | Required | Example | Notes |
| --- | --- | --- | --- |
| `NODE_ENV` | yes | `development` | Local development default. |
| `PORT` | no | `4000` | If changed, update this doc and `backend/.env.example` together. |
| `DATABASE_URL` | yes | `postgresql://postgres:postgres@localhost:5432/greenride` | PostgreSQL connection string used by Prisma. |

## Auth Foundation Variables

These values support the first auth slice and are local-development placeholders only.

They are provisional, not final platform truth.

| Variable | Required | Example | Notes |
| --- | --- | --- | --- |
| `AUTH_JWT_SECRET` | yes for auth work | `dev-auth-jwt-secret-change-me` | Signs short-lived access JWTs. |
| `AUTH_REFRESH_TOKEN_SECRET` | yes for auth work | `dev-auth-refresh-secret-change-me` | Used for refresh/session continuity protection. |
| `AUTH_ACCESS_TOKEN_TTL_MINUTES` | yes for auth work | `15` | Provisional access-token lifetime in minutes. |
| `AUTH_REFRESH_TOKEN_TTL_DAYS` | yes for auth work | `14` | Provisional refresh/session lifetime in days. |
| `AUTH_SESSION_ROTATION_GRACE_SECONDS` | no | `0` | Optional local-development rotation grace window. Provisional. |

## Current Source Of Truth

- `backend/.env.example`
- `backend/prisma/schema.prisma`
- backend npm scripts load `.env` automatically when the file exists locally

## Local Runtime Contract

The current local development contract is:

- Node.js runtime for the backend in `backend/`
- npm-based dependency management in `backend/`
- PostgreSQL provided externally and reached through `DATABASE_URL`
- backend commands run from `backend/`:
  - `npm install`
  - `npm run dev`
  - `npm run build`
  - `npm start`
  - `npm run prisma:generate`

Docker, Compose, CI, and deployment automation are not required for normal feature development in the current repository state.

---

## Environment Tier Boundary

Approved current environment tiers:

| Tier | Status | Meaning |
| --- | --- | --- |
| local development | approved | current working contract for ordinary repo work |
| test/demo environment | partial future extension | may be documented later when repeatable test/runtime setup is formalised |
| staging | not yet approved | no committed variable matrix or deployment assumptions yet |
| production | not yet approved | no approved secret, hosting, or deployment contract yet |

AI must not invent staging or production assumptions from local development defaults.

---

## Validation and Source-of-Truth Rule

Environment claims must be tied back to current repo truth.

Approved direction:
- documented runtime variables must match the actual documented source files
- environment claims should be rechecked when runtime dependencies change
- AI must not claim a variable is required, optional, or deprecated without checking the current contract
- auth timing values that are not yet approved should be treated as local-development placeholders only

Current documented sources of truth remain:
- `backend/.env.example`
- `backend/prisma/schema.prisma`
- `docs/06-implementation/auth-foundation-canonical-spec.md`
- this document

Readiness claims that depend on environment assumptions should identify which
approved tier and documented source files they rely on, rather than using a
generic “env is set up” statement.

---

## Future Expansion Rules

If the repo adds new runtime areas, environment expansion should remain explicit.

Approved direction:
- backend additions must update this doc and the relevant example files together
- frontend env vars are only approved after the frontend runtime truly needs them and they are documented explicitly
- test/demo environment variables should only be added when a repeatable runtime or automation need is documented
- deployment secrets remain blocked until deployment automation and hosting assumptions are intentionally documented
- first auth-slice env keys must stay aligned with `docs/06-implementation/auth-foundation-canonical-spec.md`

## Rules

1. Do not invent new environment variables in code or docs.
2. If a new runtime dependency requires configuration, update `backend/.env.example` and this file in the same change.
3. Frontend env files may be added once the frontend scaffold actually exists and their variables are documented explicitly.
4. Do not create Docker, CI, or deployment secrets until deployment automation is intentionally documented.
5. Any AI claiming the repo is healthy must verify the current working tree, not rely on historical status text.

---

## Stop Conditions

Stop and clarify before implementation if:
- a new variable is needed but no source-of-truth file is updated with it
- staging or production assumptions are being made from local defaults alone
- frontend configuration is being invented without a documented frontend runtime need
- a secret or deployment variable is being introduced before deployment automation is intentionally documented

## Known Gaps

- no approved frontend environment variable set yet because the frontend scaffold does not exist
- no approved staging or production variable matrix yet
- no approved deployment secret contract yet
