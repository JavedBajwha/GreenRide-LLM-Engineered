# Auth Foundation (Backend-First) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the first controlled auth backend slice for GreenRide: login, refresh, logout, authenticated identity lookup, JWT-based request auth context, and role/tenant guard structure without widening into full frontend, invite, password-reset, or complete MFA implementation.

**Architecture:** Start docs-first because the repo does not yet define canonical auth endpoint contracts, auth env vars, or an approved audit-persistence shape. Once those gaps are closed, add a small `auth` module to the existing Express backend, persist revocable refresh-session records in Prisma, issue short-lived access tokens plus revocable refresh continuity, and expose `login`, `refresh`, `logout`, and `me` endpoints. Keep `POST /api/booking/quote` public, add reusable auth/role helpers for later protected routes, and treat frontend auth UI, invite flows, password reset, and full MFA challenge completion as follow-on slices.

**Tech Stack:** Express 5, TypeScript, Prisma/PostgreSQL, Zod, `jose` for JWT signing/verification, `bcryptjs` for password verification, `vitest` and `supertest` for backend validation.

---

## Scope Guardrails

### In Scope

- backend auth API baseline
- JWT access-token issuance and verification
- revocable refresh/session persistence
- request auth context `{ userId, tenantId, role }`
- role/tenant guard helpers for future protected endpoints
- local-development validation evidence for the auth slice

### Explicitly Out of Scope

- frontend Next.js scaffold and login screens
- invite acceptance flow
- password reset flow
- customer self-registration UX
- production deployment assumptions
- `platform_ops` schema/auth implementation

### Mandatory Stop Rules For This Plan

Stop before coding if any of these remain unresolved after Task 1:

- auth endpoint paths and request/response shapes are still undocumented
- auth runtime secrets or token/session config keys are still undocumented
- privileged-role login would bypass documented MFA requirements
- audit visibility for auth actions still has no approved mechanism

---

## Known Contract Gaps To Close First

1. **Missing auth endpoint contract**
   - current docs define auth behavior, but not canonical `/api/auth/*` request/response shapes
2. **Missing auth env contract**
   - current env contract covers only `NODE_ENV`, `PORT`, and `DATABASE_URL`
3. **Missing auth persistence in Prisma**
   - current schema has `User.passwordHash` but no refresh/session model
4. **Privileged-role MFA boundary**
   - `super_admin`, `tenant_owner`, and `tenant_admin` require MFA by doc, but full MFA mechanics are not yet implemented
5. **Audit-visibility mechanism**
   - auth events must be audit-visible, but the repo does not yet define a canonical audit persistence model in Prisma

---

## File Structure

### Contracts and environment

- Create: `docs/06-implementation/auth-foundation-canonical-spec.md`
  - define canonical auth endpoint paths, request/response shapes, public/protected status, and slice stop conditions
- Modify: `docs/06-implementation/environment-contract.md`
  - add auth runtime variables once the auth spec names them
- Modify: `backend/.env.example`
  - add auth runtime placeholders alongside the environment contract
- Modify: `docs/00-overview/current-state.md`
  - refresh the current build focus and note auth slice in progress once execution begins
- Modify: `docs/06-implementation/current-state.md`
  - refresh fast handoff after the slice lands

### Backend auth module

- Modify: `backend/package.json`
  - add auth runtime deps and backend test scripts
- Create: `backend/vitest.config.ts`
  - baseline backend test runner config
- Modify: `backend/prisma/schema.prisma`
  - add auth session persistence model defined by the auth spec
- Create: `backend/prisma/migrations/<timestamp>_auth_foundation/`
  - Prisma migration for auth-session persistence
- Create: `backend/src/modules/auth/README.md`
  - local ownership notes for the auth slice
- Create: `backend/src/modules/auth/auth.schema.ts`
  - request/response validation ownership
- Create: `backend/src/modules/auth/auth.controller.ts`
  - HTTP boundary mapping for auth endpoints
