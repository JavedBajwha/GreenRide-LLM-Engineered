# Decision 008 Approval

## Decision ID
008

## Title
Cleanup Gate Condition

## Previous Status
proposed

## New Status
approved

## Approved By
Human architect / owner

## Decision
Cleanup and canonical consolidation are allowed only when all of the following are true:

1. all mapping-critical decisions are approved
2. the canonical mapping plan is complete
3. the human architect / owner explicitly authorises the transition out of freeze for cleanup work

Coding remains blocked unless freeze is separately lifted for implementation.

## Reason
- prevents premature cleanup by AI agents
- protects against overwrite and deletion before architecture is fully locked
- ensures cleanup is treated as a controlled phase transition rather than an implicit side effect of planning
- preserves the human-approved, AI-executed model

## Impact
- canonical structure: no
- cleanup plan: yes
- implementation spec: no

## Canonical Rule

```text
No cleanup, overwrite, deletion, or canonical file consolidation may begin until all required decisions are approved and the human architect explicitly authorises cleanup.
Coding remains blocked unless freeze is separately lifted.
```

## Effect on Mapping
The canonical mapping plan may now be treated as decision-complete, but it still does not authorise cleanup until the human owner explicitly opens the cleanup phase.

## Next Dependent Step
Controlled phase transition review

## Controlled AI Rule
Any AI system must now treat cleanup as a separately authorised phase.
Approval of mapping decisions is not enough by itself to begin cleanup.
