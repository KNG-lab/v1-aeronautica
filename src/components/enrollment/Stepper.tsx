import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { cn } from '@/utils/formatters'

interface StepperProps {
  steps: string[]
  current: number
  /** Jump to an already-completed step. Forward jumps are not offered. */
  onStepClick?: (index: number) => void
}

/** Vertical (desktop) / horizontal (mobile) progress stepper. */
export default function Stepper({ steps, current, onStepClick }: StepperProps) {
  return (
    <>
      {/* Desktop vertical */}
      <ol className="hidden lg:block">
        {steps.map((label, i) => {
          const done = i < current
          const active = i === current
          const clickable = done && !!onStepClick
          const Row = clickable ? 'button' : 'div'
          return (
            <li key={label} className="relative flex pb-7 last:pb-0">
              {i < steps.length - 1 && (
                <span
                  className={cn(
                    'absolute left-[15px] top-8 h-[calc(100%-16px)] w-px',
                    done ? 'bg-accent-500/50' : 'bg-white/10',
                  )}
                />
              )}
              <Row
                {...(clickable
                  ? { type: 'button' as const, onClick: () => onStepClick!(i) }
                  : {})}
                className={cn(
                  'flex w-full items-start gap-4 rounded-lg text-left transition-colors',
                  clickable && 'group -mx-2 px-2 py-1 hover:bg-white/[0.03]',
                )}
              >
                <span
                  className={cn(
                    'relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border text-xs font-semibold transition-colors',
                    done && 'border-accent-500 bg-accent-500 text-ink-900',
                    active && 'border-accent-500 bg-accent-500/10 text-accent-300',
                    !done && !active && 'border-white/15 text-steel-500',
                  )}
                >
                  {done ? <Check className="h-4 w-4" /> : i + 1}
                </span>
                <span className="pt-1">
                  <span
                    className={cn(
                      'block text-sm font-medium transition-colors',
                      active ? 'text-white' : done ? 'text-steel-300 group-hover:text-white' : 'text-steel-500',
                    )}
                  >
                    {label}
                  </span>
                  {clickable && (
                    <span className="text-[11px] text-steel-500 opacity-0 transition-opacity group-hover:opacity-100">
                      Editar
                    </span>
                  )}
                </span>
              </Row>
            </li>
          )
        })}
      </ol>

      {/* Mobile progress bar */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium text-accent-300">{steps[current]}</span>
          <span className="text-steel-500">
            {current + 1} / {steps.length}
          </span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-accent-500"
            initial={false}
            animate={{ width: `${((current + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>
    </>
  )
}
