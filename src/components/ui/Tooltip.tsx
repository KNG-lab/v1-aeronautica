import { useId, useState } from 'react'
import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface TooltipProps {
  /** The trigger content (usually a term or a help icon). */
  children: ReactNode
  /** The explanatory text shown on hover/focus. */
  content: string
  className?: string
}

/**
 * Accessible tooltip: opens on hover AND keyboard focus, dismisses on
 * blur/leave/Escape, and is wired to the trigger via aria-describedby so
 * screen readers announce it. Used to gloss domain terms (e.g. "TCP").
 */
export default function Tooltip({ children, content, className }: TooltipProps) {
  const [open, setOpen] = useState(false)
  const id = useId()

  return (
    <span
      className={`relative inline-flex ${className ?? ''}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
    >
      <button
        type="button"
        aria-describedby={open ? id : undefined}
        className="cursor-help border-b border-dotted border-accent-500/50 text-inherit decoration-dotted underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400/60"
      >
        {children}
      </button>
      <AnimatePresence>
        {open && (
          <motion.span
            role="tooltip"
            id={id}
            initial={{ opacity: 0, y: 4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-full left-1/2 z-[60] mb-2 w-max max-w-[260px] -translate-x-1/2 rounded-lg border border-white/10 bg-ink-700/95 px-3 py-2 text-xs font-normal leading-relaxed text-steel-200 shadow-panel backdrop-blur-xl"
          >
            {content}
            <span className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1 rotate-45 border-b border-r border-white/10 bg-ink-700/95" />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  )
}
