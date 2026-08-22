import { motion } from 'framer-motion'
import SectionLabel from '../components/SectionLabel.jsx'

const STEPS = [
  { num: '01', title: 'Consultation', text: 'Understand symptoms, concerns and goals.' },
  { num: '02', title: 'Assessment', text: 'Complete physical and mobility assessment.' },
  { num: '03', title: 'Personalized Plan', text: 'Create a customized treatment strategy.' },
  { num: '04', title: 'Treatment', text: 'Begin evidence-based treatment.' },
  { num: '05', title: 'Recovery', text: 'Track progress and improve long-term mobility.' },
]

export default function TreatmentJourney() {
  return (
    <section className="section-padding bg-beige/40">
      <div className="container-app">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <SectionLabel>The Process</SectionLabel>
          <h2 className="section-heading">Your Journey to Feeling Better</h2>
        </div>

        <div className="relative grid sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-6">
          <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-px bg-gold/30" />
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative text-center"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-white border border-gold/40 shadow-card flex items-center justify-center font-serif text-xl text-gold mb-5 relative z-10">
                {step.num}
              </div>
              <h3 className="font-serif text-lg text-textMain mb-2">{step.title}</h3>
              <p className="text-textSecondary text-sm leading-relaxed">{step.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