- Create: `backend/src/modules/auth/auth.service.ts`
  - auth business logic and session orchestration
- Create: `backend/src/modules/auth/auth.routes.ts`
  - route registration for `/api/auth/*`
- Create: `backend/src/lib/auth/password.ts`
  - password verification helpers
- Create: `backend/src/lib/auth/tokens.ts`
  - JWT sign/verify helpers
- Create: `backend/src/lib/auth/session-store.ts`
  - Prisma-backed refresh/session persistence helpers
- Create: `backend/src/lib/auth/auth-middleware.ts`
  - request auth-context extraction
- Create: `backend/src/lib/auth/require-role.ts`
  - role-family and in-surface role checks
- Modify: `backend/src/routes/index.ts`
  - mount auth routes
- Modify: `backend/src/app.ts`
  - keep public routes public and wire protected middleware patterns safely

### Validation

- Create: `backend/tests/auth/auth.http.test.ts`
  - API-level happy-path and negative-path auth tests
- Create: `backend/tests/auth/auth-fixtures.ts`
  - deterministic local-development fixture setup/cleanup helpers

---

## Task 1: Close the missing auth contracts before writing code

**Files:**
- Create: `docs/06-implementation/auth-foundation-canonical-spec.md`
- Modify: `docs/06-implementation/environment-contract.md`
- Modify: `backend/.env.example`

- [ ] **Step 1: Re-read the source auth contracts**

Run:
```bash
sed -n '1,260p' docs/03-platform/auth-and-session.md
sed -n '1,260p' docs/03-platform/rbac.md
sed -n '1,220p' docs/03-platform/multi-tenancy.md
sed -n '1,220p' docs/05-frontend/auth-redirect-and-protected-routes.md
```

Expected: the auth, RBAC, tenant, and redirect boundaries are fresh before defining API truth.

- [ ] **Step 2: Write the auth foundation canonical spec**

The spec must define at least:
- canonical endpoint paths for the first slice, expected to include:
  - `POST /api/auth/login`
  - `POST /api/auth/refresh`
  - `POST /api/auth/logout`
  - `GET /api/auth/me`
- request and response shapes
- which endpoints are public versus authenticated
- token/session response fields
- error categories and top-level response shape
- explicit first-slice exclusions: invite, password reset, frontend auth UI

Do not start backend endpoint code until this file exists.

- [ ] **Step 3: Resolve the privileged-role boundary explicitly**

The spec must choose one safe direction:
- include MFA in this slice
- or explicitly restrict first-slice login support to non-MFA roles

Do not allow `super_admin`, `tenant_owner`, or `tenant_admin` to authenticate normally without MFA if the docs still require MFA.

- [ ] **Step 4: Expand the env contract**

Update `environment-contract.md` and `backend/.env.example` together with:
- auth signing secret variables
- any refresh/session config keys needed for local development

If exact token/session timing values are still not approved, document them as local-development placeholders and record that they remain provisional rather than final platform truth.

- [ ] **Step 5: Resolve the audit-visibility mechanism**

Before code work proceeds, write down whether this slice will:
- add a narrow audit persistence model now
- or use a documented interim audit port / structured logging approach for auth-sensitive actions

Do not silently improvise an audit table in Prisma without documenting it first.

- [ ] **Step 6: Verify the contract is now explicit**

Run:
```bash
rg -n "POST /api/auth|auth signing|refresh|logout|/api/auth/me|MFA" docs/06-implementation/auth-foundation-canonical-spec.md docs/06-implementation/environment-contract.md backend/.env.example
```

Expected: the repo now has explicit auth API and env truth for the first auth slice.

- [ ] **Step 7: Commit**

```bash
git add docs/06-implementation/auth-foundation-canonical-spec.md docs/06-implementation/environment-contract.md backend/.env.example
git commit -m "docs: define auth foundation contracts"
```

## Task 2: Add the backend auth testing baseline

**Files:**
- Modify: `backend/package.json`
- Create: `backend/vitest.config.ts`
- Create: `backend/tests/auth/auth.http.test.ts`
- Create: `backend/tests/auth/auth-fixtures.ts`

