# Decision Approval Workflow

## Purpose

This document defines how implementation decisions move from `proposed` to `approved` inside the controlled AI development system.

It exists to ensure that:
- humans remain the decision-makers
- AI agents do not treat draft recommendations as final
- cleanup and implementation only begin after explicit approval
- the repository has a predictable governance flow before coding starts

This document is process-only.
It does **not** authorise coding, cleanup, deletion, or overwrite by itself.

---

## Core Principle

GreenRide uses a **human-approved, AI-executed** development model.

That means:
- humans approve structure and decisions
- AI agents execute only after approval
- unresolved decisions block cleanup and implementation

If approval is missing, the controlled AI system must stop.

---

## Approval States

Each implementation decision may have only one of these states:

- `open`
- `proposed`
- `approved`
- `rejected`
- `superseded`

### Meaning

#### open
The issue exists but no recommendation is recorded yet.

#### proposed
A recommendation exists, but no human approval has been recorded.

#### approved
The decision is accepted as canonical direction.
This allows downstream planning to rely on it.

#### rejected
The proposal is explicitly declined.
A new proposal must be created before work continues.

#### superseded
The decision was once approved or proposed, but has been replaced by a newer decision.

---

## Approval Authority

Within this controlled AI development system:

- the human project owner / architect is the approval authority
- AI agents may recommend but may not approve
- AI agents may document rationale but may not self-authorise implementation

---

## Approval Sequence

Decisions must be processed in the following order when they affect the same slice:

1. structural ownership decisions
2. persistence and scope decisions
3. naming decisions
4. preferred source mapping decisions
5. cleanup gate confirmation

This order prevents lower-level decisions from being made before higher-level structure is stable.

---

## Mandatory Approval Rules

### Rule 1: No implicit approval
Silence is not approval.
A decision remains `proposed` until explicitly marked `approved`.

### Rule 2: No cleanup from proposed state
A `proposed` decision cannot trigger cleanup, consolidation, or overwrite.

### Rule 3: No implementation from proposed state
A `proposed` decision cannot trigger code generation.

### Rule 4: Approval must be documented
When a decision is approved, the approval must be recorded in the register or related approval log.

### Rule 5: Rejection must preserve control
If a proposal is rejected, implementation remains blocked until a replacement proposal is documented.

---

## Approval Criteria

A decision may be marked `approved` only if all of the following are true:

1. it does not conflict with `coding-freeze.md`
2. it does not conflict with `final-backend-structure.md`
3. it does not conflict with `search-and-quote-canonical-spec.md`
4. it does not introduce new duplicate ownership
5. it reduces ambiguity rather than increasing it
6. it preserves the controlled AI development model

If any one of these fails, the decision must remain `proposed` or be rejected.

---

## Decision Approval Template

Use this template for each approval:

```text
Decision ID: 00X
Title: <decision title>
Previous Status: proposed
New Status: approved
Approved By: human architect / owner
Reason: <short justification>
Impact:
- canonical structure: <yes/no>
- cleanup plan: <yes/no>
- implementation spec: <yes/no>
Next dependent decision: <decision id or none>
```

---

## Post-Approval Behaviour

Once a decision is approved:

- the implementation decision register must reflect the new status
- dependent documents may be updated for alignment
- AI agents may use the approved decision for future planning
- coding still remains blocked if freeze is active

Approval of a decision is not the same as approval to code.

---

## Freeze Interaction Rule

Even if all decisions are approved:

- coding may not begin until the freeze is explicitly lifted
- cleanup may not begin until the cleanup gate is approved
- canonical file creation may not begin until both structure and mapping decisions are approved

---

## Controlled AI Rule

Any AI system working on GreenRide must follow this rule:

```text
If a decision is not marked approved, treat it as unresolved.
Unresolved means stop.
```

---

## Final Rule

This workflow protects GreenRide from one of the biggest AI implementation risks:

```text
proposal being mistaken for permission
```

In this system, only explicit approval moves the project forward.
