import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { MapPin, GraduationCap, Clock, ArrowRight, ShieldCheck, HelpCircle, X, AlertCircle } from 'lucide-react'
import PremiumDropdown from '@/components/ui/PremiumDropdown'
import PremiumButton, { ButtonAnchor } from '@/components/ui/PremiumButton'
import Tooltip from '@/components/ui/Tooltip'
import { FadeUp } from '@/components/motion/Reveal'
import { campuses } from '@/data/campuses'
import { courses, courseById } from '@/data/courses'
import { schedulesFor, scheduleById, courseIdsAtCampus } from '@/data/schedules'
import { costFromSchedule, whatsappLink } from '@/utils/enrollment'
import { formatUsd } from '@/utils/formatters'
import type { CampusId, CourseId } from '@/data/types'

export default function QuickEnrollmentSelector() {
  const navigate = useNavigate()
  const [campus, setCampus] = useState('')
  const [course, setCourse] = useState('')
  const [schedule, setSchedule] = useState('')

  const courseOptions = useMemo(() => {
    const available = campus ? courseIdsAtCampus(campus as CampusId) : courses.map((c) => c.id)
    return courses.map((c) => ({
      value: c.id,
      label: c.shortName,
      hint: c.status === 'coming-soon' ? 'Próximamente' : undefined,
      disabled: !available.includes(c.id) || c.status !== 'available',
    }))
  }, [campus])

  const scheduleOptions = useMemo(() => {
    if (!campus || !course) return []
    return schedulesFor(campus as CampusId, course as CourseId).map((s) => ({
      value: s.id,
      label: `${s.modality} · ${s.time}`,
      hint: s.duration,
    }))
  }, [campus, course])

  const selectedSchedule = scheduleById(schedule)
  const cost = costFromSchedule(selectedSchedule)
  const ready = Boolean(campus && course && schedule)

  function reset(next: 'campus' | 'course') {
    if (next === 'campus') {
      setCourse('')
      setSchedule('')
    } else {
      setSchedule('')
    }
  }

  function start() {
    const params = new URLSearchParams({ campus, course, schedule })
    navigate(`/inscripcion?${params.toString()}`)
  }

  const courseNoSchedules =
    campus && course && scheduleOptions.length === 0

  function exploreInstead() {
    document.getElementById('programas')?.scrollIntoView({ behavior: 'smooth' })
  }

  function clearAll() {
    setCampus('')
    setCourse('')
    setSchedule('')
  }

  const hasSelection = Boolean(campus || course || schedule)

  return (
    <FadeUp className="container-px relative z-30 -mt-12 sm:-mt-16">
      <div className="glass-strong rounded-2xl p-4 shadow-panel sm:p-5">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-x-4 gap-y-1.5">
          <div>
            <p className="flex items-center gap-1.5 text-sm font-medium text-steel-100">
              Configura tu inscripción
              <Tooltip content="TCP = Tripulante de Cabina de Pasajeros. La modalidad es el horario: matutino, vespertino o sabatino.">
                <HelpCircle className="h-3.5 w-3.5 text-steel-400" />
              </Tooltip>
            </p>
            <p className="text-xs text-steel-400">
              Elige sede, curso y horario — verás duración y costos al instante.
            </p>
          </div>
          <div className="flex items-center gap-4">
            {hasSelection && (
              <button
                type="button"
                onClick={clearAll}
                className="inline-flex items-center gap-1 text-xs font-medium text-steel-400 transition-colors hover:text-steel-100"
              >
                <X className="h-3 w-3" />
                Limpiar
              </button>
            )}
            <button
              type="button"
              onClick={exploreInstead}
              className="group inline-flex items-center gap-1 text-xs font-medium text-steel-400 transition-colors hover:text-accent-400"
            >
              o explora los programas primero
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-stretch">
          <PremiumDropdown
            label="Sede"
            placeholder="Selecciona sede"
            icon={<MapPin className="h-4 w-4" />}
            options={campuses.map((c) => ({ value: c.id, label: c.name, hint: c.tag }))}
            value={campus}
            onChange={(v) => {
              setCampus(v)
              reset('campus')
            }}
          />
          <PremiumDropdown
            label="Curso"
            placeholder="Selecciona curso"
            icon={<GraduationCap className="h-4 w-4" />}
            options={courseOptions}
            value={course}
            onChange={(v) => {
              setCourse(v)
              reset('course')
            }}
          />
          <PremiumDropdown
            label="Horario"
            placeholder={course ? 'Selecciona horario' : 'Elige un curso'}
            icon={<Clock className="h-4 w-4" />}
            options={scheduleOptions}
            value={schedule}
            onChange={setSchedule}
            disabled={!course || scheduleOptions.length === 0}
          />
          <PremiumButton
            size="lg"
            onClick={start}
            disabled={!ready}
            showArrow
            className="uppercase tracking-wide lg:h-auto"
          >
            Ver programas
          </PremiumButton>
        </div>

        {!cost && (
          <p className="mt-3 flex items-center gap-1.5 text-xs text-steel-500">
            <ShieldCheck className="h-3.5 w-3.5 text-accent-500/70" />
            Sin compromiso · Reservas tu cupo y validamos tu pago después
          </p>
        )}

        {/* Dynamic summary */}
        <AnimatePresence mode="wait">
          {cost && selectedSchedule && (
            <motion.div
              key={selectedSchedule.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-white/10 pt-4 sm:grid-cols-4">
                <Summary label="Duración" value={selectedSchedule.duration} />
                <Summary label="Modalidad" value={selectedSchedule.modality} />
                {cost.hasInstallments ? (
                  <Summary label="Mensualidad" value={formatUsd(cost.monthly)} accent />
                ) : (
                  <Summary label="Modalidad de pago" value="Pago único" />
                )}
                <Summary label="Total del programa" value={formatUsd(cost.total)} accent />
              </div>
              <p className="mt-3 flex items-center gap-1.5 text-xs text-steel-400">
                <ArrowRight className="h-3 w-3 text-accent-500" />
                {courseById(course)?.name} · {campuses.find((c) => c.id === campus)?.name}
              </p>
            </motion.div>
          )}

          {courseNoSchedules && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-4 flex flex-col items-start gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <p className="flex items-start gap-2 text-sm text-amber-300">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                Este curso aún no tiene horarios publicados. Déjanos tus datos y te
                avisamos al abrir cupos.
              </p>
              <ButtonAnchor
                href={whatsappLink(
                  `Hola, quiero que me avisen cuando abran cupos para ${courseById(course)?.name}.`,
                )}
                size="sm"
                variant="secondary"
                className="shrink-0"
              >
                Avísame por WhatsApp
              </ButtonAnchor>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FadeUp>
  )
}

function Summary({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-steel-400">
        {label}
      </p>
      <p className={`mt-1 text-sm font-medium ${accent ? 'text-accent-300' : 'text-steel-100'}`}>
        {value}
      </p>
    </div>
  )
}
