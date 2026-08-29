import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'

export default function ServiceCard({ service, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="card group"
    >
      <div className="overflow-hidden h-56">
        <img
          src={service.image}
          alt={service.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <h3 className="font-heading font-bold text-xl text-textMain mb-2">{service.name}</h3>
        <p className="text-textSecondary text-sm leading-relaxed mb-4">{service.shortDescription}</p>
        <Link
          to={`/services/${service.slug}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-darkCoffee transition group/link"
        >
          Learn More
          <FiArrowRight className="group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  )
}
