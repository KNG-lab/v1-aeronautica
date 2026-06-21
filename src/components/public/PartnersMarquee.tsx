import { Plane } from 'lucide-react'
import { partners } from '@/data/marketing'

/**
 * Social-proof marquee: "where our graduates fly". Pure CSS marquee
 * (paused under prefers-reduced-motion via globals.css), edges masked.
 */
export default function PartnersMarquee() {
  const loop = [...partners, ...partners]
  return (
    <section className="border-y border-white/[0.06] bg-ink-800/30 py-10">
      <div className="container-px">
        <p className="text-center text-xs font-medium uppercase tracking-[0.22em] text-steel-500">
          Nuestros egresados forman parte de la aviación venezolana
        </p>
      </div>
      <div className="relative mt-7 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-12 pr-12 motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center">
          {loop.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="flex shrink-0 items-center gap-2.5 font-display text-xl font-medium text-steel-400"
            >
              <Plane className="h-4 w-4 text-accent-500/70" />
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
