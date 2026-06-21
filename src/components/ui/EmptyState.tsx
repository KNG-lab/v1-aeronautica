import type { ReactNode } from 'react'
import { Inbox } from 'lucide-react'

export default function EmptyState({
  title,
  description,
  icon,
  action,
}: {
  title: string
  description?: string
  icon?: ReactNode
  action?: ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-14 text-center">
      <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-white/[0.04] text-steel-400">
        {icon ?? <Inbox className="h-6 w-6" />}
      </div>
      <p className="text-base font-medium text-steel-100">{title}</p>
      {description && (
        <p className="mt-1 max-w-sm text-sm text-steel-400">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
