import SectionHeader from '@/components/ui/SectionHeader'
import { StaggerContainer } from '@/components/motion/Reveal'
import CampusCard from './CampusCard'
import { campuses } from '@/data/campuses'

export default function CampusSection() {
  return (
    <section id="sedes" className="container-px py-20 sm:py-24">
      <SectionHeader
        title="Nuestra"
        accentWord="sede"
        description="Una sede estratégica en La Guaira, conectada con la operación aérea del país."
      />
      <StaggerContainer className="mt-14 grid grid-cols-1 gap-6">
        {campuses.map((c) => (
          <CampusCard key={c.id} campus={c} />
        ))}
      </StaggerContainer>
    </section>
  )
}
