---
target: landing — src/pages/Home.tsx
total_score: 35
p0_count: 0
p1_count: 1
timestamp: 2026-06-21T04-06-20Z
slug: src-pages-home-tsx
---
# Critique — V1 Aeronáutica landing (`src/pages/Home.tsx`) — re-run

## Design Health Score — 35/40 ("Excellent")

| # | Heuristic | Score | Note |
|---|-----------|-------|------|
| 1 | Visibility of System Status | 4 | Live cost summary, scroll progress, dropdown chevron state. |
| 2 | Match System / Real World | 4 | Domain-fluent Spanish + aviation metaphors. |
| 3 | User Control & Freedom | 3 | Escape hatch + cascading resets; no in-menu "clear selection". |
| 4 | Consistency & Standards | 4 | Tokenized system, one button family, ARIA-correct dropdown. |
| 5 | Error Prevention | 3 | Disabled-until-ready, no-schedules guard; opacity-only disabled signal. |
| 6 | Recognition vs Recall | 4 | Selected values persist visibly; summary echoes choices. |
| 7 | Flexibility & Efficiency | 3 | 3 CTA paths + keyboard-complete dropdown; no typeahead/remembered selection. |
| 8 | Aesthetic & Minimalist | 4 | Cinematic, restrained, solid-color discipline; dense back-third. |
| 9 | Error Recovery | 3 | WhatsApp recovery + SmartImage fallback; thin selector validation. |
| 10 | Help & Documentation | 3 | Helper microcopy + reassurance + FAQ; no TCP/term tooltips. |

## Anti-Patterns Verdict
LLM: does NOT read as AI-generated — eyebrow used on only 4 landing sections (not every one), `.text-accent-emphasis` is solid orange (no gradient text), glass confined to the selector, varied layouts (sticky editorial, asymmetric testimonials, portal mock). Residual tells: card-shell repetition (Programs⟷Campus), ImpactStats metric quadrant, 15-section length with uniform py-24/28 rhythm. Deterministic detect.mjs: 0 findings (clean).

## Priority Issues (post-fix backlog)
- [P1] Page length & rhythm monotony (15 sections, uniform spacing, dense back-third) → distill/layout
- [P2] Card-shell repetition (Programs/Campus near-identical; chip motif ×6) → delight/bolder
- [P3] FAQ Accordion semantics thinner than the dropdown (no aria-controls/region) → harden
- [P3] Dropdown value not clearable; opacity-only disabled signal → clarify
- [P3] "Inscribirme + WhatsApp" cluster repeats ~6× → quieter

## Resolved since 28/40
Dropdown keyboard/SR a11y (was P0) — now near-APG-grade. Reassurance microcopy at every CTA (was P1). Eyebrow monoculture (was P1) — cut to 4 on the landing. Selector helper + escape hatch (onboard). Mid-scroll CTA + compact payments (layout).
