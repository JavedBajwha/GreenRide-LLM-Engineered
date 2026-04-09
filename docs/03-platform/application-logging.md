# Application Logging

## Purpose

Define the canonical application-logging model for GreenRide.

This document exists so AI and future implementation work do not invent:
- vague “log everything” behavior
- inconsistent technical event coverage
- confusion between application logging, audit logging, and observability
- unsafe logging of sensitive, tenant-scoped, or personal data

---

## Status

Draft, approved as the current documentation direction.

This document is the first implementation-safe application-logging contract for GreenRide platform foundations.

---

## Scope

Application logging covers:
- technical runtime events
- request and service failure visibility
- dependency and integration failure visibility
- abuse-protection and security-relevant technical events
- tenant-aware diagnostics where safe
- structured event context for troubleshooting and incident investigation

---

## Out of Scope

Application logging does not define:
- business analytics or tenant reporting
- formal audit-event retention policy
- alert thresholds and routing policy
- full tracing implementation mechanics

Those belong to:
- `docs/03-services/audit-logging.md`
- `docs/03-platform/observability.md`
- analytics and reporting contracts

---

## Related Documents

- `docs/03-platform/security-model.md`
- `docs/03-platform/auth-and-session.md`
- `docs/03-platform/abuse-protection-and-rate-limiting.md`
- `docs/03-platform/error-handling-and-failure-strategy.md`
- `docs/03-platform/observability.md`
- `docs/03-services/audit-logging.md`

---

## Canonical Rules

1. Application logs are for technical diagnosis and operational troubleshooting, not business reporting.
2. Application logs must be structured, high-signal, and privacy-aware.
3. Logs must not leak secrets, credentials, payment-sensitive data, or cross-tenant data.
4. Tenant context may be included where it materially helps diagnosis and is safe to record.
5. Application logging is separate from audit logging even where the same incident touches both.
6. Log coverage should be good enough to investigate failures without depending on ad hoc debugging in production.
7. Application logs are operational telemetry, not a durable business record or export surface.

---

## Logging Responsibilities

Application logging should answer questions like:
- what failed
- where it failed
- when it failed
- what technical context was involved
- which tenant or scope was affected where safe
- whether the failure recovered or degraded further

Application logging is responsible for:
- runtime and dependency diagnosis
- technical failure visibility
- request and job troubleshooting
- incident investigation inputs
- security/abuse event visibility at the technical layer

---

## Event Families

GreenRide application logging should cover at least these technical event families:

| Event Family | Purpose |
| --- | --- |
| lifecycle events | startup, shutdown, deploy/runtime readiness transitions |
| request events | significant request failures, latency or processing problems where useful |
| validation events | important request validation failures where diagnostics matter |
| auth/session events | technical auth failures, token/session problems, MFA technical issues |
| abuse-protection events | throttling, temporary blocks, suspicious repeated failures |
| dependency events | third-party or internal dependency failures and recovery |
| async/job events | queue, worker, scheduled-task, notification, export, or webhook failures |
| realtime events | websocket/realtime degradation and delivery issues where relevant |
| recovery/degradation events | fallback activation, degraded mode, containment-related runtime events |
| unexpected exception events | unhandled controller/service/infrastructure-facing exceptions |

This is a technical event model, not a user-facing action catalog.

---

## Minimum Coverage Baseline

GreenRide should eventually log at least:
- application startup and shutdown
- configuration/readiness failures
- route/controller failures
- service exceptions
- dependency timeouts or provider failures
- auth failures and session-revocation errors
- abuse-protection triggers at the technical level
- export/report generation failures
- notification, payment, and realtime delivery failures where relevant
- maintenance/emergency-mode related runtime failures

---

## Structured Context Baseline

Application logs should prefer structured fields over freeform text where possible.

Useful fields may include:
- timestamp
- severity or level
- service or component
- route or endpoint family where relevant
- correlation/request/job identifier
- tenant identifier where safe
- authenticated user identifier where safe and relevant
- operation or event family
- result or failure type

