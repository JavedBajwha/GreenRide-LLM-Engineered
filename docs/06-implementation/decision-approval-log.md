# Decision Approval Log

## Purpose

This document records all approved decisions for the GreenRide controlled AI development system.

It acts as the **single source of truth for approved decisions**.

Only decisions recorded here as `approved` may be used for:
- cleanup execution
- canonical file creation
- future coding (after freeze is lifted)

---

## Relationship to Other Documents

This log works together with:

- `implementation-decision-register.md` (source of proposed decisions)
- `decision-approval-workflow.md` (approval process)
- `canonical-mapping-plan.md` (depends on approved decisions)

---

## Rules

### Rule 1: Only approved decisions appear here

Do NOT add proposed decisions.

---

### Rule 2: One entry per decision

Each decision must have exactly one final approved entry.

---

### Rule 3: No retroactive edits

Once approved, decisions must not be silently changed.
If a change is needed, a new decision must supersede it.

---

### Rule 4: Approval required before action

If a decision is NOT listed here, it must be treated as NOT approved.

---

## Approval Entries

---

### (No decisions approved yet)

---

## Status Summary

```text
STATE: NO APPROVED DECISIONS
STATE: CLEANUP BLOCKED
STATE: CODING BLOCKED
```

---

## Controlled AI Rule

Any AI system must follow:

```text
If decision not in this log → treat as NOT approved → STOP
```

---

## Final Rule

This log is the **gatekeeper for execution**.

Until decisions appear here, the system remains in planning mode.
