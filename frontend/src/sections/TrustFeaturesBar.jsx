import { motion } from 'framer-motion'
import { FiHeart, FiActivity, FiUsers, FiCompass } from 'react-icons/fi'

const FEATURES = [
  { icon: FiHeart, title: 'Personalized Care', text: 'Treatments tailored to your unique needs.' },
  { icon: FiActivity, title: 'Advanced Treatments', text: 'Modern techniques for long-lasting relief.' },
  { icon: FiUsers, title: 'Experienced Team', text: 'Skilled professionals who genuinely care.' },
  { icon: FiCompass, title: 'Whole-Person Approach', text: 'Treat the cause, not just the symptoms.' },
]

export default function TrustFeaturesBar() {
  return (
    <div className="container-app">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-soft border border-beige/70 grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-beige overflow-x-auto"
      >
        {FEATURES.map(({ icon: Icon, title, text }) => (
          <div key={title} className="p-6 flex flex-col items-center text-center gap-3">
            <span className="w-12 h-12 rounded-full border border-gold/40 text-gold flex items-center justify-center text-xl">
              <Icon />
            </span>
            <p className="font-serif text-base text-textMain">{title}</p>
            <p className="text-textSecondary text-xs leading-relaxed">{text}</p>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
