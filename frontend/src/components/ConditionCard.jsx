import { motion } from 'framer-motion'
import { FiActivity } from 'react-icons/fi'

export default function ConditionCard({ condition, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="bg-white rounded-xl border border-beige/60 shadow-card p-6 flex items-center gap-3 hover:border-gold hover:shadow-soft transition"
    >
      <span className="text-gold text-xl flex-shrink-0">
        <FiActivity />
      </span>
      <span className="font-serif text-textMain text-base">{condition.name}</span>
    </motion.div>
  )
}
