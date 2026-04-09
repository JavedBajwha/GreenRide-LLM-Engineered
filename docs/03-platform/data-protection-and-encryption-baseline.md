# Data Protection and Encryption Baseline

## Purpose

Define the minimum data-protection and encryption rules for GreenRide so AI and
future implementation work do not invent unsafe handling for passwords, tokens,
secrets, sensitive exports, or protected traffic.

This document is a baseline security contract.
It is not a full infrastructure cryptography architecture.

---

## Status

Draft, approved as the current documentation direction.

This document provides the first implementation-safe encryption and
data-protection baseline for controlled AI-assisted work.

---

## Scope

This document covers:
- transport protection baseline
- at-rest protection baseline
- password and token protection rules
- secret-handling baseline
- sensitive-data classification at a product level
- export, proof, and file/media protection baseline
- reopen triggers for deeper encryption or key-management design

---

## Out of Scope

This document does not define:
- cloud-provider or vendor selection
- KMS vendor choice
- HSM requirements
- exact production key-rotation mechanics
- legal/compliance certification language
- low-level infrastructure backup tooling
- field-by-field database schema implementation

Those belong to later infrastructure, platform-engineering, or compliance work.

---

## Related Documents

- `docs/03-platform/security-model.md`
- `docs/03-platform/auth-and-session.md`
- `docs/03-platform/application-logging.md`
- `docs/03-services/audit-logging.md`
- `docs/03-services/payments-and-invoicing.md`
- `docs/03-services/parcel-proof-and-tracking-contract.md`
- `docs/06-implementation/environment-contract.md`

---

## Canonical Rules

1. Protected traffic must use encrypted transport.
2. Provider-level encrypted storage is the minimum baseline for persisted
   application data.
3. Passwords must be stored as one-way password hashes, not reversible secrets.
4. Sensitive tokens must not be stored or logged in unsafe raw form where the
   server only needs verification.
5. Secrets must not be exposed through product UI, logs, audit history, or
   convenience exports.
6. Data-protection rules apply independently from RBAC and tenant isolation.
7. If a slice requires stronger encryption meaning than this baseline provides,
   the docs must be reopened before implementation continues.

---

## Transport Protection Baseline

### Protected Traffic

- HTTPS is required for protected user-facing traffic.
- Credentials, bearer tokens, recovery tokens, invite tokens, and other
  secret-bearing requests must not travel over unencrypted transport.
- Protected API traffic must be treated as transport-sensitive even when the
  caller is another approved internal surface.

### External Providers and Connectors

- Provider or connector communications that carry sensitive or protected data
  should use encrypted transport where the provider supports it and the flow is
  approved.
- This document does not choose provider-specific TLS settings or certificate
  policy.

---

## At-Rest Protection Baseline

### Minimum Baseline

- Provider-level encrypted storage is the minimum baseline for:
  - relational data
  - object/file storage if later added
  - queued or staged persisted payloads if later added
  - backup or snapshot storage if later added

### Important Boundary

Provider-level encryption is the minimum baseline, not a blanket statement that
all higher-risk data classes are fully solved forever.

If a later slice stores more sensitive material than the current baseline
assumes, stronger protection rules may need explicit approval first.

---

## Password, Token, and Secret Handling

### Passwords

- Passwords must be stored only as one-way password hashes.
- Passwords must never be logged, exported, audited, or stored in reversible
  form.
- General-purpose reversible encryption is not an acceptable substitute for
  password hashing.

### Access Tokens

- Access tokens are bearer credentials and must be treated as sensitive.
- Raw access tokens must not be written into audit logs, application logs, or
  ordinary business records.
- If token identifiers are needed for correlation, use safe identifiers or
  metadata rather than dumping the raw token.

### Refresh, Recovery, and Invite Tokens

- Refresh/session-continuity tokens, password-recovery tokens, and invite
  tokens must not be stored in unsafe raw form when the server only needs to
  verify them later.
- The approved baseline is one-way verification material or an equivalently
  protected server-side representation, not casual plaintext token storage.
