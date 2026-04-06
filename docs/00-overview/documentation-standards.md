# Documentation Standards

## Purpose

This document defines how GreenRide documentation should be written, structured, and maintained.

It exists to keep the documentation system:
- clear
- modular
- AI-readable
- easy to navigate
- consistent across the repo

It is especially important because GreenRide is being prepared for implementation by both humans and AI coding agents.

System context: [[system-map]]

---

## Core Principles

### 1. One document = one clear responsibility
Each file should have one main purpose.

Bad example:
- pricing rules, API design, and UI notes all mixed in one file

Good example:
- pricing logic lives in `pricing-engine.md`
- UI structure lives in frontend docs
- API structure lives in platform and architecture docs

---

### 2. Stable names
Use the same names consistently across the repo.

For example:
- if the system uses “tenant admin”, do not randomly switch to “company manager” in another doc unless it is intentionally defined as a separate role
- if the product area is called “dispatch system”, do not create competing names for the same thing

Consistency matters for:
- human readability
- AI retrieval
- implementation alignment

---

### 3. Avoid unnecessary duplication
Do not copy the same detailed content into multiple places.

Instead:
- keep the main explanation in one primary doc
- reference related docs where needed
- summarise lightly if context is required

This helps prevent drift.

---

### 4. Use meaningful headings
Documents should use headings that clearly explain what the section is about.

Prefer:
- Purpose
- Scope
- Responsibilities
- Rules
- Dependencies
- Related docs
- Implementation notes

Avoid vague heading names where possible.

---

### 5. Write for structure, not decoration
Documentation should be practical.

Avoid:
- fluffy intros
- marketing language
- vague system claims without structural value

Prefer:
- concrete definitions
- clean bullet points
- explicit relationships
- implementation-aware explanations

---

## File Structure Guidelines

A typical GreenRide document should follow this shape when relevant:

1. title
2. purpose
3. scope or responsibilities
4. key definitions
5. rules or constraints
6. dependencies
7. related docs

Not every document needs every section, but documents should feel structurally consistent.

---

## Linking Rules

Use Obsidian-style links where internal relationships matter.

Examples:
- [[feature-map]]
- [[customer-app]]
- [[multi-tenancy]]

Use links when:
- the target doc is genuinely relevant
- the reader may need it next
- the relationship helps navigation

Do not over-link every paragraph just because linking is available.

Good linking improves:
- graph structure
- AI navigation
- implementation reading paths

---

## Naming Rules

### File names
Use lowercase hyphen-separated names.

Examples:
- `feature-map.md`
- `customer-app.md`
- `tenant-configuration.md`

Avoid inconsistent naming styles unless already established for a strong reason.

### Headings
Keep headings simple and stable.

---

## Content Rules

### Keep product, platform, and implementation concerns distinct
Where possible:
- product docs describe what the system does
- platform docs describe shared SaaS/system capabilities
- architecture docs describe structure and relationships
- implementation control docs describe how coding should proceed

This separation keeps the repo easier to understand and safer for AI-assisted development.

---

### Do not hide critical rules in random paragraphs
Important system rules should be explicit.

Examples:
- tenant isolation rules
- pricing ownership rules
- dispatch assignment boundaries
- payment and audit requirements

If a rule matters, it should be easy to find.

---

### Examples are allowed, but should support the system
Examples should clarify.
They should not become accidental alternative definitions of the system.

---

## AI Readability Rules

Because GreenRide is designed to be used by AI coding agents, docs should:
- avoid ambiguous naming
- avoid mixing too many topics in one file
- clearly state responsibilities
- clearly state boundaries
- explicitly reference related docs when needed

AI performs better when:
- system boundaries are stable
- naming is consistent
- implementation order is documented
- UI references are clearly mapped

---

## Change Management Rules

When adding or editing docs:
- keep system-map alignment in mind
- update related docs if a core system definition changes
- avoid leaving stale references behind
- preserve existing structure unless there is a real reason to improve it

If a new doc is introduced:
- place it in the correct section
- give it a clear purpose
- link it where needed

---

## Summary

GreenRide documentation should always be:
- clear
- modular
- consistent
- implementation-aware
- AI-readable

The documentation system is not just for reading.
It is part of the implementation control layer of the project.
