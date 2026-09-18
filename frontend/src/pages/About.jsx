import { motion } from 'framer-motion'
import { FiCheck } from 'react-icons/fi'
import SEO from '../components/SEO.jsx'
import PageBanner from '../components/PageBanner.jsx'
import SectionLabel from '../components/SectionLabel.jsx'
import QuickQueryForm from '../components/QuickQueryForm.jsx'
import InsuranceBilling from '../sections/InsuranceBilling.jsx'
import TreatmentJourney from '../sections/TreatmentJourney.jsx'
import AppointmentCTA from '../sections/AppointmentCTA.jsx'

const WHAT_TO_EXPECT = [
  'Certified and skilled therapists',
  'Up-to-date equipment and treatment methods',
  'Friendly and supportive staff',
  'Fair and accessible pricing options',
]

export default function About() {
  return (
    <>
      <SEO
        title="About Us"
        description="Learn about Markham Pain Clinic's mission, values, and commitment to evidence-based, patient-centered pain management."
      />
      <PageBanner title="About Us" crumb="About Us" />

      <InsuranceBilling />

      {/* About */}
      <section className="section-padding bg-ivory">
        <div className="container-app grid lg:grid-cols-2 gap-14 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <SectionLabel>About Markham Pain Clinic</SectionLabel>
            <h2 className="section-heading mb-5">About Us</h2>
            <p className="text-textSecondary leading-relaxed mb-4">
              At Markham Pain Clinic, we focus on delivering a high standard of care built around
              each individual&apos;s needs. Every person who walks through our doors has a different
              story, and we take the time to understand your condition, goals, and lifestyle before
              planning your care.
            </p>
            <p className="text-textSecondary leading-relaxed mb-4">
              Whether you are dealing with recent discomfort, long-standing issues, sports-related
              injuries, recovery after surgery, or looking to stay active and mobile, our team is here
              to support you at every stage. Our approach combines proven methods with attentive care
              to help you move with confidence again.
            </p>
            <p className="text-textSecondary leading-relaxed">
              We are proud to have supported over <strong className="text-textMain">1,400+ patients</strong>,
              backed by a dedicated team of <strong className="text-textMain">12+ therapists and staff
              members</strong> who work together to create a welcoming and supportive environment.
              Conveniently located in Markham at Shadlock Street, our clinic is easily accessible for
              residents in the surrounding communities. We are just a short distance from well-known
              local landmarks like Pacific Mall and Markham Pan Am Centre, making it simple for you to
              access quality care close to home.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl overflow-hidden shadow-soft aspect-[4/5]"
          >
            <img src="/clinic-reception.jpg" alt="Markham Pain Clinic clinic" className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </section>

      {/* Vision / Mission */}
      <section className="section-padding bg-lightBeige">
        <div className="container-app grid lg:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl overflow-hidden aspect-[4/3]"
          >
            <img
              src="https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop"
              alt="Therapist assisting a patient with a guided exercise"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <div>
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-2xl shadow-soft p-6">
                <h3 className="font-heading font-bold text-lg text-textMain mb-3 flex items-center gap-2">
                  <FiCheck className="text-gold" /> Our Vision
                </h3>
                <p className="text-textSecondary text-sm leading-relaxed">
                  Our vision is to empower individuals to achieve optimal physical health and
                  well-being through personalized, evidence-based interventions, fostering a life of
                  movement, vitality, and independence.
                </p>
              </div>
              <div className="bg-white rounded-2xl shadow-soft p-6">
                <h3 className="font-heading font-bold text-lg text-textMain mb-3 flex items-center gap-2">
                  <FiCheck className="text-gold" /> Our Mission
                </h3>
                <p className="text-textSecondary text-sm leading-relaxed">
                  Your well-being is our top priority, and we are dedicated to helping you achieve
                  your health goals.
                </p>
              </div>
            </div>
            <p className="italic font-serif text-lg text-textMain leading-relaxed">
              Every step we take is focused on helping you move with ease and confidence. Your
              progress stays at the center of everything we do.
            </p>
          </div>
        </div>
      </section>

      {/* Why choose us + form overlay */}
      <section className="section-padding bg-white">
        <div className="container-app grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <SectionLabel>Why Choose Us</SectionLabel>
            <h2 className="section-heading mb-5">Many Solutions Under One Roof</h2>
            <p className="text-textSecondary leading-relaxed mb-4">
              At Markham Pain Clinic, a wide range of services is available in one location,
              including physiotherapy, chiropractic care, massage therapy, laser therapy, shockwave
              therapy, and acupuncture. This allows for a well-rounded approach to care without the
              need to visit multiple providers. The team focuses on understanding your needs and using
              a mix of treatment methods that support steady progress and improved movement.
            </p>
            <p className="text-textSecondary leading-relaxed mb-6">
              Care is delivered by qualified therapists who use modern equipment and practical
              techniques suited to each condition. Attention is given to creating a welcoming
              environment where you feel comfortable during every visit. The goal is to make each
              session clear, focused, and supportive of your recovery.
            </p>
            <p className="font-heading font-bold text-textMain mb-3">What You Can Expect:</p>
            <ul className="space-y-2 mb-6">
              {WHAT_TO_EXPECT.map((item) => (
                <li key={item} className="flex items-center gap-3 text-textMain">
                  <span className="w-6 h-6 rounded-full bg-gold/15 text-gold flex items-center justify-center flex-shrink-0">
                    <FiCheck size={14} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-textSecondary leading-relaxed">
              With everything available in one place, managing your care becomes simpler, helping you
              stay consistent and focused on returning to your daily activities.
            </p>
          </div>

          <div className="relative rounded-2xl overflow-hidden aspect-[4/5] flex flex-col justify-end">
            <img
              src="/Why-choose.webp"
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
