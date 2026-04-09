# Security Incident and Emergency Access Rules

## Purpose

Define how GreenRide handles security incidents and emergency containment actions.

This document exists so AI and future implementation work do not invent:
- ad hoc incident severity rules
- unsafe emergency-control authority
- unaudited containment actions
- unrealistic incident workflows

---

## Status

Draft, approved as the current documentation direction.

This document centralises the agreed first-pass incident and emergency-control model.

---

## Scope

This document covers:
- incident severity levels
- incident lifecycle statuses
- emergency-control types
- review windows
- authority boundaries
- audit requirements
- tenant/platform/module impact scope
- communication and review expectations
- edge-case behavior during containment and recovery

---

## Out of Scope

This document does not define:
- low-level infrastructure remediation
- raw deployment execution
- security tooling vendor choice
- formal legal/compliance process outside the product model

Those belong to platform engineering or later operational policy work.

---

## Roles Affected

- platform_ops
- super_admin
- tenant_owner as an impacted stakeholder only
- tenant_admin as an impacted stakeholder only

---

## App Surfaces Affected

- platform ops surface
- platform control surface for visibility only

---

## Related Documents

- `docs/03-platform/security-model.md`
- `docs/03-platform/auth-and-session.md`
- `docs/03-platform/release-maintenance-and-rollback.md`
- `docs/05-frontend/platform-ops-console.md`

---

## Canonical Rules

1. Security incidents must use a severity-based model.
2. Emergency controls must be scoped, reviewable, and auditable.
3. Emergency controls do not auto-remove by default.
4. Platform ops holds operational execution authority by default.
5. `super_admin` has visibility into incident state, but not default operational execution authority.
6. Tenant-scoped containment should be preferred over platform-wide disruption when the incident is isolated.
7. Escalation, handoff, and review accountability must remain explicit while an incident is active.

---

## Incident Severity Model

Approved first severity levels:

| Severity | Meaning |
| --- | --- |
| `SEV-1` | critical platform-wide security risk |
| `SEV-2` | serious tenant or module risk |
| `SEV-3` | contained issue with workaround or reduced blast radius |
| `SEV-4` | low-risk security concern requiring tracking and review |

---

## Incident Status Model

Approved first incident statuses:

| Status | Meaning |
| --- | --- |
| `open` | incident identified and active |
| `monitoring` | mitigation applied and being observed |
| `contained` | spread or active harm limited |
| `resolved` | immediate issue addressed |
| `closed` | incident complete, reviewed, and no longer active |

Acknowledging an incident is not the same as resolving or closing it.

---

## Incident Record Baseline

Every incident should capture at least:
- severity
- status
- summary
- affected scope
- created time
- latest review time
- owner
- active controls
- resolution notes

Where applicable, incident records should also capture:
- affected tenants/modules
- communication state
- handoff notes
- post-incident review status

---

## Scope Model

Approved incident and containment scope:
- platform-wide
- tenant-specific
- module-specific

This same scope model should be used consistently across:
- incident records
- maintenance controls
- emergency controls
- impact visibility

---

## Emergency Control Types

Approved first emergency-control set:
- platform maintenance mode
- tenant maintenance mode
- module kill switch
- public booking restriction
- tenant restriction or suspension
- privileged action freeze
- reporting/export freeze
- integration disablement

---

## Emergency Control Actions

Approved minimum action set:
- activate control
- extend control
- remove control
- view impact
- view audit history

Every activation, extension, or removal must require a reason/comment.

---

## Review Window Rules

Emergency controls require review windows.

Approved first review windows:

| Severity | Review Window |
| --- | --- |
| `SEV-1` | every 1 hour |
| `SEV-2` | every 4 hours |
| `SEV-3` | every 24 hours |
| `SEV-4` | every 72 hours |

Rules:
- controls do not auto-remove by default
- controls remain active until explicitly reviewed and cleared
- reminders/alerts should support the review workflow
- missed review windows must be visible as an operational problem, not ignored silently

Review-window ownership rule:
- the current incident owner remains accountable for review until a recorded handoff changes ownership
- changing severity or scope should not silently reset accountability

