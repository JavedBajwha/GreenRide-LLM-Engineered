# GreenRide Context (MASTER FILE)

## Project Overview
GreenRide is a multi-tenant SaaS platform for taxi and private hire companies.
It includes customer booking, dispatch operations, driver workflows, payments, realtime tracking, notifications, tenant-aware configuration, and platform-level governance.

## Current Repository Role
This repository is the active **LLM-engineered working repo**.
It contains imported architecture documents from the earlier clean docs repository and adds implementation control documents needed to reduce AI drift.

## Current Phase
We are in **controlled implementation preparation**.

This means:
- architecture docs exist and remain valuable
- implementation is allowed only when guided by strict contracts
- missing execution details must be added before major coding begins
- Search & Quote remains the first controlled build slice

## Known Gap We Are Fixing
The inherited docs are strong at architecture level, but weak at deterministic implementation level.
The main issues identified are:
- data model is too skeletal for direct generation
- service boundaries are described mostly in prose
- file and folder structures are not locked tightly enough
- environment and dependency contracts are incomplete
- migration strategy is not explicit enough
- AI agents do not yet have strong stop-and-flag rules

## Active Upgrade Areas
1. implementation rules hardening
2. repo structure definition
3. environment contract
4. migration strategy
5. data model expansion into implementation-ready schema
6. per-slice execution guidance

## Working Preferences
- step-by-step progress
- no silent redesigns
- no assumption-heavy coding
- one controlled slice at a time
- full copy-paste-ready outputs when needed
- preserve terminology already established in the docs

## Important Rule
If something necessary for implementation is missing, the system must stop and flag it rather than guess.

## Immediate Next Focus
Prepare the repo so an AI coding agent can safely implement Search & Quote without drifting away from the intended architecture.
