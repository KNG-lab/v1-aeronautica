import { useParams, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, Target, BookOpen, Package, MapPin } from 'lucide-react'
import MotionPage from '@/components/motion/MotionPage'
import SubpageHero from '@/components/public/SubpageHero'
import ScheduleCard from '@/components/public/ScheduleCard'
import Accordion from '@/components/ui/Accordion'
import StatusBadge, { statusTone } from '@/components/ui/StatusBadge'
import { ButtonLink, ButtonAnchor } from '@/components/ui/PremiumButton'
import { FadeUp, StaggerContainer } from '@/components/motion/Reveal'
import SectionHeader from '@/components/ui/SectionHeader'
import { courseBySlug } from '@/data/courses'
import { schedulesFor } from '@/data/schedules'
import { campusById } from '@/data/campuses'
import { staggerContainer } from '@/utils/motion'
import { whatsappLink } from '@/utils/enrollment'
import type { CampusId } from '@/data/types'

export default function CourseDetail() {
  const { slug } = useParams()
  const course = slug ? courseBySlug(slug) : undefined
  if (!course) return <Navigate to="/programas" replace />

  const courseSchedules = schedulesFor('', course.id)
  const campusIds = Array.from(new Set(courseSchedules.map((s) => s.campusId))) as CampusId[]
  const badge = statusTone(course.status)

  return (
    <MotionPage>
      <SubpageHero
        eyebrow="Programa académico"
        title={course.name}
        description={course.tagline}
        image={course.image}
      >
        <div className="flex flex-wrap items-center gap-3">
          <StatusBadge tone={badge.tone} dot>
            {badge.label}
          </StatusBadge>
          <ButtonLink to="/inscripcion" showArrow>
            Inscribirme
          </ButtonLink>
          <ButtonAnchor
            href={whatsappLink(`Hola, quiero información sobre el ${course.shortName}.`)}
            variant="secondary"
          >
            Consultar por WhatsApp
          </ButtonAnchor>
        </div>
      </SubpageHero>

      <div className="container-px grid grid-cols-1 gap-12 py-20 lg:grid-cols-[1fr_320px]">
        {/* Main content */}
        <div className="space-y-16">
          {/* Description */}
          <FadeUp>
            <h2 className="text-2xl font-semibold">Descripción general</h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-steel-300">
              {course.description}
            </p>
          </FadeUp>

          {/* For whom + Learn */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <InfoBlock icon={<Target className="h-5 w-5" />} title="¿Para quién es?" items={course.forWhom} />
            <InfoBlock icon={<BookOpen className="h-5 w-5" />} title="¿Qué aprenderás?" items={course.learn} />
          </div>

          {/* Includes */}
          {course.includes.length > 0 && (
            <FadeUp>
              <div className="flex items-center gap-2 text-accent-400">
                <Package className="h-5 w-5" />
                <h2 className="text-xl font-semibold text-steel-100">Qué incluye</h2>
              </div>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {course.includes.map((inc) => (
                  <span
                    key={inc}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-steel-200"
                  >
                    {inc}
                  </span>
                ))}
              </div>
            </FadeUp>
          )}

          {/* Schedules */}
          <div>
            <SectionHeader
              align="left"
              eyebrow="Horarios y costos"
              title="Horarios"
              accentWord="disponibles"
            />
            {courseSchedules.length > 0 ? (
              <StaggerContainer className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {courseSchedules.map((s) => (
                  <ScheduleCard key={s.id} schedule={s} />
                ))}
              </StaggerContainer>
            ) : (
              <p className="mt-6 rounded-2xl border border-amber-500/20 bg-amber-500/[0.05] p-6 text-sm text-amber-200">
                La duración y los costos de este programa están por definir. Déjanos tus
                datos y te avisaremos al abrir inscripciones.
              </p>
            )}
          </div>

          {/* Campuses */}
          {campusIds.length > 0 && (
            <FadeUp>
              <h2 className="text-xl font-semibold">Sede disponible</h2>
              <div className="mt-5 flex flex-wrap gap-3">
                {campusIds.map((id) => {
                  const c = campusById(id)
                  return c ? (
                    <div
                      key={id}
                      className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-ink-800/50 px-4 py-3"
                    >
                      <MapPin className="h-4 w-4 text-accent-500" />
                      <div>
                        <p className="text-sm font-medium">{c.name}</p>
                        <p className="text-xs text-steel-400">{c.state}</p>
                      </div>
                    </div>
                  ) : null
                })}
              </div>
            </FadeUp>
          )}

          {/* FAQ */}
          <div>
            <SectionHeader align="left" eyebrow="Dudas frecuentes" title="Preguntas" accentWord="frecuentes" />
            <div className="mt-8">
              <Accordion items={course.faq} />
            </div>
          </div>
        </div>

        {/* Sticky CTA sidebar */}
        <aside className="lg:sticky lg:top-28 lg:h-fit">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="rounded-2xl border border-accent-500/20 bg-accent-500/[0.04] p-6"
          >
            <h3 className="text-lg font-semibold">Asegura tu cupo</h3>
            <p className="mt-2 text-sm text-steel-300">
              Inicia tu inscripción en línea o conversa con nuestro equipo.
            </p>
            <div className="mt-5 flex flex-col gap-2.5">
              <ButtonLink to="/inscripcion" fullWidth showArrow>
                Iniciar inscripción
              </ButtonLink>
              <ButtonAnchor
                href={whatsappLink(`Hola, quiero información sobre el ${course.shortName}.`)}
                variant="secondary"
                fullWidth
              >
                Hablar por WhatsApp
              </ButtonAnchor>
            </div>
          </motion.div>
        </aside>
      </div>
    </MotionPage>
  )
}

function InfoBlock({ icon, title, items }: { icon: React.ReactNode; title: string; items: string[] }) {
  return (
    <FadeUp className="rounded-2xl border border-white/10 bg-ink-800/50 p-6">
      <div className="flex items-center gap-2 text-accent-400">
        {icon}
        <h3 className="text-base font-semibold text-steel-100">{title}</h3>
      </div>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-steel-300">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" />
            {item}
          </li>
        ))}
      </ul>
    </FadeUp>
  )
}
