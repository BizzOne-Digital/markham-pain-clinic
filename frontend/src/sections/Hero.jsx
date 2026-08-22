import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlay, FiX } from 'react-icons/fi'
import Button from '../components/Button.jsx'
import TrustFeaturesBar from './TrustFeaturesBar.jsx'

export default function Hero() {
  const [videoOpen, setVideoOpen] = useState(false)

  return (
    <section className="relative overflow-hidden pt-10 sm:pt-14 pb-24 sm:pb-28 lg:pb-40 min-h-[560px] sm:min-h-[640px] lg:min-h-[720px] flex items-center">
      <div className="absolute inset-0">
        <img
          src="/hero.png"
          alt="Woman doing a core exercise on a mat in a bright studio"
          className="w-full h-full object-cover"
        />
        {/* Mobile/tablet: fuller overlay so text stays readable over the whole image */}
        <div className="absolute inset-0 bg-gradient-to-b from-ivory/95 via-ivory/85 to-ivory/60 lg:hidden" />
        {/* Desktop: left-side fade only, image stays fully clear on the right */}
        <div className="absolute inset-0 hidden lg:block bg-gradient-to-r from-ivory from-25% via-ivory/70 via-35% to-transparent to-50%" />
      </div>

      <div className="relative w-full pl-6 pr-6 sm:pl-12 sm:pr-12 lg:pl-20 lg:pr-0">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md"
        >
          <span className="section-label">Welcome to Markham Pain Clinic</span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-[3.4rem] leading-[1.1] text-textMain mt-3">
            Evidence-Based
            <br />
            Pain Relief.
            <br />
            <span className="gold-italic">Restoring Life.</span>
          </h1>
          <p className="text-textSecondary text-base sm:text-lg mt-6 max-w-sm leading-relaxed">
            Advanced, personalized and non-surgical treatment solutions designed to help you move
            better, feel stronger and live with less pain.
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-8">
            <Button to="/contact">BOOK APPOINTMENT</Button>
            <button
              type="button"
              onClick={() => setVideoOpen(true)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-darkCoffee hover:text-gold transition"
            >
              <span className="w-10 h-10 rounded-full border border-darkCoffee/30 flex items-center justify-center">
                <FiPlay />
              </span>
              WATCH OUR VIDEO
            </button>
          </div>
        </motion.div>
      </div>

      <div className="absolute left-0 right-0 bottom-0 translate-y-1/2 px-4">
        <TrustFeaturesBar />
      </div>

      <AnimatePresence>
        {videoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-6"
            onClick={() => setVideoOpen(false)}
          >
            <div className="relative w-full max-w-3xl aspect-video bg-black rounded-xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => setVideoOpen(false)}
                className="absolute top-3 right-3 text-white text-2xl z-10"
                aria-label="Close video"
              >
                <FiX />
              </button>
              <div className="w-full h-full flex items-center justify-center text-white/70 text-sm">
                Video placeholder — add your clinic tour video here.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
