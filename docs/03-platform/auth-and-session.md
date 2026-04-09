# Auth and Session Lifecycle

## Purpose

Define the canonical authentication and session model for GreenRide.

This document exists so AI and future implementation work do not invent:
- login behavior
- logout behavior
- password reset behavior
- invite behavior
- MFA expectations
- token/session lifecycle rules

---

## Status

Draft, approved as the current documentation direction.

This document is intended to centralise the agreed auth/session model for Phase 2 platform foundations.

---

## Scope

This document covers:
- login and logout
- session creation, refresh, expiry, and revocation
- password reset and account recovery
- invite-based account activation for managed users
- MFA expectations for privileged roles
- role-aware redirect relationship with frontend surfaces

---

## Out of Scope

This document does not define:
- SSO implementation
- external identity-provider integration
- exact email template copy
- customer booking/account UX details owned by booking docs
- platform engineering access outside the product UI

Those belong in separate auth, booking, or platform-ops contracts.

---

## Roles Affected

- guest customer
- customer
- driver
- office_staff
- dispatcher
- tenant_admin
- tenant_owner
- super_admin
- platform_ops as a later schema/auth alignment stakeholder

---

## App Surfaces Affected

- public/customer booking surface
- customer surface
- driver surface
- tenant operations surface
- platform control surface
- platform ops surface when the role model is aligned explicitly

---

## Related Documents

- `docs/03-platform/security-model.md`
- `docs/03-platform/data-protection-and-encryption-baseline.md`
- `docs/03-platform/rbac.md`
- `docs/03-platform/multi-tenancy.md`
- `docs/05-frontend/auth-redirect-and-protected-routes.md`
- `docs/05-frontend/role-app-surface-map.md`

---

## Canonical Rules

1. Authentication establishes identity only. Authorisation is still handled through RBAC and tenant scope checks.
2. All protected routes and protected APIs must require a valid authenticated session.
3. Public booking and quote access must stay explicitly limited to documented public flows only.
4. Driver, tenant-ops, and platform-control surfaces must never rely on guest or anonymous access.
5. Session controls, logout, password reset, invite activation, and MFA must be auditable.
6. Tenant isolation rules still apply after authentication. A valid login does not bypass tenant boundaries.
7. A valid authenticated session does not grant access to the wrong surface family. Wrong-surface access must still fail through RBAC and protected-route rules.
8. Session continuity must be revalidated against account and tenant state, not trusted indefinitely just because a refreshable session exists.

---

## Identity Entry Model

GreenRide uses a role-aware entry model rather than one generic login destination.

### Public / Customer

- guest customers may access approved public quote and booking-entry routes where the booking domain allows it
- authenticated customers use customer-account login and are redirected into the customer surface

### Driver

- drivers must authenticate before using `/driver/*`
- driver access is always protected

### Tenant Operations

- `office_staff`, `dispatcher`, `tenant_admin`, and `tenant_owner` must authenticate before using `/ops/*`

### Platform Control

- `super_admin` must authenticate before using `/platform/*`

Frontend redirect ownership remains defined in:
- `docs/05-frontend/auth-redirect-and-protected-routes.md`

---

## Supported Auth Baseline

Current approved baseline:
- email/password authentication
- short-lived access token
- revocable refresh/session record
- invite-based activation for managed roles
- password reset via one-time recovery token
- MFA for privileged roles

Future option, not part of the current baseline:
- SSO

### Timing Policy Bands

Exact implementation constants are still a later decision, but the timing model should stay within these policy bands:

- access token: short-lived, measured in minutes
- refresh/session continuity: longer-lived, measured in days and revocable
- invite token: time-limited, measured in hours or days, not open-ended
- password recovery token: short-lived and one-time, measured in minutes or hours
- MFA pending challenge window: short-lived, measured in minutes

These bands are intentional guardrails so AI does not invent:
- effectively non-expiring access tokens
- indefinite invite validity
- recovery tokens that remain usable for unrealistic periods

### Session Replacement Rule

When a refresh/session record is rotated or replaced:
- the older refreshable record must no longer remain silently valid
- refresh-token replacement must not create parallel hidden continuity for the same replaced session chain
- any later implementation may support multiple distinct active sessions, but session replacement inside one session chain must stay invalidating rather than additive

---

## Account Provisioning Model

### Customer Accounts

Customer account creation may happen through:
- explicit self-service account creation
- a booking flow that later converts a guest into an account-backed customer

The exact customer account-creation UX belongs to customer-booking documentation.
This auth contract only requires that authenticated customer accounts use the same session and recovery controls as other normal accounts.

### Managed Tenant Accounts

Managed tenant accounts are invite-based.

This applies to:
- driver
- office_staff
- dispatcher
- tenant_admin
- tenant_owner when provisioned by platform or an existing higher authority

