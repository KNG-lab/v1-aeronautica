import { motion } from 'framer-motion'
import { ArrowRight, Clock } from 'lucide-react'
import MotionPage from '@/components/motion/MotionPage'
import SubpageHero from '@/components/public/SubpageHero'
import SmartImage from '@/components/ui/SmartImage'
import StatusBadge from '@/components/ui/StatusBadge'
import { StaggerContainer } from '@/components/motion/Reveal'
import { fadeUp } from '@/utils/motion'
import { ASSETS } from '@/data/assets'

const posts = [
  { title: '¿Cómo es la vida de un tripulante de cabina?', tag: 'Carrera', read: '5 min', image: ASSETS.cabinTrainingImage },
  { title: 'Inducción docente: enseñar a volar alto', tag: 'Profesión', read: '6 min', image: ASSETS.instructorTrainingImage },
  { title: 'Inglés aeronáutico: por qué es clave', tag: 'Formación', read: '4 min', image: ASSETS.cultureImage },
  { title: 'Seguridad aérea: la cultura que nos define', tag: 'Seguridad', read: '7 min', image: ASSETS.simulatorImage },
  { title: 'Tu primer día en la escuela de aviación', tag: 'Experiencia', read: '3 min', image: ASSETS.campusMainImage },
  { title: 'Requisitos para iniciar tu carrera en la aviación', tag: 'Guía', read: '5 min', image: ASSETS.courseTcpImage },
]

export default function BlogDemo() {
  return (
    <MotionPage>
      <SubpageHero
        eyebrow="Recursos"
        title="Blog &"
        accentWord="recursos"
        description="Artículos, guías y contenido para acompañarte en tu camino hacia la aviación profesional."
        image={ASSETS.cultureImage}
        height="min-h-[48vh]"
      />

      <section className="container-px py-20">
        <StaggerContainer className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <motion.article
              key={p.title}
              variants={fadeUp}
              className="group cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-ink-800/50 transition-all hover:-translate-y-1 hover:border-accent-500/30"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <SmartImage
                  src={p.image}
                  alt={p.title}
                  className="h-full w-full transition-transform duration-700 group-hover:scale-105"
                  overlay
                />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <StatusBadge tone="accent">{p.tag}</StatusBadge>
                  <span className="flex items-center gap-1.5 text-xs text-steel-500">
                    <Clock className="h-3.5 w-3.5" /> {p.read}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold leading-snug">{p.title}</h3>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent-400">
                  Leer artículo
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </motion.article>
          ))}
        </StaggerContainer>
      </section>
    </MotionPage>
  )
}
