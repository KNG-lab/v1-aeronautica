import { forwardRef } from 'react'
import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/utils/formatters'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface BaseProps {
  children: ReactNode
  variant?: Variant
  size?: Size
  className?: string
  icon?: ReactNode
  showArrow?: boolean
  fullWidth?: boolean
}

const variants: Record<Variant, string> = {
  primary:
    'bg-accent-500 text-ink-900 font-semibold hover:bg-accent-400 hover:shadow-glow',
  secondary:
    'border border-white/15 bg-white/[0.04] text-steel-100 hover:border-white/30 hover:bg-white/[0.07]',
  ghost: 'text-steel-200 hover:text-white',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-[52px] px-7 text-[15px]',
}

function classesFor(p: BaseProps) {
  return cn(
    'group relative inline-flex items-center justify-center gap-2 rounded-xl tracking-tight transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900',
    variants[p.variant ?? 'primary'],
    sizes[p.size ?? 'md'],
    p.fullWidth && 'w-full',
    p.className,
  )
}

const motionProps = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { type: 'spring' as const, stiffness: 400, damping: 22 },
}

function Inner({ children, icon, showArrow }: BaseProps) {
  return (
    <>
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {showArrow && (
        <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      )}
    </>
  )
}

/** Internal link button. */
export function ButtonLink(props: BaseProps & { to: string }) {
  const { to, ...rest } = props
  return (
    <motion.div {...motionProps} className={cn(props.fullWidth && 'w-full')}>
      <Link to={to} className={classesFor(rest)}>
        <Inner {...rest} />
      </Link>
    </motion.div>
  )
}

/** External anchor button. */
export function ButtonAnchor(props: BaseProps & { href: string; target?: string }) {
  const { href, target, ...rest } = props
  return (
    <motion.a
      href={href}
      target={target ?? '_blank'}
      rel="noreferrer"
      className={classesFor(rest)}
      {...motionProps}
    >
      <Inner {...rest} />
    </motion.a>
  )
}

/** Action button (onClick). */
const PremiumButton = forwardRef<
  HTMLButtonElement,
  BaseProps & {
    onClick?: () => void
    type?: 'button' | 'submit'
    disabled?: boolean
  }
>(function PremiumButton({ onClick, type = 'button', disabled, ...rest }, ref) {
  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(classesFor(rest), disabled && 'cursor-not-allowed opacity-40')}
      {...(disabled ? {} : motionProps)}
    >
      <Inner {...rest} />
    </motion.button>
  )
})

export default PremiumButton