Rules:
- `tenant_owner` and `tenant_admin` may invite tenant-scoped users only within documented RBAC limits
- no tenant-scoped role may invite or elevate anyone above its own allowed authority
- `super_admin` may provision tenant users when acting at platform scope
- replacing or resending an invite must invalidate the older active invite token for the same invitation intent

### Platform Accounts

`super_admin` accounts are platform-managed only.
They are not self-registering public accounts.

### Platform Ops Auth Linkage

`platform_ops` is currently a documentation-level operational role model.

If platform-ops login is implemented later:
- it should follow the managed privileged-account baseline
- MFA should be required
- default landing should be the Platform Ops surface
- schema/auth alignment must be approved explicitly before implementation

---

## Login Rules

### Required Inputs

- email
- password
- MFA challenge when required for the role/account

### Login Success Conditions

Successful login must:
1. validate account credentials
2. confirm account is active
3. confirm tenant/account state permits login
4. complete MFA when required
5. create a new authenticated session
6. return the authenticated identity context required by RBAC
7. send the user to the correct role-based surface

### Post-Login Redirect Trust Rule

Successful login does not mean every authenticated surface becomes available.

After login:
- the default redirect must follow the canonical role-to-surface mapping
- direct navigation to another protected surface must still be rejected if the role is wrong
- `super_admin` must not gain implicit `/platform-ops/*` execution access just because platform-level authentication succeeded
- if `platform_ops` is later implemented, its login path must remain explicitly separate in authority even if the UI shares platform branding infrastructure

### Login Failure Conditions

Login must fail when:
- credentials are invalid
- account is inactive, suspended, or unverified where verification is required
- tenant is suspended or under a maintenance/restriction state that blocks login
- MFA is required but not completed
- abuse-protection controls temporarily block the attempt

### Session Revalidation Conditions

An existing session must no longer be treated as fully valid when any of the following changes occur:
- account suspension or deactivation
- tenant suspension or tenant state that blocks continued access
- password reset or recovery completion where revocation is required
- privileged-role or authority change that should narrow access immediately
- emergency containment that explicitly revokes or narrows active session scope

The platform does not need to treat every profile edit as session-breaking.
It does need to treat trust-sensitive account, tenant, and authority changes as revalidation or revocation events rather than waiting for normal expiry.

---

## Logout Rules

### Standard Logout

Standard logout must:
- revoke the current refresh/session record
- clear client-side auth state
- prevent new access-token refresh from the revoked session

### Forced Logout / Session Revocation

The platform must support forced invalidation of active sessions when triggered by:
- password reset completion
- account suspension
- tenant suspension or restriction
- emergency security containment

### Scope

Baseline behavior:
- user-initiated logout ends the current session
- forced security/admin actions may invalidate one or many active sessions depending on scope

### Concurrent Session Baseline

GreenRide may allow more than one active session for the same account unless a later policy narrows that behavior.

Rules:
- current-session logout ends only the current session by default
- forced security actions may revoke all active sessions for the affected account or scope
- session continuity must not survive password reset, account suspension, tenant suspension, or emergency containment where revocation is required

### Protected-Surface Session Rules

Protected-surface access must apply all of the following checks together:
- valid authenticated session
- correct route-family role
- still-valid tenant/account state
- any required MFA completion state
- narrower in-surface RBAC where the page or action requires it

This means:
- a valid customer session must not open `/ops/*`, `/platform/*`, or `/platform-ops/*`
- a valid tenant-user session must not open `/platform/*` or `/platform-ops/*`
- a valid `super_admin` session must not automatically act as `platform_ops`

### Deferred Constants

The following remain intentionally deferred and should not be invented as fixed implementation values yet:
- exact access-token TTL
- exact refresh/session TTL
- exact invite-expiry TTL
- exact password-reset TTL
- exact MFA challenge-expiry TTL
- exact maximum concurrent-session policy

These values still need a later explicit decision.
They should stay within the policy bands already documented here.

---

## Invite Flow Rules

Invite flow is the baseline onboarding mechanism for managed roles.

### Invite Requirements

Every invite must record:
- invited email
- target role
- tenant scope
- inviter identity
- created time
- expiry time
- invite status

### Invite Token Rules

- single use
- time-limited
- invalid after acceptance, expiry, revocation, or replacement

### Invite Acceptance

Invite acceptance must require:
- invite token validation
- password creation
- MFA setup if the invited role requires MFA
- account activation inside the correct tenant scope

---

## Password Reset and Recovery Rules

Password reset must use a one-time recovery token.

### Recovery Token Rules

- single use
- time-limited
- invalid after successful reset, expiry, or replacement

### Reset Completion Rules

Successful password reset must:
- set the new password
- revoke existing refresh/session records for that account
- require fresh login after reset
- create audit records for request and completion

### Recovery Guardrails

- reset requests must not reveal whether an email is registered in a way that weakens security
- repeated reset attempts must still respect abuse-protection controls

---

## MFA Rules

### Roles Requiring MFA

MFA is required for:
- `super_admin`
- `tenant_owner`
- `tenant_admin`

