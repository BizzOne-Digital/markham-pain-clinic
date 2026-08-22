import { Link } from 'react-router-dom'
import { FiPhone, FiMail, FiMapPin, FiInstagram } from 'react-icons/fi'
import { CLINIC_INFO, PLACEHOLDER_SERVICES } from '../utils/placeholderData'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-darkCoffee text-beige">
      <div className="container-app py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <h3 className="font-serif text-xl text-white mb-3">
            Markham <span className="text-gold italic">Pain Clinic</span>
          </h3>
          <p className="text-sm text-beige/70 leading-relaxed">
            Evidence-based, personalized pain management and physiotherapy care dedicated to restoring
            movement and improving quality of life.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm uppercase tracking-wide mb-4">Quick Links</h4>
          <ul className="space-y-2.5 text-sm text-beige/70">
            {[
              ['Home', '/'],
              ['About Us', '/about'],
              ['Services', '/services'],
              ['Our Team', '/team'],
              ['Blog', '/blog'],
              ['Contact', '/contact'],
            ].map(([label, to]) => (
              <li key={to}>
                <Link to={to} className="hover:text-gold transition">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm uppercase tracking-wide mb-4">Our Services</h4>
          <ul className="space-y-2.5 text-sm text-beige/70">
            {PLACEHOLDER_SERVICES.map((service) => (
              <li key={service.slug}>
                <Link to={`/services/${service.slug}`} className="hover:text-gold transition">
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm uppercase tracking-wide mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-beige/70">
            <li className="flex items-center gap-2">
              <FiPhone className="text-gold" /> {CLINIC_INFO.phone}
            </li>
            <li className="flex items-center gap-2">
              <FiMail className="text-gold" /> {CLINIC_INFO.email}
            </li>
            <li className="flex items-start gap-2">
              <FiMapPin className="text-gold mt-0.5" /> {CLINIC_INFO.address}
            </li>
            <li>
              <a href={CLINIC_INFO.instagramUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-gold transition">
                <FiInstagram className="text-gold" /> {CLINIC_INFO.instagram}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-app py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-beige/60">
          <p>© {year} Markham Pain Clinic. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link to="/privacy-policy" className="hover:text-gold transition">
              Privacy Policy
            </Link>
            <Link to="/terms-conditions" className="hover:text-gold transition">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
