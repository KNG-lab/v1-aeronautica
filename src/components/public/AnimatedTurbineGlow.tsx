import { motion, useReducedMotion } from 'framer-motion'

/**
 * Soft orange glow that reinforces the turbine in the hero image. Positioned
 * center-right (over the turbine), it breathes slowly (4–6s). Decorative only:
 * pointer-events-none, low opacity, and static under reduced motion.
 */
export default function AnimatedTurbineGlow() {
  const reduce = useReducedMotion()
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
      <motion.div
        className="absolute left-[58%] top-[44%] h-[clamp(280px,38vw,560px)] w-[clamp(280px,38vw,560px)] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(255,106,0,0.30) 0%, rgba(255,106,0,0.12) 38%, rgba(255,106,0,0) 68%)',
          filter: 'blur(8px)',
        }}
        animate={reduce ? undefined : { opacity: [0.55, 0.95, 0.55], scale: [0.98, 1.04, 0.98] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Thin warm ring echoing the turbine rim */}
      <motion.div
        className="absolute left-[58%] top-[44%] h-[clamp(220px,30vw,440px)] w-[clamp(220px,30vw,440px)] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ boxShadow: '0 0 60px 6px rgba(255,106,0,0.10) inset' }}
        animate={reduce ? undefined : { opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />
    </div>
  )
}
