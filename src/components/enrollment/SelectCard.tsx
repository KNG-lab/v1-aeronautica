import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { cn } from '@/utils/formatters'
import { fadeUp } from '@/utils/motion'

interface SelectCardProps {
  title: string
  subtitle?: string
  meta?: string
  selected: boolean
  disabled?: boolean
  onClick: () => void
  icon?: React.ReactNode
}

/** Large tappable selection card used across enrollment steps. */
export default function SelectCard({
  title,
  subtitle,
  meta,
  selected,
  disabled,
  onClick,
  icon,
}: SelectCardProps) {
  return (
    <motion.button
      type="button"
      variants={fadeUp}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? undefined : { y: -3 }}
      whileTap={disabled ? undefined : { scale: 0.99 }}
      className={cn(
        'relative flex w-full items-start gap-4 rounded-2xl border p-5 text-left transition-colors duration-200',
        disabled && 'cursor-not-allowed opacity-40',
        selected
          ? 'border-accent-500/60 bg-accent-500/[0.07]'
          : 'border-white/10 bg-ink-800/50 hover:border-white/25',
      )}
    >
      {icon && (
        <span
          className={cn(
            'grid h-11 w-11 shrink-0 place-items-center rounded-xl',
            selected ? 'bg-accent-500/15 text-accent-300' : 'bg-white/[0.04] text-steel-300',
          )}
        >
          {icon}
        </span>
      )}
      <span className="flex-1">
        <span className="flex items-center justify-between gap-2">
          <span className="text-base font-semibold text-steel-100">{title}</span>
          {meta && <span className="text-sm font-medium text-accent-300">{meta}</span>}
        </span>
        {subtitle && <span className="mt-1 block text-sm text-steel-400">{subtitle}</span>}
      </span>
      <span
        className={cn(
          'grid h-5 w-5 shrink-0 place-items-center rounded-full border transition-colors',
          selected ? 'border-accent-500 bg-accent-500 text-ink-900' : 'border-white/20',
        )}
      >
        {selected && <Check className="h-3 w-3" />}
      </span>
    </motion.button>
  )
}
