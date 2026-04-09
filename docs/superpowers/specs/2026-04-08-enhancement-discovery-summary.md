# Enhancement Discovery Summary

## Purpose

Capture the product and platform enhancement candidates identified during the
post-closure discovery discussion.

This document exists to preserve enhancement ideas that are strong enough to
deserve future documentation waves, without mixing them into the already closed
core documentation program prematurely.

## Current Position

The GreenRide documentation program is substantially complete for controlled
AI-assisted build readiness.

This summary is not reopening the completed closure batches.
It is identifying what new modules and enhancement areas should be considered
for future documentation waves.

## Strong Candidate Add-Ons

### 1. School Run Add-On

Approved design direction:
- separate optional add-on
- recurring-first school transport
- optional one-off school pickup/drop journeys
- authority can be parent-led, school-led, or mixed by tenant configuration
- distinct school-run workflow layered on the booking engine
- medium first-pass child transport controls
- ride-tracking foundation reused without changing core ride/trip truth

Pricing and billing direction:
- recurring arrangement pricing as primary
- weekly and monthly cadence support
- optional bespoke/custom invoicing mode
- rider-based, corridor-based, or mixed pricing basis
- calendar-aware partial-period billing support

### 2. Parcel / Courier / Logistics Add-On

Approved design direction:
- separate optional add-on
- courier delivery and logistics management CMS
- logistics-job lifecycle as primary
- optional booking-style intake at the edge
- proof-of-delivery baseline plus stronger optional proof layer
- separate parcel-tracking truth using shared tracking infrastructure

Pricing and parcel-size direction:
- named parcel classes
- measured dimensions/weight
- zone/distance
- service/handling level
- support for larger items and pallets

## Strong Candidate Customer / Booking Enhancements

### Saved Passenger Profiles

Approved direction:
- support richer saved passenger profiles beyond the main account holder
- include preferences, notes, and relevant transport metadata

### Wallet / Credit Balance

Approved direction:
- support a basic wallet / credit balance model
- do not yet assume a full loyalty or referral system

### Limited Recurring Bookings

Approved direction:
- support recurring bookings beyond School Run
- keep the first pass limited rather than building a full subscription
  scheduling engine

### Accessibility / Assisted-Travel Options

Approved direction:
- support structured accessibility / assisted-travel options plus notes
- do not yet require a full eligibility-program workflow

### Linked Outbound / Return Bookings

Approved direction:
- support linked outbound/return bookings
- do not yet expand into full multi-stop route chaining

## Strong Candidate Driver / Live Ops Enhancements

### Basic Shift / Availability States

Approved direction:
- support more than simple online/offline
- include basic shift and temporary availability states

### Pre-Shift / Pre-Job Checklists

Approved direction:
- support basic pre-shift and pre-job checklist workflows
- useful for transport, parcel, and safety scenarios

### Approved Operational Evidence Capture

Approved direction:
- support basic evidence/media capture for approved operational events
- examples include parcel handover, vehicle issue, and incident evidence

## Strong Candidate Tenant Ops / Dispatch Enhancements

### General Operations Board

Approved direction:
- support a general operations board
- use queue-based operational views
- do not yet split immediately into many separate board products

### Basic Exception Queues

Approved direction:
- support first-class exception queues for operational problem states
- do not yet require a full case-management workflow

### Limited Safe Bulk Actions

Approved direction:
- support limited safe bulk actions for approved operational workflows
- do not allow broad unrestricted batch tooling by default

### Structured Internal Ops Notes

Approved direction:
- support structured internal ops notes, handoff notes, and annotations
- do not yet expand into a lightweight internal task engine

## Strong Candidate Platform / Admin / Commercial Enhancements

### Basic Rollout Control

Approved direction:
- support more than simple enable/disable for module rollout
- allow basic staged or controlled rollout direction
- do not yet require a full feature-management platform

### Basic Tenant Health / Readiness Dashboard

Approved direction:
- support a first-class tenant health/readiness view
- include readiness/commercial/support/operational visibility at a basic level
- do not yet require scoring automation or richer alerting

### Basic Commercial Proposal Tracking

Approved direction:
- support in-platform commercial proposal tracking for module/add-on offers
- distinguish pending commercial offers from active commercial state
- do not yet require a fuller proposal approval workflow

## Strong Candidate Services / Integrations / Reporting Enhancements

### Basic Outbound Webhooks / Event Subscriptions

Approved direction:
- support basic outbound webhook or event-subscription delivery
- do not yet require a full event-platform product

### Basic Scheduled Exports / Report Delivery

Approved direction:
- support scheduled exports and scheduled report delivery
- do not yet require fuller orchestration or automation pipelines

### Controlled Template-Based Automated Communications

Approved direction:
- support controlled template-based automated communications tied to approved
  business or operational events
- do not yet require a full workflow automation engine

## Needs Deeper Discussion Later

These ideas are meaningful but were not shaped enough to become immediate
documentation-wave scope:

- full multi-stop booking chains
- full workforce scheduling
- full school attendance-control workflows
- full warehouse/hub logistics complexity
- loyalty / referral / promo systems
- broader media/evidence system
- broad specialized board products per domain
- full case-management workflow
- richer feature-management platform
- richer tenant health scoring and alert automation
- fuller commercial proposal approval workflow
- richer event delivery/retry management platform
- fuller reporting/automation orchestration
- tenant ops / dispatch enhancement pack
- platform / commercial enhancement pack
- service / integration / reporting automation expansion

## Recommendation

Use this summary as the intake point for future documentation waves.

Recommended next discovery order:
1. Tenant Ops / Dispatch enhancements
2. Platform / Admin / Commercial enhancements
3. Services / Integrations / Reporting enhancements

Do not mix these into the closed core documentation waves without creating new
explicit documentation scope for them.

## Recommended Enhancement Roadmap

### Wave 1: School Run and Parcel Add-Ons

Why first:
- already shaped in the most detail
- highest immediate product-expansion value
- both affect booking, ops, tracking, pricing, notifications, and reporting
- both need explicit contracts before they leak into the base model

Includes:
- School Run add-on
- Parcel / Courier / Logistics add-on

### Wave 2: Tenant Ops / Dispatch Enhancement Pack

Why second:
- the new add-ons will need stronger operational tooling
- queue-based operations, exception handling, and safe bulk actions are natural
  follow-ons
- this improves operations without redesigning the whole platform

Includes:
- general operations board
- exception queues
- limited safe bulk actions
- structured ops notes

### Wave 3: Customer / Booking Enhancement Pack

Why third:
- strong customer value, but safer after the add-on and ops shape is clearer
- these changes touch booking, pricing, identity, and communication behavior
- better to extend after the new service modules are anchored

Includes:
- saved passenger profiles
- wallet / credit balance
- recurring bookings beyond School Run
- accessibility / assisted-travel options
- linked outbound/return bookings

### Wave 4: Platform / Admin / Commercial Enhancement Pack

Why fourth:
- depends on the add-ons and operational model being clearer first
- rollout control, tenant health, and commercial proposal tracking are easier to
  define after the earlier waves land

Includes:
- rollout control
- tenant health / readiness dashboard
- commercial proposal tracking

### Wave 5: Services / Integrations / Reporting Enhancement Pack

Why fifth:
- broadest and most cross-cutting wave
- best documented after product and ops expansion are clearer
- avoids automating unstable business events too early

Includes:
- outbound webhooks / event subscriptions
- scheduled exports / report delivery
- controlled template-based automated communications
