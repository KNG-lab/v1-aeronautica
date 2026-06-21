import type { ReactNode } from 'react'
import { cn } from '@/utils/formatters'

export default function GlassPanel({
  children,
  className,
  strong = false,
}: {
  children: ReactNode
  className?: string
  strong?: boolean
}) {
  return (
    <div
      className={cn(
        'rounded-2xl shadow-panel',
        strong ? 'glass-strong' : 'glass',
        className,
      )}
    >
      {children}
    </div>
  )
}
