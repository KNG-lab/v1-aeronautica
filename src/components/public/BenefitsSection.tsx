import { StaggerContainer, StaggerChild } from '@/components/motion/Reveal'
import Icon from '@/components/ui/Icon'
import { benefits } from '@/data/announcements'

export default function BenefitsSection() {
  return (
    <section className="border-y border-white/[0.06] bg-ink-800/40">
      <div className="container-px py-16">
        <StaggerContainer className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-6">
          {benefits.map((b) => (
            <StaggerChild key={b.title}>
              <div className="group flex flex-col items-start gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-accent-400 transition-colors duration-300 group-hover:border-accent-500/40 group-hover:text-accent-300">
                  <Icon name={b.icon} className="h-5 w-5" strokeWidth={1.6} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold leading-tight">{b.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-steel-400">{b.desc}</p>
                </div>
              </div>
            </StaggerChild>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
