import { motion } from 'framer-motion'
import Button from '../components/Button.jsx'
import TrustFeaturesBar from './TrustFeaturesBar.jsx'

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-10 sm:pt-14 pb-24 sm:pb-28 lg:pb-40 min-h-[560px] sm:min-h-[640px] lg:min-h-[720px] flex items-center">
      <div className="absolute inset-0 bg-darkCoffee">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/banner.webm" type="video/webm" />
        </video>
        {/* Dark overlay so text stays readable over any part of the moving video */}
        <div className="absolute inset-0 bg-darkCoffee/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-darkCoffee/60 via-transparent to-transparent" />
      </div>

      <div className="relative w-full pl-6 pr-6 sm:pl-12 sm:pr-12 lg:pl-20 lg:pr-0">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md"
        >
          <span className="section-label !text-gold">Welcome to Markham Pain Clinic</span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-[3.4rem] leading-[1.35] text-white mt-4 space-y-1">
            <span className="block">Evidence-Based</span>
            <span className="block">Pain Relief.</span>
            <span className="block italic text-gold font-serif mt-1">Restoring Life.</span>
          </h1>
          <p className="text-beige/90 text-base sm:text-lg mt-6 max-w-sm leading-relaxed">
            Advanced, personalized and non-surgical treatment solutions designed to help you move
            better, feel stronger and live with less pain.
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-8">
            <Button to="/contact">BOOK APPOINTMENT</Button>
          </div>
        </motion.div>
      </div>

      <div className="absolute left-0 right-0 bottom-0 translate-y-1/2 px-4">
        <TrustFeaturesBar />
      </div>
    </section>
  )
}
