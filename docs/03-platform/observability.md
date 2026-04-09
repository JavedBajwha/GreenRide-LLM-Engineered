# Observability

## Purpose

Define the canonical observability model for GreenRide.

This document exists so AI and future implementation work do not invent:
- vague health monitoring assumptions
- disconnected logging, metrics, tracing, and alerting behavior
- weak tenant-aware operational visibility
- unclear relationship between observability, platform ops, and incident handling

---

## Status

Draft, approved as the current documentation direction.

This document is the first implementation-safe observability contract for GreenRide platform foundations.

---

## Scope

This document covers:
- observability goals and responsibilities
- observability pillars
- health visibility baseline
- minimum metrics/trace/alert expectations
- tenant-aware operational diagnostics
- relationship to incidents, platform ops, and logging

---

## Out of Scope

This document does not define:
- final vendor/tool selection
- exact alert thresholds or escalation-routing implementation
- final distributed tracing implementation mechanics
- business analytics or tenant reporting logic

Those belong to later implementation choices or reporting contracts.

---

## Related Documents

- `docs/03-platform/application-logging.md`
- `docs/03-services/audit-logging.md`
- `docs/03-platform/security-model.md`
- `docs/03-platform/security-incident-and-emergency-access-rules.md`
- `docs/03-platform/release-maintenance-and-rollback.md`
- `docs/05-frontend/platform-ops-console.md`

---

## Canonical Rules

1. Observability exists to support safe operation of the platform in production.
2. Observability is broader than logging and includes logs, metrics, traces, alerts, and health visibility.
3. Operational signals should be actionable, correlated, and privacy-aware.
4. Tenant-aware diagnostics are required where they materially help isolation and investigation.
5. Observability must support incident detection, investigation, and recovery without becoming a data-leak channel.
6. Business reporting and tenant analytics must remain separate from observability.
7. Observability summaries are operational views, not replacements for raw logs, audit records, or business reports.

---

## Observability Responsibilities

Observability should help GreenRide:
- detect incidents early
- understand service degradation
- correlate failures across requests, jobs, integrations, and realtime activity
- isolate tenant-impacting issues safely
- support platform ops workflows
- support incident investigation and post-incident review

It is responsible for:
- health visibility
- runtime metrics
- structured logs as one input
- trace/correlation expectations
- alerting inputs
- tenant-impact visibility where safe

It is not responsible for:
- tenant business KPIs
- product dashboards for commercial reporting
- replacing audit logging

---

## Core Principles

### 1. Production Visibility by Default

Critical platform paths should produce enough telemetry to support investigation without ad hoc debugging in production.

### 2. Tenant-Aware Diagnostics

Operational data should preserve tenant context where appropriate so incidents can be isolated and investigated safely.

### 3. Actionable Signals Over Noise

Prefer useful, high-signal telemetry over excessive noisy instrumentation.

### 4. Correlation Across Layers

Requests, jobs, payments, notifications, exports, and realtime activity should be traceable across system boundaries.

### 5. Security and Privacy Awareness

Observability must not leak sensitive personal, payment, auth, or cross-tenant data.

---

## Observability Pillars

GreenRide observability is built on four pillars:

### 1. Logs

Structured technical logs describing runtime and failure behavior.

Ownership link:
- `docs/03-platform/application-logging.md`

### 2. Metrics

Numeric signals showing health, throughput, error rate, latency, backlog, and degradation over time.

### 3. Traces / Correlation

Request or workflow correlation across components and async boundaries so investigation can follow one logical flow.

### 4. Alerts

Automated signal escalation when important failures, degradation, or incident-like conditions occur.

---

## Health Visibility Baseline

Observability should support a first health model that can feed Platform Ops and incident workflows.

Approved first health areas:
- service health
- queue/backlog health
- notification delivery health
- integration/provider health
- realtime health
- active incident visibility

This aligns with:
- `docs/05-frontend/platform-ops-console.md`

---

## Minimum Metric Families

The observability model should eventually support at least these metric families:

| Metric Family | Examples |
| --- | --- |
| availability/health | service up/down, readiness, degraded mode |
| request/runtime | error rate, latency, failure counts |
| async/workers | queue depth, backlog age, worker failures |
| integration/provider | provider failure rate, timeout rate, degraded provider status |
| auth/security-related runtime | auth failure spikes, abuse-trigger rates, session-related error spikes |
| realtime | connection health, delivery issues, websocket degradation |
| export/report runtime | export failures, report generation backlog or delay |

