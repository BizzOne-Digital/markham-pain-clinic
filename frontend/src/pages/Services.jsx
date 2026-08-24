import SEO from '../components/SEO.jsx'
import PageBanner from '../components/PageBanner.jsx'
import ServicesPreview from '../sections/ServicesPreview.jsx'
import AppointmentCTA from '../sections/AppointmentCTA.jsx'

export default function Services() {
  return (
    <>
      <SEO
        title="Our Services"
        description="Explore Markham Pain Clinic's full range of services including physiotherapy, acupuncture, chronic pain management, sports injury rehab, and manual therapy."
      />
      <PageBanner title="Our Services" crumb="Services" />
      <ServicesPreview />
      <AppointmentCTA />
    </>
  )
}
