import SEO from '../components/SEO.jsx'
import ServicesPreview from '../sections/ServicesPreview.jsx'
import AppointmentCTA from '../sections/AppointmentCTA.jsx'
import SectionLabel from '../components/SectionLabel.jsx'

export default function Services() {
  return (
    <>
      <SEO
        title="Our Services"
        description="Explore Markham Pain Clinic's full range of services including physiotherapy, acupuncture, chronic pain management, sports injury rehab, and manual therapy."
      />
      <section className="section-padding bg-ivory text-center">
        <div className="container-app max-w-3xl mx-auto">
          <SectionLabel>OUR SERVICES</SectionLabel>
          <h1 className="section-heading mb-6">Personalized Treatment for Every Type of Pain</h1>
          <p className="text-textSecondary leading-relaxed">
            From physiotherapy to acupuncture, our services are designed to address the full spectrum
            of pain and mobility issues. Every treatment is backed by evidence and tailored to your
            unique recovery goals.
          </p>
        </div>
      </section>
      <ServicesPreview />
      <AppointmentCTA />
    </>
  )
}