---

## Authority Model

### Platform Ops

Platform ops may:
- assess active incidents
- acknowledge incidents
- execute emergency controls
- extend or remove active controls
- view impact and health state

Platform ops may also:
- escalate incident severity or operational attention level where the incident workflow supports it
- request wider containment when narrower containment is insufficient
- hand off incident ownership explicitly without losing active-control visibility

### Super Admin

`super_admin` may:
- view incident state
- view impact
- understand platform/tenant governance implications

`super_admin` may also:
- request review or governance escalation
- review business/governance consequences of active controls
- approve later policy follow-through outside the live operational action path where the product model requires it

`super_admin` does not receive default execution authority for platform ops actions just by role inheritance.

### Responsibility During Handoffs

If incident ownership changes:
- the new owner must be recorded
- open controls must remain visible
- review timing must remain visible
- handoff notes should capture why responsibility changed
- acknowledgement history must remain visible after handoff
- handoff must not downgrade severity, clear active controls, or imply resolution by itself

---

## Least-Impact Containment Rule

Preferred response order:

1. restrict the affected module
2. restrict the affected tenant if isolated
3. freeze sensitive actions such as exports or risky admin actions
4. apply maintenance/restricted mode for wider areas if needed
5. use platform-wide containment only when narrower containment is insufficient

If containment overlap exists:
- the stricter effective control wins
- conflicting states must not create ambiguous access behavior
- maintenance and rollback-related restriction states must not weaken active incident containment until an explicit review clears that change

---

## Audit Requirements

Every ops/security action must capture:
- actor
- action
- scope
- reason
- timestamp
- resulting status

Incident records and emergency controls must be audit-visible.

Post-incident review actions should also be traceable where the product records them.

---

## Communication Expectations

Incident handling should include controlled communication expectations.

Baseline direction:
- affected users should see explicit restricted/degraded/maintenance states where the incident changes product behavior
- platform ops should be able to understand impact scope clearly
- `super_admin` should be able to see governance-relevant impact without gaining default execution authority

Communication should avoid:
- exposing sensitive security details to normal users
- leaking cross-tenant information
- leaving affected users with broken pages and no explanation

Escalation and visibility rule:
- governance visibility into an incident must not be mistaken for authority to execute containment
- operational urgency may escalate visibility and review pressure without broadening execution authority automatically

---

## Post-Incident Review Expectations

Security incidents should not end at control removal alone.

Baseline direction:
- `resolved` should mean immediate risk is addressed
- `closed` should mean the incident is complete and reviewed
- important incidents should preserve post-incident review notes
- recurring review findings may inform later security, observability, or abuse-protection tuning

This document does not define a full postmortem template, but it does require that incident closure is more than “button clicked, done.”

---

## Security / Tenancy Rules

1. Emergency controls must not bypass tenant isolation rules unless the documented scope is platform-wide.
2. Session/auth behavior must respect active containment states.
3. Security containment may revoke sessions or block refresh/login when required by the incident scope.
4. Commercial enablement does not override emergency containment.

---

## Failure / Exception Rules

- if a control is activated, affected users must see an explicit restricted or maintenance state rather than broken flows
- if review time is missed, the control remains active but must be flagged for review
- if a tenant is isolated under containment, unaffected tenants should continue operating where safely possible
- if a security incident touches authentication, session refresh and login must re-check active restriction state
- if incident ownership changes during an active incident, handoff must not clear review or control visibility
- if multiple controls overlap, the stricter effective restriction wins
- if a control is removed, removal should follow explicit review rather than silent expiry
- if incident communication is required, it must reflect scope without exposing sensitive security internals
- if incident severity escalates, existing controls and ownership history must stay visible rather than being replaced by a fresh disconnected record

---

## Stop Conditions

Stop and clarify before implementation if:
- `super_admin` is expected to execute ops controls by default
- incidents require automatic reopening of blocked access without human review
- the product must support unaudited emergency overrides
- platform ops is expected to perform raw infrastructure or shell actions through the normal product UI
