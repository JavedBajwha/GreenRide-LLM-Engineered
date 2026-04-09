# Audit Logging

## Purpose

Define the canonical audit-logging model for GreenRide.

This document exists so AI and future implementation work do not invent:
- vague accountability coverage
- inconsistent audit events for sensitive actions
- confusion between technical logs and audit trails
- unsafe assumptions about which actions require traceability

---

## Status

Draft, approved as the current documentation direction.

This document is the first implementation-safe audit-logging contract for GreenRide platform foundations.

---

## Scope

Audit logging covers:
- security-sensitive actions
- operationally significant administrative actions
- tenant-affecting governance actions
- incident, maintenance, and emergency-control actions
- other state-changing actions that require accountability rather than only technical diagnosis

---

## Out of Scope

Audit logging does not define:
- business analytics or reporting
- full application-runtime diagnostic logging
- observability alert thresholds
- final storage/retention vendor choice

Those belong to:
- analytics/reporting contracts
- `docs/03-platform/application-logging.md`
- `docs/03-platform/observability.md`

---

## Related Documents

- `docs/03-platform/security-model.md`
- `docs/03-platform/auth-and-session.md`
- `docs/03-platform/release-maintenance-and-rollback.md`
- `docs/03-platform/security-incident-and-emergency-access-rules.md`
- `docs/03-platform/application-logging.md`
- `docs/03-platform/observability.md`

---

## Canonical Rules

1. Audit logging is for accountability of sensitive or operationally important actions.
2. Audit logging is not a substitute for application logging.
3. Sensitive state-changing actions must be audit-visible.
4. Audit entries must capture enough context to answer who did what, when, why, and at what scope.
5. Audit logging must preserve tenant and platform boundaries appropriately.
6. Audit logging must not expose secrets or unnecessary sensitive payload data.
7. Audit logging is a durable accountability record, not an operational metrics or reporting stream.

---

## Audit Logging Responsibilities

Audit logging should answer:
- who performed the action
- what action was taken
- when it happened
- what scope it affected
- why it happened where a reason is required
- what resulting state or outcome followed

Audit logging exists for:
- traceability
- support investigation
- security review
- operational accountability
- post-incident review

It is not primarily for:
- debugging runtime failures
- performance analysis
- business KPI reporting

---

## Audit Event Families

GreenRide audit logging should cover at least these action families:

| Event Family | Examples |
| --- | --- |
| auth and access control changes | password reset completion, invite acceptance, forced session revocation, MFA-sensitive account changes where applicable |
| role and permission changes | role assignment, privilege change, access removal |
| tenant governance actions | tenant creation, suspension, reactivation, restriction changes |
| commercial control actions | package changes, module enablement/disablement, quoted add-on changes where state changes are committed |
| tenant configuration changes | branding, operational settings, pricing-impacting configuration |
| reporting/export control actions | scheduled report setup, sensitive export actions where traceability matters, export restriction changes |
| operational incident actions | maintenance activation, emergency-control activation/extension/removal, rollback workflow confirmation |
| platform-governance actions | super-admin support/governance actions that materially affect tenant state |
| dispatch/admin-sensitive actions | reassignment or override actions where traceability is required by product policy |

These are action/accountability events, not generic technical events.

---

## Minimum Audit Entry Baseline

Every audit entry should capture at least:
- actor
- action
- scope
- timestamp
- resulting status or outcome

Where applicable, audit entries should also capture:
- tenant identifier
- target object or target entity identifier
- reason/comment
- affected module or control area

### Storage and Retention Baseline

Audit logging should be retained more durably than normal technical runtime logs.

Baseline direction:
- audit storage should preserve accountability for sensitive and operationally important actions
- audit retention should support investigation, review, and governance follow-through rather than short-lived troubleshooting only
- audit records should remain structured and queryable by scope, actor, action family, and time
- audit logs must not become a raw payload archive just because retention is longer-lived

This aligns with the incident/ops decisions already documented for maintenance and emergency controls.

---

## Scope Model

Audit entries may apply at:
- platform-wide scope
- tenant scope
- module/control scope
- entity/object scope where relevant

Rules:
- scope should be explicit, not inferred later
- tenant-scoped audit records must preserve tenant boundaries
- platform-wide audit records must not be casually surfaced to tenant-scoped users

---

## Relationship to Application Logging

These two systems must stay distinct.

| Logging Area | Primary Question |
| --- | --- |
| Application logging | what happened technically |
| Audit logging | who took the sensitive action and what changed |

Examples:
- repeated login failures belong in application logging
- forced logout by an operator belongs in audit logging and may also appear in application logging
- export generation failure belongs in application logging
- privileged export action or export-policy change may belong in audit logging

The same incident may require both logs, but for different reasons.

---

## Security and Privacy Rules

Audit logs must not record:
- passwords
- raw tokens
- MFA secrets
- raw payment instrument details
- unnecessary freeform PII

Rules:
- record identifiers and state changes, not full sensitive payloads
- capture enough context for accountability without turning audit logs into a privacy risk
- preserve tenant boundary discipline in audit visibility

---

## Visibility and Access Rules

Audit visibility is itself sensitive.

Baseline expectations:
- `super_admin` may have platform-governance audit visibility where documented
- tenant-scoped audit visibility must stay inside tenant authority boundaries
- platform ops may need operational audit visibility for incident and containment actions
- not every role gets broad audit access just because they are administrative within one surface

Further boundary rules:
- audit visibility should be narrower than general page visibility where needed
- platform-wide audit visibility must not be casually mirrored into tenant-facing administrative views
- tenant-level audit visibility must not expose platform-governance or unrelated-tenant actions

Detailed UI-level visibility remains a later permission/detail pass, but the baseline direction is strict visibility control.

---

## Operational and Incident Audit Rules

The following actions must be audit-visible:
- maintenance activation, extension, and removal
- emergency-control activation, extension, and removal
- rollback confirmation
- tenant restriction or suspension changes
- access or role changes triggered during incident handling
- sensitive reporting/export control changes
- sensitive module/package access changes

Where the product already requires a reason/comment, the audit record should preserve it.

---

## Failure and Exception Rules

- failure to create an audit record for a required sensitive action should be treated as a serious platform concern
- audit logging must not silently disappear for the most sensitive control paths
- if an action is blocked before state change, application logging may be sufficient unless product policy requires attempted-action auditability
- if audit visibility is shown in UI, it must still respect platform and tenant scope boundaries

### Trust-Sensitive Event Split

For trust-sensitive workflows:
- audit logging preserves the accountable action and resulting state change
- application logging preserves the technical execution or failure detail
- observability uses signals derived from those systems for operational awareness
- reporting does not replace audit history for sensitive administrative or operational actions

---

## Important Rule

Audit logging exists to preserve accountability for important actions, not to store every technical event.

---

## Stop Conditions

Stop and clarify before implementation if:
- audit logging is being used as a substitute for technical runtime logs
- sensitive state changes can occur with no audit trail
- audit entries are expected to contain raw sensitive payloads
- tenant-scoped users are being given platform-wide audit visibility by convenience
- final retention or storage policy is being invented without an explicit decision
