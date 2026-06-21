import { motion } from 'framer-motion'
import { MapPin, Clock, ArrowRight } from 'lucide-react'
import MotionPage from '@/components/motion/MotionPage'
import SubpageHero from '@/components/public/SubpageHero'
import CampusCard from '@/components/public/CampusCard'
import SectionHeader from '@/components/ui/SectionHeader'
import { StaggerContainer } from '@/components/motion/Reveal'
import { Link } from 'react-router-dom'
import { campuses } from '@/data/campuses'
import { courseById } from '@/data/courses'
import { courseIdsAtCampus } from '@/data/schedules'
import { fadeUp, staggerContainer, viewportOnce } from '@/utils/motion'
import { ASSETS } from '@/data/assets'

export default function Campuses() {
  return (
    <MotionPage>
      <SubpageHero
        eyebrow="Dónde formamos"
        title="Nuestra"
        accentWord="sede"
        description="Un espacio diseñado para la formación aeronáutica, en La Guaira y conectado con la operación aérea del país."
        image={ASSETS.campusMainImage}
      />

      <section className="container-px py-20">
        <StaggerContainer className="grid grid-cols-1 gap-6">
          {campuses.map((c) => (
            <CampusCard key={c.id} campus={c} />
          ))}
        </StaggerContainer>
      </section>

      {/* Courses per campus */}
      <section className="container-px pb-24">
        <SectionHeader
          eyebrow="Disponibilidad"
          title="Cursos en la"
          accentWord="sede"
          description="Consulta qué programas están disponibles en nuestra sede de La Guaira."
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2"
        >
          {campuses.map((campus) => (
            <motion.div
              key={campus.id}
              variants={fadeUp}
              className="rounded-2xl border border-white/10 bg-ink-800/50 p-7"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-2xl font-semibold">{campus.name}</h3>
                <span className="rounded-full border border-accent-500/20 bg-accent-500/[0.06] px-3 py-1 text-xs text-accent-300">
                  {campus.tag}
                </span>
              </div>
              <p className="mt-3 flex items-start gap-2 text-sm text-steel-400">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" />
                {campus.address}
              </p>
              <p className="mt-2 flex items-center gap-2 text-sm text-steel-400">
                <Clock className="h-4 w-4 text-accent-500" />
                {campus.hours}
              </p>

              <ul className="mt-6 space-y-2.5">
                {courseIdsAtCampus(campus.id).map((id) => {
                  const c = courseById(id)
                  return c ? (
                    <li key={id}>
                      <Link
                        to={`/programas/${c.slug}`}
                        className="group flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 transition-colors hover:border-accent-500/30 hover:bg-white/[0.04]"
                      >
                        <span className="text-sm font-medium">{c.shortName}</span>
                        <ArrowRight className="h-4 w-4 text-steel-500 transition-all group-hover:translate-x-0.5 group-hover:text-accent-400" />
                      </Link>
                    </li>
                  ) : null
                })}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </MotionPage>
  )
}
