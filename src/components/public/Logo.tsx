import { Link } from 'react-router-dom'
import { cn } from '@/utils/formatters'

/** V1 Aeronáutica wordmark. */
export default function Logo({
  className,
  compact = false,
}: {
  className?: string
  compact?: boolean
}) {
  return (
    <Link to="/" className={cn('group inline-flex items-center gap-2.5', className)}>
      <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-lg border border-white/10 bg-ink-700">
        <span className="font-display text-lg font-bold leading-none tracking-tightest">
          V<span className="text-accent-500">1</span>
        </span>
        <span className="absolute inset-x-0 bottom-0 h-[2px] bg-accent-500" />
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-sm font-bold uppercase tracking-[0.2em]">
            Aeronáutica
          </span>
          <span className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-steel-400">
            Formación que te eleva
          </span>
        </span>
      )}
    </Link>
  )
}