MFA is not yet a documented baseline requirement for:
- `dispatcher`
- `office_staff`
- `driver`
- `customer`

Future expansion is allowed, but must be documented explicitly before implementation.

### MFA Enforcement Points

MFA must be enforced at:
- login for required roles
- invite acceptance for required roles
- recovery or reactivation flows where privileged access is being restored

---

## Session and Token Model

GreenRide should use:
- a short-lived access token for authenticated API access
- a longer-lived, revocable refresh/session record for session continuity

### Token Payload Minimum

Authenticated identity context must include at least:
- user ID
- tenant ID where applicable
- role
- expiry

This aligns with `docs/03-platform/rbac.md`.

### Session Rules

- access tokens must expire automatically
- refresh/session records must be revocable
- refresh attempts from revoked, expired, or invalid sessions must fail
- session refresh must not silently bypass account suspension, tenant suspension, or emergency restrictions

### Session Boundaries

- guest/public flows do not create privileged authenticated sessions
- every authenticated session must resolve to one role and one scope context
- tenant-scoped sessions must never cross tenant boundaries
- role or tenant-state changes must be re-evaluated at refresh time before session continuity is extended

---

## States / Lifecycle

### Auth Lifecycle States

| State | Meaning |
| --- | --- |
| unauthenticated | user has no valid authenticated session |
| invite_pending | managed account has been invited but not activated |
| recovery_pending | password reset has been requested and is awaiting completion |
| mfa_pending | credentials accepted but MFA challenge not yet completed |
| authenticated | valid authenticated session exists |
| revoked | session or token chain has been invalidated |
| suspended | account or tenant state blocks normal session use |

### Lifecycle Transitions

| From | To | Trigger |
| --- | --- | --- |
| unauthenticated | mfa_pending | valid credentials entered for MFA-required account |
| unauthenticated | authenticated | valid login for non-MFA account |
| mfa_pending | authenticated | MFA completed successfully |
| invite_pending | authenticated | invite accepted and activation complete |
| unauthenticated | recovery_pending | password reset initiated |
| recovery_pending | unauthenticated | reset token expires or is replaced |
| recovery_pending | authenticated | reset completed and fresh login succeeds |
| authenticated | revoked | logout, forced logout, password reset, suspension, or emergency control |
| authenticated | suspended | account or tenant becomes blocked |
| suspended | unauthenticated | access remains blocked until restored and user logs in again |

---

## UI / Screen Mapping

Auth outcomes must align with the route/surface contract:

| Role | Default Landing Destination |
| --- | --- |
| customer | `/customer` |
| driver | `/driver` |
| office_staff | `/ops` |
| dispatcher | `/ops/dispatch` |
| tenant_admin | `/ops` |
| tenant_owner | `/ops` |
| super_admin | `/platform` |
| platform_ops | `/platform-ops` when explicitly implemented |

Auth errors, suspended access, expired sessions, MFA requirements, and maintenance restrictions must present explicit user-facing states rather than dropping users into broken pages.

---

## Data Model Links

This contract assumes the platform needs records for at least:
- users
- tenants
- invites
- password reset tokens
- session/refresh records
- MFA enrollment state for required roles

Exact schema ownership belongs to backend/data-model documentation.

---

## Security / Tenancy Rules

1. Every authenticated request must still pass tenant-scope and RBAC checks.
2. `super_admin` is platform-scoped; tenant-scoped roles are not.
3. Session refresh must re-check whether the account, tenant, and role are still allowed to continue.
4. Login, logout, invite, password reset, session revocation, and MFA events must be audit-visible.
5. Auth endpoints must be protected by abuse-prevention controls.
6. Privileged roles must not bypass MFA or tenant/account status checks.

---

## Failure / Exception Rules

- expired access token with valid refresh/session record: require refresh flow, not silent continued access
- expired or revoked refresh/session record: require fresh login
- suspended tenant or account: block login and refresh
- expired invite or recovery token: reject and require new token issuance
- replaced invite or recovery token: older token must fail even if its normal expiry has not been reached
- incomplete MFA for required role: do not create a normal authenticated session
- maintenance or emergency restriction that blocks login: show explicit restricted-access state
- role, tenant, or privileged-access change detected during refresh: deny continued session if the updated state no longer allows it

---

## Audit Requirements

The following auth events must be audit-visible:
- login success
- login failure
- logout
- forced logout / session revocation
- invite creation
- invite acceptance
- password reset request
- password reset completion
- MFA enrollment or recovery-relevant changes
- account suspension or auth-related access restriction
- invite replacement or revocation
- recovery-token replacement or revocation

---

## Stop Conditions

Stop and clarify before implementation if:
- SSO becomes required
- platform ops receives a normal in-app auth model distinct from current role structure
- exact customer self-registration rules conflict with booking-domain decisions
- token/session TTL values need to become implementation constants and are not yet approved
- remembered-device, trusted-device, or device-management features are introduced
