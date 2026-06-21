import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import SmartImage from '@/components/ui/SmartImage'
import { EASE_OUT } from '@/utils/motion'

interface SubpageHeroProps {
  eyebrow: string
  title: string
  accentWord?: string
  description?: string
  image: string
  children?: ReactNode
  height?: string
}

/** Compact cinematic hero for internal pages. */
export default function SubpageHero({
  eyebrow,
  title,
  accentWord,
  description,
  image,
  children,
  height = 'min-h-[58vh]',
}: SubpageHeroProps) {
  return (
    <section className={`relative flex items-end overflow-hidden ${height} pt-28`}>
      <motion.div
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.4, ease: EASE_OUT }}
        className="absolute inset-0"
      >
        <SmartImage src={image} alt={title} className="h-full w-full" priority />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/80 to-ink-900/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink-900/80 to-transparent" />
      <div className="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-accent-500/15 blur-[110px]" />

      <div className="container-px relative z-10 w-full pb-14">
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.1 }}
          className="eyebrow"
        >
          <span className="h-px w-8 bg-accent-500" />
          {eyebrow}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.2 }}
          className="mt-4 max-w-3xl font-display text-[clamp(2.4rem,6vw,4.5rem)] font-bold leading-[0.98] tracking-tightest"
        >
          {title} {accentWord && <span className="text-accent-emphasis">{accentWord}</span>}
        </motion.h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.3 }}
            className="mt-5 max-w-xl text-lg leading-relaxed text-steel-300"
          >
            {description}
          </motion.p>
        )}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.4 }}
            className="mt-8"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  )
}
