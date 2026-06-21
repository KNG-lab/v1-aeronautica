import type { Schedule, CampusId, CourseId } from './types'

export const schedules: Schedule[] = [
  // ── La Guaira · Curso Inicial TCP ─────────────────────────────
  {
    id: 'lg-tcp-mat',
    courseId: 'tcp-initial',
    campusId: 'la-guaira',
    modality: 'Matutino',
    days: 'Lunes a viernes',
    time: '8:30 am – 12:00 pm',
    duration: '4 meses',
    total: 840,
    preinscription: 30,
    inscription: 150,
    monthly: 165,
  },
  {
    id: 'lg-tcp-vesp',
    courseId: 'tcp-initial',
    campusId: 'la-guaira',
    modality: 'Vespertino',
    days: 'Lunes a viernes',
    time: '1:00 pm – 4:40 pm',
    duration: '4 meses',
    total: 840,
    preinscription: 30,
    inscription: 150,
    monthly: 165,
  },
  {
    id: 'lg-tcp-sab',
    courseId: 'tcp-initial',
    campusId: 'la-guaira',
    modality: 'Sabatino',
    days: 'Sábados',
    time: '8:30 am – 4:30 pm',
    duration: '8 meses',
    total: 900,
    preinscription: 30,
    inscription: 150,
    monthly: 90,
  },
  // ── La Guaira · Curso Recurrente TCP ──────────────────────────
  {
    id: 'lg-rec',
    courseId: 'tcp-recurrent',
    campusId: 'la-guaira',
    modality: 'Mixto',
    days: 'Martes y jueves',
    time: '8:30 am – 4:30 pm',
    duration: '1 mes',
    total: 500,
    note: 'Pago único del programa de recurrencia.',
  },
]

export const schedulesFor = (campusId?: CampusId | '', courseId?: CourseId | '') =>
  schedules.filter(
    (s) =>
      (!campusId || s.campusId === campusId) &&
      (!courseId || s.courseId === courseId),
  )

export const scheduleById = (id: string) => schedules.find((s) => s.id === id)

/** Which courses are actually offered at a campus (by schedule availability). */
export const courseIdsAtCampus = (campusId: CampusId): CourseId[] => {
  const ids = new Set<CourseId>()
  schedules.filter((s) => s.campusId === campusId).forEach((s) => ids.add(s.courseId))
  // Inducción docente is offered at La Guaira but has no priced schedule yet.
  if (campusId === 'la-guaira') ids.add('instructor-induction')
  return Array.from(ids)
}
