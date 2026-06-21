import type { Course } from './types'
import { ASSETS } from './assets'

export const courses: Course[] = [
  {
    id: 'tcp-initial',
    slug: 'curso-inicial-tcp',
    name: 'Curso Inicial Tripulante de Cabina',
    shortName: 'Curso Inicial TCP',
    status: 'available',
    icon: 'Users',
    tagline: 'Tu punto de partida para volar alto',
    shortDescription: 'La formación integral que te certifica como tripulante de cabina de pasajeros.',
    description:
      'Programa integral que forma tripulantes de cabina con los estándares de seguridad, servicio y profesionalismo que exige la aviación moderna. Combina teoría, práctica en cabina y cultura aeronáutica.',
    forWhom: [
      'Bachilleres con vocación de servicio y disposición para viajar.',
      'Personas entre 18 y 35 años con buena presencia y comunicación.',
      'Quienes buscan iniciar una carrera estable en la industria aérea.',
    ],
    learn: [
      'Seguridad aérea y procedimientos de emergencia',
      'Servicio a bordo y atención al pasajero',
      'Primeros auxilios aeronáuticos',
      'Factores humanos y trabajo en equipo',
      'Cultura y normativa aeronáutica',
    ],
    includes: [
      'Material de estudio digital',
      'Prácticas en mock-up de cabina',
      'Certificado institucional',
      'Acompañamiento académico',
    ],
    image: ASSETS.courseTcpImage,
    faq: [
      {
        q: '¿Necesito experiencia previa en aviación?',
        a: 'No. El curso inicial está diseñado para formarte desde cero hasta el nivel profesional.',
      },
      {
        q: '¿El certificado tiene validez?',
        a: 'Recibes un certificado institucional de V1 Aeronáutica al aprobar el programa completo.',
      },
      {
        q: '¿Puedo estudiar y trabajar?',
        a: 'Sí. Ofrecemos horarios matutino, vespertino y sabatino para adaptarnos a tu disponibilidad.',
      },
    ],
  },
  {
    id: 'tcp-recurrent',
    slug: 'curso-recurrente-tcp',
    name: 'Curso Recurrente Tripulante de Cabina',
    shortName: 'Curso Recurrente TCP',
    status: 'available',
    icon: 'RefreshCw',
    tagline: 'Actualiza tus competencias y mantente vigente',
    shortDescription: 'Recertificación intensiva para tripulantes que necesitan mantener su vigencia.',
    description:
      'Programa de actualización para tripulantes de cabina activos que requieren refrescar procedimientos, normativa y competencias para mantener su vigencia operativa.',
    forWhom: [
      'Tripulantes de cabina con formación inicial previa.',
      'Profesionales que requieren recertificación periódica.',
    ],
    learn: [
      'Actualización de procedimientos de emergencia',
      'Refresco de servicio y normativa vigente',
      'Evaluación de competencias prácticas',
    ],
    includes: [
      'Material de actualización',
      'Evaluación práctica',
      'Certificado de recurrencia',
    ],
    image: ASSETS.recurrentTcpImage,
    faq: [
      {
        q: '¿Cuánto dura el curso recurrente?',
        a: 'Es un programa intensivo de un mes, con sesiones los martes y jueves.',
      },
      {
        q: '¿Debo haber hecho el curso inicial con ustedes?',
        a: 'No necesariamente, pero debes acreditar tu formación inicial como tripulante de cabina.',
      },
    ],
  },
  {
    id: 'instructor-induction',
    slug: 'induccion-docente',
    name: 'Curso Inducción Docente',
    shortName: 'Inducción Docente',
    status: 'coming-soon',
    icon: 'GraduationCap',
    tagline: 'Desarrollamos instructores que inspiran y transforman',
    shortDescription: 'Formación pedagógica para futuros instructores aeronáuticos.',
    description:
      'Programa orientado a profesionales de la aviación que desean convertirse en instructores, con foco en metodología, didáctica y evaluación dentro del contexto aeronáutico.',
    forWhom: [
      'Profesionales aeronáuticos con experiencia.',
      'Quienes desean transmitir su conocimiento como instructores.',
    ],
    learn: [
      'Metodología de la enseñanza aeronáutica',
      'Diseño y evaluación de aprendizajes',
      'Comunicación y liderazgo en el aula',
    ],
    includes: ['Material pedagógico', 'Prácticas docentes guiadas'],
    image: ASSETS.instructorImage,
    faq: [
      {
        q: '¿Cuándo inicia este programa?',
        a: 'La duración y los costos están por definir. Déjanos tus datos y te avisaremos al abrir inscripciones.',
      },
    ],
  },
]

export const courseById = (id: string) => courses.find((c) => c.id === id)
export const courseBySlug = (slug: string) => courses.find((c) => c.slug === slug)

export const futureCourses = [
  'Piloto Privado PPL',
  'Inglés Aeronáutico Avanzado',
  'Operaciones Aeronáuticas',
]
