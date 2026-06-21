import { UsersRound, RefreshCw, PlaneTakeoff, BookOpenCheck, Sparkles } from 'lucide-react'
import ProgramCard from './ProgramCard'
import { ASSETS } from '@/data/assets'

const PROGRAMS = [
  {
    title: 'Curso Inicial TCP',
    description: 'Tu punto de partida para volar alto',
    image: ASSETS.programTcpInitialCard,
    imageAlt: 'Estudiantes de tripulante de cabina en entrenamiento',
    icon: <UsersRound className="h-[18px] w-[18px]" strokeWidth={1.7} />,
    status: 'available' as const,
    href: '/programas/tcp-inicial',
  },
  {
    title: 'Curso Recurrente TCP',
    description: 'Actualiza tus competencias y mantente vigente',
    image: ASSETS.programTcpRecurrentCard,
    imageAlt: 'Tripulante de cabina en actualización profesional',
    icon: <RefreshCw className="h-[18px] w-[18px]" strokeWidth={1.7} />,
    status: 'available' as const,
    href: '/programas/tcp-recurrente',
  },
  {
    title: 'Despacho de Vuelo',
    description: 'Coordina cada operación con precisión y seguridad',
    image: ASSETS.programDispatchCard,
    imageAlt: 'Especialista en despacho y operaciones aéreas',
    icon: <PlaneTakeoff className="h-[18px] w-[18px]" strokeWidth={1.7} />,
    status: 'available' as const,
    href: '/programas/despacho-de-vuelo',
  },
  {
    title: 'Inducción Docente',
    description: 'Desarrollamos instructores que inspiran y transforman',
    image: ASSETS.programInstructorCard,
    imageAlt: 'Instructor aeronáutico frente a estudiantes en aula',
    icon: <BookOpenCheck className="h-[18px] w-[18px]" strokeWidth={1.7} />,
    status: 'to-define' as const,
    href: '/programas/induccion-docente',
  },
]

export default function ProgramsSection() {
  return (
    <section id="programas" className="bg-[#050505]">
      <div className="mx-auto max-w-[1280px] px-8 pb-14 pt-[72px]">

        {/* Section header */}
        <h2
          className="text-center font-display font-bold uppercase text-[#F5F5F5]"
          style={{ fontSize: 'clamp(28px, 3.1vw, 44px)', letterSpacing: '-0.035em' }}
        >
          Programas{' '}
          <span className="text-[#FF6A00]">Disponibles</span>
        </h2>

        {/* Program grid */}
        <div className="mt-8 grid grid-cols-1 gap-[14px] sm:grid-cols-2 lg:grid-cols-4 xl:gap-4">
          {PROGRAMS.map((program, i) => (
            <ProgramCard key={program.href} {...program} index={i} />
          ))}
        </div>

        {/* Future expansion */}
        <div className="mt-5 flex items-center justify-center gap-2">
          <Sparkles aria-hidden className="h-3 w-3 shrink-0 text-[rgba(245,245,245,0.35)]" />
          <p
            className="text-center leading-relaxed text-[rgba(245,245,245,0.52)]"
            style={{ fontSize: '12px', letterSpacing: '0.01em' }}
          >
            <span className="text-[rgba(245,245,245,0.72)]">PRÓXIMA EXPANSIÓN:</span>{' '}
            PILOTO PRIVADO PPL · INGLÉS AERONÁUTICO AVANZADO · OPERACIONES AERONÁUTICAS
          </p>
        </div>

      </div>
    </section>
  )
}
