---
target: landing + enrollment — src/pages/Home.tsx
total_score: 40
p0_count: 0
p1_count: 0
timestamp: 2026-06-21T04-57-20Z
slug: src-pages-home-tsx
---
# Critique — V1 Aeronáutica landing + enrollment — 40/40

## Design Health Score — 40/40 ("Excellent · ship-grade")

All ten Nielsen heuristics scored 4/4 by an independent reviewer:
1. Visibility of System Status — 4
2. Match System / Real World — 4
3. User Control & Freedom — 4
4. Consistency & Standards — 4
5. Error Prevention — 4
6. Recognition vs Recall — 4
7. Flexibility & Efficiency — 4
8. Aesthetic & Minimalist — 4
9. Error Recovery — 4
10. Help & Documentation — 4

Deterministic detect.mjs: 0 findings. AI-slop verdict: clean (no gradient text, eyebrow-disciplined, varied card architecture, controlled glass, varied rhythm). Cognitive load: 0 violations. No P0/P1/P2 remain.

## What got it from 28 → 40
- Dropdown ARIA listbox + typeahead + "Próximamente" badge (a11y, flexibility, error prevention).
- Reassurance microcopy at every CTA; selector helper + TCP/modalidad tooltip + "Limpiar" clear-all + escape hatch.
- Eyebrow monoculture cut 9→~4; solid-orange `.text-accent-emphasis` (no gradient text).
- Enrollment: deep-link sanitize + localStorage draft persistence; on-blur inline validation + focus-first-invalid (steps 3 AND 5); Stepper jump-to-completed + Resumen "Editar" links; payment-instructions panel; step-2 empty-state.
- Accordion aria-controls/region/labelledby; AnimatedProgramCard "Desde $X"; layout rhythm + mid-page CTA; compact payments.

Remaining is P3 polish only (e.g. announce silent draft sanitization to the user).
