import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, GraduationCap, Clock3 } from 'lucide-react'
import PremiumDropdown from '@/components/ui/PremiumDropdown'
import PremiumButton from '@/components/ui/PremiumButton'
import { campuses } from '@/data/campuses'
import { courses } from '@/data/courses'
import { schedulesFor, courseIdsAtCampus } from '@/data/schedules'
import type { CampusId, CourseId } from '@/data/types'

/**
 * Premium quick-enrollment bar that lives at the bottom of the hero.
 * Carbon-translucent, unified with discreet vertical dividers — a configurator,
 * not a government form. Fully keyboard-accessible via PremiumDropdown.
 */
export default function HeroQuickSelector() {
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

  function verProgramas() {
    if (campus && course && schedule) {
      navigate(`/inscripcion?${new URLSearchParams({ campus, course, schedule })}`)
    } else {
      document.getElementById('programas')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0a0a0a]/70 p-2 shadow-panel backdrop-blur-xl">
      <div className="grid grid-cols-1 items-stretch gap-2 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto] lg:gap-0 lg:divide-x lg:divide-white/10">
        <PremiumDropdown
          bare
          label="Sede"
          placeholder="Selecciona sede"
          icon={<MapPin className="h-4 w-4" />}
          options={campuses.map((c) => ({ value: c.id, label: c.name, hint: c.tag }))}
          value={campus}
          onChange={(v) => {
            setCampus(v)
            setCourse('')
            setSchedule('')
          }}
        />
        <PremiumDropdown
          bare
          label="Curso"
          placeholder="Selecciona curso"
          icon={<GraduationCap className="h-4 w-4" />}
          options={courseOptions}
          value={course}
          onChange={(v) => {
            setCourse(v)
            setSchedule('')
          }}
        />
        <PremiumDropdown
          bare
          label="Horario"
          placeholder={course ? 'Selecciona horario' : 'Elige un curso'}
          icon={<Clock3 className="h-4 w-4" />}
          options={scheduleOptions}
          value={schedule}
          onChange={setSchedule}
          disabled={!course || scheduleOptions.length === 0}
        />
        <div className="p-1 lg:flex lg:items-center lg:pl-3">
          <PremiumButton
            size="lg"
            onClick={verProgramas}
            showArrow
            className="w-full uppercase tracking-wide lg:w-auto"
          >
            Ver programas
          </PremiumButton>
        </div>
      </div>
    </div>
  )
}
