# Error Handling and Failure Strategy

## Purpose

Define the canonical error-handling and failure-strategy model for GreenRide.

This document exists so AI and future implementation work do not invent:
- vague failure behavior
- unsafe recovery shortcuts
- inconsistent user-facing error treatment
- weak linkage between failures, tenant boundaries, logging, and operational controls

---

## Status

Draft, approved as the current documentation direction.

This document is the first implementation-safe failure-strategy contract for GreenRide platform foundations.

---

## Scope

This document covers:
- failure principles
- failure categories
- user-facing error behavior
- retry, fallback, and degraded-mode expectations
- failure linkage to auth, tenant boundaries, abuse protection, and operational controls
- logging, observability, and audit expectations during failures

---

## Out of Scope

This document does not define:
- domain-specific booking or payment state machines
- exact retry intervals or provider-specific backoff logic
- final UI copy for every error case
- low-level infrastructure disaster-recovery procedures

Those belong to domain contracts, implementation choices, or platform-engineering operations.

---

## Related Documents

- `docs/03-platform/security-model.md`
- `docs/03-platform/auth-and-session.md`
- `docs/03-platform/multi-tenancy.md`
- `docs/03-platform/abuse-protection-and-rate-limiting.md`
- `docs/03-platform/application-logging.md`
- `docs/03-platform/observability.md`
- `docs/03-services/audit-logging.md`
- `docs/03-platform/release-maintenance-and-rollback.md`
- `docs/03-platform/security-incident-and-emergency-access-rules.md`

---

## Canonical Rules

1. GreenRide must prefer safe failure over silent corruption or ambiguous state.
2. Failures must not bypass auth, RBAC, tenant isolation, or abuse-protection rules.
3. Failures must be visible to the right audience with the right level of detail.
4. Recovery actions must avoid duplicate charges, duplicate bookings, invalid dispatch state, or cross-tenant leakage.
5. Important failures must be observable; important recovery and containment actions must be traceable.
6. Degraded or restricted states should remain operationally understandable rather than turning into broken pages or silent failure.

---

## Core Failure Principles

### 1. Fail Safely

The platform must prefer blocked or degraded behavior over corrupted state or unauthorised access.

### 2. Surface Problems Clearly

Errors should be visible to the correct audience:
- customer-facing errors should be understandable and actionable
- operational users may receive more context where useful
- platform ops should have richer health and incident visibility

### 3. Protect Tenant Boundaries

Failure states must never leak data across tenants or confuse tenant ownership.

### 4. Preserve Traceability

Important failures and important recovery actions must be visible through logging, observability, and audit where appropriate.

### 5. Support Recovery

The platform should support retry, fallback, manual intervention, or graceful degradation where appropriate.

---

## Failure Categories

### User Input Failures

Examples:
- invalid pickup data
- missing booking details
- invalid payment form fields

Expected behavior:
- reject clearly
- do not proceed into protected business processing
- keep messages understandable

### Auth / Access Failures

Examples:
- invalid session
- expired or revoked session
- MFA incomplete
- role denied
- tenant mismatch

Expected behavior:
- fail cleanly
- do not reveal unnecessary sensitive detail
- do not proceed with protected action

### Abuse / Protection Failures

Examples:
- throttled login attempts
- blocked password reset abuse
- throttled public quote spam
- restricted export/report action due to abuse thresholds

Expected behavior:
- fail safely
- use controlled retry/block messaging
- avoid account-enumeration leaks in public/auth flows

### Business Rule Failures

Examples:
- no suitable vehicle
- booking outside tenant rules
- driver assignment not possible
- disabled module or unavailable capability

Expected behavior:
- return a business-safe failure, not a system crash
- preserve valid state
- surface next-best operational path where one exists

### Integration Failures

Examples:
- payment provider unavailable
- SMS/email send failure
- map or routing lookup failure
- provider timeout

Expected behavior:
- preserve source-of-truth state
- use retry/fallback/manual follow-up where appropriate
- avoid duplicate downstream side effects

