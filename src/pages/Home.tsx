import MotionPage from '@/components/motion/MotionPage'
import Hero from '@/components/public/Hero'
import PartnersMarquee from '@/components/public/PartnersMarquee'
import ProgramsSection from '@/components/public/ProgramsSection'
import BenefitsSection from '@/components/public/BenefitsSection'
import ImpactStats from '@/components/public/ImpactStats'
import ExperienceSection from '@/components/public/ExperienceSection'
import CampusSection from '@/components/public/CampusSection'
import Testimonials from '@/components/public/Testimonials'
import MidPageCTA from '@/components/public/MidPageCTA'
import EnrollmentStepsSection from '@/components/public/EnrollmentStepsSection'
import PaymentMethodsSection from '@/components/public/PaymentMethodsSection'
import PortalPreviewSection from '@/components/public/PortalPreviewSection'
import LandingFAQ from '@/components/public/LandingFAQ'
import FinalCTA from '@/components/public/FinalCTA'

export default function Home() {
  return (
    <MotionPage>
      {/* Hero (with integrated quick-enrollment bar) → proof */}
      <Hero />
      <PartnersMarquee />
      {/* What you get */}
      <ProgramsSection />
      <BenefitsSection />
      <ImpactStats />
      {/* How it feels → where → who vouches */}
      <ExperienceSection />
      <CampusSection />
      <Testimonials />
      {/* Mid-scroll energy injection */}
      <MidPageCTA />
      {/* How to enroll → how to pay → the platform → questions */}
      <EnrollmentStepsSection />
      <PaymentMethodsSection />
      <PortalPreviewSection />
      <LandingFAQ />
      <FinalCTA />
    </MotionPage>
  )
}
