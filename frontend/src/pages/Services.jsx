import SEO from '../components/SEO.jsx'
import PageBanner from '../components/PageBanner.jsx'
import ServicesPreview from '../sections/ServicesPreview.jsx'
import AppointmentCTA from '../sections/AppointmentCTA.jsx'

export default function Services() {
  return (
    <>
      <SEO
        title="Physiotherapy Services in Markham"
        description="Explore Markham Pain Clinic's full range of services including physiotherapy, acupuncture, chiropractic care, massage therapy, and manual therapy in Markham, ON."
        path="/services"
      />
      <PageBanner title="Our Physiotherapy & Pain Services" crumb="Services" />
      <ServicesPreview />
      <AppointmentCTA />
    </>
  )
}
