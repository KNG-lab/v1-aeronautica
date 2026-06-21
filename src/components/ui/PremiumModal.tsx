import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

interface PremiumModalProps {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  maxWidth?: string
}

/** Centered modal with scrim + spring entrance. */
export default function PremiumModal({
  open,
  onClose,
  title,
  children,
  maxWidth = 'max-w-lg',
}: PremiumModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink-900/70 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className={`glass-strong relative z-10 w-full ${maxWidth} rounded-2xl p-6 shadow-panel`}
          >
            <div className="mb-4 flex items-center justify-between">
              {title && <h3 className="text-lg font-semibold">{title}</h3>}
              <button
                onClick={onClose}
                aria-label="Cerrar"
                className="ml-auto rounded-lg p-1.5 text-steel-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