- [ ] **Step 1: Add the backend test runner and auth dependencies**

Add:
- runtime dependencies: `jose`, `bcryptjs`
- dev dependencies: `vitest`, `supertest`, `@types/supertest`
- scripts: `test`, and optionally `test:watch`

- [ ] **Step 2: Create the test runner config**

Create `backend/vitest.config.ts` so backend tests can run cleanly in the current ESM/TypeScript setup.

- [ ] **Step 3: Define the local fixture basis**

Create `backend/tests/auth/auth-fixtures.ts` with one deterministic local-development fixture strategy:
- a tenant dedicated to auth validation
- known users for supported first-slice roles
- cleanup/reset discipline that does not wipe unrelated local records

This keeps auth evidence tied to a named local dataset instead of vague “it worked once” validation.

- [ ] **Step 4: Write the first failing HTTP tests**

At minimum cover:
- valid login for one supported role
- invalid password rejected
- wrong-role access rejected from a protected route family helper
- refresh from revoked session rejected
- `/api/auth/me` requires auth and returns identity context when authenticated

- [ ] **Step 5: Run tests to confirm they fail for the right reason**

Run:
```bash
cd backend
npm install
npm test
```

Expected: tests fail because the auth module does not exist yet, not because the test runner is broken.

- [ ] **Step 6: Commit**

```bash
git add backend/package.json backend/vitest.config.ts backend/tests/auth/auth.http.test.ts backend/tests/auth/auth-fixtures.ts package-lock.json
git commit -m "test: add auth slice validation baseline"
```

## Task 3: Add auth-session persistence to Prisma

**Files:**
- Modify: `backend/prisma/schema.prisma`
- Create: `backend/prisma/migrations/<timestamp>_auth_foundation/`

- [ ] **Step 1: Add only the first-slice persistence needed now**

Schema additions must align to the auth spec and should include:
- a revocable refresh/session model
- links back to `User`
- expiry and revocation tracking
- replacement/rotation support if the spec chooses rotation in this slice

Do not add invite, password-reset, or MFA tables unless Task 1 explicitly expanded scope to include them.

- [ ] **Step 2: Keep tenant and role boundaries explicit in persistence**

The session model must preserve enough context to:
- revoke by user/session
- re-check account and tenant state
- support tenant-aware validation when required

- [ ] **Step 3: Generate the migration and Prisma client**

Run:
```bash
cd backend
npx prisma migrate dev --name auth_foundation
npm run prisma:generate
npx prisma validate --schema prisma/schema.prisma
```

Expected: Prisma migration, client generation, and schema validation succeed.

- [ ] **Step 4: Commit**

```bash
git add backend/prisma/schema.prisma backend/prisma/migrations
git commit -m "feat: add auth session persistence"
```

## Task 4: Implement the auth HTTP module

**Files:**
- Create: `backend/src/modules/auth/README.md`
- Create: `backend/src/modules/auth/auth.schema.ts`
- Create: `backend/src/modules/auth/auth.controller.ts`
- Create: `backend/src/modules/auth/auth.service.ts`
- Create: `backend/src/modules/auth/auth.routes.ts`
- Create: `backend/src/lib/auth/password.ts`
- Create: `backend/src/lib/auth/tokens.ts`
- Create: `backend/src/lib/auth/session-store.ts`
- Modify: `backend/src/routes/index.ts`

- [ ] **Step 1: Implement request/response validation**

`auth.schema.ts` should own:
- login request validation
- refresh request validation
- logout request validation if needed
- typed response helpers for `login`, `refresh`, and `me`

- [ ] **Step 2: Write the smallest auth service that satisfies the spec**

`auth.service.ts` should handle:
- credential lookup
- password verification
- account-status checks
- tenant-status checks
- role boundary checks for the first slice
- access-token issuance
- refresh/session creation and revocation

Keep Express request/response objects out of the service.

