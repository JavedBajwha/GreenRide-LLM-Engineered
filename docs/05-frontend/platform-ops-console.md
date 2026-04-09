# Platform Ops Console

## Purpose

Define the Platform Ops Console as a separate operational surface for GreenRide.

This document exists to prevent:
- mixing platform governance with operational recovery tooling
- hiding operational controls inside generic admin pages
- blurring superadmin and platform-ops authority

---

## Status

Draft, approved as the current documentation direction.

This document defines the first-pass Platform Ops surface model.

---

## Scope

This document covers:
- Platform Ops Console purpose
- primary users
- main jobs to be done
- top-level sections and navigation
- dashboard behavior
- key page families
- page-family behavior
- authority boundaries
- authority matrix
- operational action scope
- relationship to platform control
- responsive behavior
- empty, loading, and error states
- degraded and stale state handling

---

## Out of Scope

This document does not define:
- raw infrastructure tooling
- shell access
- detailed per-widget visual layout
- final deployment implementation

Those belong outside the normal product UI or in later detailed UI contracts.

---

## Roles Affected

- platform_ops
- super_admin as visibility stakeholder

---

## Main Jobs To Be Done

- monitor live platform health
- manage active incidents
- understand tenant and module impact
- control maintenance and emergency actions
- review release state
- initiate approved rollback or recovery workflows
- inspect operational audit history

---

## App Surfaces Affected

| Surface | Base Route |
| --- | --- |
| Platform Ops Console | `/platform-ops/*` |
| Platform Control | `/platform/*` |

---

## Related Documents

- `docs/03-platform/security-incident-and-emergency-access-rules.md`
- `docs/03-platform/release-maintenance-and-rollback.md`
- `docs/05-frontend/role-app-surface-map.md`
- `docs/05-frontend/frontend-route-inventory.md`
- `docs/05-frontend/route-gating-and-locked-state-matrix.md`
- `docs/05-frontend/surface-state-handling-and-degraded-ui-rules.md`
- `docs/05-frontend/ui-shell-and-navigation-model.md`

---

## Canonical Rules

1. Platform Ops Console is a separate top-level operational surface.
2. Platform Ops Console is not just another subsection of normal `super_admin` platform control.
3. Platform Ops executes operational workflows by default.
4. `super_admin` gets visibility into ops state, but not default execution authority.
5. Platform Ops Console exposes safe operational workflows, not raw engineering-console power.
6. Governance visibility, review pressure, and operational execution must remain distinct in the UI.

---

## Purpose of the Surface

Platform Ops Console exists so trained operators can:
- monitor health
- manage incidents
- understand tenant impact
- control maintenance and emergency actions
- review release state
- initiate approved rollback/recovery workflows
- inspect audit trails

It is not a replacement for:
- source control
- deployment pipelines
- infrastructure consoles
- shell access

---

## Top-Level Sections

Approved first section set:
- health overview
- incidents and alerts
- tenant impact
- release visibility
- maintenance controls
- emergency controls
- rollback/recovery
- audit trail

These sections are also the first top-level navigation groups for the surface.

---

## Health Overview

Approved first health-overview baseline:
- service health
- queue/backlog health
- notification delivery health
- integration/provider health
- realtime health
- active incident count

Landing behavior should focus on:
- live platform health
- active incidents
- current maintenance states
- release status
- active containment controls

---

## Incident Model in the UI

The console should represent incidents with:
- severity
- status
- summary
- affected scope
- created time
- latest review time
- owner
- active controls
- resolution notes

Acknowledgement should be separate from resolution/closure.

---

## Key Page Families

- health overview
- incident list
- incident detail
- tenant impact
- release history
- maintenance controls
- emergency controls
- recovery workflows
- ops audit trail

---

## Page-Family Behavior

### Health Overview

Primary job:
- give fast operational orientation

Expected behavior:
- shows current health state, active incidents, current maintenance states, release state, and active containment context
- acts as the operational landing surface rather than a generic dashboard
- degraded health inputs must remain visible as degraded, not omitted

### Incident List

Primary job:
- triage active and recent incidents

Expected behavior:
- supports severity, status, scope, and owner awareness
- separates acknowledgement from deeper incident action
- must not flatten all incidents into one undifferentiated alert feed

### Incident Detail

Primary job:
- inspect one incident and act on it safely

