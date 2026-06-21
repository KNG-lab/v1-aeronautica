/**
 * Subtle film grain overlay (inline SVG turbulence). Purely decorative,
 * pointer-events-none, very low opacity — adds cinematic depth to dark heroes.
 */
const GRAIN =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>"

export default function GrainOverlay({ opacity = 0.04 }: { opacity?: number }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[1] mix-blend-soft-light"
      style={{ backgroundImage: `url("${GRAIN}")`, opacity }}
    />
  )
}
