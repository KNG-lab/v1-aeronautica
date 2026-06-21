import { motion, AnimatePresence } from 'framer-motion'
import { campusById } from '@/data/campuses'
import { courseById } from '@/data/courses'
import { scheduleById } from '@/data/schedules'
import { costFromSchedule } from '@/utils/enrollment'
import { formatUsd } from '@/utils/formatters'
import type { EnrollmentSelection } from '@/utils/enrollment'

export default function EnrollmentSummary({ sel }: { sel: EnrollmentSelection }) {
  const campus = campusById(sel.campusId)
  const course = courseById(sel.courseId)
  const schedule = scheduleById(sel.scheduleId)
  const cost = costFromSchedule(schedule)

  return (
    <div className="rounded-2xl border border-white/10 bg-ink-800/60 p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-steel-400">
        Resumen de inscripción
      </p>

      <dl className="mt-5 space-y-3 text-sm">
        <Row label="Sede" value={campus?.name} />
        <Row label="Curso" value={course?.shortName} />
        <Row label="Horario" value={schedule ? `${schedule.modality} · ${schedule.time}` : undefined} />
        <Row label="Duración" value={schedule?.duration} />
      </dl>

      <AnimatePresence>
        {cost && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-5 space-y-2.5 overflow-hidden border-t border-white/10 pt-5 text-sm"
          >
            {cost.preinscription > 0 && (
              <Row label="Preinscripción" value={formatUsd(cost.preinscription)} />
            )}
            {cost.inscription > 0 && <Row label="Inscripción" value={formatUsd(cost.inscription)} />}
            {cost.hasInstallments && <Row label="Mensualidad" value={formatUsd(cost.monthly)} />}
            <div className="flex items-center justify-between border-t border-white/10 pt-3">
              <span className="text-steel-300">Total del programa</span>
              <span className="font-display text-xl font-bold text-accent-300">
                {formatUsd(cost.total)}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!cost && (
        <p className="mt-5 border-t border-white/10 pt-5 text-xs text-steel-500">
          Selecciona sede, curso y horario para ver el detalle de costos.
        </p>
      )}
    </div>
  )
}

function Row({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-steel-400">{label}</dt>
      <dd className={value ? 'text-right font-medium text-steel-100' : 'text-steel-600'}>
        {value ?? '—'}
      </dd>
    </div>
  )
}
