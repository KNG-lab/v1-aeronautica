import SectionHeader from '@/components/ui/SectionHeader'
import { StaggerContainer } from '@/components/motion/Reveal'
import AnimatedProgramCard from './AnimatedProgramCard'
import { courses } from '@/data/courses'

export default function ProgramsSection() {
  return (
    <section id="programas" className="container-px py-20 sm:py-24">
      <SectionHeader
        title="Programas"
        accentWord="disponibles"
        description="Formación profesional para tripulación de cabina y docencia aeronáutica."
      />

      <StaggerContainer className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {courses.map((course) => (
          <AnimatedProgramCard key={course.id} course={course} />
        ))}
      </StaggerContainer>
    </section>
  )
}
