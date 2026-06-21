import MotionPage from '@/components/motion/MotionPage'
import SubpageHero from '@/components/public/SubpageHero'
import AnimatedProgramCard from '@/components/public/AnimatedProgramCard'
import { StaggerContainer } from '@/components/motion/Reveal'
import { FadeUp } from '@/components/motion/Reveal'
import { courses, futureCourses } from '@/data/courses'
import { ASSETS } from '@/data/assets'
import { Sparkles } from 'lucide-react'

export default function Programs() {
  return (
    <MotionPage>
      <SubpageHero
        eyebrow="Oferta académica"
        title="Programas"
        accentWord="de formación"
        description="Forma parte de la aviación venezolana con programas diseñados según los estándares de la industria."
        image={ASSETS.courseTcpImage}
      />

      <section className="container-px py-20">
        <StaggerContainer className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {courses.map((c) => (
            <AnimatedProgramCard key={c.id} course={c} />
          ))}
        </StaggerContainer>
      </section>

      {/* Future expansion */}
      <section className="container-px pb-24">
        <FadeUp>
          <div className="rounded-2xl border border-white/10 bg-ink-800/50 p-8 sm:p-10">
            <div className="flex items-center gap-2 text-accent-400">
              <Sparkles className="h-5 w-5" />
              <span className="eyebrow">Próxima expansión</span>
            </div>
            <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">
              Nuevos programas en camino
            </h2>
            <p className="mt-3 max-w-xl text-sm text-steel-400">
              Estamos ampliando nuestra oferta académica para cubrir más áreas de la
              carrera aeronáutica.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {futureCourses.map((f) => (
                <span
                  key={f}
                  className="rounded-full border border-accent-500/20 bg-accent-500/[0.06] px-4 py-2 text-sm text-accent-200"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        </FadeUp>
      </section>
    </MotionPage>
  )
}