This is a minimum operational family set, not a final metric catalog.

---

## Trace and Correlation Baseline

GreenRide should support correlation across:
- incoming requests
- async jobs
- notification delivery
- payment or provider interactions where relevant
- export/report generation
- realtime flows where relevant

Baseline rule:
- important workflows should be traceable end-to-end enough for incident investigation, even if the final tooling choice comes later

Useful correlation context may include:
- request ID
- job ID
- tenant ID where safe
- operation family

---

## Alerting Baseline

Observability should support alerts for:
- major service health failures
- abnormal error/failure spikes
- queue or backlog degradation
- provider/integration outages
- realtime degradation
- abuse/security-related anomaly spikes where operationally useful
- failed release or maintenance-related health concerns where relevant

Rules:
- alerts should be actionable rather than noisy
- alert policy belongs to implementation/ops detail later, but alert-worthy categories must be explicit now

### Storage and Retention Baseline

Observability storage and retention should follow operational purpose.

Baseline direction:
- observability data should retain enough history for incident investigation, trend diagnosis, and post-incident review
- observability retention does not imply permanent business-history preservation
- metrics, traces, logs, and alerts may have different retention horizons later, but they should remain governed as operational telemetry rather than reporting exports

---

## Tenant-Aware Operational Visibility

Observability should preserve tenant-aware diagnostic context where safe because GreenRide is multi-tenant.

This supports:
- tenant-impact isolation
- incident scoping
- platform ops impact views
- safer investigation without guessing blast radius

Rules:
- tenant-aware diagnostics must not expose another tenant's business data casually
- tenant context should be included where it materially helps support or incident work
- platform-wide observability views must remain distinct from tenant-facing reporting

---

## Relationship to Application Logging

Application logging is one input into observability.

| Area | Responsibility |
| --- | --- |
| Application logging | technical event capture |
| Observability | logs + metrics + traces + alerts + health views |

Observability should build on application logging, not redefine it.

---

## Relationship to Audit Logging

Audit logging is not the same thing as observability.

| Area | Responsibility |
| --- | --- |
| Audit logging | accountability for sensitive actions |
| Observability | operational visibility and incident support |

Audit events may inform incident investigation, but observability must not collapse into an audit-only model.

---

## Relationship to Reporting

Observability and reporting must stay distinct even when both show dashboards.

| Area | Responsibility |
| --- | --- |
| Observability | operational health, degradation, incident support |
| Reporting | business and operational summaries for product-facing analysis |

Rules:
- observability dashboards may summarise health and incident state, not tenant business reporting
- reporting widgets must not silently become observability panels
- observability exports, if any later exist, should not be treated as normal business-report exports by default

---

## Relationship to Platform Ops and Incidents

Observability should provide the signals that support:
- incident detection
- incident investigation
- impact understanding
- rollback and maintenance review
- post-incident analysis

Platform Ops should be able to consume observability through:
- health overview
- incident detail
- release/maintenance monitoring
- tenant impact views

This aligns with the Platform Ops Console contract.

---

## Security and Privacy Rules

Observability data must not expose:
- passwords
- raw tokens
- MFA secrets
- raw payment-sensitive details
- cross-tenant blended data dumps
- unnecessary freeform PII

Rules:
- use identifiers and structured context instead of raw payloads
- keep tenant-aware signals useful but minimal
- avoid turning observability into a privacy or security liability

---

## Failure and Recovery Expectations

Observability should help answer:
- did something fail
- is it ongoing or recovered
- which tenants or modules are affected
- did containment or maintenance change the runtime state
- did the system degrade safely or continue to fail

Meaningful recovery and degradation transitions should be visible, not only hard failures.

---

## Important Rule

Observability should make the platform operable in production, not just verbose.

---

## Stop Conditions

Stop and clarify before implementation if:
- observability is being treated as a synonym for logs only
- tenant/business reporting is being mixed into ops health telemetry
- alerts are being invented with no connection to incident/ops workflows
- tenant-aware observability would expose more data than investigation actually requires
- observability is expected to replace audit logging or RBAC/tenant controls
