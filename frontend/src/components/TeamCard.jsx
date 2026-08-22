import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function TeamCard({ member, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="card text-center group"
    >
      <div className="overflow-hidden h-72">
        <img
          src={member.photo}
          alt={member.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <h3 className="font-serif text-lg text-textMain mb-1">{member.name}</h3>
        <p className="text-gold text-sm font-semibold mb-1">{member.role}</p>
        <p className="text-textSecondary text-xs mb-4">{member.specialization}</p>
        <Link to={`/team/${member.slug}`} className="text-sm font-semibold link-underline text-darkCoffee">
          View Profile
        </Link>
      </div>
    </motion.div>
  )
}
