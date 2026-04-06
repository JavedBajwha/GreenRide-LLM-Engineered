# LLM Execution Rules (Mandatory)

## Purpose

This document defines exactly how AI coding agents such as ChatGPT, Codex, Claude Code, Cursor, Cline, or any future LLM-based tool must behave when working on GreenRide.

This is a control document.
It exists to prevent:
- drift
- duplicate implementations
- random scaffolding
- file naming chaos
- undocumented assumptions
- architecture leakage between layers

This document does **not** authorise coding by itself.
If coding freeze is active, these rules are still in force, but implementation must not begin.

---

## Core Principle

LLMs are not allowed to improvise architecture.

They may only execute within the bounds of:
- the canonical structure documents
- the current slice specification
- the repository rules
- the explicit file ownership model

If any required detail is missing, the LLM must stop and flag it.

---

## Execution Priority Order

When an LLM works on GreenRide, it must follow this priority order:

1. `docs/06-implementation/coding-freeze.md`
2. `docs/06-implementation/final-backend-structure.md`
3. `docs/06-implementation/search-and-quote-canonical-spec.md`
4. `docs/06-implementation/repo-cleanup-status.md`
5. `docs/00-overview/ai-stop-rules.md`
6. `docs/00-overview/implementation-rules.md`
7. relevant architecture and product docs

If documents conflict, the LLM must stop and flag the conflict.

---

## Mandatory Behaviour Rules

### Rule 1: No autonomous redesign
The LLM must not redesign modules, routes, schemas, lifecycle states, or tenant logic on its own.

### Rule 2: No versioned implementation files
The LLM must not create:
- `*.v2.ts`
- `*.v3.ts`
- `*.next.ts`
- `*.temp.ts`
- `*.new.ts`

If a file already exists in multiple versions, the LLM must not choose one independently.
It must refer to cleanup mapping rules first.

### Rule 3: One responsibility, one file
The LLM must preserve one-file ownership for each responsibility.
No duplicate controllers, duplicate services, or duplicate schema files.

### Rule 4: No guessing unknown fields
If a request field, response field, enum value, database field, or tenant rule is not defined, the LLM must stop.
It must not invent missing structure.

### Rule 5: No new file creation outside canonical structure
If a file is not listed in the final structure docs, the LLM must not create it.

### Rule 6: No implementation while freeze is active
If `coding-freeze.md` indicates freeze is active, the LLM must not write code.
Only specification, cleanup planning, and structural clarification are allowed.

### Rule 7: No route drift
The LLM must not introduce alternate paths when the canonical route is already defined.

### Rule 8: No response shape drift
The LLM must not change top-level response format unless the canonical spec is updated first.

### Rule 9: No architectural leakage
The LLM must preserve separation:
- controller = HTTP boundary
- service = business orchestration
- schema = validation only
- pricing service = pricing logic only

### Rule 10: No silent cleanup
The LLM must not delete, rename, or overwrite files silently.
All cleanup must be explicit and mapped.

---

## Required Stop Conditions

The LLM must stop immediately if:

1. coding freeze is active
2. a file name is not present in canonical structure
3. a request field is ambiguous
4. a response field is ambiguous
5. pricing ownership is ambiguous
6. controller/service boundary is ambiguous
7. duplicate implementation files exist and canonical mapping is not yet decided
8. route path differs from canonical spec
9. persistence rules are unclear
10. tenant fallback rules are unclear
11. an action would overwrite existing code without explicit cleanup approval

When stopping, the LLM must explain:
- what is blocked
- which document is missing or conflicting
- what needs to be clarified before continuing

---

## Allowed Work During Freeze

While freeze is active, the LLM may only:
- create or improve implementation specs
- define canonical file ownership
- document contracts
- map exploratory files to canonical targets
- document cleanup steps
- identify drift and conflicts
- prepare execution prompts for future coding phase

It may not:
- create runtime code
- create database migrations
- create frontend components
- change route handlers
- create alternate file versions

---

## Canonical Search & Quote Ownership

For Search & Quote, the LLM must treat the following as canonical targets only:

- `backend/src/app.ts`
- `backend/src/routes/index.ts`
- `backend/src/modules/booking/booking.routes.ts`
- `backend/src/modules/booking/booking.controller.ts`
- `backend/src/modules/booking/booking.service.ts`
- `backend/src/modules/booking/booking.schema.ts`
- `backend/src/modules/pricing/pricing.service.ts`

Until cleanup mapping is complete, exploratory files are reference material only.
They are not valid implementation targets.

---

## Prompt Discipline Rules

When an LLM receives a build instruction, it must first check:

1. Is coding freeze active?
2. Is the target file canonical?
3. Is the slice spec complete?
4. Is there any duplicate version of this responsibility already in the repo?
5. Is the contract fully defined?

If any answer is "no" or "unclear", the LLM must stop.

---

## Cleanup Discipline Rules

During cleanup planning, the LLM must:
- identify duplicate files
- map each duplicate to a canonical responsibility
- avoid deleting files until mapping is approved
- avoid merging logic mentally without documenting the mapping

The LLM must not say “use the latest version” unless the canonical spec explicitly confirms that mapping.

---

## Handoff Rule

When freeze is eventually lifted, the LLM must implement in this order:

1. map exploratory files to canonical file names
2. confirm cleanup plan
3. confirm no duplicate ownership remains
4. create or update canonical schema file
5. create or update canonical pricing service
6. create or update canonical booking service
7. create or update canonical booking controller
8. create or update canonical booking routes
9. create or update canonical route index
10. create or update canonical app entry

No other order is allowed unless the implementation spec changes.

---

## Final Rule

If the LLM cannot prove that an action is supported by the canonical structure and current slice spec, it must not perform that action.

In GreenRide, “not sure” means “stop”.
