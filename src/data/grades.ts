import type { Grade } from './types'

export const grades: Grade[] = [
  { subject: 'Seguridad aérea', score: 19, status: 'aprobado', note: 'Excelente desempeño en simulacros.' },
  { subject: 'Servicio a bordo', score: 18, status: 'aprobado', note: 'Dominio del protocolo de cabina.' },
  { subject: 'Primeros auxilios', score: 17, status: 'aprobado', note: 'Reforzar RCP avanzada.' },
  { subject: 'Procedimientos de emergencia', score: null, status: 'cursando', note: 'Evaluación práctica en curso.' },
  { subject: 'Factores humanos', score: null, status: 'cursando', note: 'Módulo en desarrollo.' },
  { subject: 'Cultura aeronáutica', score: null, status: 'pendiente', note: 'Inicia el próximo módulo.' },
]

export const gradeAverage = (() => {
  const scored = grades.filter((g) => g.score !== null) as { score: number }[]
  if (!scored.length) return 0
  return Math.round((scored.reduce((a, g) => a + g.score, 0) / scored.length) * 10) / 10
})()
