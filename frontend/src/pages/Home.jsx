import SEO from '../components/SEO.jsx'
import Hero from '../sections/Hero.jsx'
import ServicesPreview from '../sections/ServicesPreview.jsx'
import StatisticsBar from '../sections/StatisticsBar.jsx'
import AboutPreview from '../sections/AboutPreview.jsx'
import WhyChooseUs from '../sections/WhyChooseUs.jsx'
import TreatmentJourney from '../sections/TreatmentJourney.jsx'
import ConditionsGrid from '../sections/ConditionsGrid.jsx'
import TestimonialsSection from '../sections/TestimonialsSection.jsx'
import TeamPreview from '../sections/TeamPreview.jsx'
import FAQPreview from '../sections/FAQPreview.jsx'
import BlogPreviewSection from '../sections/BlogPreviewSection.jsx'
import AppointmentCTA from '../sections/AppointmentCTA.jsx'

export default function Home() {
  return (
    <>
      <SEO
        title="Home"
        description="Markham Pain Clinic offers evidence-based, personalized physiotherapy, acupuncture, and pain management to help you recover and live pain-free."
      />
      <Hero />
      <div className="pt-20 sm:pt-24">
        <ServicesPreview />
      </div>
      <StatisticsBar />
      <AboutPreview />
      <WhyChooseUs />
      <TreatmentJourney />
      <ConditionsGrid />
      <TestimonialsSection />
      <TeamPreview />
      <FAQPreview />
      <BlogPreviewSection />
      <AppointmentCTA />
    </>
  )
}
