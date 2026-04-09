# Documentation Contract Template

## Purpose

This file defines the standard structure for new implementation-safe GreenRide documentation.

Use this template when:
- creating a new canonical implementation contract
- upgrading a high-level document into an implementation-safe document

The goal is consistency.
If documents use different structures, AI agents will miss details or invent behavior.

---

## Required Sections

Every implementation-safe document should include these sections unless there is a clear reason not to.

| Section | Purpose |
| --- | --- |
| Purpose | What this document is for |
| Status | Draft, approved, provisional, blocked, etc. |
| Scope | What is included |
| Out of scope | What is deliberately excluded |
| Roles affected | Which roles this topic touches |
| App surfaces affected | Which app areas or route families are affected |
| Related documents | Canonical links to supporting docs |
| Canonical rules | The rules AI must follow |
| States / lifecycle | Required if the topic includes status transitions |
| API / contract links | Required if requests, responses, or events are involved |
| Data model links | Which entities / fields matter |
| Security / tenancy rules | Access, tenant boundary, privacy, abuse protection |
| Failure / exception rules | What happens when things go wrong |
| Stop conditions | When AI must stop and ask for clarification |

---

## Optional Sections

Use these when relevant:

| Section | Use when |
| --- | --- |
| UI / screen mapping | Frontend routes or screens are involved |
| Realtime rules | Live events, sockets, polling, or freshness rules are involved |
| Audit requirements | Critical actions need traceability |
| Observability requirements | Logs, metrics, traces, alerts are required |
| Open questions | The topic is not yet fully resolved |

---

## Required Writing Rules

1. Do not invent behavior.
2. Name canonical routes, states, and roles explicitly.
3. Say what is out of scope, not only what is in scope.
4. If the document depends on another canonical document, link it explicitly.
5. If the document is provisional, say why.
6. If the topic is blocked by a missing dependency, state that clearly.

---

## Minimum Standard

A document is not implementation-safe if it:
- only describes concepts at a high level
- does not define scope boundaries
- does not link to related canonical docs
- leaves roles, routes, or states implied
- leaves failure behavior undefined where failure is important

---

## Rule

If a new document does not follow this structure closely enough, update it before using it as implementation guidance.
