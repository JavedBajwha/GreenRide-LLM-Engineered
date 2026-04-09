# Abuse Protection and Rate Limiting

## Purpose

Define the canonical abuse-protection and rate-limiting model for GreenRide.

This document exists so AI and future implementation work do not invent:
- inconsistent throttling rules
- weak protection on public and auth endpoints
- unsafe handling of expensive or sensitive actions
- unclear blocked/retry behavior during abuse conditions

---

## Status

Draft, approved as the current documentation direction.

This document is the first canonical abuse-protection contract for GreenRide platform foundations.

---

## Scope

This document covers:
- abuse-protection goals
- protected endpoint categories
- first-pass rate-limiting scope model
- block/challenge behavior
- relationship with auth, public flows, and tenant scope
- audit and visibility expectations

---

## Out of Scope

This document does not define:
- exact numeric rate-limit thresholds
- vendor or gateway implementation choice
- anti-fraud scoring or third-party bot-detection tooling
- infrastructure-level DDoS mitigation details

Those belong to later implementation or platform-engineering choices.

---

## Related Documents

- `docs/03-platform/security-model.md`
- `docs/03-platform/auth-and-session.md`
- `docs/03-platform/multi-tenancy.md`
- `docs/03-platform/application-logging.md`
- `docs/03-platform/observability.md`
- `docs/03-services/audit-logging.md`

---

## Canonical Rules

1. Abuse protection is required for both public and authenticated flows.
2. Public access is never exempt from abuse protection.
3. Sensitive and expensive actions require stricter protection than normal read traffic.
4. Abuse protection must degrade access safely without bypassing auth, RBAC, or tenant validation.
5. Rate-limiting and temporary blocking behavior must be observable and reviewable.
6. Exact thresholds may vary by endpoint class, but the protection categories must be explicit.

---

## Protection Goals

The baseline goals are to reduce:
- brute-force auth attempts
- password-reset and invite abuse
- quote or booking spam on public flows
- export/report abuse
- abuse of expensive search, pricing, or mapping requests
- automated scraping of tenant-scoped or customer-scoped data

Abuse protection is not only about login. It also protects system cost, availability, and data exposure boundaries.

---

## Endpoint Protection Classes

GreenRide should treat endpoints by protection class rather than one global rate rule.

| Class | Description | Examples |
| --- | --- | --- |
| Public entry | no-auth public flows with tenant context | public quote, public booking entry |
| Auth entry | identity-establishing or recovery flows | login, password reset, invite acceptance |
| Normal protected | authenticated day-to-day product use | normal booking reads, profile reads |
| Sensitive protected | privileged or security-relevant actions | exports, role changes, tenant suspension, module changes |
| Expensive protected | computationally or operationally heavy actions | bulk reporting, route/pricing calculations, large searches |

Different classes may use different thresholds or control responses, but they must not be treated as equivalent.

---

## Baseline Protection Scope

Abuse-protection decisions may evaluate one or more of:
- source IP or network identifier
- account identifier or email
- authenticated user ID
- tenant context
- endpoint/action family

Rules:
- no single scope signal should be assumed sufficient in every case
- tenant context may help detect concentrated abuse, but must not replace identity- or source-based protection
- authenticated abuse must still be controllable even when the user already has a valid session

---

## Protected Flow Baseline

### Public Quote and Booking Entry

Public customer entry flows must be protected because they are:
- unauthenticated
- externally reachable
- potentially expensive
- easy to automate

Minimum rule:
- public quote and booking-entry flows must have abuse protection before deeper business processing continues

### Login and Account Recovery

The following flows require explicit abuse protection:
- login
- password reset request
- password reset completion where appropriate
- invite acceptance
- MFA challenge attempts

These flows must not leak unnecessary identity/account detail through error messaging.

### Sensitive Authenticated Actions

The following actions require tighter controls than normal authenticated browsing:
- export/download actions
- scheduled report setup
- role or permission changes
- package/module enablement changes
- tenant restriction/suspension changes
- maintenance/emergency/rollback actions

### Expensive Product Actions

Expensive actions should also be protected, for example:
- large filtered report generation
- repeated quote/pricing calculations
- route or distance-heavy calculations
- bulk admin search or list actions if later approved

---

## Response Model

Approved first response model:
- allow
- slow down / throttle
- temporarily block
- require re-authentication or stronger check where appropriate later

For the current baseline:
- throttling and temporary blocking are the primary documented responses

Rules:
- abuse controls should fail safely
- abuse controls must not silently bypass normal security checks
- abuse controls should avoid turning normal product pages into broken states

---

## User-Facing Behavior

When abuse protection triggers:
- the user should receive a clear generic message
- the system should avoid exposing whether an account exists
- retry behavior should be controlled rather than left ambiguous

Rules:
- error copy for login/reset/public flows should avoid account-enumeration leaks
- public and auth-facing messages should stay generic where identity probing is possible
- tenant-scoped product actions may show clearer retry guidance once the user is already authenticated and authorised

---

## Security and Tenant Rules

1. Abuse protection does not replace auth, RBAC, or tenant validation.
2. Public endpoints may be unauthenticated, but still require tenant validation and abuse protection.
3. Authenticated tenant users may still be rate-limited on sensitive or expensive actions.
4. Tenant-scoped abuse controls must not create cross-tenant visibility or leakage.
5. Platform-wide operational containment may apply broader restrictions during incidents, but narrower scope is preferred first.

---

## Logging and Visibility Baseline

Abuse-protection activity must be visible through logging/observability.

Minimum event families to capture:
- login abuse or repeated auth failures
- password reset abuse patterns
- public quote/booking spam or throttling triggers
- export/report abuse triggers
- sensitive admin-action throttling or blocks

These events should support:
- operational review
- incident investigation
- future threshold tuning

---

## Audit Relationship

Not every rate-limit event is an audit event.

Split:
- audit logging is for sensitive human/system actions with accountability value
- application logging and observability carry most abuse and throttle telemetry

If an abuse event causes a sensitive state change, such as forced restriction or emergency containment, that later action should be audit-visible.

---

## Failure and Recovery Rules

- abuse protection should not create open access on failure
- blocked or throttled requests must not proceed into protected business actions
- temporary block states should be reviewable and eventually clear according to implementation policy
- abuse controls must coexist cleanly with maintenance, emergency restriction, and tenant suspension states
- if multiple restrictions apply, the stricter effective restriction wins

---

## Important Rule

Abuse protection is part of the trust boundary.

Public reachability and authenticated access both still require defensive controls.

---

## Stop Conditions

Stop and clarify before implementation if:
- public quote or booking flows are treated as needing no abuse protection
- login, reset, or invite flows can be spammed without explicit controls
- sensitive exports or admin actions are treated like normal low-risk reads
- abuse throttling is expected to bypass tenant validation or permission checks
- exact thresholds are invented as product truth without an explicit implementation decision
