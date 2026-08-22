import SEO from '../components/SEO.jsx'
import AboutPreview from '../sections/AboutPreview.jsx'
import WhyChooseUs from '../sections/WhyChooseUs.jsx'
import TreatmentJourney from '../sections/TreatmentJourney.jsx'
import AppointmentCTA from '../sections/AppointmentCTA.jsx'
import SectionLabel from '../components/SectionLabel.jsx'

export default function About() {
  return (
    <>
      <SEO
        title="About Us"
        description="Learn about Markham Pain Clinic's mission, values, and commitment to evidence-based, patient-centered pain management."
      />
      <section className="section-padding bg-ivory text-center">
        <div className="container-app max-w-3xl mx-auto">
          <SectionLabel>ABOUT MARKHAM PAIN CLINIC</SectionLabel>
          <h1 className="section-heading mb-6">Dedicated to Your Recovery, Every Step of the Way</h1>
          <p className="text-textSecondary leading-relaxed">
            Markham Pain Clinic was founded on a simple belief: pain relief should be personal,
            evidence-based, and centered on the whole patient. Our multidisciplinary team of
            physiotherapists, acupuncturists, and pain management specialists work together to design
            treatment plans that address the root cause of pain, not just the symptoms.
          </p>
        </div>
      </section>
      <AboutPreview />
      <WhyChooseUs />
      <TreatmentJourney />
      <AppointmentCTA />
    </>
  )
}
