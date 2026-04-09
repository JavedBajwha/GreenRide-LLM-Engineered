# Theme, Branding, and Responsive Layout Contract

## Purpose

Define the approved theming, branding, and responsive-layout model for GreenRide.

This document exists so AI and future implementation work do not invent:
- unrestricted tenant theming
- inconsistent branding boundaries
- unsafe color behavior
- vague responsive behavior
- uncontrolled typography changes

---

## Status

Draft, approved as the current documentation direction.

This document centralises the baseline theme, branding, and responsive-layout decisions for frontend contract work.

---

## Scope

This document covers:
- tenant branding inputs
- platform-controlled theming guardrails
- approved customization boundaries
- branding application scope
- responsive priorities by app surface
- responsive breakpoints and layout expectations

---

## Out of Scope

This document does not define:
- exact component code
- final visual mockups
- exact font files or asset file names
- AI palette-extraction mechanics in detail
- dashboard widget inventory

Those belong in frontend implementation and AI-assisted-branding contracts.

---

## Roles Affected

- super_admin
- tenant_owner
- tenant_admin
- customer
- driver
- dispatcher
- office_staff

---

## App Surfaces Affected

- public/customer booking surface
- customer surface
- driver surface
- tenant operations surface
- platform control surface
- platform ops surface where later documented

---

## Related Documents

- `docs/01-product/design-system.md`
- `docs/03-platform/tenant-configuration.md`
- `docs/03-platform/tenant-onboarding.md`
- `docs/05-frontend/ai-assisted-branding.md`
- `docs/05-frontend/ui-assets-structure.md`
- `docs/05-frontend/ui-shell-and-navigation-model.md`

---

## Canonical Rules

1. GreenRide must use a shared token-based design system.
2. Tenant branding is allowed only within platform-defined theming guardrails.
3. Tenants may influence visual identity, but must not change layout structure or core component behavior.
4. Typography may only come from a small approved font set, not unrestricted uploads.
5. All four main app surfaces must be responsive.
6. Customer and driver surfaces are mobile-priority.
7. Tenant operations and platform control are desktop-first, but still responsive and usable on smaller screens.
8. Platform branding stays separate from tenant branding.

---

## Theming Model

GreenRide should use:
- shared design tokens
- platform-approved theme roles
- tenant overrides applied through tokens, not component-level hacks

### Token Categories

The theme system should cover tokens for:
- colors
- spacing
- typography
- border radius
- shadows
- surface emphasis

All tenant theming must flow through token roles rather than arbitrary CSS overrides.

### First Token-Role Baseline

Approved first token-role groups:
- `color.bg.app`
- `color.bg.surface`
- `color.bg.elevated`
- `color.text.primary`
- `color.text.secondary`
- `color.border.default`
- `color.brand.primary`
- `color.brand.secondary`
- `color.brand.accent`
- `color.state.success`
- `color.state.warning`
- `color.state.danger`
- `color.action.primary.bg`
- `color.action.primary.text`
- `color.action.secondary.bg`
- `color.action.secondary.text`
- `radius.sm`
- `radius.md`
- `radius.lg`
- `space.xs`
- `space.sm`
- `space.md`
- `space.lg`
- `space.xl`
- `shadow.sm`
- `shadow.md`

Current guardrail:
- tenant branding may influence approved brand token roles
- tenant branding must not directly redefine semantic state tokens without platform validation
- semantic meaning must remain platform-controlled even when the visual palette is tenant-influenced

---

## Tenant Branding Inputs

Approved first branding-control set:
- logo
- favicon
- primary color
- secondary color
- accent color
- company/display name
- support/contact details
- invoice/business details

These inputs may influence tenant-scoped presentation, but only through approved platform mappings.

---

## Tenant Customization Boundaries

### Allowed

Tenants may control:
- approved brand colors
- approved logo assets
- approved brand text/details
- limited approved light/dark style preference
- tenant-scoped identity details used in emails, invoices, and exported tenant PDFs

### Limited

Typography is allowed only through a small approved font set.
Tenants do not upload arbitrary fonts in the current baseline.

### Not Allowed

Tenants must not directly change:
- layout structure
- route structure
- component behavior
- semantic action meaning
- unrestricted dark-mode rules
- arbitrary CSS or raw theme-code injection

---

## Theme Variant Rules

The first approved theming model allows:
- limited light-theme variants
- limited dark-theme variants
- approved visual presets only

The platform should not support a fully freeform tenant-built theme engine in the current baseline.

Approved visual-preset direction:
- presets may vary atmosphere, density, and emphasis within approved design-system limits
- presets must not alter route structure, component behavior, or semantic meaning
- presets should stay compatible with all tenant-scoped surfaces, not only one screen family

---

## Branding Application Scope

Tenant branding should apply where the output is tenant-scoped.

### Tenant-Scoped Branding Areas

- customer-facing UI
- tenant operations UI
- tenant emails
- invoices
- tenant PDF reports
- embedded booking widgets

### Platform-Scoped Branding Areas

The following stay under platform branding:
- platform control surface
- platform ops surface
- platform-wide reports or platform-wide operator outputs

Guardrail:
- tenant branding may change tenant-scoped atmosphere and identity, but it must not make one surface resemble another surface's shell or authority model
- branding choices must not blur the distinction between customer, tenant-operations, platform-control, and platform-ops surfaces

---

## Design Safety Rules

The platform must validate branding choices for:
- contrast accessibility
- readability
- semantic color clarity
- component clarity

### Platform Response

