import SEO from '../components/SEO.jsx'
import Hero from '../sections/Hero.jsx'
import ServicesPreview from '../sections/ServicesPreview.jsx'
import StatisticsBar from '../sections/StatisticsBar.jsx'
import AboutPreview from '../sections/AboutPreview.jsx'
import ConditionsGrid from '../sections/ConditionsGrid.jsx'
import TreatmentJourney from '../sections/TreatmentJourney.jsx'
import TeamPreview from '../sections/TeamPreview.jsx'
import WhyChooseUs from '../sections/WhyChooseUs.jsx'
import TestimonialsSection from '../sections/TestimonialsSection.jsx'
import BlogPreviewSection from '../sections/BlogPreviewSection.jsx'
import InsuranceBilling from '../sections/InsuranceBilling.jsx'
import FAQPreview from '../sections/FAQPreview.jsx'
import AppointmentCTA from '../sections/AppointmentCTA.jsx'

export default function Home() {
  return (
    <>
      <SEO
        title="Physiotherapy & Pain Clinic in Markham"
        description="Markham Pain Clinic offers evidence-based physiotherapy, chiropractic care, and non-surgical pain management in Markham, ON. Book an appointment today."
        path="/"
      />
      <Hero />
      <ServicesPreview />
      <StatisticsBar />
      <AboutPreview />
      <ConditionsGrid />
      <TreatmentJourney />
      <TeamPreview />
      <WhyChooseUs />
      <TestimonialsSection />
      <BlogPreviewSection />
      <InsuranceBilling />
      <FAQPreview />
      <AppointmentCTA />
    </>
  )
}
