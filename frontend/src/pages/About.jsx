import { motion } from 'framer-motion'
import { FiCheck } from 'react-icons/fi'
import SEO from '../components/SEO.jsx'
import PageBanner from '../components/PageBanner.jsx'
import SectionLabel from '../components/SectionLabel.jsx'
import QuickQueryForm from '../components/QuickQueryForm.jsx'
import InsuranceBilling from '../sections/InsuranceBilling.jsx'
import TreatmentJourney from '../sections/TreatmentJourney.jsx'
import AppointmentCTA from '../sections/AppointmentCTA.jsx'

const WHY_US_1 = ['Personalized Treatment', 'Licensed Therapists', 'Experienced Staff', 'Therapy Goals']

export default function About() {
  return (
    <>
      <SEO
        title="About Us"
        description="Learn about Markham Pain Clinic's mission, values, and commitment to evidence-based, patient-centered pain management."
      />
      <PageBanner title="About Us" crumb="About Us" />

      <InsuranceBilling />

      {/* About + image collage + vision/mission */}
      <section className="section-padding bg-ivory">
        <div className="container-app grid lg:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-soft aspect-[4/5]">
              <img
                src="/about.png"
                alt="Markham Pain Clinic interior"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden sm:block absolute -bottom-8 -right-8 w-48 h-36 rounded-xl overflow-hidden shadow-soft border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1519824145371-296894a0daa9?q=80&w=600&auto=format&fit=crop"
                alt="Patient treatment session"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <SectionLabel>About Us</SectionLabel>
            <h2 className="section-heading mb-5">About Markham Pain Clinic</h2>
            <p className="text-textSecondary leading-relaxed mb-6">
              Markham Pain Clinic was founded on a simple belief: pain relief should be personal,
              evidence-based, and centered on the whole patient. Our multidisciplinary team works
              together to design treatment plans that address the root cause of pain, not just the
              symptoms.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h3 className="font-heading font-bold text-lg text-textMain mb-2">Our Vision</h3>
                <p className="text-textSecondary text-sm leading-relaxed">
                  To be the region&apos;s most trusted destination for non-surgical pain relief and
                  long-term recovery.
                </p>
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-textMain mb-2">Our Mission</h3>
                <p className="text-textSecondary text-sm leading-relaxed">
                  To deliver personalized, evidence-based care that restores movement and improves
                  quality of life.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why choose us + form overlay */}
      <section className="section-padding bg-darkCoffee relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=1600&auto=format&fit=crop"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container-app relative grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <SectionLabel>Why Us</SectionLabel>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white mb-5">
              Committed to Your Health &amp; Recovery
            </h2>
            <p className="text-beige/90 leading-relaxed mb-6">
              Our team of experienced physiotherapists provides personalized care to help you recover
              from injuries and improve your overall physical health.
            </p>
            <ul className="grid sm:grid-cols-2 gap-3">
              {WHY_US_1.map((item) => (
                <li key={item} className="flex items-center gap-3 text-white font-medium">
                  <span className="w-6 h-6 rounded-full bg-gold/20 text-gold flex items-center justify-center flex-shrink-0">
                    <FiCheck size={14} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative rounded-2xl overflow-hidden aspect-[4/5] flex flex-col justify-end">
            <img
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200&auto=format&fit=crop"
              alt="Clinic interior"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="relative p-5 sm:p-6 w-full">
              <QuickQueryForm />
            </div>
          </div>
        </div>
      </section>

      <TreatmentJourney />
      <AppointmentCTA />
    </>
  )
}
