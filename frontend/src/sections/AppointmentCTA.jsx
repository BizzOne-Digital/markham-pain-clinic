import { motion } from 'framer-motion'
import Button from '../components/Button.jsx'
import { CLINIC_INFO } from '../utils/placeholderData'

export default function AppointmentCTA() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1519824145371-296894a0daa9?q=80&w=1600&auto=format&fit=crop"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-darkCoffee/95 via-darkCoffee/85 to-coffee/80" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative container-app text-center text-white max-w-2xl mx-auto"
      >
        <h2 className="font-serif text-3xl sm:text-4xl mb-4">Ready to Start Feeling Better?</h2>
        <p className="text-beige/90 mb-8 leading-relaxed">
          Take the first step toward better mobility, reduced pain and improved quality of life.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button to="/contact">BOOK AN APPOINTMENT</Button>
          <Button href={`tel:${CLINIC_INFO.phone.replace(/\s/g, '')}`} variant="outline-light">
            CALL {CLINIC_INFO.phone}
          </Button>
        </div>
      </motion.div>
    </section>
  )
}
