import { motion } from 'framer-motion'
import { MapPin, Clock, Navigation } from 'lucide-react'
import { Link } from 'react-router-dom'
import SmartImage from '@/components/ui/SmartImage'
import StatusBadge from '@/components/ui/StatusBadge'
import { ButtonLink, ButtonAnchor } from '@/components/ui/PremiumButton'
import { fadeUp } from '@/utils/motion'
import { courseById } from '@/data/courses'
import { whatsappLink } from '@/utils/enrollment'
import type { Campus } from '@/data/types'

export default function CampusCard({ campus }: { campus: Campus }) {
  return (
    <motion.article
      variants={fadeUp}
      className="group grid grid-cols-1 overflow-hidden rounded-2xl border border-white/10 bg-ink-800/50 md:grid-cols-2"
    >
      {/* Image / map-style visual */}
      <div className="relative min-h-[240px] overflow-hidden">
        <SmartImage
          src={campus.image}
          alt={`Sede ${campus.name}`}
          className="h-full w-full transition-transform duration-700 group-hover:scale-105"
          overlay
        />
        <div className="absolute left-4 top-4">
          <StatusBadge tone="accent" dot>
            {campus.tag}
          </StatusBadge>
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 rounded-xl border border-white/10 bg-ink-900/70 px-3 py-2 backdrop-blur-md">
          <Navigation className="h-3.5 w-3.5 shrink-0 text-accent-400" />
          <p className="text-xs text-steel-300">{campus.mapHint}</p>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col p-6 sm:p-8">
        <h3 className="font-display text-3xl font-bold uppercase tracking-tight">{campus.name}</h3>
        <div className="mt-4 space-y-3 text-sm">
          <p className="flex items-start gap-2.5 text-steel-300">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" />
            {campus.address}
          </p>
          <p className="flex items-center gap-2.5 text-steel-300">
            <Clock className="h-4 w-4 shrink-0 text-accent-500" />
            {campus.hours}
          </p>
        </div>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {campus.courseIds.map((id) => {
            const c = courseById(id)
            return c ? (
              <span
                key={id}
                className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-steel-300"
              >
                {c.shortName}
              </span>
            ) : null
          })}
        </div>

        <div className="mt-auto flex flex-wrap gap-3 pt-7">
          <ButtonLink to="/sedes" size="sm" showArrow>
            Ver cursos disponibles
          </ButtonLink>
          <ButtonAnchor
            href={whatsappLink(`Hola, quiero saber cómo llegar a la sede ${campus.name}.`)}
            size="sm"
            variant="secondary"
          >
            Cómo llegar
          </ButtonAnchor>
        </div>
      </div>
    </motion.article>
  )
}
