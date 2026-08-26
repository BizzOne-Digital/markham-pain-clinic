import { useRef, useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { FiChevronDown } from 'react-icons/fi'

export default function NavDropdown({ label, items, columns = 1 }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const widthClass = columns === 3 ? 'min-w-[640px]' : columns === 2 ? 'min-w-[440px]' : 'min-w-[220px]'
  const gridClass = columns === 3 ? 'grid-cols-3' : columns === 2 ? 'grid-cols-2' : 'grid-cols-1'

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 text-base font-bold uppercase tracking-wide text-beige/90 hover:text-gold transition"
      >
        {label}
        <FiChevronDown className={`text-sm transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            className={`absolute left-0 top-full pt-2 ${widthClass} z-50`}
          >
            <div className={`bg-white rounded-lg shadow-soft border-t-4 border-gold p-3 grid ${gridClass} gap-x-6`}>
              {items.map((item) => (
                <NavLink
                  key={item.to + item.label}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block px-2 py-2.5 text-[13px] font-bold uppercase tracking-wide border-b border-beige/70 transition ${
                      isActive ? 'text-gold' : 'text-darkCoffee hover:text-gold'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
