# Auth Foundation Canonical Spec

## Purpose

Define the first implementation-safe auth contract for GreenRide so the backend slice can be built without inventing hidden login, session, MFA, or audit behavior.

This document is the canonical truth for the first auth slice only. If code, env, or later docs disagree with it, resolve the conflict here before implementation.

---

## Status

Draft, approved as the current contract direction for the first auth slice.

---

## Scope

This document covers:
- canonical `/api/auth/*` endpoint paths for the first slice
- tenant-aware login resolution
- request and response shapes
- token and session response fields
- public versus authenticated endpoint boundaries
- error categories and top-level error shape
- audit visibility approach for auth-sensitive actions

---

## Out of Scope

This document does not define:
- invite endpoints or invite acceptance UX
- password reset or recovery endpoints
- frontend auth UI, redirect screens, or tenant-picker UI
- SSO
- platform_ops schema/auth implementation
- full MFA challenge completion flow

Those are follow-on slices and must stay out of this first backend contract.

---

## Canonical Decisions

1. The first slice uses tenant-aware login resolution.
2. `User.email` is not globally unique, so login must resolve `tenantId` plus `email`.
3. Access tokens are short-lived JWTs.
4. Refresh continuity is revocable and session-bound.
5. The first slice does not implement MFA completion.
6. Privileged roles that require MFA are blocked from normal login in this slice.
7. Auth-sensitive actions are audit-visible through a documented interim audit port / structured logging approach, not a new Prisma audit table.

---

## Supported Roles In This Slice

Login is supported only for roles that do not require MFA in the current auth contract:
- customer
- driver
- office_staff
- dispatcher

Login is not supported yet for roles that require MFA:
- super_admin
- tenant_owner
- tenant_admin

Those privileged roles must not authenticate normally without MFA.

---

## Tenant-Aware Login Rule

Login is tenant-specific, not global.

Canonical login resolution:
- require `tenantId` in the login request
- match `tenantId` + `email` exactly
- do not perform a global email lookup across all tenants
- do not infer tenant resolution from email alone

This is the explicit first-slice answer to the current `User.email` uniqueness model.

This spec does not define how a client learns `tenantId`; it only requires that the backend contract receives it.

---

## Endpoint Contract

### 1. `POST /api/auth/login`

Public endpoint: yes

Purpose:
- establish a new authenticated session for a supported role

Request body:
```json
{
  "tenantId": "uuid",
  "email": "user@example.com",
  "password": "secret"
}
```

Success response:
```json
{
  "ok": true,
  "data": {
    "accessToken": "jwt",
    "tokenType": "Bearer",
    "accessTokenExpiresAt": "2026-04-08T12:34:56.000Z",
    "refreshToken": "opaque-or-session-bound-token",
    "refreshTokenExpiresAt": "2026-04-22T12:34:56.000Z",
    "session": {
      "id": "uuid",
      "userId": "uuid",
      "tenantId": "uuid",
      "createdAt": "2026-04-08T12:00:00.000Z",
      "rotatedAt": null,
      "expiresAt": "2026-04-22T12:34:56.000Z"
    },
    "user": {
      "id": "uuid",
      "tenantId": "uuid",
      "email": "user@example.com",
      "firstName": "Ava",
      "lastName": "Ng",
      "role": "customer",
      "status": "active"
    },
    "defaultRedirectPath": "/customer"
  }
}
```

Notes:
- `defaultRedirectPath` mirrors the role-based redirect contract, but frontend auth UI is still out of scope here.
- The login response must not expose password material or raw session secrets beyond the returned refresh token.

### 2. `POST /api/auth/refresh`

Public endpoint: yes, but session-proven

Purpose:
- rotate session continuity and issue a fresh access token

Request body:
```json
{
  "refreshToken": "opaque-or-session-bound-token"
}
```

Success response:
```json
{
  "ok": true,
  "data": {
    "accessToken": "jwt",
    "tokenType": "Bearer",
    "accessTokenExpiresAt": "2026-04-08T12:34:56.000Z",
    "refreshToken": "rotated-opaque-or-session-bound-token",
    "refreshTokenExpiresAt": "2026-04-22T12:34:56.000Z",
    "session": {
      "id": "uuid",
      "userId": "uuid",
      "tenantId": "uuid",
      "createdAt": "2026-04-08T12:00:00.000Z",
      "rotatedAt": "2026-04-08T12:10:00.000Z",
      "expiresAt": "2026-04-22T12:34:56.000Z"
    },
    "user": {
      "id": "uuid",
      "tenantId": "uuid",
      "email": "user@example.com",
      "firstName": "Ava",
      "lastName": "Ng",
      "role": "customer",
      "status": "active"
    },
    "defaultRedirectPath": "/customer"
  }
}
```

Notes:
- refresh must fail if the session chain is revoked, replaced, expired, or blocked by account/tenant state.
- refresh must re-check role and tenant state before extending session continuity.

### 3. `POST /api/auth/logout`

Authenticated endpoint: yes

Purpose:
- revoke the current session chain and prevent further refresh from that chain

Request shape:
- no body
- requires `Authorization: Bearer <accessToken>`

Notes:
- the bearer access token must carry the current session ID so the server can revoke the correct session chain
- logout is not a free anonymous action

