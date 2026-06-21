import { motion } from 'framer-motion'
import { Target, Eye, ShieldCheck, Users } from 'lucide-react'
import MotionPage from '@/components/motion/MotionPage'
import SubpageHero from '@/components/public/SubpageHero'
import ParallaxImage from '@/components/ui/ParallaxImage'
import SectionHeader from '@/components/ui/SectionHeader'
import { FadeUp, StaggerContainer, StaggerChild } from '@/components/motion/Reveal'
import { fadeUp, staggerContainer, viewportOnce } from '@/utils/motion'
import { instructors } from '@/data/instructors'
import { ASSETS } from '@/data/assets'
import SmartImage from '@/components/ui/SmartImage'

const values = [
  { icon: Target, title: 'Misión', desc: 'Formar profesionales aeronáuticos íntegros, con disciplina y vocación de servicio, listos para la industria.' },
  { icon: Eye, title: 'Visión', desc: 'Ser la escuela de aviación de referencia en Venezuela, reconocida por su excelencia y proyección.' },
  { icon: ShieldCheck, title: 'Seguridad', desc: 'La cultura de seguridad es el eje de cada programa y de cada práctica que realizamos.' },
  { icon: Users, title: 'Enfoque humano', desc: 'Acompañamos a cada estudiante en su crecimiento académico, profesional y personal.' },
]

const stats = [
  { value: '3', label: 'Programas activos' },
  { value: '92%', label: 'Índice de satisfacción' },
  { value: '160+', label: 'Estudiantes en formación' },
  { value: '100%', label: 'Enfoque práctico' },
]

export default function About() {
  return (
    <MotionPage>
      <SubpageHero
        eyebrow="Quiénes somos"
        title="Formación que"
        accentWord="te eleva"
        description="Una institución moderna dedicada a formar la nueva generación de profesionales de la aviación venezolana."
        image={ASSETS.cultureImage}
      />

      {/* Intro editorial */}
      <section className="container-px py-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <FadeUp>
            <span className="eyebrow">Nuestra esencia</span>
            <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
              Disciplina, seguridad y excelencia en cada despegue
            </h2>
            <p className="mt-5 text-base leading-relaxed text-steel-300">
              En V1 Aeronáutica combinamos rigor académico, práctica real e instructores
              activos de la industria para preparar a nuestros estudiantes con los
              estándares que exige la aviación moderna. Creemos en una formación
              aspiracional, profesional y profundamente humana.
            </p>
            <p className="mt-4 text-base leading-relaxed text-steel-300">
              Desde nuestra sede en La Guaira, junto al principal hub aéreo del país,
              acercamos la formación aeronáutica de alto nivel a quienes sueñan con volar alto.
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <ParallaxImage
              src={ASSETS.cabinTrainingImage}
              alt="Estudiantes de V1 Aeronáutica"
              overlay
              className="aspect-[4/3]"
            />
          </FadeUp>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-y border-white/[0.06] bg-ink-800/40">
        <div className="container-px py-14">
          <StaggerContainer className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((s) => (
              <StaggerChild key={s.label}>
                <div className="text-center">
                  <p className="font-display text-4xl font-bold text-accent-emphasis sm:text-5xl">
                    {s.value}
                  </p>
                  <p className="mt-2 text-sm text-steel-400">{s.label}</p>
                </div>
              </StaggerChild>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Values */}
      <section className="container-px py-24">
        <SectionHeader eyebrow="Lo que nos define" title="Nuestros" accentWord="valores" />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {values.map((v) => (
            <motion.div
              key={v.title}
              variants={fadeUp}
              className="rounded-2xl border border-white/10 bg-ink-800/50 p-6 transition-colors hover:border-accent-500/30"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent-500/10 text-accent-400">
                <v.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-steel-400">{v.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Instructors */}
      <section className="container-px pb-24">
        <SectionHeader eyebrow="Nuestro equipo" title="Instructores" accentWord="expertos" />
        <StaggerContainer className="mt-14 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {instructors.map((i) => (
            <StaggerChild key={i.id}>
              <div className="group overflow-hidden rounded-2xl border border-white/10 bg-ink-800/50">
                <div className="aspect-[3/4] overflow-hidden">
                  <SmartImage
                    src={i.image}
                    alt={i.name}
                    className="h-full w-full transition-transform duration-700 group-hover:scale-105"
                    overlay
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm font-semibold">{i.name}</p>
                  <p className="mt-0.5 text-xs text-accent-400">{i.role}</p>
                </div>
              </div>
            </StaggerChild>
          ))}
        </StaggerContainer>
      </section>
    </MotionPage>
  )
}
