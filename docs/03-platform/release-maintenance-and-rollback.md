# Release, Maintenance, and Rollback Model

## Purpose

Define how GreenRide represents releases, maintenance states, rollback workflows, and patch containment inside the product model.

This document exists so AI and future implementation work do not invent:
- vague release visibility
- unsafe maintenance toggles
- one-click rollback behavior
- unrealistic patch containment rules

---

## Status

Draft, approved as the current documentation direction.

This document centralises the agreed first-pass operational update and recovery model.

---

## Scope

This document covers:
- release visibility
- release record baseline
- release lifecycle expectations
- release status model
- maintenance control requirements
- maintenance lifecycle expectations
- rollback workflow
- rollback failure behavior
- containment actions while a fix is being prepared
- communication expectations during update and recovery events

---

## Out of Scope

This document does not define:
- raw deployment execution
- infrastructure patching
- migration tooling implementation
- source-control release engineering

Those remain platform engineering responsibilities outside the normal product UI.

---

## Roles Affected

- platform_ops
- super_admin as visibility stakeholder

---

## App Surfaces Affected

- platform ops surface
- platform control surface for visibility only

---

## Related Documents

- `docs/03-platform/security-incident-and-emergency-access-rules.md`
- `docs/05-frontend/platform-ops-console.md`

---

## Canonical Rules

1. The product UI provides release visibility and controlled operational workflows, not raw deployment control.
2. Maintenance actions must be explicit, scoped, and audited.
3. Rollback must use a two-step workflow.
4. Patch containment must support least-impact restriction before broad disruption.
5. Platform ops executes operational workflows by default; `super_admin` gets visibility by default.
6. Until schema/auth alignment is explicitly approved, `platform_ops` should still be treated as the documented operational authority target rather than silently assumed implementation state.
6. Active incident containment, maintenance state, and rollback state must resolve to one clear effective restriction model rather than competing interpretations.

---

## Release Visibility Model

Platform Ops UI should show:
- current live version
- previous version
- release timestamp
- release status
- release notes
- affected modules/components

This gives operational awareness without exposing low-level deployment mechanics.

### Release Record Baseline

Every represented release should capture at least:
- release identifier or version
- current release status
- release timestamp
- previous live version where relevant
- release notes summary
- affected modules/components
- affected scope when narrower than platform-wide
- failure or rollback linkage where applicable

Release visibility is an operational summary layer.
It does not replace deployment-pipeline detail.

---

## Release Status Model

Approved first release statuses:

| Status | Meaning |
| --- | --- |
| `planned` | approved or queued for rollout |
| `in_progress` | rollout in progress |
| `live` | current live release |
| `rolled_back` | release reverted |
| `failed` | rollout or release failed |

### Release Lifecycle Expectations

Approved first lifecycle expectations:
- a release normally progresses from `planned` to `in_progress` to `live`
- a failed rollout must resolve explicitly to `failed`, not disappear silently
- a release that is reversed through approved rollback must resolve to `rolled_back`
- only one release should be represented as the current `live` release for the same operational scope
- if a narrower-scope release exists later, its scope must remain explicit instead of appearing like a full platform release

---

## Maintenance Control Requirements

Every maintenance action must require:
- scope
- reason
- start time
- review time
- user-facing message

Approved maintenance scopes:
- platform-wide
- tenant-specific
- module-specific

### Maintenance Lifecycle Expectations

Maintenance is a controlled operational state, not a vague toggle.

Approved lifecycle expectations:
- maintenance starts as an explicit action with scope, reason, review time, and message
- maintenance remains active until reviewed and ended explicitly
- maintenance may be extended, but every extension must be audited and require a reason
- overlapping maintenance states resolve to the stricter effective restriction for the affected user or tenant
- tenant-scoped or module-scoped maintenance should be preferred over platform-wide disruption when safe
- active incident containment must remain visible alongside maintenance state where both affect the same scope

When maintenance ends:
- the active restriction must be removed explicitly
- affected users should return to the normal product path cleanly
- stale maintenance banners or blocked states must not remain visible as if still active

