import { motion, useScroll, useSpring } from 'framer-motion'

/** Ultra-thin top scroll progress indicator. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[100] h-[2px] w-full origin-left bg-gradient-to-r from-accent-500 via-accent-400 to-accent-600"
    />
  )
}
