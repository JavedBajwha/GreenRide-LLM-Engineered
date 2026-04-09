# External Website, WordPress, and WPML Compatibility

## Purpose

Define the supported compatibility stance for external website delivery, WordPress hosting,
and WPML interaction in GreenRide.

This document exists so AI and future implementation work do not invent:
- WordPress as a second full frontend platform
- WPML as the source of truth for booking or business-rule localization
- embeds that bypass GreenRide security or product-scope boundaries
- plugin/theme behavior that quietly owns booking logic

---

## Status

Draft, approved as the current documentation direction.

This document is the canonical compatibility stance for external website, WordPress, and
WPML follow-through.

---

## Scope

This document covers:
- external website integration stance
- WordPress compatibility boundary
- WPML compatibility boundary
- embed security and localization expectations
- supported versus unsupported delivery modes

---

## Out of Scope

This document does not define:
- exact plugin packaging mechanics
- final SDK or embed bootstrap API shape
- final localization key schema
- deep CMS-specific deployment guides

Those belong to later integration and implementation detail work.

---

## Related Documents

- `docs/05-frontend/dashboard-widgets-and-embeddable-ui.md`
- `docs/05-frontend/theme-branding-and-responsive-layout.md`
- `docs/05-frontend/module-aware-ui-and-route-gating.md`
- `docs/03-platform/security-model.md`
- `docs/03-platform/module-commercial-model.md`
- `docs/01-product/booking-creation-and-confirmation.md`

---

## Canonical Rules

1. External website support begins with the approved booking embed surface only.
2. WordPress is a supported host for the approved booking embed, not a full alternative app platform.
3. WPML may support surrounding website content, but it does not own GreenRide booking/business translations.
4. Embedding GreenRide on a third-party website does not weaken GreenRide security, module gating, or booking rules.
5. Internal customer-account, ops, driver, platform-control, and platform-ops surfaces are not supported as WordPress-delivered embeds by default.

---

## External Website Compatibility Baseline

GreenRide supports a narrow external website delivery model.

Approved baseline:
- a tenant or website owner may host the approved booking-entry embed on an external site
- the external site may provide surrounding marketing or landing-page content
- the GreenRide embed remains the owner of booking-entry behavior inside its approved scope

This keeps external website integration useful without creating a second undocumented frontend architecture.

---

## WordPress Stance

WordPress is supported as a host environment for the approved embed surface.

Supported direction:
- WordPress pages may host the approved booking widget/embed
- WordPress themes may control surrounding website layout and content
- tenant branding may flow into the approved embed where branding rules already allow it

Not supported by default:
- WordPress as the runtime owner of customer account flows
- WordPress as the runtime owner of tenant ops, driver, platform control, or platform ops surfaces
- WordPress plugins/themes redefining booking lifecycle, pricing, dispatch, or payment rules

Important boundary:
- WordPress may host GreenRide embed delivery
- WordPress does not become the source of truth for GreenRide business behavior

---

## WPML Stance

WPML is treated as content-layer compatibility, not as the owner of GreenRide application translations or business data.

Supported direction:
- WPML may manage surrounding WordPress page content
- WPML may coexist with a hosted GreenRide booking embed on a multilingual site

Not supported by default:
- WPML becoming the source of truth for booking-form rule text, pricing rules, service-area rules, or runtime business logic
- WPML changing GreenRide business-state labels independently of GreenRide localization rules

Canonical boundary:
- WordPress/WPML can localize site content around the embed
- GreenRide remains responsible for its own approved localization model inside the embed/app surface

---

## Security and Scope Boundary

External website delivery must still respect:
- tenant scoping
- module/package enablement
- booking and payment-path rules
- auth boundaries where required
- frontend route and module-gating rules

Canonical direction:
- an external host page must not bypass normal GreenRide security
- embed hosting does not expand functional scope
- WordPress compatibility is a delivery compatibility decision, not a security exception
- an external host, plugin, or saved embed configuration must not reopen route families, report depth, or action controls that are not approved for the narrow embed surface

---

## Branding and Localization Boundary

Approved direction:
- tenant-facing embeds may use tenant branding where allowed
- surrounding website branding may coexist with the embed host page
- GreenRide localization inside the embed must remain controlled by GreenRide-approved localization behavior

This means:
- host-CMS branding may frame the page
- the embed still follows GreenRide branding, accessibility, and clarity guardrails
- translation tooling outside GreenRide must not redefine booking logic or system-owned UI behavior by assumption
- host branding and embed branding must not blur the fact that the approved external surface is still a narrow booking-entry surface rather than a full account or ops shell

---

## Supported vs Unsupported Summary

### Supported

- external website hosting of the approved booking-entry embed
- WordPress as a host CMS for that approved embed
- WPML for surrounding website/page content
- tenant branding applied to the approved embed where allowed

### Not Supported by Default

- full customer account delivery inside WordPress
- tenant ops, driver, platform control, or platform ops inside WordPress
- full dashboard embedding
- WordPress or WPML owning business rules, lifecycle states, or operational logic

---

## Important Rule

GreenRide should support WordPress as a host for the approved booking embed and allow WPML around that host content, but it should not let CMS/plugin behavior turn into a second application runtime or a second source of truth.

---

## Stop Conditions

Stop and clarify before implementation if:
- WordPress is being proposed as a full alternative frontend platform
- WPML is being asked to control booking/business-rule localization directly
- internal operational surfaces are being proposed as embeddable CMS content
- plugin or theme behavior is being allowed to override GreenRide booking, pricing, dispatch, or payment rules
