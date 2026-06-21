---
target: landing — src/pages/Home.tsx
total_score: 28
p0_count: 1
p1_count: 2
timestamp: 2026-06-21T03-26-06Z
slug: src-pages-home-tsx
---
# Critique — V1 Aeronáutica landing (`src/pages/Home.tsx`)

## Design Health Score — 28/40 (Good)

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Live cost/duration feedback, scroll-progress bar, multi-step enrollment progress present; minor dropdown empty/loading gaps. |
| 2 | Match System / Real World | 4 | Spanish + aviation framing maps to how students think. |
| 3 | User Control & Freedom | 3 | Escape/outside-click; no "clear selection"; marquee/glow only stop under reduced-motion. |
| 4 | Consistency & Standards | 3 | Strong tokens; custom PremiumDropdown breaks native-select expectation. |
| 5 | Error Prevention | 3 | Disabled-until-complete, "no horarios" guard, coming-soon disabled; no guard if course before sede. |
| 6 | Recognition vs Recall | 3 | Icons+labels aid recognition; 3rd dropdown relies on remembering skipped step. |
| 7 | Flexibility & Efficiency | 3 | Parallel CTAs + selector; no keyboard accelerators. |
| 8 | Aesthetic & Minimalist | 2 | 14 sections + eyebrow-on-every-section + triple hero CTA = noise. |
| 9 | Error Recovery | 2 | SmartImage degrades well; selector lacks validation/recovery from stale params. |
| 10 | Help & Documentation | 2 | FAQ + WhatsApp good; no cost tooltips, no TCP glossary, no first-timer onboarding. |

## Anti-Patterns Verdict
LLM: eyebrow monoculture (9 eyebrows, 6 identical SectionHeader silhouettes) is the main slop tell; rescued by no-gradient-text, confined glass, and asymmetric Experience/Testimonials/Portal layouts. Deterministic detect.mjs: 0 findings (clean) across Home + public + ui. Visual overlays: not injected (scan clean).

## Priority Issues
- [P0] PremiumDropdown not keyboard/SR accessible (the conversion control) → harden
- [P1] No reassurance microcopy at enrollment CTAs → clarify
- [P1] Eyebrow + SectionHeader monoculture → distill
- [P2] Long scroll, flat 6-section middle → layout
- [P2] Selector front-loads 3 decisions before trust → onboard

## Persona Red Flags
Jordan: configurator before catalog; unglossed "TCP"; CTA doesn't say if it means paying. Riley: dropdown keyboard-dead; sede change wipes selections silently; back-button loses state; footer `href="#"` dead links. Casey: 3 stacked dropdowns before value; 14 full-height sections; cramped 6-tile benefits; WhatsApp styled lowest-priority.

## Minor
`.text-accent-gradient` misnomer (solid orange); footer dead social links; hardcoded credential number; no aria-disabled reason on disabled button. Corrected false positives: skip-link AND scroll-progress DO exist in PublicLayout.