### Realtime / Operational Failures

Examples:
- delayed location updates
- driver app offline
- dispatch state race conditions
- websocket degradation

Expected behavior:
- keep the operational system usable where possible
- prefer explicit stale/degraded indicators over false freshness

### Infrastructure / Runtime Failures

Examples:
- API unavailable
- database issue
- queue backlog
- worker failures
- degraded release state

Expected behavior:
- fail closed or degrade safely
- surface health state operationally
- support containment, rollback, or maintenance where needed

---

## User-Facing Error Principles

### Customer and Public Users

Errors should be:
- plain and understandable
- actionable where possible
- not overly technical
- careful not to leak auth/account or tenant-sensitive detail

### Driver, Dispatcher, and Tenant Ops Users

Errors may include more operational detail where useful, but should still avoid leaking cross-tenant or sensitive internals.

### Platform Control and Platform Ops Users

Governance and ops users may receive more diagnostic context, but UI should still avoid raw uncontrolled internals in normal workflows.

---

## Auth, Access, and Tenant Failure Rules

Failures involving auth, RBAC, or tenant boundaries must obey these rules:
- invalid auth must not continue into protected business logic
- RBAC denial must not be masked as successful but partial action
- missing or mismatched tenant scope must fail cleanly
- public flows must still validate tenant context before deeper processing
- active maintenance, restriction, or containment state must be re-checked before access continues

These failures must never create:
- cross-tenant visibility
- accidental fallback to broader access
- hidden partial success

---

## Retry and Recovery Strategy

Controlled retry is appropriate for:
- transient API failures
- notification failures
- selected integration failures
- selected async/job failures

Rules:
- retry only where the action is safe to retry
- avoid duplicate bookings, duplicate charges, or invalid state transitions
- retries must not bypass abuse-protection or restriction states
- failed retries should surface into observability and operational review

---

## Fallback and Degraded-Mode Patterns

Examples of approved strategy direction:
- if auto-dispatch fails, surface a manual dispatch path
- if notification delivery fails, record it and retry or mark for follow-up
- if live map/realtime data is stale, keep operational controls usable with stale/degraded indicators
- if a provider is degraded, preserve source-of-truth records even when side effects are delayed
- if a module is restricted or under maintenance, present a clean restricted state rather than a broken route

Fallback should preserve correctness first, convenience second.

---

## Maintenance and Containment Interaction

Failure handling must align with operational control states already documented elsewhere.

Rules:
- maintenance, emergency restriction, and rollback states may intentionally block normal flows
- if multiple restrictions apply, the stricter effective state wins
- affected users must see an explicit restricted/degraded/maintenance state rather than silent failure
- unaffected tenants or modules should continue operating where safely possible

---

## Logging, Audit, and Observability Link

Important failures should connect to the correct operational systems:

| Area | Responsibility During Failures |
| --- | --- |
| Application logging | technical event and runtime failure visibility |
| Audit logging | sensitive recovery/containment/governance actions |
| Observability | health, metrics, traces, alerts, incident support |

Rules:
- not every failure is an audit event
- sensitive recovery or containment actions may require audit visibility
- meaningful failure and recovery transitions should be observable

---

## Source-of-Truth Rule

The backend remains the source of truth for valid state.

This means:
- UI must not assume success when the backend rejects the action
- retries and fallbacks must respect confirmed backend state
- degraded frontend behavior must not invent successful state transitions

---

## Important Rule

GreenRide must treat failure handling as a core platform behavior, not an afterthought.

Good failure strategy protects:
- customers
- drivers
- tenant operators
- platform operators
- platform trust boundaries

---

## Stop Conditions

Stop and clarify before implementation if:
- retries could cause duplicate side effects with no guardrail
- failure states can widen access or bypass tenant validation
- degraded UI states would hide an important restriction or maintenance condition
- user-facing errors would leak account-existence, tenant, or sensitive operational detail
- failures are being handled only in UI with no backend/source-of-truth protection
