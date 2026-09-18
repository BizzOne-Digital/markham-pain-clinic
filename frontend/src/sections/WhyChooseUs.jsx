import { motion } from 'framer-motion'
import { FiTarget, FiBookOpen, FiAward, FiTool, FiSmile, FiTrendingUp } from 'react-icons/fi'
import SectionLabel from '../components/SectionLabel.jsx'

const FEATURES = [
  { icon: FiTarget, title: 'Personalized Treatment Plans', text: 'Every plan is built around your specific condition and goals.' },
  { icon: FiBookOpen, title: 'Evidence-Based Techniques', text: 'Modern, research-backed methods guide every treatment decision.' },
  { icon: FiAward, title: 'Experienced Professionals', text: 'Our clinicians bring years of specialized clinical expertise.' },
  { icon: FiTool, title: 'Modern Treatment Methods', text: 'We invest in advanced, effective approaches to recovery.' },
  { icon: FiSmile, title: 'Patient-Centered Care', text: 'You are heard, respected, and involved in every decision.' },
  { icon: FiTrendingUp, title: 'Long-Term Recovery Focus', text: 'We aim for lasting results, not just short-term relief.' },
]

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-white">
      <div className="container-app">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <SectionLabel>Why Choose Us</SectionLabel>
          <h2 className="section-heading">Why Patients Choose Markham Pain Clinic</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map(({ icon: Icon, title, text }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              className="p-7 rounded-2xl border border-beige/70 hover:border-gold/40 hover:shadow-card transition-all"
            >
              <span className="w-12 h-12 rounded-full bg-beige/60 text-darkCoffee flex items-center justify-center text-xl mb-4">
                <Icon />
              </span>
              <h3 className="font-serif text-lg text-textMain mb-2">{title}</h3>
              <p className="text-textSecondary text-sm leading-relaxed">{text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
