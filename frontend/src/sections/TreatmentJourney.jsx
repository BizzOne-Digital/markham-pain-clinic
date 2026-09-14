import { motion } from 'framer-motion'
import SectionLabel from '../components/SectionLabel.jsx'
import Button from '../components/Button.jsx'
import { CLINIC_INFO } from '../utils/placeholderData'

function getSteps(phone) {
  return [
    {
      num: '01',
      title: 'Make an Appointment',
      text: `Click "Book An Appointment," contact us at ${phone}, or email us to schedule your visit.`,
      image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=800&auto=format&fit=crop',
    },
    {
      num: '02',
      title: 'Get A Consultation',
      text: 'We begin with a detailed assessment, listening to your concerns, reviewing your medical history, and performing any necessary examinations to understand your situation fully.',
      image: 'https://images.unsplash.com/photo-1519824145371-296894a0daa9?q=80&w=800&auto=format&fit=crop',
    },
    {
      num: '03',
      title: 'Meet Our Therapist',
      text: 'Sessions focus on practical techniques to improve movement, address challenges, and build confidence in everyday activities.',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop',
    },
    {
      num: '04',
      title: 'Follow-Up',
      text: 'We track your progress and adjust your plan as needed to ensure steady improvement and support your ongoing recovery.',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop',
    },
  ]
}

export default function TreatmentJourney() {
  const STEPS = getSteps(CLINIC_INFO.phone)
  return (
    <section className="section-padding bg-darkCoffee relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-10">
        <img
          src="https://images.unsplash.com/photo-1519824145371-296894a0daa9?q=80&w=1600&auto=format&fit=crop"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="container-app relative">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <SectionLabel>Care Process</SectionLabel>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white mb-4">Your Journey With Us</h2>
          <p className="text-beige/90 leading-relaxed">
            We aim to make your physiotherapy journey clear and straightforward. Each consultation is
            structured to understand your needs and support your progress step by step.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-soft"
            >
              <div className="h-40 overflow-hidden bg-beige">
                <img
                  src={step.image}
                  alt={step.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="font-serif text-lg text-textMain mb-2">{step.title}</h3>
                <p className="text-textSecondary text-sm leading-relaxed mb-4">{step.text}</p>
                <span className="block font-heading font-extrabold text-4xl text-gray-300 leading-none">
                  Step {step.num}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button to="/contact">BOOK AN APPOINTMENT</Button>
        </div>
      </div>
    </section>
  )
}
