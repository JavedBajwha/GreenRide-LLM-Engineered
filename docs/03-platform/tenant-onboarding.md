# Tenant Onboarding

## 1. Purpose

Tenant onboarding is the process of creating and preparing a new taxi business inside the GreenRide platform.

The purpose of onboarding is to move a tenant from initial platform setup to a usable operational state.

A newly onboarded tenant should be able to:

- access its own environment
- apply its branding
- configure core business rules
- prepare booking operations
- manage users
- begin accepting bookings when ready

Tenant onboarding is important because GreenRide is a multi-tenant SaaS platform.  
Each new tenant must be created in a controlled, repeatable, and safe way.

---

## 2. Why Tenant Onboarding Matters

Without a proper onboarding process, new tenants may experience:

- incomplete setup
- broken branding
- missing booking rules
- payment configuration problems
- notification issues
- operational confusion
- poor first impression of the platform

A strong onboarding process reduces setup risk and ensures each tenant starts with a clean, structured foundation.

---

## 3. Onboarding Goals

The onboarding process should aim to:

- create a valid tenant record
- establish tenant identity
- connect tenant branding
- apply default configuration
- enable required modules
- create initial admin access
- prepare operational data structure
- support payment and notification setup
- provide a path to go-live readiness

---

## 4. Onboarding Principles

### 4.1 Repeatable

Every tenant should be onboarded through a consistent process.

### 4.2 Controlled

The platform must not allow incomplete or unsafe tenant creation.

### 4.3 Flexible

Different tenants may need different modules, services, and configuration choices.

### 4.4 Fast to Activate

The onboarding flow should reduce unnecessary delays.

### 4.5 Safe for Multi-Tenancy

Every onboarding action must preserve tenant isolation and avoid affecting existing tenants.

---

## 5. High-Level Onboarding Stages

A typical tenant onboarding journey may include:

1. tenant creation
2. business identity setup
3. branding setup
4. configuration baseline
5. service and booking setup
6. pricing setup
7. payment setup
8. notification setup
9. user access setup
10. testing and go-live readiness

---

## 6. Stage 1: Tenant Creation

The first stage is the creation of the tenant itself.

This establishes the core tenant identity inside GreenRide.

Typical items include:

- internal tenant ID
- tenant name
- business display name
- tenant status
- subscription or plan level
- onboarding state
- primary contact details

This is the foundational step for all later configuration.

---

## 7. Stage 2: Business Identity Setup

This stage defines how the tenant is represented as a business.

Examples:

- legal business name
- trading name
- support email
- support phone number
- office address
- invoice identity
- tax or VAT details if relevant

This information may appear across customer booking flows, invoices, notifications, and admin areas.

---

## 8. Stage 3: Branding Setup

This stage defines the tenant’s visual identity.

Examples:

- logo
- favicon
- primary brand colour
- secondary colour
- email header branding
- customer-facing brand name
- footer details

The goal is that the tenant should feel like its own business, not a generic platform instance.

Branding must still remain within controlled product design boundaries.

---

## 9. Stage 4: Configuration Baseline

At this stage, the tenant receives its initial default configuration.

This may include:

- booking defaults
- available service modes
- default payment options
- notification defaults
- customer account settings
- operational rules
- enabled features based on plan

This step is critical because a newly onboarded tenant should not start from an empty state.

---

## 10. Stage 5: Service Setup

Now the tenant’s offered services are configured.

Examples:

- airport transfers enabled
- local transfer service enabled
- executive travel enabled
- chauffeur service enabled
- child seat options enabled
- meet and greet enabled
- wheelchair request support enabled

Not all tenants will offer the same services.

---

## 11. Stage 6: Booking Rules Setup

The onboarding process should establish the initial booking behaviour.

Examples:

- guest booking allowed or not
- account creation optional or required
- return trips enabled
- multi-stop enabled
- hourly booking enabled
- minimum notice period
- maximum advance booking window
- required booking fields

This stage shapes the customer booking experience directly.

---

## 12. Stage 7: Vehicle and Fleet Setup

A tenant usually needs a starting structure for available vehicle categories.

Examples:

- saloon
- estate
- MPV
- executive
- minibus
- accessible vehicle

This setup may include:

- category labels
- passenger capacity
- luggage capacity
- sort order
- default visibility in quote results

Actual vehicle records may be added later, but the structure should be ready.

---

## 13. Stage 8: Pricing Setup

The onboarding process should guide the tenant into an initial pricing model.

Possible models include:

- fixed route pricing
- zone pricing
- calculated pricing
- hourly pricing

Pricing setup may also include:

