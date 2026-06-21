/** Marketing/social-proof content for the landing page (mock, frontend-only). */

export interface Testimonial {
  name: string
  role: string
  quote: string
  initials: string
}

export const testimonials: Testimonial[] = [
  {
    name: 'Gabriela Romero',
    role: 'Egresada · Tripulante de Cabina',
    quote:
      'V1 me dio mucho más que un certificado. La práctica en cabina y los instructores activos me prepararon para mi primera entrevista con una aerolínea. Hoy vuelo.',
    initials: 'GR',
  },
  {
    name: 'Andrés Belisario',
    role: 'Egresado · Inducción Docente',
    quote:
      'Llegué con experiencia de vuelo y salí sabiendo enseñar. La formación docente es seria y exigente; hoy formo a las próximas generaciones de tripulantes.',
    initials: 'AB',
  },
  {
    name: 'Daniela Quintero',
    role: 'Estudiante · Curso Inicial TCP',
    quote:
      'El horario sabatino me permitió estudiar sin dejar mi trabajo. La plataforma para ver mis notas, pagos y comunicados hace todo mucho más fácil.',
    initials: 'DQ',
  },
  {
    name: 'José Gregorio Pérez',
    role: 'Egresado · Recurrente TCP',
    quote:
      'Necesitaba mantener mi vigencia y el curso recurrente fue directo, intensivo y bien estructurado. Atención impecable de principio a fin.',
    initials: 'JP',
  },
]

export interface ImpactStat {
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  label: string
}

export const impactStats: ImpactStat[] = [
  { value: 160, suffix: '+', label: 'Estudiantes en formación' },
  { value: 92, suffix: '%', label: 'Índice de satisfacción' },
  { value: 3, label: 'Programas activos' },
  { value: 100, suffix: '%', label: 'Enfoque práctico real' },
]

/** "Nuestros egresados vuelan con" — aspirational airline/partner names. */
export const partners: string[] = [
  'Conviasa',
  'Avior Airlines',
  'Laser Airlines',
  'Estelar',
  'Rutaca',
  'Albatros Airlines',
  'Turpial Airlines',
]

export const landingFaqs = [
  {
    q: '¿Necesito experiencia previa para empezar?',
    a: 'No. Nuestro Curso Inicial de Tripulante de Cabina te forma desde cero, con teoría, práctica y acompañamiento académico.',
  },
  {
    q: '¿Qué horarios manejan?',
    a: 'Ofrecemos modalidades matutina, vespertina, nocturna y sabatina según el curso y la sede, para que puedas estudiar y trabajar.',
  },
  {
    q: '¿Cómo es el proceso de inscripción?',
    a: 'Eliges sede, curso y horario, completas tus datos y adjuntas el comprobante de preinscripción. Nuestro equipo valida tu información y confirma tu cupo.',
  },
  {
    q: '¿Qué métodos de pago aceptan?',
    a: 'En línea: transferencia, pago móvil y bolívares a tasa BCV. Presencial: además punto de venta, Zelle y efectivo.',
  },
  {
    q: '¿Entregan certificado al finalizar?',
    a: 'Sí. Al aprobar el programa completo recibes un certificado institucional de V1 Aeronáutica.',
  },
]
