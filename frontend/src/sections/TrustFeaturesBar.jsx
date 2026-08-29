import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiHeart, FiActivity, FiUsers, FiMapPin } from 'react-icons/fi'
import { CLINIC_INFO } from '../utils/placeholderData'

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CLINIC_INFO.address)}`

const FEATURES = [
  { icon: FiHeart, title: 'Personalized Care', text: 'Treatments tailored to your unique needs.', to: '/contact' },
  { icon: FiActivity, title: 'Advanced Treatments', text: 'Modern techniques for long-lasting relief.', to: '/services' },
  { icon: FiUsers, title: 'Experienced Team', text: 'Skilled professionals who genuinely care.', to: '/team' },
  { icon: FiMapPin, title: 'Whole-Person Approach', text: 'Treat the cause, not just the symptoms.', href: mapsUrl },
]

export default function TrustFeaturesBar() {
  return (
    <div className="container-app">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-xl lg:rounded-2xl shadow-soft border border-beige/70 grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-beige overflow-x-auto"
      >
        {FEATURES.map(({ icon: Icon, title, text, to, href }) => {
          const content = (
            <>
              <span className="w-8 h-8 sm:w-9 sm:h-9 lg:w-12 lg:h-12 rounded-full border border-gold/40 text-gold flex items-center justify-center text-sm sm:text-base lg:text-xl">
                <Icon />
              </span>
              <p className="font-heading font-bold text-xs sm:text-sm lg:text-base text-textMain leading-tight">{title}</p>
              <p className="hidden sm:block text-textSecondary text-[11px] lg:text-xs leading-snug">{text}</p>
            </>
          )
          const className = 'p-3 sm:p-4 lg:p-6 flex flex-col items-center text-center gap-1.5 lg:gap-3 hover:bg-beige/30 transition-colors cursor-pointer'
          return href ? (
            <a key={title} href={href} target="_blank" rel="noreferrer" className={className}>
              {content}
            </a>
          ) : (
            <Link key={title} to={to} className={className}>
              {content}
            </Link>
          )
        })}
      </motion.div>
    </div>
  )
}
