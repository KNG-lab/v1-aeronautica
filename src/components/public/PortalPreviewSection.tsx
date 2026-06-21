import { motion } from 'framer-motion'
import { GraduationCap, CreditCard, CalendarDays, BadgeCheck, TrendingUp } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import { ButtonLink } from '@/components/ui/PremiumButton'
import { FadeUp } from '@/components/motion/Reveal'
import { fadeUp, staggerContainer, viewportOnce } from '@/utils/motion'

export default function PortalPreviewSection() {
  return (
    <section className="container-px py-20 sm:py-24">
      <SectionHeader
        title="Un portal pensado para el"
        accentWord="estudiante"
        description="Cada estudiante accede a su progreso, pagos, notas y credencial digital desde un solo lugar."
      />

      <FadeUp className="mt-14">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-ink-800/60 p-3 shadow-panel">
          <div className="absolute -top-24 left-1/2 h-48 w-[60%] -translate-x-1/2 rounded-full bg-accent-500/10 blur-[100px]" />

          {/* Mock window chrome */}
          <div className="flex items-center gap-1.5 px-3 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/60" />
            <span className="ml-3 text-xs text-steel-500">portal.v1aeronautica.com</span>
          </div>

          <div className="grid gap-3 rounded-2xl bg-ink-900/60 p-3 sm:grid-cols-3">
            {/* sidebar */}
            <div className="hidden flex-col gap-1.5 rounded-xl border border-white/5 bg-ink-800/60 p-3 sm:flex">
              {['Resumen', 'Notas', 'Pagos', 'Calendario', 'Credencial'].map((s, i) => (
                <div
                  key={s}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs ${
                    i === 0 ? 'bg-accent-500/15 text-accent-200' : 'text-steel-400'
                  }`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  {s}
                </div>
              ))}
            </div>

            {/* content */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="sm:col-span-2"
            >
              <div className="grid grid-cols-2 gap-3">
                <MiniStat icon={<TrendingUp className="h-4 w-4" />} label="Progreso del curso" value="62%" tone="text-accent-300" />
                <MiniStat icon={<CreditCard className="h-4 w-4" />} label="Próxima cuota" value="$165" tone="text-steel-100" />
                <MiniStat icon={<GraduationCap className="h-4 w-4" />} label="Promedio" value="18,0" tone="text-emerald-300" />
                <MiniStat icon={<CalendarDays className="h-4 w-4" />} label="Próxima clase" value="05 Jun" tone="text-steel-100" />
              </div>
              <motion.div
                variants={fadeUp}
                className="mt-3 flex items-center gap-3 rounded-xl border border-white/5 bg-ink-800/60 p-4"
              >
                <BadgeCheck className="h-8 w-8 text-accent-400" />
                <div>
                  <p className="text-sm font-medium">Credencial digital activa</p>
                  <p className="text-xs text-steel-400">V1-2026-0142 · Curso Inicial TCP</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </FadeUp>

      <FadeUp delay={0.1} className="mt-9 flex justify-center">
        <ButtonLink to="/portal" size="lg" showArrow>
          Explorar portal demo
        </ButtonLink>
      </FadeUp>
    </section>
  )
}

function MiniStat({ icon, label, value, tone }: { icon: React.ReactNode; label: string; value: string; tone: string }) {
  return (
    <motion.div variants={fadeUp} className="rounded-xl border border-white/5 bg-ink-800/60 p-4">
      <div className="flex items-center gap-2 text-steel-400">
        <span className="text-accent-400">{icon}</span>
        <span className="text-[11px] uppercase tracking-wide">{label}</span>
      </div>
      <p className={`mt-2 font-display text-2xl font-bold ${tone}`}>{value}</p>
    </motion.div>
  )
}
