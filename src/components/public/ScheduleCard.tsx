import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock, CalendarDays, Building2, ArrowRight } from 'lucide-react'
import StatusBadge from '@/components/ui/StatusBadge'
import { campusById } from '@/data/campuses'
import { costFromSchedule } from '@/utils/enrollment'
import { formatUsd } from '@/utils/formatters'
import { fadeUp } from '@/utils/motion'
import type { Schedule } from '@/data/types'

export default function ScheduleCard({ schedule }: { schedule: Schedule }) {
  const cost = costFromSchedule(schedule)
  const campus = campusById(schedule.campusId)
  const params = new URLSearchParams({
    campus: schedule.campusId,
    course: schedule.courseId,
    schedule: schedule.id,
  })

  return (
    <motion.div
      variants={fadeUp}
      className="group flex flex-col rounded-2xl border border-white/10 bg-ink-800/50 p-6 transition-colors hover:border-accent-500/30"
    >
      <div className="flex items-center justify-between">
        <StatusBadge tone="accent">{schedule.modality}</StatusBadge>
        <span className="flex items-center gap-1.5 text-xs text-steel-400">
          <Building2 className="h-3.5 w-3.5" /> {campus?.name}
        </span>
      </div>

      <div className="mt-4 space-y-2 text-sm text-steel-300">
        <p className="flex items-center gap-2.5">
          <Clock className="h-4 w-4 text-accent-500" /> {schedule.time}
        </p>
        <p className="flex items-center gap-2.5">
          <CalendarDays className="h-4 w-4 text-accent-500" /> {schedule.days}
        </p>
      </div>

      <p className="mt-3 text-xs text-steel-500">{schedule.duration}</p>

      {/* Cost grid */}
      <div className="mt-5 grid grid-cols-3 gap-2 border-t border-white/[0.07] pt-5">
        {schedule.preinscription != null && (
          <Cost label="Preinscripción" value={formatUsd(schedule.preinscription)} />
        )}
        {schedule.inscription != null && (
          <Cost label="Inscripción" value={formatUsd(schedule.inscription)} />
        )}
        {cost?.hasInstallments ? (
          <Cost label="Mensualidad" value={formatUsd(cost.monthly)} />
        ) : (
          <Cost label="Pago" value="Único" />
        )}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-white/[0.07] pt-5">
        <div>
          <p className="text-[10px] uppercase tracking-wide text-steel-500">Total</p>
          <p className="font-display text-2xl font-bold text-accent-300">
            {formatUsd(schedule.total)}
          </p>
        </div>
        <Link
          to={`/inscripcion?${params.toString()}`}
          className="inline-flex items-center gap-1.5 rounded-xl bg-accent-500 px-4 py-2.5 text-sm font-semibold text-ink-900 transition-colors hover:bg-accent-400"
        >
          Inscribirme
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {schedule.note && <p className="mt-3 text-xs text-steel-500">{schedule.note}</p>}
    </motion.div>
  )
}

function Cost({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wide text-steel-500">{label}</p>
      <p className="mt-0.5 text-sm font-medium text-steel-100">{value}</p>
    </div>
  )
}
