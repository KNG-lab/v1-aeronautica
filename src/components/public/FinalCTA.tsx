import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'
import { ButtonLink, ButtonAnchor } from '@/components/ui/PremiumButton'
import SmartImage from '@/components/ui/SmartImage'
import { FadeUp } from '@/components/motion/Reveal'
import { ASSETS } from '@/data/assets'
import { whatsappLink } from '@/utils/enrollment'

export default function FinalCTA() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])

  return (
    <section ref={ref} className="relative overflow-hidden">
      <motion.div style={{ y, scale: 1.1 }} className="absolute inset-0">
        <SmartImage src={ASSETS.runwayCtaImage} alt="Pista de aterrizaje al atardecer" className="h-full w-full" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/80 to-ink-900/60" />
      <div className="absolute left-1/2 top-1/2 h-72 w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-500/15 blur-[120px]" />

      <div className="container-px relative z-10 flex flex-col items-center py-28 text-center sm:py-36">
        <FadeUp>
          <span className="eyebrow">
            <span className="h-px w-8 bg-accent-500" />
            El primer paso lo das hoy
          </span>
        </FadeUp>
        <FadeUp delay={0.05}>
          <h2 className="mt-5 max-w-3xl text-balance font-display text-4xl font-bold uppercase leading-[1.02] tracking-tight sm:text-6xl">
            Tu carrera en la aviación
            <br />
            comienza <span className="text-accent-500">aquí</span>
          </h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          <p className="mt-5 max-w-xl text-base text-steel-300">
            Únete a la nueva generación de profesionales de la aviación venezolana.
          </p>
        </FadeUp>
        <FadeUp delay={0.15}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink to="/inscripcion" size="lg" showArrow className="uppercase tracking-wide">
              Inscribirme
            </ButtonLink>
            <ButtonAnchor
              href={whatsappLink('Hola, quiero iniciar mi inscripción en V1 Aeronáutica.')}
              size="lg"
              variant="secondary"
              className="uppercase tracking-wide"
            >
              Hablar por WhatsApp
            </ButtonAnchor>
          </div>
        </FadeUp>
        <FadeUp delay={0.2}>
          <p className="mt-5 flex items-center gap-2 text-sm text-steel-400">
            <ShieldCheck className="h-4 w-4 text-accent-500/80" />
            Sin compromiso · Un asesor te guía en cada paso
          </p>
        </FadeUp>
      </div>
    </section>
  )
}
