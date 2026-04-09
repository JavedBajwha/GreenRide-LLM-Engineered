# Security Model

## Purpose

Define the canonical cross-cutting security model for GreenRide.

This document exists so AI and future implementation work do not invent:
- weak trust-boundary assumptions
- inconsistent security ownership across auth, RBAC, and tenant isolation
- unsafe defaults for protected routes and APIs
- vague handling of sensitive actions and operational controls

---

## Status

Draft, approved as the current documentation direction.

This document is the first implementation-safe security contract for GreenRide platform foundations.

---

## Scope

This document covers:
- platform-wide security principles
- relationship between auth, RBAC, and multi-tenancy
- protected-route and protected-API expectations
- sensitive-operation controls
- data-protection baseline
- operational security boundaries
- audit and security-control expectations

---

## Out of Scope

This document does not define:
- vendor-specific infrastructure hardening
- low-level cloud/network configuration
- raw secret-rotation mechanics
- formal legal/compliance program detail outside the product model

Those belong to platform engineering and later operational policy work.

---

## Related Documents

- `docs/03-platform/auth-and-session.md`
- `docs/03-platform/data-protection-and-encryption-baseline.md`
- `docs/03-platform/rbac.md`
- `docs/03-platform/multi-tenancy.md`
- `docs/03-platform/security-incident-and-emergency-access-rules.md`
- `docs/03-platform/release-maintenance-and-rollback.md`
- `docs/03-platform/application-logging.md`
- `docs/03-platform/observability.md`
- `docs/03-services/audit-logging.md`

---

## Canonical Rules

1. Security is a platform-wide control model, not a feature owned by one screen or service.
2. Authentication, authorisation, and tenant isolation are separate controls and all relevant controls must pass.
3. Protected routes and protected APIs must default to deny unless explicitly documented otherwise.
4. Public access is an explicit exception and never bypasses tenant validation or input safety.
5. Sensitive actions must be restricted, reviewable where appropriate, and auditable.
6. Operational containment controls must prefer least-impact restriction before broader disruption.
7. Cross-tenant data leakage or unauthorised privileged action is a system failure.
8. `platform_ops` remains a documented authority model until schema/auth alignment is explicitly approved and must not be silently treated as already implemented.

---

## Security Control Layers

GreenRide security is enforced through multiple layers:

| Layer | Primary Responsibility |
| --- | --- |
| Authentication | establish identity and authenticated session state |
| RBAC | determine which actions a role may perform |
| Multi-tenancy | determine which tenant scope data and actions apply to |
| Input and request validation | reject malformed or unsafe requests before business logic |
| Data-access enforcement | preserve ownership boundaries in reads and writes |
| Audit and logging | preserve traceability for sensitive and operational events |
| Operational containment | limit harm during incidents, failures, or security events |

Security must not rely on only one of these layers being correct.

---

## Core Security Principles

### 1. Tenant Isolation First

Tenant isolation is a hard trust boundary.

All tenant-scoped activity must preserve:
- data isolation
- configuration isolation
- branding isolation
- reporting/export isolation
- operational access isolation

### 2. Least Privilege

Users receive only the access required for their role and scope.

This applies to:
- frontend route access
- page/action access
- API access
- data export access
- operational controls

### 3. Explicit Access Control

Every protected action must be checked explicitly through:
- authenticated identity
- role/permission
- tenant scope when applicable
- trust-state revalidation where the action is privileged or high impact

### 4. Secure by Default

If a route, endpoint, or action is not explicitly documented as public or allowed, it should be treated as protected.

### 5. Audit Critical Actions

Sensitive and operationally significant actions must be traceable through audit and application logging.

---

## Relationship Between Auth, RBAC, and Multi-Tenancy

These controls are related but not interchangeable.

| Control | Question It Answers |
| --- | --- |
| Authentication | who is this user/session |
| RBAC | what is this user allowed to do |
| Multi-tenancy | which tenant's data or workflow may this action touch |

Rules:
- a valid login does not grant permission by itself
- a valid role does not bypass tenant isolation
- tenant context does not grant permission where RBAC denies it
- public access may bypass authentication only where explicitly approved, but not tenant validation or request safety

---

## Authentication Security Baseline

Authentication ownership stays defined in:
- `docs/03-platform/auth-and-session.md`

Security rules that depend on auth:
- protected routes and APIs must require a valid authenticated session
- MFA is required for privileged roles already defined in the auth contract
- forced session revocation must support password reset, suspension, and emergency containment
- platform-scoped accounts must not use public self-registration flows
- previously authenticated state must not be trusted indefinitely for privileged actions when account state, tenant state, or authority state changed after login

---

## Authorisation Security Baseline

Authorisation ownership stays defined in:
- `docs/03-platform/rbac.md`

Security rules that depend on RBAC:
- role checks must happen before protected business actions proceed
- page-level access must be narrower than route-family access where needed
- governance authority and operational execution authority remain separate
- no role should inherit broad powers casually because it is “admin-like”
- `super_admin` must not be treated as default platform-ops execution authority
- `platform_ops` detail remains intentionally partial until schema/auth alignment exists

---

## Tenant Isolation Security Baseline

Tenant isolation ownership stays defined in:
- `docs/03-platform/multi-tenancy.md`