- [ ] **Step 3: Implement the controller and routes**

Routes should map cleanly to:
- `POST /api/auth/login`
- `POST /api/auth/refresh`
- `POST /api/auth/logout`
- `GET /api/auth/me`

Keep controller ownership to:
- parse validated input
- call the service
- map canonical success/error responses

- [ ] **Step 4: Make the failing auth HTTP tests pass**

Run:
```bash
cd backend
npm test -- auth
```

Expected: login, refresh, logout, and `me` tests now pass for the supported first-slice roles and failure paths.

- [ ] **Step 5: Commit**

```bash
git add backend/src/modules/auth backend/src/lib/auth backend/src/routes/index.ts
git commit -m "feat: add auth endpoints and session handling"
```

## Task 5: Add request auth context and role guards

**Files:**
- Create: `backend/src/lib/auth/auth-middleware.ts`
- Create: `backend/src/lib/auth/require-role.ts`
- Modify: `backend/src/app.ts`
- Modify: `backend/tests/auth/auth.http.test.ts`

- [ ] **Step 1: Implement auth middleware**

The middleware must:
- read the configured bearer token location
- verify signature and expiry
- attach `{ userId, tenantId, role }`
- fail with `401` for missing/invalid tokens

- [ ] **Step 2: Implement role guards**

`require-role.ts` should support:
- route-family role checks
- shared ops-family role checks
- narrow single-role checks where needed

Do not add `platform_ops` role code unless the schema/auth model is explicitly expanded first.

- [ ] **Step 3: Add one protected identity endpoint as the first proof point**

`GET /api/auth/me` should prove:
- auth middleware works
- role and tenant context attach correctly
- wrong/missing auth is rejected cleanly

- [ ] **Step 4: Extend negative-path tests**

Cover at least:
- missing bearer token
- malformed token
- expired token
- revoked session trying to refresh
- unsupported privileged-role path if MFA is still outside this slice

- [ ] **Step 5: Commit**

```bash
git add backend/src/lib/auth backend/src/app.ts backend/tests/auth/auth.http.test.ts
git commit -m "feat: add auth middleware and role guards"
```

## Task 6: Verify the slice and refresh repository status docs

**Files:**
- Modify: `docs/00-overview/current-state.md`
- Modify: `docs/06-implementation/current-state.md`
- Modify: `docs/06-implementation/ai-build-readiness.md` only if the auth slice changes what is now safe

- [ ] **Step 1: Run the local verification set**

Run:
```bash
cd backend
npm test
npm run build
npm run prisma:generate
npx prisma validate --schema prisma/schema.prisma
```

Expected: test, build, and Prisma validation all pass in the current working tree.

- [ ] **Step 2: Run local smoke checks**

Run the backend and verify:
- `/health` still returns `200`
- `POST /api/booking/quote` still behaves as the public canonical endpoint
- auth endpoints behave according to the auth spec

- [ ] **Step 3: Refresh the status docs honestly**

Update current-state docs to reflect:
- auth foundation started or completed
- what exactly is implemented
- what remains deferred: invite, password reset, frontend auth UI, full MFA if still deferred

- [ ] **Step 4: Capture validation evidence**

Record:
- slice name: `auth foundation`
- environment tier: `local development`
- docs used as contract
- test layers run
- key negative paths checked
- any remaining deferred auth gaps

- [ ] **Step 5: Commit**

```bash
git add docs/00-overview/current-state.md docs/06-implementation/current-state.md docs/06-implementation/ai-build-readiness.md
git commit -m "docs: refresh auth foundation status"
```

---

## Recommended Execution Notes

- Keep this slice backend-first. Do not bootstrap the full Next.js frontend just to host login pages yet.
- Do not widen scope from `auth foundation` into `tenant onboarding` or `booking confirmation` during execution.
- Keep the existing quote endpoint public exactly as documented.
- If Task 1 cannot close the endpoint/env/audit/MFA gaps cleanly, stop there and surface the unresolved contract to the user instead of coding around it.
