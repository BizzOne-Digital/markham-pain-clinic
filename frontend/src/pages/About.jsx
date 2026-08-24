import SEO from '../components/SEO.jsx'
import PageBanner from '../components/PageBanner.jsx'
import AboutPreview from '../sections/AboutPreview.jsx'
import WhyChooseUs from '../sections/WhyChooseUs.jsx'
import TreatmentJourney from '../sections/TreatmentJourney.jsx'
import AppointmentCTA from '../sections/AppointmentCTA.jsx'

export default function About() {
  return (
    <>
      <SEO
        title="About Us"
        description="Learn about Markham Pain Clinic's mission, values, and commitment to evidence-based, patient-centered pain management."
      />
      <PageBanner title="About Us" crumb="About Us" />
      <AboutPreview />
      <WhyChooseUs />
      <TreatmentJourney />
      <AppointmentCTA />
    </>
  )
}
