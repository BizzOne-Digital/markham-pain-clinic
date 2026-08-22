import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { FiMenu, FiX, FiPhone, FiMail, FiInstagram } from 'react-icons/fi'
import useScrollPosition from '../hooks/useScrollPosition'
import { CLINIC_INFO } from '../utils/placeholderData'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Our Team', to: '/team' },
  { label: 'Blog', to: '/blog' },
  { label: 'Testimonials', to: '/testimonials' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
]

export default function Header() {
  const scrolled = useScrollPosition(20)
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50">
      <div className="hidden md:flex bg-beige/70 text-xs text-darkCoffee">
        <div className="container-app flex justify-between items-center py-2">
          <div className="flex items-center gap-6">
            <a href={`tel:${CLINIC_INFO.phone.replace(/\s/g, '')}`} className="flex items-center gap-1.5 hover:text-gold transition">
              <FiPhone /> {CLINIC_INFO.phone}
            </a>
            <a href={`mailto:${CLINIC_INFO.email}`} className="flex items-center gap-1.5 hover:text-gold transition">
              <FiMail /> {CLINIC_INFO.email}
            </a>
          </div>
          <a href={CLINIC_INFO.instagramUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-gold transition">
            <FiInstagram /> {CLINIC_INFO.instagram}
          </a>
        </div>
      </div>

      <div
        className={`bg-white/95 backdrop-blur-md transition-all duration-300 ${
          scrolled ? 'shadow-soft py-2' : 'py-4'
        }`}
      >
        <div className="container-app flex items-center justify-between">
          <NavLink to="/" className="font-serif text-xl sm:text-2xl text-darkCoffee font-semibold tracking-tight">
            Markham <span className="text-gold italic">Pain Clinic</span>
          </NavLink>

          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `text-sm font-medium tracking-wide link-underline ${
                    isActive ? 'text-gold' : 'text-textMain hover:text-gold'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:block">
            <NavLink to="/contact" className="btn-primary !py-2.5 !px-6 !text-xs">
              BOOK APPOINTMENT
            </NavLink>
          </div>

          <button
            type="button"
            className="lg:hidden text-2xl text-darkCoffee"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <FiMenu />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-[60]"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-[80%] max-w-sm bg-ivory z-[70] shadow-soft p-6 flex flex-col"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="font-serif text-lg text-darkCoffee">Menu</span>
                <button type="button" onClick={() => setOpen(false)} className="text-2xl text-darkCoffee" aria-label="Close menu">
                  <FiX />
                </button>
              </div>
              <nav className="flex flex-col gap-5">
                {NAV_LINKS.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === '/'}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) => `text-base font-medium ${isActive ? 'text-gold' : 'text-textMain'}`}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>
              <NavLink to="/contact" onClick={() => setOpen(false)} className="btn-primary mt-8 justify-center">
                BOOK APPOINTMENT
              </NavLink>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
