import { motion } from 'framer-motion'
import SectionLabel from '../components/SectionLabel.jsx'

const STEPS = [
  {
    num: '01',
    title: 'Make an Appointment',
    text: 'Visitors are directed to the online booking action or clinic contact channels to arrange a visit.',
    image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=800&auto=format&fit=crop',
  },
  {
    num: '02',
    title: 'Get a Consultation',
    text: 'The clinic begins with an assessment, discussion of concerns and review of relevant history.',
    image: 'https://images.unsplash.com/photo-1519824145371-296894a0daa9?q=80&w=800&auto=format&fit=crop',
  },
  {
    num: '03',
    title: 'Meet Our Therapist',
    text: 'Sessions focus on practical techniques, movement support and a plan built around the patient needs.',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop',
  },
  {
    num: '04',
    title: 'Follow-Up',
    text: 'Progress is tracked and the care plan is adjusted as needed to support continued improvement.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop',
  },
]

export default function TreatmentJourney() {
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
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white">Your Journey With Us</h2>
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
                <span className="inline-block font-serif text-gold text-sm tracking-widest">
                  STEP {step.num}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
