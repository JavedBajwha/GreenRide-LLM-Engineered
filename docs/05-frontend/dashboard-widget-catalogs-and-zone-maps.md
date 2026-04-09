# Dashboard Widget Catalogs and Zone Maps

## Purpose

Define the first concrete widget-catalog and zone-map baseline for GreenRide dashboards.

This document exists so AI and future implementation work do not invent:
- dashboard widgets with no approved surface placement
- zone-based layouts that still have no real zone ownership
- critical operational widgets moved into secondary locations by accident
- inconsistent widget meaning across customer, driver, ops, and platform surfaces

---

## Status

Draft, approved as the current documentation direction.

This document is the first concrete bridge between the dashboard widget contract and the dashboard layout contract.

---

## Scope

This document covers:
- first widget catalogs by surface
- first zone-map baseline by surface
- protected versus configurable widget placement
- relationship between widget purpose and zone ownership

---

## Out of Scope

This document does not define:
- final visual card designs
- exact drag/drop behavior
- every future optional widget
- widget query implementation details

Those belong to later visual-detail and implementation work.

---

## Related Documents

- `docs/05-frontend/dashboard-widgets-and-embeddable-ui.md`
- `docs/05-frontend/dashboard-layout-and-customization.md`
- `docs/05-frontend/customer-ui-contract.md`
- `docs/05-frontend/driver-ui-contract.md`
- `docs/05-frontend/tenant-operations-ui-contract.md`
- `docs/05-frontend/platform-control-ui-contract.md`
- `docs/05-frontend/platform-ops-console.md`
- `docs/03-services/reporting-visibility-exports-and-dashboard-metric-ownership.md`

---

## Canonical Rules

1. Every dashboard surface should have an approved default widget catalog.
2. Every dashboard surface should have an approved zone map.
3. Critical operational and governance widgets belong in protected zones.
4. Configurable widgets may move only within approved configurable zones.
5. Widget meaning must stay aligned with source ownership and surface purpose.

---

## Shared Zone Vocabulary

Approved first zone labels:
- `hero`
- `primary_operations`
- `primary_summary`
- `secondary_summary`
- `alerts_and_exceptions`
- `quick_actions`
- `supporting_trends`
- `personal_tools`

Baseline meaning:
- `hero`: top-priority user-orientation zone
- `primary_operations`: live action or live queue zone
- `primary_summary`: first-line KPI/status zone
- `secondary_summary`: supporting KPI/status zone
- `alerts_and_exceptions`: warnings, incidents, and exceptions
- `quick_actions`: immediate next-step actions
- `supporting_trends`: lower-priority historic or trend views
- `personal_tools`: user convenience tools such as saved locations or shortcuts

Not every surface uses every zone.

---

## Customer Dashboard

### First Widget Catalog

| Widget | Source Type | Placement Type |
| --- | --- | --- |
| next_trip | reporting or realtime summary | fixed |
| active_trip_summary | realtime | fixed when relevant |
| recent_bookings | reporting | configurable |
| saved_locations | static or configuration summary | configurable |
| quick_rebook_actions | static or reporting summary | configurable |

### First Zone Map

| Zone | Expected Content | Protection Level |
| --- | --- | --- |
| `hero` | next trip or active trip summary | protected |
| `primary_summary` | recent bookings | semi-flexible |
| `personal_tools` | saved locations, quick rebook | customizable |

Customer dashboards stay light and personal.

---

## Driver Dashboard

### First Widget Catalog

| Widget | Source Type | Placement Type |
| --- | --- | --- |
| availability_status | realtime | fixed |
| incoming_or_current_job | realtime | fixed |
| primary_trip_actions | static or realtime context | fixed |
| recent_work_summary | reporting summary | configurable |
| important_alerts_messages | static, audit, or operational summary | fixed |

### First Zone Map

| Zone | Expected Content | Protection Level |
| --- | --- | --- |
| `hero` | incoming/current job | protected |
| `primary_operations` | primary trip actions, availability status | protected |
| `alerts_and_exceptions` | important alerts/messages | protected |
| `secondary_summary` | recent work summary | semi-flexible |

Driver dashboards remain action-first and tightly protected.

---

## Tenant Operations Dashboard

