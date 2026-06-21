import { motion } from 'framer-motion'
import { ButtonAnchor } from '@/components/ui/PremiumButton'
import Accordion from '@/components/ui/Accordion'
import { FadeUp } from '@/components/motion/Reveal'
import { landingFaqs } from '@/data/marketing'
import { whatsappLink } from '@/utils/enrollment'

export default function LandingFAQ() {
  return (
    <section className="border-t border-white/[0.06] bg-ink-800/30">
      <div className="container-px grid grid-cols-1 gap-10 py-24 sm:py-28 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* Sticky intro */}
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <FadeUp>
            <h2 className="text-balance text-4xl font-semibold leading-[1.05] sm:text-5xl">
              Preguntas <span className="text-accent-emphasis">frecuentes</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="mt-5 max-w-sm leading-relaxed text-steel-300">
              Resolvemos las dudas más comunes sobre programas, horarios e inscripción.
              ¿Necesitas algo más específico?
            </p>
          </FadeUp>
          <FadeUp delay={0.15} className="mt-7">
            <ButtonAnchor
              href={whatsappLink('Hola, tengo una consulta sobre los programas de V1 Aeronáutica.')}
              variant="secondary"
            >
              Pregúntanos por WhatsApp
            </ButtonAnchor>
          </FadeUp>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Accordion items={landingFaqs} />
        </motion.div>
      </div>
    </section>
  )
}
