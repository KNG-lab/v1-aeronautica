import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { ButtonLink } from '@/components/ui/PremiumButton'
import MagneticButton from '@/components/ui/MagneticButton'
import AnimatedTurbineGlow from './AnimatedTurbineGlow'
import HeroParticles from './HeroParticles'
import HeroQuickSelector from './HeroQuickSelector'
import { ASSETS } from '@/data/assets'
import { fadeUp, staggerContainer, EASE_OUT } from '@/utils/motion'

/* Spec overlay gradients (jet black #050505). */
const LEFT_OVERLAY =
  'linear-gradient(90deg, rgba(5,5,5,0.97) 0%, rgba(5,5,5,0.88) 25%, rgba(5,5,5,0.55) 48%, rgba(5,5,5,0.10) 74%, rgba(5,5,5,0.22) 100%)'
const BOTTOM_OVERLAY =
  'linear-gradient(180deg, transparent 52%, rgba(5,5,5,0.45) 76%, rgba(5,5,5,0.98) 100%)'
const VIGNETTE =
  'radial-gradient(120% 100% at 60% 42%, transparent 52%, rgba(5,5,5,0.55) 100%)'

/** Always-present premium dark base, with the cinematic photo layered on top. */
function HeroBackground() {
  const [failed, setFailed] = useState(false)
  return (
    <div aria-hidden className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-[#050505]" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_68%_42%,#1a1a1a_0%,#0a0a0a_46%,#050505_100%)]" />
      {!failed && (
        <img
          src={ASSETS.heroCinematic}
          alt="Tripulante de cabina de V1 Aeronáutica frente a una turbina encendida al atardecer"
          onError={() => setFailed(true)}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-[58%_center]"
        />
      )}
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[88vh] flex-col overflow-hidden bg-[#050505] lg:min-h-dvh">
      <HeroBackground />

      {/* Sophisticated overlays */}
      <div className="absolute inset-0 z-[1]" style={{ background: LEFT_OVERLAY }} />
      <div className="absolute inset-0 z-[1]" style={{ background: BOTTOM_OVERLAY }} />
      <div className="absolute inset-0 z-[1]" style={{ background: VIGNETTE }} />
      <div className="absolute inset-x-0 top-0 z-[1] h-px bg-gradient-to-r from-transparent via-accent-500/30 to-transparent" />

      <AnimatedTurbineGlow />
      <HeroParticles />

      {/* Content */}
      <div className="container-px relative z-10 flex min-h-[88vh] flex-1 flex-col justify-end pb-6 pt-28 lg:min-h-dvh lg:pb-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-1 items-center"
        >
          <div className="max-w-[600px]">
            <motion.span variants={fadeUp} className="eyebrow">
              <span className="h-px w-8 bg-accent-500" />
              Formación que te eleva
            </motion.span>

            <h1 className="mt-5 font-display text-[clamp(3rem,6.6vw,5.75rem)] font-bold uppercase leading-[0.9] tracking-[-0.03em]">
              <span className="block overflow-hidden">
                <motion.span variants={fadeUp} className="block whitespace-nowrap text-white">
                  Decide
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span variants={fadeUp} className="block whitespace-nowrap text-accent-500">
                  Tu altura
                </motion.span>
              </span>
            </h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-md text-lg leading-relaxed text-[#BDBDBD]"
            >
              Formación aeronáutica premium para la nueva generación de tripulantes de
              cabina y profesionales de la aviación en Venezuela.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-3">
              <MagneticButton>
                <ButtonLink to="/inscripcion" size="lg" showArrow className="uppercase tracking-wide">
                  Inscribirme
                </ButtonLink>
              </MagneticButton>
              <ButtonLink to="/contacto" size="lg" variant="secondary" className="uppercase tracking-wide">
                Quiero información
              </ButtonLink>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="mt-7 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-[#6B6B6B]"
            >
              <MapPin className="h-3.5 w-3.5 text-accent-500" />
              La Guaira, Venezuela
            </motion.p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.55 }}
          className="mt-6"
        >
          <HeroQuickSelector />
        </motion.div>
      </div>
    </section>
  )
}
