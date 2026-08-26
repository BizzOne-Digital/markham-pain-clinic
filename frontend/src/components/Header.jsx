import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { FiMenu, FiX, FiPhone, FiMail, FiInstagram, FiChevronDown } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import useScrollPosition from '../hooks/useScrollPosition'
import NavDropdown from './NavDropdown.jsx'
import { CLINIC_INFO } from '../utils/placeholderData'

const ABOUT_ITEMS = [
  { label: 'Our Clinic', to: '/about' },
  { label: 'Our Team', to: '/team' },
]

const SERVICE_ITEMS = [
  { label: 'Physiotherapy', to: '/services/physiotherapy' },
  { label: 'Chronic Pain Management', to: '/services/chronic-pain-management' },
  { label: 'Sports Injury Rehabilitation', to: '/services/sports-injury-rehabilitation' },
  { label: 'Manual Therapy', to: '/services/manual-therapy' },
  { label: 'Chiropractic Care', to: '/services/chiropractic-care' },
  { label: 'Massage Therapy', to: '/services/massage-therapy' },
  { label: 'Acupuncture', to: '/services/acupuncture' },
  { label: 'Cupping Therapy', to: '/services/cupping-therapy' },
  { label: 'Dry Needling', to: '/services/dry-needling' },
  { label: 'Spinal Manipulation/Adjustment', to: '/services/spinal-manipulationadjustment' },
  { label: 'Electrotherapeutic Modalities', to: '/services/electrotherapeutic-modalities' },
  { label: 'Dancer Rehabilitation', to: '/services/dancer-rehabilitation' },
  { label: 'Myofascial Release', to: '/services/myofascial-release' },
  { label: 'Vestibular Therapy', to: '/services/vestibular-therapy' },
  { label: 'McKenzie Method', to: '/services/mckenzie-method' },
  { label: 'Soft Tissue Release', to: '/services/soft-tissue-release' },
  { label: 'Relaxation Method', to: '/services/relaxation-method' },
  { label: 'Therapeutic Exercise', to: '/services/therapeutic-exercise' },
  { label: 'Return to Work/Play', to: '/services/return-to-workplay' },
  { label: 'Trigger Point Release', to: '/services/trigger-point-release' },
  { label: 'Deep Tissue Massage', to: '/services/deep-tissue-massage' },
  { label: 'Psychological Services', to: '/services/psychological-services' },
  { label: 'View All Services', to: '/services' },
]

const CONDITION_ITEMS = [
  { label: 'Back Pain', to: '/conditions' },
  { label: 'Neck Pain', to: '/conditions' },
  { label: 'Shoulder Pain', to: '/conditions' },
  { label: 'Knee Pain', to: '/conditions' },
  { label: 'Sports Injuries', to: '/conditions' },
  { label: 'Muscle Strains', to: '/conditions' },
  { label: 'Joint Pain', to: '/conditions' },
  { label: 'Sciatica', to: '/conditions' },
  { label: 'Postural Issues', to: '/conditions' },
  { label: 'Chronic Pain', to: '/conditions' },
  { label: 'Mobility Problems', to: '/conditions' },
  { label: 'Workplace Injuries', to: '/conditions' },
]

const PRODUCT_ITEMS = [
  { label: 'Braces', to: '/products' },
  { label: 'Massager', to: '/products' },
  { label: 'TENS Unit', to: '/products' },
  { label: 'Pain Relief Creams', to: '/products' },
  { label: 'Hot and Cold Pack', to: '/products' },
  { label: 'Custom Made Orthotics', to: '/products' },
  { label: 'Posture Corrector Brace', to: '/products' },
]

const SIMPLE_LINKS = [
  { label: "FAQ's", to: '/faq' },
  { label: 'Blogs', to: '/blog' },
  { label: 'Social Service', to: '/social-service' },
  { label: 'Contact Us', to: '/contact' },
]

const whatsappUrl = `https://wa.me/${CLINIC_INFO.phone.replace(/[^\d]/g, '')}`

export default function Header() {
  const scrolled = useScrollPosition(20)
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50">
      <div className="hidden md:flex bg-darkCoffee text-xs text-beige/90">
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
        className={`bg-darkCoffee transition-all duration-300 ${
          scrolled ? 'shadow-soft py-2' : 'py-3'
        }`}
      >
        <div className="container-app flex items-center justify-between gap-4">
          <NavLink to="/" className="font-serif text-lg sm:text-xl text-white font-semibold tracking-tight flex-shrink-0">
            Markham <span className="text-gold italic">Pain Clinic</span>
          </NavLink>

          <nav className="hidden xl:flex items-center gap-5 ml-6">
            <NavLink
              to="/"
              end
              className={({ isActive }) => `text-base font-bold uppercase tracking-wide ${isActive ? 'text-gold' : 'text-beige/90 hover:text-gold'}`}
            >
              Home
            </NavLink>
            <NavDropdown label="About Us" items={ABOUT_ITEMS} />
            <NavDropdown label="Services" items={SERVICE_ITEMS} columns={2} />
            <NavDropdown label="Conditions" items={CONDITION_ITEMS} columns={3} />
            <NavDropdown label="Products" items={PRODUCT_ITEMS} />
            {SIMPLE_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => `text-base font-bold uppercase tracking-wide ${isActive ? 'text-gold' : 'text-beige/90 hover:text-gold'}`}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden xl:flex items-center gap-3 flex-shrink-0">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 text-white font-bold text-xs uppercase tracking-wide px-4 py-2.5 rounded-full hover:bg-green-600 transition whitespace-nowrap"
            >
              <FaWhatsapp size={16} /> WhatsApp
            </a>
            <NavLink to="/contact" className="btn-primary !py-2.5 !px-5 !text-xs whitespace-nowrap">
              BOOK APPOINTMENT
            </NavLink>
          </div>

          <button
            type="button"
            className="xl:hidden text-2xl text-white"
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
              className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-darkCoffee z-[70] shadow-soft p-6 flex flex-col overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="font-serif text-lg text-white">Menu</span>
                <button type="button" onClick={() => setOpen(false)} className="text-2xl text-white" aria-label="Close menu">
                  <FiX />
                </button>
              </div>
              <nav className="flex flex-col gap-1">
                <NavLink to="/" end onClick={() => setOpen(false)} className="py-2 text-base font-medium text-beige/90">
                  Home
                </NavLink>

                <MobileGroup label="About Us" items={ABOUT_ITEMS} onNavigate={() => setOpen(false)} />
                <MobileGroup label="Services" items={SERVICE_ITEMS} onNavigate={() => setOpen(false)} />
                <MobileGroup label="Conditions" items={CONDITION_ITEMS} onNavigate={() => setOpen(false)} />
                <MobileGroup label="Products" items={PRODUCT_ITEMS} onNavigate={() => setOpen(false)} />

                {SIMPLE_LINKS.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className="py-2 text-base font-medium text-beige/90"
                  >
                    {link.label}
                  </NavLink>
                ))}

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2 text-base font-medium text-beige/90 flex items-center gap-2"
                >
                  <FaWhatsapp className="text-green-400" /> WhatsApp
                </a>
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

function MobileGroup({ label, items, onNavigate }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-white/10">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-2 text-base font-medium text-beige/90"
      >
        {label}
        <FiChevronDown className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden pl-4"
          >
            {items.map((item) => (
              <NavLink
                key={item.to + item.label}
                to={item.to}
                onClick={onNavigate}
                className="block py-2 text-sm text-beige/80"
              >
                {item.label}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
