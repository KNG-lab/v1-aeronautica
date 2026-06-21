import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { fadeUp } from '@/utils/motion'
import { cn } from '@/utils/formatters'

interface MetricCardProps {
  icon: ReactNode
  label: string
  value: ReactNode
  hint?: string
  tone?: 'default' | 'accent'
}

export default function MetricCard({ icon, label, value, hint, tone = 'default' }: MetricCardProps) {
  return (
    <motion.div
      variants={fadeUp}
      className={cn(
        'rounded-2xl border p-5',
        tone === 'accent'
          ? 'border-accent-500/25 bg-accent-500/[0.05]'
          : 'border-white/10 bg-ink-800/50',
      )}
    >
      <div className="flex items-center justify-between">
        <span
          className={cn(
            'grid h-10 w-10 place-items-center rounded-xl',
            tone === 'accent' ? 'bg-accent-500/15 text-accent-300' : 'bg-white/[0.04] text-steel-300',
          )}
        >
          {icon}
        </span>
      </div>
      <p className="mt-4 font-display text-3xl font-bold tracking-tight">{value}</p>
      <p className="mt-1 text-sm text-steel-400">{label}</p>
      {hint && <p className="mt-2 text-xs text-steel-500">{hint}</p>}
    </motion.div>
  )
}
