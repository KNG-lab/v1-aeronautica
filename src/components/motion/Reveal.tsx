import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { fadeUp, staggerContainer, viewportOnce } from '@/utils/motion'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'section' | 'article' | 'li' | 'span'
}

/** Single element that fades up when it enters the viewport. */
export function FadeUp({ children, className, delay = 0, as = 'div' }: RevealProps) {
  const Comp = motion[as]
  return (
    <Comp
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </Comp>
  )
}

/** Container that staggers its FadeChild children into view. */
export function StaggerContainer({
  children,
  className,
  amount = 0.2,
}: {
  children: ReactNode
  className?: string
  amount?: number
}) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  )
}

/** Child element for a StaggerContainer. */
export function StaggerChild({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div className={className} variants={fadeUp}>
      {children}
    </motion.div>
  )
}

/** Section reveal: a block that fades + lifts as a whole. */
export function SectionReveal({ children, className }: RevealProps) {
  return (
    <motion.section
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {children}
    </motion.section>
  )
}