- minimum fare
- surcharges
- extras pricing
- airport pickup adjustments
- corporate rate support

A tenant does not necessarily need its full final pricing model on day one, but it needs a usable baseline.

---

## 14. Stage 9: Payment Setup

This stage prepares the commercial side of tenant operations.

Examples:

- card payment enabled
- cash enabled
- account billing enabled
- merchant account linkage
- invoice settings
- deposit rules
- refund behaviour

In the baseline GreenRide model, the tenant owns its own commercial relationship with its customer.

---

## 15. Stage 10: Notification Setup

Notification setup ensures the tenant can communicate with customers and staff correctly.

Examples:

- booking confirmation email
- SMS confirmation
- reminder rules
- cancellation notifications
- driver assigned messages
- trip completed receipt sending

This stage may also include:

- sender identity
- support details
- template branding
- message wording

Incorrect notification setup can damage trust very quickly, so this stage matters.

---

## 16. Stage 11: User Access Setup

A new tenant needs initial users to access and manage its environment.

Typical first users may include:

- tenant owner
- tenant admin
- office manager
- dispatcher
- finance user

At minimum, onboarding should ensure one secure tenant admin account is created.

This stage may also define role assignments and invitation flow.

---

## 17. Stage 12: Go-Live Readiness

Before a tenant starts taking real bookings, the platform should confirm go-live readiness.

This may include checks such as:

- branding present
- booking flow enabled
- service types configured
- pricing available
- payment method prepared
- notifications enabled
- admin user active
- tenant status marked ready

This stage reduces the risk of sending a tenant live in a broken or incomplete state.

---

## 18. Tenant Status During Onboarding

A tenant may move through several statuses during onboarding.

Examples:

- created
- setup in progress
- awaiting configuration
- awaiting payment setup
- ready for testing
- live
- suspended

These statuses help platform admins understand tenant progress and support needs.

---

## 19. Who Performs Onboarding

Tenant onboarding may involve different actors.

### 19.1 Platform Team

GreenRide platform users may handle:

- tenant creation
- subscription plan assignment
- module enablement
- platform-level checks
- support during setup

### 19.2 Tenant Team

The tenant’s own staff may handle:

- branding uploads
- service preferences
- pricing entry
- business contact details
- staff invitations
- operational rules

### 19.3 Shared Process

In many cases onboarding will be a shared responsibility between platform and tenant.

---

## 20. Defaults vs Custom Setup

A strong onboarding model should balance defaults with tenant-specific setup.

### 20.1 Defaults

Defaults help the tenant start quickly.

Examples:

- default booking rules
- default notification templates
- default service categories
- default vehicle labels

### 20.2 Tenant-Specific Input

Tenants should still configure:

- branding
- support details
- pricing
- payment setup
- service preferences
- operational rules

This balance avoids both empty setup and uncontrolled complexity.

---

## 21. Risks of Poor Onboarding

If tenant onboarding is badly designed, common risks include:

- incomplete tenant setup
- support teams doing manual fixes later
- customer-facing errors at go-live
- payment failures
- notification mistakes
- wrong branding in production
- missing admin access
- pricing not working
- bad first impression for the tenant

Because onboarding is the first operational experience, it has major impact on trust.

---

## 22. Relationship to Other Documents

Tenant onboarding depends on and connects to several other GreenRide areas, including:

- multi-tenancy
- tenant configuration
- branding
- pricing
- payment setup
- notifications
- customer app
- admin and dispatch system

This document defines the onboarding process at platform level, while deeper technical or operational details can be documented separately later.

---

## 23. Future Expansion Areas

The onboarding process may later grow to include:

- guided onboarding wizard
- onboarding progress dashboard
- trial environment setup
- automated validation checks
- migration import tools
- sample pricing templates
- onboarding checklist system
- training links for tenant admins
- staged go-live controls

These should build on the same structured onboarding model.

---

## 24. Out of Scope

This document does not define:

- low-level database implementation
- exact admin screen design
- exact API contracts
- exact file storage model
- detailed user invitation logic
- detailed payment provider implementation

Those can be documented in dedicated technical or operational documents later.

---

## 25. Summary

Tenant onboarding is the structured process of creating, preparing, and activating a new tenant inside GreenRide.

It ensures that a new taxi business can move from setup to operational readiness through a controlled sequence of steps covering:

- identity
- branding
- configuration
- services
- booking rules
- pricing
- payments
- notifications
- user access
- go-live readiness

Done properly, onboarding reduces errors, improves tenant confidence, and helps GreenRide scale as a professional SaaS platform.
