import { motion } from 'framer-motion'
import { ButtonLink } from '@/components/ui/PremiumButton'
import { fadeUp, viewportOnce } from '@/utils/motion'

/**
 * Slim mid-scroll conversion ribbon — breaks the informational plateau with a
 * burst of energy without repeating the full-bleed FinalCTA. Horizontal band:
 * message left, actions right.
 */
export default function MidPageCTA() {
  return (
    <section className="container-px py-12">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="relative overflow-hidden rounded-3xl border border-accent-500/25 bg-gradient-to-r from-accent-500/[0.10] via-ink-800/40 to-ink-800/40 px-6 py-8 sm:px-10"
      >
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent-500/15 blur-[90px]" />
        <div className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <div className="max-w-xl">
            <h2 className="text-balance text-2xl font-semibold leading-tight sm:text-3xl">
              ¿Listo para empezar tu carrera en la aviación?
            </h2>
            <p className="mt-2 text-sm text-steel-300">
              Asegura tu cupo hoy. Sin compromiso · te asesoramos en cada paso.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-3">
            <ButtonLink to="/inscripcion" size="lg" showArrow>
              Inscribirme
            </ButtonLink>
            <ButtonLink to="/programas" size="lg" variant="secondary">
              Ver programas
            </ButtonLink>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
