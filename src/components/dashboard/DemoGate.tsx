import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Logo from '@/components/public/Logo'
import PremiumButton from '@/components/ui/PremiumButton'
import { EASE_OUT } from '@/utils/motion'

interface DemoGateProps {
  role: string
  title: string
  description: string
  icon: ReactNode
  ctaLabel: string
  onEnter: () => void
}

/** Simulated login screen — no real auth, just a demo entry button. */
export default function DemoGate({ role, title, description, icon, ctaLabel, onEnter }: DemoGateProps) {
  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-5">
      <div className="absolute left-1/2 top-1/3 h-80 w-80 -translate-x-1/2 rounded-full bg-accent-500/15 blur-[120px]" />
      <div className="absolute inset-0 bg-grid-faint [background-size:48px_48px] opacity-40 mask-fade-b" />

      <Link
        to="/"
        className="absolute left-5 top-5 flex items-center gap-2 text-sm text-steel-400 transition-colors hover:text-steel-100"
      >
        <ArrowLeft className="h-4 w-4" /> Volver al sitio
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
        className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-ink-800/60 p-8 text-center shadow-panel backdrop-blur-xl"
      >
        <div className="flex justify-center">
          <Logo />
        </div>
        <div className="mx-auto mt-8 grid h-16 w-16 place-items-center rounded-2xl bg-accent-500/15 text-accent-400">
          {icon}
        </div>
        <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-accent-400">
          {role}
        </p>
        <h1 className="mt-2 font-display text-2xl font-bold">{title}</h1>
        <p className="mt-3 text-sm leading-relaxed text-steel-400">{description}</p>
        <div className="mt-7">
          <PremiumButton onClick={onEnter} size="lg" fullWidth showArrow>
            {ctaLabel}
          </PremiumButton>
        </div>
        <p className="mt-4 text-xs text-steel-600">
          Entorno de demostración · datos simulados, sin backend real
        </p>
      </motion.div>
    </div>
  )
}
