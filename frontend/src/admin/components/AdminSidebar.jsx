import { NavLink } from 'react-router-dom'
import {
  FiGrid, FiHome, FiLayers, FiUsers, FiStar, FiFileText, FiHelpCircle,
  FiBarChart2, FiActivity, FiPhoneCall, FiMail, FiSettings, FiLogOut,
} from 'react-icons/fi'
import useAuth from '../../hooks/useAuth'

const LINKS = [
  { label: 'Dashboard', to: '/admin/dashboard', icon: FiGrid },
  { label: 'Homepage', to: '/admin/homepage', icon: FiHome },
  { label: 'Services', to: '/admin/services', icon: FiLayers },
  { label: 'Conditions', to: '/admin/conditions', icon: FiActivity },
  { label: 'Team', to: '/admin/team', icon: FiUsers },
  { label: 'Testimonials', to: '/admin/testimonials', icon: FiStar },
  { label: 'Blog', to: '/admin/blog', icon: FiFileText },
  { label: 'FAQ', to: '/admin/faq', icon: FiHelpCircle },
  { label: 'Statistics', to: '/admin/statistics', icon: FiBarChart2 },
  { label: 'Contact Details', to: '/admin/settings', icon: FiPhoneCall },
  { label: 'Enquiries', to: '/admin/enquiries', icon: FiMail },
  { label: 'Website Settings', to: '/admin/website-settings', icon: FiSettings },
]

export default function AdminSidebar({ open, onClose }) {
  const { logout } = useAuth()

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={onClose} />}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-darkCoffee text-beige flex flex-col z-50 transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="px-6 py-6 border-b border-white/10">
          <p className="font-serif text-lg text-white">
            Markham <span className="text-gold italic">Admin</span>
          </p>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {LINKS.map(({ label, to, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                  isActive ? 'bg-gold text-white' : 'text-beige/80 hover:bg-white/10'
                }`
              }
            >
              <Icon className="text-base flex-shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-white/10">
          <button
            type="button"
            onClick={logout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-beige/80 hover:bg-white/10 transition"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </aside>
    </>
  )
}
