# Security Model

## Purpose

This document defines the platform-level security model for GreenRide.

Security ensures:
- tenant data isolation
- safe authentication and access control
- protection of sensitive operations
- secure communication between systems
- auditability of critical actions

System context: [[system-map]]

---

## Core Security Principles

### 1. Tenant Isolation First
All data access must be tenant-scoped.

### 2. Least Privilege
Users only get access required for their role.

### 3. Explicit Access Control
All actions must be permission-checked via [[rbac]].

### 4. Secure by Default
No feature should expose data without explicit control.

### 5. Audit Everything Critical
All sensitive actions must be logged.

---

## Authentication

GreenRide supports:
- email/password login
- token-based authentication (JWT/session)
- optional SSO (future)

Authentication establishes identity only.  
Authorisation is handled by [[rbac]].

---

## Authorisation

All access decisions must go through:

- role (user role)
- tenant (tenant boundary)
- permission (action level)

See: [[rbac]]

---

## Data Protection

### In Transit
- HTTPS required

### At Rest
- database encryption (provider level)

### Sensitive Data
- passwords hashed
- tokens secured

---

## API Security

- all endpoints require authentication unless public
- tenant context must be resolved before data access
- rate limiting applied
- input validation required

---

## Operational Security

- admin actions must be restricted
- financial actions require strict permission checks
- tenant configuration changes must be controlled

---

## Audit and Logging

Critical actions to log:
- login attempts
- booking changes
- payment actions
- role/permission changes
- admin actions

---

## Related Systems

- [[rbac]]
- [[multi-tenancy]]
- [[api-architecture]]

---

## Summary

Security in GreenRide is enforced through:
- strong tenant isolation
- strict access control (RBAC)
- secure authentication
- protected APIs
- audit logging

Security is not a feature.  
It is a platform-wide responsibility.