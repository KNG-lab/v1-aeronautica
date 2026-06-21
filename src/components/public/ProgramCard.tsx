import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { EASE_OUT } from '@/utils/motion'

type ProgramStatus = 'available' | 'to-define'

interface ProgramCardProps {
  title: string
  description: string
  image: string
  imageAlt: string
  icon: ReactNode
  status?: ProgramStatus
  href: string
  index: number
}

export default function ProgramCard({
  title,
  description,
  image,
  imageAlt,
  icon,
  status = 'available',
  href,
  index,
}: ProgramCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, ease: EASE_OUT, delay: index * 0.1 }}
      whileHover={{ y: -4, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } }}
      className="group relative flex min-h-[370px] flex-col overflow-hidden rounded-[10px] border border-white/[0.13] transition-[border-color] duration-300 hover:border-[rgba(255,106,0,0.45)] lg:min-h-[400px]"
      style={{
        background: 'linear-gradient(180deg, rgba(22,22,22,0.94) 0%, rgba(8,8,8,0.98) 100%)',
      }}
    >
      {/* Image */}
      <div className="relative h-[168px] overflow-hidden sm:h-44">
        <img
          src={image}
          alt={imageAlt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(0,0,0,0.04) 10%, rgba(0,0,0,0.28) 55%, rgba(5,5,5,0.88) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col px-4 pb-3.5 pt-4">
        {/* Icon */}
        <div
          aria-hidden
          className="mb-3 flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full"
          style={{
            border: '1px solid rgba(255,106,0,0.28)',
            background: 'rgba(255,106,0,0.06)',
          }}
        >
          <span className="flex items-center justify-center text-[#FF6A00]">{icon}</span>
        </div>

        {/* Title */}
        <h3
          className="font-display font-bold uppercase leading-[1.15] tracking-[-0.015em] text-[#F5F5F5]"
          style={{ fontSize: '15px' }}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className="mt-2 leading-[1.45] text-[rgba(245,245,245,0.62)]"
          style={{ fontSize: '13px', maxWidth: '24ch' }}
        >
          {description}
        </p>

        {status === 'to-define' && (
          <p
            className="mt-2 font-medium uppercase text-[rgba(245,245,245,0.35)]"
            style={{ fontSize: '11px', letterSpacing: '0.06em' }}
          >
            Por definir
          </p>
        )}

        {/* CTA */}
        <Link
          to={href}
          aria-label={`Ver programa: ${title}`}
          className="mt-auto flex items-center justify-between border-t border-white/[0.08] pt-3.5 text-[#F5F5F5] transition-[border-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A00] group-hover:border-white/[0.15]"
          style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em' }}
        >
          <span className="uppercase tracking-[0.08em] transition-colors duration-200 group-hover:text-white">
            Ver programa
          </span>
          <span className="flex items-center text-[#FF6A00] transition-transform duration-200 group-hover:translate-x-1">
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
          </span>
        </Link>
      </div>
    </motion.article>
  )
}