Security rules that depend on multi-tenancy:
- tenant-scoped requests must resolve tenant context explicitly
- tenant-scoped queries and mutations must include tenant filtering or ownership validation
- customer and driver access remain scoped to their own records/workflows within the correct tenant
- public flows must still validate tenant context before pricing, booking, or account-linked logic proceeds
- reporting, exports, queued jobs, and support visibility must preserve the same tenant or platform scope discipline rather than acting as security shortcuts

---

## Protected Route and API Baseline

### Protected by Default

The following areas are protected by default:
- `/customer/*`
- `/driver/*`
- `/ops/*`
- `/platform/*`
- `/platform-ops/*`

Protected APIs must:
- require authentication unless explicitly documented as public
- validate role/permission before business logic
- validate tenant context before tenant-scoped data access
- validate input before mutation or expensive processing

### Public Access Rule

Public access must stay explicitly limited to documented public quote/booking entry flows.

Public access does not imply:
- public reporting
- public tenant discovery
- public admin actions
- public operational visibility

---

## Sensitive Action Baseline

The following action families are security-sensitive and require strict control:
- auth/session changes
- role or permission changes
- tenant suspension or restriction
- package/module enablement changes
- pricing and billing-impacting configuration
- reporting/export and scheduled-report controls
- maintenance, emergency, and rollback controls
- payment and refund actions

Rules:
- sensitive actions must require explicit authorisation
- sensitive actions must be auditable
- sensitive actions must not rely on frontend-only restriction

### Privileged-Action Revalidation Baseline

Some protected actions need more than "already authenticated" state.

Approved baseline:
- privileged actions may require recent trust revalidation, MFA completion state, or equivalent step-up confirmation where the auth/security contract requires it
- a stale but refreshable session must not automatically remain sufficient for high-impact privileged actions
- if authority, tenant state, or containment state changed after login, privileged actions should fail safe until trust state is revalidated

This remains intentionally policy-level.
It does not yet lock exact timeout constants, step-up UX, or middleware mechanics.

---

## Data Protection Baseline

Data-protection and encryption ownership now stays defined in:
- `docs/03-platform/data-protection-and-encryption-baseline.md`

Security-level expectations remain:
- protected traffic requires encrypted transport
- provider-level encrypted storage is the minimum at-rest baseline
- passwords must be hashed
- session/refresh credentials must be protected
- secrets must not be exposed through normal product UI flows
- exports and reports must still respect RBAC and tenant isolation

---

## Input Safety and Abuse Baseline

Every protected or public endpoint must still enforce:
- input validation
- request-shape validation
- tenant-context validation where applicable

Abuse protection and rate-limiting details are intentionally owned by a separate contract, but this security model requires that such protection exists for:
- auth flows
- public quote/booking entry flows
- expensive or sensitive endpoints

---

## Operational Security Baseline

Security includes operational containment, not just login and permissions.

Operationally sensitive areas include:
- maintenance mode
- emergency controls
- rollback workflows
- module kill switches
- tenant restriction/suspension
- platform incident handling

Rules:
- operational controls must be scoped and audited
- least-impact containment should be preferred first
- `platform_ops` holds operational execution authority by default
- `super_admin` holds governance visibility by default, not automatic ops execution authority
- until schema/auth alignment is explicitly approved, `platform_ops` should be treated as a documented authority target rather than silently assumed available implementation state

Detailed operational security ownership remains defined in:
- `docs/03-platform/security-incident-and-emergency-access-rules.md`
- `docs/03-platform/release-maintenance-and-rollback.md`

---

## Audit and Logging Baseline

Security-relevant activity must be visible through audit/application logging.

Minimum security-relevant event families:
- login success/failure
- password reset and invite actions
- session revocation or forced logout
- role or permission changes
- tenant suspension/restriction
- module/package changes that affect access
- reporting/export access for sensitive areas
- emergency, maintenance, and rollback actions

Split of responsibility:
- audit logging preserves who did what and why for sensitive actions
- application logging preserves technical and operational event detail

---

## Failure and Incident Security Rules

- if authentication is invalid, protected access must fail
- if RBAC denies the action, the action must fail
- if tenant scope is missing or mismatched, the action must fail
- if tenant status or operational restriction blocks access, the action must fail cleanly
- if a security event requires containment, narrower containment should be attempted before platform-wide disruption where safe

Do not continue on ambiguous ownership or scope assumptions.

---

## Security Ownership Model

| Responsibility Area | Primary Owner |
| --- | --- |
| authenticated identity and session control | auth/session model |
| permission and route ownership | RBAC model |
| tenant boundary enforcement | multi-tenancy model |
| governance visibility across tenants | `super_admin` |
| operational incident execution | `platform_ops` |
| deployment, infra patching, secret rotation | platform engineering outside normal product UI |

This split exists to stop product governance, tenant operations, and technical incident execution from collapsing into one generic admin concept.

---

## Important Rule

Security controls must remain compositional.

No single control should be treated as sufficient on its own.

---

## Stop Conditions

Stop and clarify before implementation if:
- authentication is being treated as a substitute for RBAC or tenant isolation
- a protected route or endpoint is being made public for convenience
- a sensitive action lacks audit visibility
- tenant-scoped access can proceed without explicit tenant context
- `super_admin` is being given default platform-ops execution power without an explicit decision
- infrastructure-level security tasks are being pushed into normal business/admin UI
