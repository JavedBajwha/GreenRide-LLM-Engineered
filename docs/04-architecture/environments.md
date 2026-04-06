# Environments

## Purpose

Defines how GreenRide is deployed and operated across different environments.

---

## Environment Types

### Development
- local developer machines
- fast iteration
- mock or test integrations

### Staging
- pre-production validation
- mirrors production behaviour
- used for QA and testing flows

### Production
- live tenant data
- real bookings and payments
- highest reliability requirements

---

## Principles

- environments must be isolated
- configuration must not leak between environments
- production must be protected from unsafe changes

---

## Configuration Separation

Each environment should have:
- separate database
- separate environment variables
- separate API endpoints where required

---

## Deployment Flow

Typical flow:

Development → Staging → Production

Changes should be validated before reaching production.

---

## Summary

Environment structure ensures safe deployment and stable operation of GreenRide as a SaaS platform.