Success response:
```json
{
  "ok": true,
  "data": {
    "revoked": true,
    "revokedSessionId": "uuid",
    "revokedAt": "2026-04-08T12:15:00.000Z"
  }
}
```

### 4. `GET /api/auth/me`

Authenticated endpoint: yes

Purpose:
- return the current authenticated identity and session context

Request shape:
- no body
- requires `Authorization: Bearer <accessToken>`

Success response:
```json
{
  "ok": true,
  "data": {
    "user": {
      "id": "uuid",
      "tenantId": "uuid",
      "email": "user@example.com",
      "firstName": "Ava",
      "lastName": "Ng",
      "role": "customer",
      "status": "active"
    },
    "session": {
      "id": "uuid",
      "tenantId": "uuid",
      "createdAt": "2026-04-08T12:00:00.000Z",
      "rotatedAt": "2026-04-08T12:10:00.000Z",
      "expiresAt": "2026-04-22T12:34:56.000Z"
    },
    "defaultRedirectPath": "/customer"
  }
}
```

---

## Token And Session Fields

### Access Token

The access token is a JWT and must carry at least:
- `sub` - user ID
- `tenantId` - tenant the user belongs to
- `role` - user role
- `sid` - session ID
- `iat` - issued-at timestamp
- `exp` - expiry timestamp

The access token is the bearer credential for `GET /api/auth/me` and later protected routes.

### Refresh Token

The refresh token is session-bound and revocable.

Canonical behavior:
- the refresh token must be tied to one session chain
- rotation must invalidate the replaced token chain rather than silently keeping both valid
- refresh token reuse after rotation must fail

### Session Record

The auth slice needs a revocable session record with at least:
- `id`
- `userId`
- `tenantId`
- `createdAt`
- `rotatedAt`
- `expiresAt`
- `revokedAt`
- `replacedBySessionId` or equivalent chain link

The exact persistence model can be refined later, but the chain semantics above are required now.

---

## Error Model

### Top-Level Error Shape

```json
{
  "ok": false,
  "error": {
    "category": "validation",
    "code": "AUTH_INVALID_REQUEST",
    "message": "tenantId, email, and password are required",
    "details": {}
  }
}
```

### Canonical Categories

| Category | Use |
| --- | --- |
| `validation` | malformed request, missing fields, invalid shapes |
| `authentication` | invalid credentials, missing or invalid session proof |
| `authorization` | role is not allowed for the requested auth path |
| `state` | tenant/account/session state blocks access |
| `rate_limit` | abuse-protection throttle or temporary block |
| `server` | unexpected failure or infrastructure problem |

### Canonical Error Codes

| Code | Typical Status | Meaning |
| --- | --- | --- |
| `AUTH_INVALID_REQUEST` | 400 | request shape or fields are invalid |
| `AUTH_INVALID_CREDENTIALS` | 401 | tenant, email, or password did not match |
| `AUTH_TENANT_BLOCKED` | 403 | tenant state blocks login or refresh |
| `AUTH_MFA_REQUIRED` | 403 | privileged role requires MFA and this slice does not complete it |
| `AUTH_ACCOUNT_BLOCKED` | 403 | account state blocks login or refresh |
| `AUTH_SESSION_REVOKED` | 401 | refresh/logout proof is revoked or stale |
| `AUTH_RATE_LIMITED` | 429 | abuse protection blocked the attempt |
| `AUTH_INTERNAL_ERROR` | 500 | unexpected server failure |

Notes:
- the exact HTTP status should remain aligned to the category and code above
- error messages should stay generic enough to avoid unnecessary enumeration leaks

---

## Public Versus Authenticated Boundaries

Public in this slice:
- `POST /api/auth/login`
- `POST /api/auth/refresh`

Authenticated in this slice:
- `POST /api/auth/logout`
- `GET /api/auth/me`

Rationale:
- login and refresh are session-establishing or session-renewing flows and must be reachable without an existing access token
- logout and me are session-confirming flows and must not be treated as anonymous actions

---

## Audit Visibility

Auth-sensitive actions in this slice must be audit-visible.

Approved mechanism for this slice:
- use a narrow auth audit port / structured logging approach now
- do not add a new Prisma audit table in this task
- preserve enough structured context to answer who did what, when, and at what scope

Actions that must emit audit-visible events include:
- login success
- login failure
- refresh success
- refresh failure caused by revoked or stale session proof
- logout
- blocked privileged-role login due to MFA requirement

This slice does not define the final durable audit store. It defines the audit-visible contract and the interim mechanism only.

---

## First-Slice Exclusions

The following are explicitly out of scope for this slice:
- invite creation, invite acceptance, and invite resend/replacement endpoints
- password reset request, reset completion, and recovery-token endpoints
- frontend auth UI and route shells
- MFA challenge completion, MFA enrollment, and recovery reauthentication flows
- platform_ops login path
- SSO

If any of those are needed later, they require a separate approved slice.

---

## Contract Verification Rule

Before code starts, the repo must be able to point at:
- this spec for `/api/auth/*`
- `docs/03-platform/auth-and-session.md` for auth lifecycle
- `docs/03-platform/rbac.md` for role and token claims
- `docs/03-platform/multi-tenancy.md` for tenant isolation
- `docs/05-frontend/auth-redirect-and-protected-routes.md` for landing intent

If those docs disagree, stop and resolve the conflict before implementing the backend slice.