Expected behavior:
- keeps severity, status, affected scope, active controls, review timing, and resolution notes visible together
- should present control history and current impact before encouraging new action
- must preserve handoff visibility when ownership changes
- must preserve escalation and review accountability visibility without implying that every viewer can execute controls

### Tenant Impact

Primary job:
- understand who is affected and at what scope

Expected behavior:
- supports platform-wide, tenant-specific, and module-specific impact views
- keeps impact visibility separate from tenant-governance editing
- helps operators understand blast radius before broader containment

### Release Visibility

Primary job:
- understand recent and current release state

Expected behavior:
- shows current version, previous version, release status, release notes, and affected modules/components
- gives operational visibility, not raw deployment control

### Maintenance and Emergency Controls

Primary job:
- apply or review scoped operational restrictions

Expected behavior:
- requires scope, reason, timing, and user-facing context
- distinguishes maintenance from emergency containment even when both are active
- should always show the currently effective restriction state
- should show when governance viewers are in visibility-only mode rather than execution mode

### Recovery Workflows

Primary job:
- manage approved rollback and recovery flows

Expected behavior:
- must preserve the two-step rollback pattern
- should foreground impact review before confirmation
- should not look like a raw infra command surface
- should preserve whether incident containment or maintenance restrictions are still active while recovery is in progress

### Ops Audit Trail

Primary job:
- inspect traceability of operational actions

Expected behavior:
- shows actor, action, scope, reason, time, and resulting status
- supports investigation and review, not raw log browsing

---

## Authority Matrix

| Capability | platform_ops | super_admin |
| --- | --- | --- |
| View health overview | yes | yes |
| View incidents and detail | yes | yes |
| Acknowledge incidents | yes | no by default |
| Execute maintenance controls | yes | no by default |
| Execute emergency controls | yes | no by default |
| Initiate rollback workflow | yes | no by default |
| Escalate operational review/attention | yes | visibility/review request only |
| Record or accept incident handoff | yes | no by default |
| View active control overlap state | yes | yes |
| View release history/details | yes | yes |
| View tenant/module impact | yes | yes |
| View ops audit trail | yes | yes where approved for visibility |
| Execute raw deployment or infra actions in product UI | no | no |

This matrix keeps visibility broader than execution authority.

---

## Operational Authority

Platform Ops should be able to:
- execute maintenance controls
- execute emergency controls
- initiate rollback workflow
- view release history
- view tenant impact
- acknowledge incidents

Platform Ops should not use the normal product UI for:
- raw code deployment
- raw infrastructure patching
- unrestricted secret management
- arbitrary shell commands
- ad hoc migration execution

---

## Relationship to Super Admin

`super_admin` should be able to:
- view Platform Ops state
- understand platform and tenant impact

`super_admin` should not, by default:
- execute ops controls
- initiate rollback
- perform incident containment actions

This keeps business governance separate from live operational execution.

Operational visibility for `super_admin` is for awareness and governance context.
It is not a hidden inheritance path into Platform Ops execution.

---

## Scope and Impact Model

Impact and actions should support:
- platform-wide scope
- tenant-specific scope
- module-specific scope

This model must stay aligned across:
- incidents
- maintenance
- emergency controls
- tenant impact views

---

## Audit Requirements

Every operational action in the console must capture:
- actor
- action
- scope
- reason
- timestamp
- resulting status

---

## Branding Rule

Platform Ops Console remains under platform branding.
It does not inherit tenant branding.

---

## Responsive Behavior

- desktop-first
- tablet-safe
- responsive on smaller screens
- not primarily phone-optimized

Operational clarity and safety take priority over compact mobile density.

---

## Empty, Loading, Error, and Degraded States

Platform Ops needs stricter state handling than normal admin surfaces.

Approved direction:
- empty incident state should clearly say there are no active incidents
- loading states must preserve shell, route, and scope context
- degraded health data must be shown as degraded, not silently omitted
- stale timestamps or freshness indicators should remain visible for health, incident, and impact summaries
- partial-data dashboards should identify which panel failed instead of pretending the whole console is complete
- blocked or unavailable operational actions must explain whether the cause is authority, maintenance state, or capability unavailability

The console must never present uncertain operational state as confidently healthy.

---

## Stop Conditions

Stop and clarify before implementation if:
- Platform Ops is expected to merge into `/platform/*`
- `super_admin` must inherit default ops execution power
- raw deployment and infrastructure tools are expected inside the normal product UI