- Replaced or revoked tokens must not remain silently reusable just because old
  storage records still exist.

### Signing and Runtime Secrets

- Signing secrets, provider secrets, and other runtime secrets must remain
  outside normal product UI flows.
- Local development may use environment variables as documented in the current
  environment contract.
- Production secret-management mechanics remain out of scope until deployment
  automation and hosting assumptions are intentionally documented.

---

## Sensitive Data Classes

GreenRide should treat at least these categories as protection-sensitive:

| Data Class | Baseline Protection Meaning |
| --- | --- |
| passwords | one-way hashing only |
| auth/session tokens | no unsafe raw storage or logging |
| MFA or recovery secrets | no unsafe raw storage or logging |
| provider secrets and signing secrets | runtime-secret handling only, never normal UI exposure |
| payment-sensitive data | no casual storage or logging; follow payment-domain boundaries |
| proof or identity-sensitive media | protect storage and access tightly; do not expose casually |
| sensitive exports and report bundles | access-controlled, tenant-scoped, and not casually retained or exposed |
| audit/log payloads with identifiers | structured, minimal, privacy-aware, and never secret dumps |

This is a product-level protection classification, not a formal compliance taxonomy.

---

## Logging, Audit, and Observability Boundary

The following must not appear in raw form in normal logs, observability events,
or audit history:

- passwords
- raw access tokens
- raw refresh tokens
- raw recovery or invite tokens
- MFA secrets
- raw payment instrument data
- unnecessary freeform sensitive personal data

If diagnosis needs context:
- prefer identifiers
- prefer state labels
- prefer narrow structured metadata
- do not dump full sensitive payloads by default

---

## Exports, Files, and Media Baseline

### Exports

- Sensitive exports must remain constrained by RBAC, tenant scope, and module
  eligibility.
- If exports are retained server-side beyond immediate delivery mechanics, that
  retained material must still follow the at-rest protection baseline.
- Export delivery, expiry, and retention details may still need later
  documentation in reporting/payment domains.

### Files, Proof, and Media

- If GreenRide later stores uploaded proof, document, or media assets, those
  assets must use protected storage and controlled access.
- Proof or identity-sensitive media must not be treated like casual branding
  assets or public website content.
- This baseline does not yet define thumbnailing, malware scanning, signed URL
  duration, or media-key mechanics.

---

## Tenant and Scope Boundary

Encryption and protection do not replace tenant isolation.

Rules:
- encrypted or protected storage does not permit broader visibility
- tenant-scoped sensitive data must still obey tenant-boundary enforcement
- platform-wide support or ops visibility must remain explicitly documented and
  not be widened by convenience

---

## What Is Safe To Implement Now

The current baseline is strong enough for controlled implementation of:
- password hashing
- safe token handling and no-raw-token logging
- protected transport assumptions for local/product flows
- provider-encrypted persistence as the minimum at-rest baseline
- explicit refusal to expose secrets in UI/logging/audit paths

This baseline is not permission to invent:
- tenant-managed encryption choices
- custom crypto schemes
- production key-rotation workflows
- field-level encryption policy for every future data class

---

## Reopen Triggers

Reopen docs before implementation continues if a slice needs to decide:

- field-level encryption for specific stored data classes
- key-management ownership or rotation semantics
- storage rules for raw proof/identity media
- long-lived retained export bundles containing sensitive data
- third-party connector secret lifecycle beyond the current env-secret baseline
- production secret-storage or deployment-time encryption assumptions
- stronger payment-data or regulated-data handling than the current payment and
  security docs already define

---

## Stop Conditions

Stop and clarify before implementation if:
- a password is being stored reversibly
- raw refresh/recovery/invite tokens are being stored casually without a
  documented reason and protection model
- secrets are being surfaced into UI, logs, or audit records
- provider-level storage encryption is being treated as permission to ignore
  higher-risk data classes
- production key-management or hosting assumptions are being invented
- a slice needs stronger encryption meaning than this baseline currently states

