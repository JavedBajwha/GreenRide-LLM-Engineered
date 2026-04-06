# Implementation Rules

## Purpose

This document defines the implementation guardrails for GreenRide.

GreenRide is a multi-tenant taxi SaaS platform with structured documentation designed to guide human developers and AI coding agents. The purpose of this document is to make sure implementation work follows the architecture already defined in this repository.

System context: [[system-map]]

---

## Core Rule

GreenRide must be implemented from the documentation that exists in this repository.

If code and documentation conflict, the implementation should be treated as wrong until the conflict is reviewed deliberately.

Coding must not quietly redefine:
- tenant boundaries
- booking flows
- pricing rules
- dispatch logic
- permission model
- security behaviour
- integration behaviour
- failure handling

---

## Documentation First Rule

Before implementing any feature or system area, the builder must read the relevant docs first.

Minimum rule:
1. read [[system-map]]
2. read the target feature or system doc
3. read all directly related linked docs
4. only then begin implementation

Examples:

### Customer Booking UI work
Read:
- [[customer-app]]
- [[booking-service]]
- [[pricing-engine]]
- [[frontend-architecture]]
- [[component-architecture]]
- [[error-handling-and-failure-strategy]]

### Dispatch implementation work
Read:
- [[dispatch-system]]
- [[booking-service]]
- [[driver-app]]
- [[realtime-system]]
- [[rbac]]
- [[audit-logging]]

### Tenant or platform control work
Read:
- [[multi-tenancy]]
- [[tenant-configuration]]
- [[tenant-onboarding]]
- [[rbac]]
- [[security-model]]
- [[environments]]

---

## No Silent Redesign Rule

Implementation must not silently redesign the system.

That means:
- do not invent new role models without documentation support
- do not change tenant ownership assumptions in code without documentation review
- do not simplify critical workflows just because they are harder to build
- do not remove required intermediate states because they feel inconvenient
- do not collapse platform and tenant concerns into one layer if docs keep them separate

If a design issue is discovered during implementation, it should be surfaced explicitly and documented before major architectural deviation happens.

---

## One Source of Truth Rule

The active documentation repo is the source of truth.

Rules:
- use the clean repo first
- use legacy material only for recovery or clarification
- do not build from outdated legacy assumptions if the clean repo defines something differently
- do not duplicate docs unnecessarily across multiple locations

---

## Feature-by-Feature Implementation Order

GreenRide should be built in controlled slices, not as a chaotic full-system explosion.

Recommended order:
1. core platform scaffolding
2. tenant resolution and configuration baseline
3. authentication and RBAC baseline
4. customer booking flow baseline
5. booking service baseline
6. pricing flow baseline
7. dispatch workflow baseline
8. payment integration baseline
9. notifications baseline
10. realtime behaviour
11. reporting, operational hardening, and secondary features

---

## One Work Unit at a Time Rule

AI agents and human contributors should work on one clearly scoped implementation unit at a time.

A work unit should have:
- a defined goal
- a defined document source
- a clear output
- boundaries on what is not being changed

Examples:
- Build Search & Quote screen only
- Implement tenant resolution middleware only
- Create booking API baseline only

Avoid vague implementation prompts such as:
- build the whole backend
- create the full app in one go
