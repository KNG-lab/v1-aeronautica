import { FadeUp } from '@/components/motion/Reveal'
import { cn } from '@/utils/formatters'

interface SectionHeaderProps {
  index?: string
  eyebrow?: string
  title: string
  accentWord?: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

/**
 * Reference-style section header: uppercase display title with an orange accent
 * word and a short underline beneath — matching the client's committed design.
 */
export default function SectionHeader({
  index,
  eyebrow,
  title,
  accentWord,
  description,
  align = 'center',
  className,
}: SectionHeaderProps) {
  const centered = align === 'center'
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        centered ? 'items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      {(index || eyebrow) && (
        <FadeUp className="flex items-center gap-3">
          {index && <span className="font-display text-sm font-medium text-accent-500">{index}</span>}
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        </FadeUp>
      )}

      <FadeUp delay={0.05}>
        <h2 className="max-w-3xl text-balance font-display text-3xl font-bold uppercase leading-[1.08] tracking-tight sm:text-4xl md:text-[2.75rem]">
          {title}{' '}
          {accentWord && <span className="text-accent-500">{accentWord}</span>}
        </h2>
      </FadeUp>

      {/* Accent underline */}
      <FadeUp delay={0.08}>
        <span className={cn('block h-[3px] w-16 rounded-full bg-accent-500', centered && 'mx-auto')} />
      </FadeUp>

      {description && (
        <FadeUp delay={0.12}>
          <p
            className={cn(
              'max-w-2xl text-base leading-relaxed text-steel-300',
              centered && 'mx-auto',
            )}
          >
            {description}
          </p>
        </FadeUp>
      )}
    </div>
  )
}
