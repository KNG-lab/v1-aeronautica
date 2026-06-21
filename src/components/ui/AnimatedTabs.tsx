import { motion } from 'framer-motion'
import { cn } from '@/utils/formatters'

export interface TabItem {
  id: string
  label: string
  icon?: React.ReactNode
}

interface AnimatedTabsProps {
  tabs: TabItem[]
  active: string
  onChange: (id: string) => void
  layoutId?: string
  className?: string
}

/** Pill tabs with a sliding active indicator (shared layout animation). */
export default function AnimatedTabs({
  tabs,
  active,
  onChange,
  layoutId = 'tab-indicator',
  className,
}: AnimatedTabsProps) {
  return (
    <div
      className={cn(
        'inline-flex flex-wrap gap-1 rounded-xl border border-white/10 bg-white/[0.03] p-1',
        className,
      )}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === active
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              'relative inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors',
              isActive ? 'text-ink-900' : 'text-steel-300 hover:text-white',
            )}
          >
            {isActive && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 rounded-lg bg-accent-500"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {tab.icon}
              {tab.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
