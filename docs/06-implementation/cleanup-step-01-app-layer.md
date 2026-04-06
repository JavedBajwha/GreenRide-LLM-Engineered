# Cleanup Step 01 — App Layer

## Phase
Controlled Cleanup Execution

## Status
Planning and verification only.

No overwrite, deletion, rename, or code generation is authorised by this step alone.

---

## Purpose

This document defines the canonical reconciliation plan for the backend app entry layer.

It exists to make Step 1 of cleanup deterministic before any file action happens.

---

## Files in Scope

The following files are in scope for the app layer review:

```text
backend/src/app.ts
backend/src/app.next.ts
backend/src/app.v2.ts
backend/src/app.v3.ts
```

---

## Approved Source Reference

Per Decision 004, the preferred source candidate is:

```text
backend/src/app.v3.ts
```

This file is the primary reference source for eventual reconciliation into canonical `backend/src/app.ts`.

This does **not** mean `app.v3.ts` becomes canonical by itself.

---

## Canonical Target

The only allowed final target for the app layer is:

```text
backend/src/app.ts
```

No alternate app entry file may survive cleanup.

---

## Canonical Responsibility of app.ts

The canonical `app.ts` file is allowed to own only the following responsibilities:

- create Express app instance
- apply JSON middleware
- expose health endpoint
- mount canonical route index at approved API root
- export the app creation function

It must not own:
- pricing logic
- booking logic
- schema validation
- Prisma queries
- duplicate route definitions
- multiple app variants

---

## Canonical App Structure Plan

The reconciled `app.ts` must structurally contain only:

1. Express import
2. canonical route index import (`routes/index.ts`)
3. app creation function
4. JSON middleware registration
5. `/health` route
6. `/api` route mounting
7. export of app creation function

No experimental version markers, temporary comments, or duplicate imports may survive.

---

## App Layer Validation Questions

Before reconciliation is executed, the following must be true:

1. the preferred source mounts the canonical route index rather than a versioned route chain in the final result
2. the final route mount path remains `/api`
3. the health endpoint remains present
4. no feature-specific logic is embedded directly in app.ts
5. no multiple app creation functions survive

If any answer is unclear, cleanup must stop.

---

## Reconciliation Intent

During actual cleanup execution, the process for app layer must be:

1. inspect `app.ts` placeholder
2. inspect `app.v3.ts` as approved source reference
3. compare with canonical app structure plan
4. prepare final canonical app.ts content conceptually
5. verify it contains only app-layer responsibilities
6. only after verification, authorise canonical replacement in a later explicit action

Deletion of `app.next.ts`, `app.v2.ts`, and `app.v3.ts` must happen only after canonical `app.ts` is confirmed and later cleanup steps succeed.

---

## Explicitly Blocked Actions in This Step

This step does **not** authorise:

- replacing `app.ts`
- deleting any app variant file
- renaming any file
- changing runtime behaviour
- touching route files

---

## Controlled AI Rule

Any AI system must treat this document as verification guidance only.

If asked to modify app files before later confirmation, the correct behaviour is:

```text
STOP → REPORT APP LAYER PLAN ONLY
```

---

## Completion Condition for Step 1

Step 1 is complete when:

- canonical app responsibility is documented
- preferred source is identified
- blocked actions are preserved
- no app file has been changed yet

---

## Current Step State

```text
STEP 1: APP LAYER PLAN COMPLETE
FILES CHANGED: NONE
FILES DELETED: NONE
NEXT STEP: ROUTING LAYER PLAN
```

---

## Completion Record

This step was executed on 2026-04-06 as part of the Search & Quote slice implementation.

```text
STATUS: COMPLETE
EXECUTED: 2026-04-06
```
