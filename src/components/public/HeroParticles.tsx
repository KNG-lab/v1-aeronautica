import { motion, useReducedMotion } from 'framer-motion'

/** Deterministic ember positions (no Math.random at render). */
const EMBERS = [
  { x: '12%', y: '70%', s: 3, d: 9, delay: 0 },
  { x: '20%', y: '48%', s: 2, d: 11, delay: 1.2 },
  { x: '30%', y: '64%', s: 3, d: 10, delay: 0.6 },
  { x: '42%', y: '40%', s: 2, d: 12, delay: 2 },
  { x: '52%', y: '58%', s: 4, d: 9.5, delay: 1.5 },
  { x: '60%', y: '36%', s: 2, d: 11.5, delay: 0.3 },
  { x: '66%', y: '62%', s: 3, d: 10.5, delay: 2.4 },
  { x: '72%', y: '30%', s: 2, d: 12.5, delay: 1 },
  { x: '78%', y: '54%', s: 3, d: 9, delay: 1.8 },
  { x: '84%', y: '40%', s: 2, d: 11, delay: 0.9 },
  { x: '38%', y: '74%', s: 2, d: 10, delay: 2.6 },
  { x: '48%', y: '28%', s: 3, d: 12, delay: 0.5 },
  { x: '26%', y: '34%', s: 2, d: 11, delay: 1.4 },
  { x: '70%', y: '72%', s: 3, d: 9.8, delay: 2.1 },
  { x: '88%', y: '64%', s: 2, d: 12, delay: 0.7 },
  { x: '16%', y: '30%', s: 2, d: 10.6, delay: 1.9 },
]

/** Subtle rising orange embers over the hero. Static under reduced motion. */
export default function HeroParticles() {
  const reduce = useReducedMotion()
  if (reduce) return null
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-[3] overflow-hidden">
      {EMBERS.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-accent-500"
          style={{ left: p.x, top: p.y, width: p.s, height: p.s, opacity: 0.0 }}
          animate={{ y: [0, -34, 0], opacity: [0, 0.6, 0] }}
          transition={{ duration: p.d, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
        />
      ))}
    </div>
  )
}
