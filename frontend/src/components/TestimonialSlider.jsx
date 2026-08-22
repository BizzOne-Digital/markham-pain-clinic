import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

export default function TestimonialSlider({ testimonials }) {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  function go(newDirection) {
    setDirection(newDirection)
    setIndex((prev) => (prev + newDirection + testimonials.length) % testimonials.length)
  }

  if (!testimonials.length) return null
  const current = testimonials[index]

  return (
    <div className="relative max-w-3xl mx-auto text-center px-4">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current._id || index}
          custom={direction}
          initial={{ opacity: 0, x: direction * 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -direction * 40 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          <div className="flex justify-center gap-1 mb-5 text-gold">
            {Array.from({ length: 5 }).map((_, i) => (
              <FiStar key={i} className={i < (current.rating || 5) ? 'fill-gold' : 'opacity-30'} />
            ))}
          </div>
          <p className="font-serif text-lg sm:text-2xl text-textMain leading-relaxed italic mb-6">
            &ldquo;{current.testimonial}&rdquo;
          </p>
          <p className="text-darkCoffee font-semibold">{current.name}</p>
          {current.serviceCategory && <p className="text-textSecondary text-sm">{current.serviceCategory}</p>}
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center items-center gap-6 mt-10">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous testimonial"
          className="w-10 h-10 rounded-full border border-beige flex items-center justify-center text-darkCoffee hover:bg-gold hover:text-white hover:border-gold transition"
        >
          <FiChevronLeft />
        </button>
        <div className="flex gap-2">
          {testimonials.map((t, i) => (
            <button
              key={t._id || i}
              type="button"
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => {
                setDirection(i > index ? 1 : -1)
                setIndex(i)
              }}
              className={`w-2 h-2 rounded-full transition-all ${i === index ? 'bg-gold w-6' : 'bg-beige'}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next testimonial"
          className="w-10 h-10 rounded-full border border-beige flex items-center justify-center text-darkCoffee hover:bg-gold hover:text-white hover:border-gold transition"
        >
          <FiChevronRight />
        </button>
      </div>
    </div>
  )
}