### First Widget Catalog

| Widget | Source Type | Placement Type |
| --- | --- | --- |
| live_kpis | realtime or reporting summary | fixed |
| dispatch_queue_summary | realtime | fixed |
| driver_availability | realtime | fixed |
| incidents_exceptions | realtime or operational summary | fixed |
| quick_actions | static or action summary | fixed |
| supporting_trends | reporting | configurable |

### First Zone Map

| Zone | Expected Content | Protection Level |
| --- | --- | --- |
| `primary_summary` | live KPIs | protected |
| `primary_operations` | dispatch queue summary, driver availability | protected |
| `alerts_and_exceptions` | incidents/exceptions | protected |
| `quick_actions` | quick operational actions | protected |
| `supporting_trends` | supporting trends and lower-priority summaries | semi-flexible |

Tenant Operations must preserve the dispatch-first operating model.

---

## Platform Control Dashboard

### First Widget Catalog

| Widget | Source Type | Placement Type |
| --- | --- | --- |
| tenant_count_status | reporting or configuration summary | fixed |
| onboarding_progress | reporting or configuration summary | fixed |
| package_module_distribution | reporting | fixed |
| support_audit_alerts | audit or reporting summary | fixed |
| commercial_visibility_summary | reporting | configurable |

### First Zone Map

| Zone | Expected Content | Protection Level |
| --- | --- | --- |
| `primary_summary` | tenant count/status, onboarding progress | protected |
| `secondary_summary` | package/module distribution | protected |
| `alerts_and_exceptions` | support/audit alerts | protected |
| `supporting_trends` | commercial visibility summary | semi-flexible |

Platform Control remains governance-oriented rather than operationally reactive.

---

## Platform Ops Dashboard

### First Widget Catalog

| Widget | Source Type | Placement Type |
| --- | --- | --- |
| service_health | observability | fixed |
| incident_count_summary | observability or incident summary | fixed |
| maintenance_state | static or operational summary | fixed |
| release_status | static or operational summary | fixed |
| active_containment_controls | audit or operational summary | fixed |
| secondary_health_breakdowns | observability | configurable |

### First Zone Map

| Zone | Expected Content | Protection Level |
| --- | --- | --- |
| `primary_summary` | service health, incident count | protected |
| `alerts_and_exceptions` | active incidents and containment controls | protected |
| `primary_operations` | maintenance state, release status | protected |
| `secondary_summary` | secondary health breakdowns | semi-flexible |

Platform Ops keeps the strongest protected layout.

---

## Protection Rule

Protected zones are not optional decoration.

Approved direction:
- protected zones must keep their intended class of widget
- saved layouts must not displace protected widgets into low-priority positions
- configurable widgets may move only inside approved configurable or semi-flexible zones

This is the minimum safe rule for ops and governance surfaces.

---

## Widget Ownership Rule

Widget placement must respect ownership.

Canonical direction:
- observability widgets belong primarily on Platform Ops
- tenant business reporting widgets belong primarily on Tenant Operations
- governance/commercial summaries belong primarily on Platform Control
- personal booking and convenience widgets belong on Customer
- action-first trip and status widgets belong on Driver
- a widget may summarize deeper information, but it must not by itself grant broader route, report, export, or operational-action authority than the owning surface allows

This prevents one dashboard from quietly swallowing another dashboard’s purpose.

---

## Relationship to Customization

This document defines defaults first.

Approved direction:
- product-owned defaults come first
- later customization must stay inside the zone map and protection rules
- a widget may be configurable without being globally placeable anywhere

Customization is bounded by the catalog and zone map.

---

## Invariants

1. Every dashboard surface has an approved default widget catalog.
2. Every dashboard surface has an approved zone map.
3. Protected widgets stay in protected zones.
4. Widget source ownership must remain explicit.
5. Customization cannot override surface identity.

---

## Important Rule

GreenRide dashboards should feel intentionally structured by surface, not like one generic card system rearranged five different ways.

---

## Stop Conditions

Stop and clarify before implementation if:
- protected operational widgets are being moved into optional zones
- observability widgets are being treated like tenant business reporting by default
- customer or driver dashboards are being expanded into dense admin-style grids
- customization is being allowed without respecting the approved zone map
