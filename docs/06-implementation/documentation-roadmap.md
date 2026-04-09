# Documentation Roadmap

## Purpose

This file defines the phased documentation program for making GreenRide safe for controlled AI-assisted implementation.

This is a documentation-only roadmap.
It is not a coding roadmap.

---

## Guiding Rule

Documentation work must:

- reduce ambiguity
- reduce contradiction
- reduce AI guessing
- create clear implementation contracts
- preserve existing terminology and approved architecture

---

## Phase Plan

### Phase 1 — Documentation Control Layer

Goal:
- establish control documents so later documentation work does not drift

Outputs:
- master tracker
- gap register
- roadmap
- continuity notes

Status:
- complete

---

### Phase 2 — Platform Foundations

Goal:
- make the cross-cutting platform rules implementation-safe

Topics:
- auth
- session lifecycle
- RBAC
- multi-tenancy enforcement
- security model
- tenant/module enablement guardrails
- security incident and emergency access rules
- application logging
- audit logging
- observability
- abuse protection / rate limiting
- failure and error strategy

Outcome:
- AI can understand the platform trust model without guessing

---

### Phase 3 — Role-Based App Surfaces and Route Structure

Goal:
- lock the application surface model and route ownership

Topics:
- public/customer surface
- driver surface
- tenant operations surface
- platform control surface
- route families
- protected route groups
- login destination and redirect rules
- role-to-screen ownership
- module-aware route and UI gating boundaries

Outcome:
- AI can build route structure and UI separation safely

---

### Phase 4 — Customer Booking Domain

Goal:
- make the customer booking flow implementation-safe

Topics:
- quote request flow
- quote response usage
- quote expiry
- quote-to-booking conversion
- guest vs account flow
- booking amendments
- cancellation rules
- booking lifecycle state machine

Outcome:
- AI can build customer booking flows without inventing business rules

---

### Phase 5 — Driver Domain

Goal:
- define the driver app and lifecycle precisely

Topics:
- driver app surface
- job offer / accept / reject
- availability states
- trip lifecycle
- driver location and freshness rules
- offline / weak connectivity behavior
- driver state machine

Outcome:
- AI can build driver logic and screens safely

---

### Phase 6 — Dispatch Domain

Goal:
- convert dispatch from strong concept docs into implementation-safe contracts

Topics:
- dispatch workflow
- assignment rules
- auto-dispatch
- manual dispatch
- reassignment
- exceptions
- queue ownership
- dispatch audit requirements

Outcome:
- AI can build dispatch logic without making operational assumptions

---

### Phase 7 — Payments, Notifications, and Realtime

Goal:
- define cross-cutting runtime features safely

Topics:
- subscription, package, and add-on commercial model
- module enablement and gating rules
- fixed-price, quoted, and future quantity-based commercial controls
- reporting module scope: core baseline vs advanced paid reporting
- payments and invoicing
- notification events and channels
- realtime events
- fallback behavior
- delivery failure behavior
- ownership boundaries
- platform release, patch, maintenance, and rollback model

Outcome:
- AI can build integrations without inventing provider-specific behavior prematurely

---

### Phase 8 — Frontend Implementation Contracts

Goal:
- define the approved frontend scaffold and ownership model

Topics:
- frontend app structure
- route groups
- app shells by role family
- component ownership
- API consumption boundaries
- tenant branding rules
- AI-assisted branding and theme recommendation from uploaded logo assets
- dashboard widget model
- zone-based configurable dashboard layout rules
- tenant-level and per-user dashboard customization rules
- provisional vs asset-locked UI rules

Outcome:
- AI can scaffold the frontend without architecture drift and without inventing dashboard behavior

---

### Phase 9 — Testing, Data, and Operational Readiness

Goal:
- define how implementation must be validated

Topics:
- test strategy
- minimum validation expectations
- seed/demo data
- environment usage
- supportability checks
- operational readiness expectations

Outcome:
- AI can validate work rather than only generate code

---

### Phase 10 — Final AI Build Readiness Pass

Goal:
- confirm GreenRide documentation is safe enough for implementation work to proceed

Topics:
- unresolved contradictions
- unresolved missing contracts
- missing assets that still block exact UI work
- final readiness status by domain

Outcome:
- documentation set is ready for controlled AI-assisted implementation

---

## Execution Rule

Do not skip phases casually.

If a later phase depends on an unresolved earlier phase, stop and resolve the earlier phase first.

## UI Sequencing Rule

UI documentation should not be treated as either:

- a fully separate final-only phase, or
- a front-loaded visual exercise before business rules are stable

Preferred sequencing:

1. document module/function/business rules for a domain
2. document role and route impact
3. document the UI contract for that same domain
4. move to the next domain

Final visual polish, theme refinement, and detailed UI finishing should happen after the major domain contracts are stable.

---

## Agreed Return Order

When discussion pauses and resumes later, continue in this order unless a critical blocker forces reprioritisation:

1. Auth and session lifecycle
2. Core module taxonomy and superadmin commercial controls
3. Theme, branding, and responsive layout contract
4. Platform Ops Console and remaining security/emergency operational contract
5. Per-surface UI contracts
6. Testing, validation, and demo-data contracts

Rule:
- treat this as the default return path for ongoing documentation work
- do not jump ahead into full UI detail while earlier logic and control layers remain under-documented
- if a later discussion depends on an earlier unresolved area, pause and return to the earlier item first
