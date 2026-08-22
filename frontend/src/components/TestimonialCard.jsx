import { motion } from 'framer-motion'
import { FiStar } from 'react-icons/fi'

export default function TestimonialCard({ testimonial, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="card p-6 flex flex-col"
    >
      <div className="flex gap-1 text-gold mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <FiStar key={i} className={i < (testimonial.rating || 5) ? 'fill-gold' : 'opacity-30'} />
        ))}
      </div>
      <p className="text-textMain text-sm leading-relaxed italic mb-5 flex-1">&ldquo;{testimonial.testimonial}&rdquo;</p>
      <div className="flex items-center gap-3 pt-4 border-t border-beige">
        {testimonial.photo && (
          <img src={testimonial.photo} alt={testimonial.name} className="w-10 h-10 rounded-full object-cover" />
        )}
        <div>
          <p className="text-darkCoffee font-semibold text-sm">{testimonial.name}</p>
          {testimonial.serviceCategory && <p className="text-textSecondary text-xs">{testimonial.serviceCategory}</p>}
        </div>
      </div>
    </motion.div>
  )
}
