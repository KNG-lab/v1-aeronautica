import type { Variants } from 'framer-motion'

type Ease = [number, number, number, number]

/**
 * Global motion system for V1 Aeronáutica.
 * Cinematic, controlled, premium — durations 0.35s–0.9s, soft easing.
 * Every variant respects prefers-reduced-motion automatically because
 * Framer Motion's <MotionConfig reducedMotion="user"> wraps the app.
 */

export const EASE_OUT: Ease = [0.22, 1, 0.36, 1]
export const EASE_IN_OUT: Ease = [0.65, 0, 0.35, 1]

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE_OUT },
  },
}

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: EASE_OUT } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: EASE_OUT },
  },
}

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE_OUT } },
}

export const slideRight: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE_OUT } },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
}

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04 },
  },
}

export const cardHover = {
  rest: { y: 0 },
  hover: { y: -6, transition: { duration: 0.35, ease: EASE_OUT } },
}

export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_OUT } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.3, ease: EASE_IN_OUT } },
}

/** Shared viewport config for scroll-reveal sections */
export const viewportOnce = { once: true, amount: 0.25 } as const