- warn when a branding choice is risky but still potentially usable
- reject when a branding choice breaks minimum accessibility or clarity thresholds

Tenant branding flexibility must never override minimum readability or safety standards.

---

## Responsive Layout Priorities

All four major surfaces must be responsive, but their priorities differ.

| Surface | Priority |
| --- | --- |
| Public / Customer | mobile-priority |
| Driver | mobile-priority |
| Tenant Operations | desktop-first but responsive |
| Platform Control | desktop-first but responsive |

### Practical Meaning

- customer and driver surfaces must be designed for strong phone usability first
- tenant ops must remain usable on tablet and smaller screens, but dense operations views may still prioritise desktop layouts
- platform control must remain responsive, but phone optimisation is not the primary baseline goal
- responsive collapse must preserve surface identity and trust cues rather than flattening all surfaces into one generic mobile pattern

---

## Responsive Breakpoint Rule

Responsive behavior must not be left as a vague statement.

The frontend contract should use fixed responsive breakpoints with surface-specific layout rules.

### Approved First Breakpoint Set

| Breakpoint | Meaning | Baseline Width |
| --- | --- | --- |
| `mobile` | phone-first layout range | `< 640px` |
| `tablet` | compact two-column or stacked tablet range | `640px - 1023px` |
| `desktop` | standard desktop application range | `1024px - 1439px` |
| `wide` | wide desktop / analytics-heavy range | `>= 1440px` |

Guardrails:
- AI should not invent one-off breakpoint behavior per screen
- surface-specific layout rules may adapt within these ranges
- later token naming may change, but the responsive model should preserve this four-band structure

---

## Surface-Specific Responsive Expectations

### Public / Customer

- stacked layouts on mobile
- booking forms remain readable and progressive
- quote and selection screens collapse safely
- confirmation and tracking remain usable on phone

### Driver

- primary actions remain large and obvious
- critical trip-state actions stay reachable without desktop assumptions
- navigation support and job details must remain readable on phone

### Tenant Operations

- dense tables, queues, and dashboards may adapt by collapsing columns, panels, or rails
- operational views must not become unusable on tablet-sized screens
- mobile may support reduced-detail layouts rather than full dense desktop parity
- critical queue, incident, and quick-action areas should stay above lower-priority trends on smaller screens

### Platform Control

- dashboard and governance views remain responsive
- wide analytical layouts may compress or stack
- desktop remains the primary optimisation target
- wide data tables may reduce columns or defer secondary details on tablet-sized screens

### Platform Ops

- health, incident, and containment context stays above secondary diagnostics on smaller screens
- degraded or stale-state indicators must remain visible across responsive collapse
- wide operational diagnostics may condense on tablet, but the surface is not primarily phone-optimised

---

## Typography Rules

Typography should remain system-controlled.

Current direction:
- use a small approved font set only
- preserve readability and consistency across tenants
- heading, body, and action-text roles should come from approved typography tokens rather than per-tenant overrides

### Approved Font-Role Baseline

- primary UI font family from approved set
- optional secondary display family from approved set where later allowed
- no unrestricted tenant font uploads
- no tenant-specific per-component font remapping

---

## Branding Asset Fallback Rules

Branding must remain safe when tenant assets are incomplete, invalid, or missing.

Approved direction:
- if no valid tenant logo exists, use platform-safe fallback branding treatment for the tenant surface
- if favicon is missing, use the approved fallback icon
- if uploaded assets fail validation, they must not become active by default
- broken assets must not collapse navigation, headers, invoice branding, or embeds

This keeps branding failure from becoming UI failure.

---

## Color and Asset Validation Rules

Tenant branding inputs should be validated for more than just color contrast.

Approved baseline:
- color validation for contrast and semantic clarity
- asset validation for format, aspect-ratio safety, and basic display suitability
- fallback behavior when assets are missing, unreadable, or rejected

This prevents branding tools from destabilising the UI shell.

---

## Implementation-Safe Branding Rule

Tenant branding may influence identity and atmosphere, but the platform still owns:
- semantic state meaning
- structural layout
- responsive behavior
- component logic
- failure and fallback treatment
- do not allow arbitrary uploaded font files in the baseline contract

If broader typography freedom is later needed, it must be documented explicitly.

---

## Data / Asset Links

This contract assumes the frontend needs:
- tenant branding records
- theme token mappings
- approved logo/favicons and fallback assets
- approved theme presets
- surface-specific responsive layout rules

Asset organization should remain aligned with:
- `docs/05-frontend/ui-assets-structure.md`

---

## Security / Tenancy Rules

1. Tenant branding must only affect the owning tenant’s scoped surfaces and outputs.
2. Platform-scoped UI must not accidentally inherit tenant branding.
3. Branding assets and theme choices must respect tenant boundaries.
4. Theme flexibility must not bypass accessibility or semantic clarity rules.

---

## Failure / Exception Rules

- if tenant branding assets are missing, use documented platform fallback assets
- if a color choice fails validation, block or warn according to safety rules
- if a tenant has not completed branding setup, the product must still render with a safe default theme
- if a tenant-scoped PDF or email is generated without branding data, use the documented fallback presentation rather than a broken layout

---

## Stop Conditions

Stop and clarify before implementation if:
- tenants need unrestricted font uploads
- tenants need raw CSS/theme-code editing
- platform control is expected to inherit tenant branding
- responsive behavior must support custom breakpoints per tenant
- dark/light theming becomes a fully custom page-builder problem rather than an approved preset model
