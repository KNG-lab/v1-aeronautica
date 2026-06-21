import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import { testimonials } from '@/data/marketing'
import { fadeUp, staggerContainer, viewportOnce } from '@/utils/motion'
import { cn } from '@/utils/formatters'

export default function Testimonials() {
  const [featured, ...rest] = testimonials

  return (
    <section className="container-px py-24 sm:py-28">
      <SectionHeader
        title="Lo que dicen nuestros"
        accentWord="estudiantes"
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-3"
      >
        {/* Featured */}
        <motion.figure
          variants={fadeUp}
          className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-accent-500/20 bg-gradient-to-br from-accent-500/[0.08] to-transparent p-8 lg:row-span-2"
        >
          <Quote className="h-10 w-10 text-accent-500/40" />
          <blockquote className="mt-6 text-balance font-display text-2xl font-medium leading-snug text-steel-50">
            “{featured.quote}”
          </blockquote>
          <Author name={featured.name} role={featured.role} initials={featured.initials} className="mt-8" />
        </motion.figure>

        {/* Secondary */}
        {rest.map((t) => (
          <motion.figure
            key={t.name}
            variants={fadeUp}
            className="flex flex-col justify-between rounded-2xl border border-white/10 bg-ink-800/50 p-6 lg:col-span-2 lg:flex-row lg:items-center lg:gap-8"
          >
            <blockquote className="text-[15px] leading-relaxed text-steel-300 lg:flex-1">
              “{t.quote}”
            </blockquote>
            <Author name={t.name} role={t.role} initials={t.initials} className="mt-5 shrink-0 lg:mt-0 lg:w-44" />
          </motion.figure>
        ))}
      </motion.div>
    </section>
  )
}

function Author({
  name,
  role,
  initials,
  className,
}: {
  name: string
  role: string
  initials: string
  className?: string
}) {
  return (
    <figcaption className={cn('flex items-center gap-3', className)}>
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent-500/15 font-display text-sm font-semibold text-accent-300">
        {initials}
      </span>
      <span>
        <span className="block text-sm font-semibold text-steel-100">{name}</span>
        <span className="block text-xs text-steel-400">{role}</span>
      </span>
    </figcaption>
  )
}
