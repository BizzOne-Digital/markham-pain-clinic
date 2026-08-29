import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function TeamCard({ member, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="card p-6"
    >
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 border-2 border-gold/40">
          <img src={member.photo} alt={member.name} loading="lazy" className="w-full h-full object-cover" />
        </div>
        <div>
          <h3 className="font-heading font-bold text-lg text-textMain">{member.name}</h3>
          <span className="inline-block bg-beige/60 text-darkCoffee text-xs font-semibold px-3 py-1 rounded-full mt-1">
            {member.role}
          </span>
        </div>
      </div>
      <hr className="border-beige my-4" />
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-semibold text-textSecondary">{member.specialization}</span>
        <Link to={`/team/${member.slug}`} className="btn-primary !py-2 !px-4 !text-xs whitespace-nowrap">
          View Profile
        </Link>
      </div>
    </motion.div>
  )
}
