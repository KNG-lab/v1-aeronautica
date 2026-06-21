import { motion } from 'framer-motion'
import SectionHeader from '@/components/ui/SectionHeader'
import { fadeUp, staggerContainer, viewportOnce } from '@/utils/motion'
import { enrollmentSteps } from '@/data/announcements'

export default function EnrollmentStepsSection() {
  return (
    <section className="border-y border-white/[0.06] bg-ink-800/40">
      <div className="container-px py-20 sm:py-24">
        <SectionHeader
          title="Tu inscripción,"
          accentWord="paso a paso"
          description="Un proceso claro y guiado, desde la elección de tu sede hasta la validación de tu cupo."
        />

        <motion.ol
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative mt-16 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {/* connecting line on desktop */}
          <div className="pointer-events-none absolute inset-x-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-white/10 to-transparent lg:block" />

          {enrollmentSteps.map((step) => (
            <motion.li key={step.n} variants={fadeUp} className="relative flex gap-4">
              <div className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-accent-500/30 bg-ink-900 font-display text-lg font-bold text-accent-400">
                {step.n}
              </div>
              <div className="pt-1">
                <h3 className="text-base font-semibold">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-steel-400">{step.desc}</p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  )
}