Rules:
- include only the context needed for diagnosis
- prefer stable identifiers over dumping raw payloads
- avoid logging raw customer-entered content unless explicitly approved

### Storage and Retention Baseline

Application logging should be treated as operational diagnostic data.

Policy baseline:
- application logs should have bounded retention rather than indefinite record keeping
- storage should optimise for operational troubleshooting, not long-term business-history preservation
- application logs must not be treated as the canonical source for reportable business history
- if a technical event also needs durable accountability, audit logging must capture that accountability separately

---

## Sensitive-Data Rules

Application logs must not record:
- passwords
- MFA secrets or recovery secrets
- raw tokens
- raw payment instrument details
- unnecessary PII in freeform form
- cross-tenant blended payloads

Rules:
- redact or omit sensitive fields by default
- keep tenant-aware context minimal and intentional
- if a value is not needed for diagnosis, do not log it

---

## Tenant-Aware Diagnostics

Application logging should preserve tenant context where operationally useful and safe.

This helps:
- isolate tenant-specific incidents
- correlate failures to tenant-scoped operations
- support platform governance and ops visibility without cross-tenant leakage

Rules:
- tenant identifiers are acceptable where they help diagnosis
- tenant-scoped logs must still avoid exposing another tenant's business data
- customer/driver identifiers should be used carefully and only where relevant to diagnosis

### Visibility Boundary

Application-log visibility must remain tightly controlled.

Baseline direction:
- raw application logs are primarily an internal operational/support tool
- tenant-scoped users should not receive broad raw-log visibility by default
- any UI surface that summarizes application-log-derived operational state should expose only the minimum needed operational view, not raw log browsing by convenience

---

## Relationship to Audit Logging

These two areas must stay distinct.

| Logging Area | Purpose |
| --- | --- |
| Application logging | technical runtime diagnosis |
| Audit logging | accountability for sensitive or operationally important actions |

Examples:
- repeated login failures belong in application logging
- a forced session revocation by an operator may also need audit logging
- an export generation crash belongs in application logging
- an authorised export action by a privileged user may also require audit logging

### Trust-Sensitive Event Split

For trust-sensitive workflows:
- application logging records the technical runtime behavior
- audit logging records the accountable user or control action where required
- observability consumes signals derived from logs/metrics/traces for detection and health visibility
- reporting does not become the storage or browsing surface for technical log events

Application logging and audit logging may both be relevant to the same incident, but they answer different questions.

---

## Relationship to Observability

Observability is the wider model that includes:
- logs
- metrics
- traces
- alerts

Application logging provides one major input into observability, but it does not define alert policy, metric thresholds, or trace design by itself.

---

## Security and Abuse Event Logging

Application logging must support technical investigation of:
- auth/session failures
- suspicious repeated failures
- abuse-protection triggers
- export/report generation failures
- dependency outages affecting sensitive flows
- runtime problems during maintenance or emergency controls

Rules:
- security-relevant technical events should be log-visible even when the user-facing response stays generic
- application logging must not defeat the security model by exposing sensitive account-existence detail to users

---

## Failure and Recovery Logging

Application logging should capture not only failures, but also meaningful recovery or degradation transitions, for example:
- provider failure followed by fallback
- queue backlog recovery
- temporary degraded mode activation
- emergency restriction affecting runtime behavior

This helps support:
- incident investigation
- ops review
- future threshold tuning in observability

---

## Important Rule

Application logging should make production diagnosis possible without turning logs into a privacy or security liability.

---

## Stop Conditions

Stop and clarify before implementation if:
- application logs are being used as a substitute for audit records
- sensitive fields are being logged without an explicit rule
- raw payload dumping is proposed as a default debugging strategy
- logging scope starts to define metrics, tracing, or alert policy implicitly
- tenant-aware logging would expose more business data than diagnosis actually requires
