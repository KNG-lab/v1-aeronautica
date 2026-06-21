import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { pageTransition } from '@/utils/motion'

/** Wraps a route's content with the global page transition. */
export default function MotionPage({ children }: { children: ReactNode }) {
  return (
    <motion.main
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {children}
    </motion.main>
  )
}
