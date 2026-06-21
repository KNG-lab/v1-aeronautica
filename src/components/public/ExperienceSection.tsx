import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Award,
  UserRoundCheck,
  PlaneTakeoff,
  MonitorCog,
  Building2,
  HeartHandshake,
  ArrowRight,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { fadeUp, fadeIn, slideLeft, slideRight, staggerContainer, viewportOnce } from '@/utils/motion'
import { ASSETS } from '@/data/assets'

// ─── data ────────────────────────────────────────────────────────────────────

interface Benefit {
  Icon: LucideIcon
  label: string
}

const BENEFITS: Benefit[] = [
  { Icon: Award,           label: 'Formación de\nexcelencia' },
  { Icon: UserRoundCheck,  label: 'Instructores\nexpertos' },
  { Icon: PlaneTakeoff,    label: 'Entrenamiento\npráctico' },
  { Icon: MonitorCog,      label: 'Simuladores y\ntecnología' },
  { Icon: Building2,       label: 'Instalaciones de\nprimer nivel' },
  { Icon: HeartHandshake,  label: 'Enfoque humano\ny acompañamiento' },
]

interface MosaicItem {
  id: string
  label: string
  image: string
  alt: string
  spanFull: boolean
}

const MOSAIC: MosaicItem[] = [
  {
    id: 'simulator',
    label: 'Simuladores avanzados',
    image: ASSETS.experienceSimulator,
    alt: 'Estudiantes en simulador de vuelo avanzado con controles y pantallas técnicas',
    spanFull: true,
  },
  {
    id: 'cabin',
    label: 'Entrenamiento en cabina',
    image: ASSETS.experienceCabin,
    alt: 'Tripulantes V1 en práctica de procedimientos dentro de cabina de avión',
    spanFull: false,
  },
  {
    id: 'culture',
    label: 'Cultura aeronáutica',
    image: ASSETS.experienceCulture,
    alt: 'Instructores y estudiantes en briefing aeronáutico profesional',
    spanFull: false,
  },
]

const TILE_OVERLAY =
  'linear-gradient(180deg, rgba(0,0,0,0.02) 15%, rgba(0,0,0,0.28) 58%, rgba(0,0,0,0.82) 100%)'
const MAIN_OVERLAY =
  'linear-gradient(180deg, rgba(0,0,0,0.05) 20%, rgba(0,0,0,0.16) 58%, rgba(0,0,0,0.66) 100%)'

// ─── section ─────────────────────────────────────────────────────────────────

export default function ExperienceSection() {
  return (
    <section className="bg-[#050505]" aria-label="Experiencia V1">
      <div className="mx-auto max-w-[1280px] px-8 pb-[72px] pt-7">

        {/* ── Block 1: Benefits strip ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
          className="grid grid-cols-2 pb-6 pt-[22px] sm:grid-cols-3 lg:grid-cols-6"
        >
          {BENEFITS.map(({ Icon, label }, i) => (
            <motion.div
              key={label}
              variants={fadeUp}
              className={[
                'flex min-h-[56px] items-center gap-[10px] px-[18px]',
                i < BENEFITS.length - 1 ? 'lg:border-r lg:border-white/[0.10]' : '',
              ].join(' ')}
            >
              <Icon
                aria-hidden
                className="shrink-0 text-[#FF6A00]"
                style={{ width: 21, height: 21, strokeWidth: 1.65 }}
              />
              <span
                className="whitespace-pre-line font-medium text-[rgba(245,245,245,0.83)]"
                style={{ fontSize: '12px', lineHeight: '1.28' }}
              >
                {label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Divider ── */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="mb-8"
          style={{ height: 1, background: 'rgba(255,255,255,0.09)' }}
        />

        {/* ── Block 2: Content grid ── */}
        <div className="grid grid-cols-1 items-stretch gap-[14px] md:grid-cols-2 xl:grid-cols-[minmax(210px,0.78fr)_minmax(300px,1.12fr)_minmax(340px,1.22fr)]">

          {/* Col 1: Copy */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col justify-center py-4 xl:py-0"
          >
            <span
              className="font-bold uppercase tracking-[0.10em] text-[#F5F5F5]"
              style={{ fontSize: '12px' }}
            >
              Experiencia V1
            </span>

            <h2
              className="mt-[10px] font-display font-bold uppercase leading-[1.08] tracking-[-0.035em] text-[#FF6A00]"
              style={{ fontSize: 'clamp(23px, 2.1vw, 34px)' }}
            >
              Formación práctica,
              <br />
              experiencia real
            </h2>

            <p
              className="mt-[18px] leading-[1.6] text-[rgba(245,245,245,0.62)]"
              style={{ fontSize: '13px', maxWidth: '28ch' }}
            >
              Entrenas en entornos reales con instructores expertos, simuladores de última generación y una metodología que te impulsa a crecer
            </p>

            <motion.div
              className="mt-6 self-start"
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <Link
                to="/nosotros"
                className="group inline-flex items-center gap-[10px] rounded-[7px] uppercase text-[#F5F5F5] transition-[background,border-color] duration-200 hover:border-[rgba(255,106,0,0.8)] hover:bg-[rgba(255,106,0,0.09)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A00]"
                style={{
                  padding: '11px 15px',
                  border: '1px solid rgba(255,106,0,0.50)',
                  background: 'rgba(255,106,0,0.04)',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                }}
              >
                <span>Conocer más</span>
                <ArrowRight
                  aria-hidden
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                  strokeWidth={2.5}
                />
              </Link>
            </motion.div>
          </motion.div>

          {/* Col 2: Feature image */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            whileHover={{ y: -3, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } }}
            className="group relative min-h-[310px] overflow-hidden rounded-[9px] border border-white/[0.14] bg-[#0A0A0A] transition-[border-color] duration-300 hover:border-[rgba(255,106,0,0.35)]"
          >
            <img
              src={ASSETS.experienceDelegation}
              alt="Delegación V1 Aeronáutica — instructores y estudiantes en espacio aeronáutico"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-center transition-transform duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]"
            />
            <div aria-hidden className="absolute inset-0" style={{ background: MAIN_OVERLAY }} />
          </motion.div>

          {/* Col 3: Mosaic */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid min-h-[310px] grid-cols-2 grid-rows-[1.05fr_1fr] gap-3 md:col-span-2 xl:col-span-1"
          >
            {MOSAIC.map((tile) => (
              <div
                key={tile.id}
                className={[
                  'group relative overflow-hidden rounded-[8px] border border-white/[0.14] bg-[#0A0A0A]',
                  'transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-[rgba(255,106,0,0.35)]',
                  tile.spanFull ? 'col-span-2' : 'col-span-1',
                ].join(' ')}
              >
                <img
                  src={tile.image}
                  alt={tile.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-75"
                  style={{ background: TILE_OVERLAY }}
                />
                <p
                  className="absolute bottom-3 left-3.5 font-bold uppercase text-[#F5F5F5] transition-transform duration-200 group-hover:-translate-y-0.5"
                  style={{ fontSize: '11px', letterSpacing: '0.06em' }}
                >
                  {tile.label}
                </p>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
