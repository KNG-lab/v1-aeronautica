import { cn } from '@/utils/formatters'

type Tone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger' | 'info'

const tones: Record<Tone, string> = {
  neutral: 'border-white/10 bg-white/[0.04] text-steel-300',
  accent: 'border-accent-500/30 bg-accent-500/10 text-accent-300',
  success: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
  warning: 'border-amber-500/30 bg-amber-500/10 text-amber-300',
  danger: 'border-rose-500/30 bg-rose-500/10 text-rose-300',
  info: 'border-sky-500/30 bg-sky-500/10 text-sky-300',
}

export default function StatusBadge({
  children,
  tone = 'neutral',
  dot = false,
  className,
}: {
  children: React.ReactNode
  tone?: Tone
  dot?: boolean
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium',
        tones[tone],
        className,
      )}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  )
}

/** Maps domain status strings → badge tone + label. */
export function statusTone(status: string): { tone: Tone; label: string } {
  switch (status) {
    case 'approved':
      return { tone: 'success', label: 'Aprobado' }
    case 'in-validation':
      return { tone: 'info', label: 'En validación' }
    case 'pending':
      return { tone: 'warning', label: 'Pendiente' }
    case 'incomplete':
      return { tone: 'danger', label: 'Incompleto' }
    case 'new':
      return { tone: 'accent', label: 'Nueva' }
    case 'available':
      return { tone: 'success', label: 'Disponible' }
    case 'coming-soon':
      return { tone: 'warning', label: 'Próximamente' }
    case 'to-define':
      return { tone: 'neutral', label: 'Por definir' }
    case 'aprobado':
      return { tone: 'success', label: 'Aprobado' }
    case 'cursando':
      return { tone: 'info', label: 'Cursando' }
    case 'pendiente':
      return { tone: 'neutral', label: 'Pendiente' }
    default:
      return { tone: 'neutral', label: status }
  }
}
