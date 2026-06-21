import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import SmartImage from '@/components/ui/SmartImage'
import StatusBadge, { statusTone } from '@/components/ui/StatusBadge'
import Icon from '@/components/ui/Icon'
import { fadeUp } from '@/utils/motion'
import { schedulesFor } from '@/data/schedules'
import { formatUsd } from '@/utils/formatters'
import type { Course } from '@/data/types'

export default function AnimatedProgramCard({ course }: { course: Course }) {
  const badge = statusTone(course.status)
  const courseSchedules = schedulesFor('', course.id)
  const fromPrice = courseSchedules.length
    ? Math.min(...courseSchedules.map((s) => s.total))
    : null
  return (
    <motion.div variants={fadeUp}>
      <Link
        to={`/programas/${course.slug}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-800/60 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent-500/30 hover:shadow-glow"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <SmartImage
            src={course.image}
            alt={course.name}
            className="h-full w-full transition-transform duration-700 group-hover:scale-[1.05]"
            overlay
          />
          <div className="absolute left-3 top-3">
            <StatusBadge tone={badge.tone} dot>
              {badge.label}
            </StatusBadge>
          </div>
          <div className="absolute bottom-3 left-3 grid h-10 w-10 place-items-center rounded-xl border border-white/15 bg-ink-900/70 text-accent-400 backdrop-blur-md transition-colors group-hover:text-accent-300">
            <Icon name={course.icon} className="h-5 w-5" strokeWidth={1.6} />
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-display text-base font-bold uppercase leading-snug tracking-tight">
            {course.shortName}
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-steel-400">
            {course.tagline}.
          </p>
          <div className="mt-5 flex items-center justify-between border-t border-white/[0.07] pt-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-accent-400">
              Ver programa
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            <span className="text-right">
              {fromPrice != null ? (
                <>
                  <span className="block text-[10px] uppercase tracking-wide text-steel-500">Desde</span>
                  <span className="font-display text-base font-bold text-steel-100">
                    {formatUsd(fromPrice)}
                  </span>
                </>
              ) : (
                <span className="text-xs text-steel-500">Próximamente</span>
              )}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