---

## Rollback Workflow

Rollback must use a two-step flow:

1. review rollback impact
2. confirm rollback

### Rollback Review Baseline

Rollback review must show:
- target version
- current version
- affected modules/components
- affected tenants or scope
- reason/comment
- expected user impact

### Rollback Execution Rules

Rollback in the product model means:
- an approved request to return an operational scope to an earlier stable release state
- visibility into expected tenant/module impact before confirmation
- audited initiation through the Platform Ops workflow

Rollback in the product model does not mean:
- raw shell access
- arbitrary version selection without review
- bypassing incident, maintenance, or communication rules

### Rollback Failure Behavior

If rollback does not restore the expected safe state:
- the failed or incomplete rollback must remain visible as an operational problem
- affected scope and current restriction state must remain explicit
- platform ops should be able to continue containment or maintenance without implying normal recovery succeeded
- user-facing communication must reflect degraded recovery truthfully instead of claiming the issue is resolved
- rollback workflow visibility must preserve whether the system is still under incident or maintenance review rather than presenting rollback as an isolated success/failure event

---

## Patch Containment Model

Before a code fix or rollback is fully applied, platform ops should be able to use controlled containment actions.

Approved first containment actions:
- module disablement
- tenant restriction
- export/report freeze
- public booking restriction
- maintenance mode activation

These actions should reduce blast radius while recovery work continues.

Containment should be preferred before wider rollback or platform-wide disruption when:
- the issue is isolated
- the affected module or tenant can be constrained cleanly
- a safer narrower action exists

---

## Visibility and Authority Rules

### Platform Ops

Platform ops may:
- view release history
- view release details
- initiate rollback workflow
- activate maintenance controls
- apply containment actions
- coordinate operational restriction state across incident, maintenance, and rollback contexts

### Super Admin

`super_admin` may:
- view release and maintenance state
- understand affected tenant/business scope

`super_admin` may:
- review business and governance impact of active operational restrictions
- request follow-up review through governance channels without becoming the default execution actor

`super_admin` does not get default release or rollback execution power.

---

## User-Facing Behavior

When maintenance or containment is active:
- affected users must see a clear message
- the message must reflect scope and restriction where appropriate
- the application must avoid broken pages or silent failures

### Communication Expectations

Operational communication should distinguish:
- internal ops visibility
- `super_admin` visibility for governance awareness
- affected tenant/user-facing messages where the restriction impacts them

At minimum, communication behavior should support:
- maintenance start messaging
- maintenance extension or review-overdue awareness where appropriate
- release failure visibility in Platform Ops
- rollback in-progress visibility in Platform Ops
- clear notice when a service has returned to normal operation

Rules:
- communication must not claim recovery before the operational state is actually restored
- unaffected tenants should not receive misleading platform-wide disruption messaging when scope is narrower
- user-facing messages should explain restriction safely without exposing low-level internal detail

---

## Audit Requirements

Every release/maintenance/rollback action must capture:
- actor
- action
- scope
- reason
- timestamp
- resulting status

---

## Failure / Exception Rules

- if rollback is initiated, the impact review must be visible before confirmation
- if a release fails, the status must be represented explicitly rather than assumed
- if a release is `failed`, operators must still be able to see the last known stable live version
- if a module is under maintenance, tenant access must be restricted cleanly
- if a tenant is isolated under maintenance, unaffected tenants should remain available where safely possible
- if maintenance overlaps with emergency containment, the stricter operational state wins
- if rollback is initiated during active maintenance or containment, the stricter user-facing restriction remains authoritative until recovery is complete
- if review windows or communication updates are overdue during a long-running maintenance or recovery event, that must remain visible as an operational problem
- if release, maintenance, and incident state all apply to one scope, the current effective restriction must still remain understandable from one operational view

---

## Stop Conditions

Stop and clarify before implementation if:
- the normal product UI is expected to perform raw deployments
- rollback should bypass review/confirmation
- maintenance should be an unscoped on/off toggle with no reason or message
- `super_admin` is expected to execute platform-ops workflows by default
