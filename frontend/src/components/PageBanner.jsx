import { Link } from 'react-router-dom'
import { FiChevronRight } from 'react-icons/fi'

export default function PageBanner({ title, crumb }) {
  return (
    <section className="relative bg-darkCoffee py-16 sm:py-20 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <img
          src="https://images.unsplash.com/photo-1519824145371-296894a0daa9?q=80&w=1600&auto=format&fit=crop"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative container-app text-center">
        <h1 className="font-serif text-3xl sm:text-4xl text-white mb-3">{title}</h1>
        <nav className="flex items-center justify-center gap-2 text-sm text-beige/80">
          <Link to="/" className="hover:text-gold transition">
            Home
          </Link>
          <FiChevronRight size={14} />
          <span className="text-gold">{crumb || title}</span>
        </nav>
      </div>
    </section>
  )
}
