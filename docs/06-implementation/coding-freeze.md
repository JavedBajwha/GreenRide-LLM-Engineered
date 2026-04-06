# Coding Freeze (Mandatory)

## Status

GreenRide is now under a **documentation-first correction freeze**.

No new code files should be created until the implementation specification layer is complete and reviewed.

---

## Reason

Some exploratory code files were created too early and introduced drift risk.

Examples of drift introduced:
- duplicate versioned files such as `v2`, `v3`, and `next`
- multiple competing app entry files
- multiple competing route/controller/service variants
- code created before final file ownership and naming were locked

This is exactly what the repository is meant to avoid.

---

## Mandatory Rule

Until this freeze is explicitly lifted:

- do not create new backend code files
- do not create new frontend code files
- do not introduce `v2`, `v3`, `next`, `temp`, or similar parallel implementation files
- do not rename modules without first updating implementation specs
- do not continue feature building

---

## Allowed Work During Freeze

Only the following work is allowed:

- defining final folder structure
- defining final canonical file names
- defining contracts and function signatures
- defining DTOs and schema ownership
- defining module responsibilities
- documenting which existing files are canonical vs deprecated
- preparing LLM execution prompts and stop rules

---

## Exit Condition

The freeze ends only when these documents are complete:

1. `final-backend-structure.md`
2. `search-and-quote-canonical-spec.md`
3. `repo-cleanup-status.md`
4. `llm-execution-rules.md`

---

## Final Rule

If a file is not defined in the final structure documents, it must not be created.
