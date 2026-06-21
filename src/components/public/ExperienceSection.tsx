import { motion } from 'framer-motion'
import { ButtonLink } from '@/components/ui/PremiumButton'
import ParallaxImage from '@/components/ui/ParallaxImage'
import { FadeUp } from '@/components/motion/Reveal'
import { ASSETS } from '@/data/assets'
import { fadeUp, staggerContainer, viewportOnce } from '@/utils/motion'

const blocks = [
  { title: 'Simuladores avanzados', image: ASSETS.simulatorImage, span: 'lg:col-span-2 lg:row-span-2', ratio: 'aspect-[16/10]' },
  { title: 'Entrenamiento en cabina', image: ASSETS.cabinTrainingImage, span: '', ratio: 'aspect-square' },
  { title: 'Cultura aeronáutica', image: ASSETS.cultureImage, span: '', ratio: 'aspect-square' },
]

export default function ExperienceSection() {
  return (
    <section className="container-px py-24 sm:py-28">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        {/* Sticky editorial column */}
        <div className="lg:sticky lg:top-28 lg:h-fit lg:self-start">
          <FadeUp>
            <span className="eyebrow">Experiencia V1</span>
          </FadeUp>
          <FadeUp delay={0.05}>
            <h2 className="mt-4 text-4xl font-semibold leading-[1.05] sm:text-5xl">
              Formación práctica,
              <br />
              <span className="text-accent-emphasis">experiencia real</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="mt-5 max-w-md text-base leading-relaxed text-steel-300">
              Entrenas en entornos reales con instructores expertos, simuladores de
              última generación y una metodología diseñada para impulsar tu crecimiento
              profesional.
            </p>
          </FadeUp>

          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mt-8 space-y-3"
          >
            {['Instructores activos de la industria', 'Prácticas en mock-up de cabina', 'Cultura y disciplina aeronáutica'].map(
              (item) => (
                <motion.li key={item} variants={fadeUp} className="flex items-center gap-3 text-sm text-steel-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
                  {item}
                </motion.li>
              ),
            )}
          </motion.ul>

          <FadeUp delay={0.15} className="mt-9">
            <ButtonLink to="/nosotros" variant="secondary" showArrow>
              Conocer más
            </ButtonLink>
          </FadeUp>
        </div>

        {/* Visual grid with parallax */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 gap-4"
        >
          {blocks.map((b) => (
            <motion.div key={b.title} variants={fadeUp} className={`group relative ${b.span}`}>
              <ParallaxImage
                src={b.image}
                alt={b.title}
                overlay
                range={30}
                className={`${b.ratio} h-full w-full`}
              />
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5" />
              <p className="absolute bottom-4 left-4 right-4 text-sm font-semibold uppercase tracking-wide text-white">
                {b.title}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
