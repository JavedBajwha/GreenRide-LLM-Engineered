# AI-Assisted Branding and Theme Recommendation

## Purpose

Define the approved AI-assisted branding flow for GreenRide tenant theming.

This document exists so AI and future implementation work do not invent:
- unrestricted AI UI design
- unsafe logo-to-theme mapping
- unvalidated brand suggestions
- branding changes that alter layout or component behavior

---

## Status

Draft, approved as the current documentation direction.

This document defines the first-pass AI-assisted tenant-branding model.

---

## Scope

This document covers:
- logo-driven palette extraction
- recommended theme generation
- approved AI recommendation scope
- tenant review and approval flow
- safety validation and rejection rules

---

## Out of Scope

This document does not define:
- machine-learning implementation details
- vendor/model selection
- exact image-processing pipeline
- component redesign or layout generation

Those belong to later implementation or AI-service decisions.

---

## Roles Affected

- tenant_owner
- tenant_admin
- super_admin as a support/visibility stakeholder

---

## App Surfaces Affected

- tenant onboarding flows
- tenant branding/configuration areas
- tenant-scoped customer and operations surfaces

---

## Related Documents

- `docs/05-frontend/theme-branding-and-responsive-layout.md`
- `docs/03-platform/tenant-onboarding.md`
- `docs/03-platform/tenant-configuration.md`
- `docs/01-product/design-system.md`

---

## Canonical Rules

1. AI acts as a branding advisor, not an unrestricted designer.
2. AI may recommend themes only within platform design-token guardrails.
3. AI must not redesign layout structure or component behavior.
4. Every recommendation must still pass platform validation before approval.
5. Tenant approval is required before the recommended branding becomes active.

---

## Approved Branding Flow

The first approved branding-assistant flow is:

1. tenant uploads logo
2. system extracts dominant/supporting colors
3. system generates 3 safe theme options
4. platform validates the options for safety and clarity
5. tenant reviews and chooses an option
6. tenant may make limited approved adjustments
7. final approved branding is saved as tenant theme configuration

---

## What AI May Recommend

Approved AI recommendation scope:
- color palette mapping
- recommended light/dark variant
- recommended dashboard visual preset

AI must not recommend:
- arbitrary layout changes
- custom component redesign
- route structure changes
- new UI patterns outside the approved design system

---

## Theme Option Rules

The assistant should generate a small controlled set of options, not an open-ended theme playground.

Approved first baseline:
- 3 safe theme options per branding attempt

These options should be:
- visually distinct enough to offer a real choice
- still aligned with approved design-token roles
- safe across tenant-scoped UI surfaces

---

## Validation Rules

Every AI-suggested theme must be checked for:
- contrast accessibility
- readability
- semantic color meaning
- component clarity

### Platform Response

- warn when the recommendation is risky but still possibly usable
- reject when the recommendation violates minimum accessibility or clarity thresholds

Validation should also respect:
- semantic state-color separation
- token-role mapping safety
- asset fallback rules where logo quality or extraction is weak

---

## Tenant Adjustment Rules

Tenants may:
- choose among approved recommended options
- make limited approved color or style adjustments
- choose among approved light/dark style variants

Tenants may not:
- bypass token mapping
- upload arbitrary theme code
- override layout structure
- alter component behavior through branding tools

---

## Branding Scope

Approved branding outputs influenced by the final selected theme may include:
- tenant customer UI
- tenant operations UI
- tenant emails
- invoices
- tenant PDF reports
- embedded booking widgets

Platform control and platform ops remain under platform branding.

Guardrail:
- AI-suggested branding may influence tenant-scoped identity and atmosphere only
- AI-suggested branding must not make tenant-scoped surfaces look like platform governance or platform-ops surfaces
- AI-suggested branding must not alter route ownership, shell identity, or external-host scope

---

## Failure / Exception Rules

- if logo extraction fails, the system must fall back to manual approved branding inputs
- if no safe palette can be generated automatically, the system must require manual approved color selection
- if an option fails validation, it must not be activated as a tenant theme
- if branding is incomplete, the tenant must remain on a safe fallback theme
- if uploaded logo assets are unusable, the tenant must stay on safe fallback assets rather than activating broken header or invoice branding

---

## Stop Conditions

Stop and clarify before implementation if:
- AI is expected to generate whole layouts or component systems
- tenant branding needs unrestricted dark/light theme building
- theme generation must support arbitrary custom fonts
- platform branding and tenant branding need to merge on the same surface
