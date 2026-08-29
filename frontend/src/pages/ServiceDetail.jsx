import { useEffect, useState } from 'react'
import { useParams, Link, NavLink } from 'react-router-dom'
import { FiCheckCircle, FiArrowLeft } from 'react-icons/fi'
import SEO from '../components/SEO.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import servicesApi from '../services/servicesApi'
import { PLACEHOLDER_SERVICES } from '../utils/placeholderData'

export default function ServiceDetail() {
  const { slug } = useParams()
  const [service, setService] = useState(null)
  const [allServices, setAllServices] = useState(PLACEHOLDER_SERVICES)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    servicesApi
      .getAll()
      .then((res) => {
        const data = res?.data?.data
        if (Array.isArray(data) && data.length) setAllServices(data)
      })
      .catch(() => {
        // Fallback: keep default placeholder service list
      })
  }, [])

  useEffect(() => {
    let active = true
    setLoading(true)
    setNotFound(false)
    setService(null)

    servicesApi
      .getOne(slug)
      .then((res) => {
        const data = res?.data?.data || res?.data
        if (active && data) setService(data)
        else if (active) fallbackToLocal()
      })
      .catch(() => {
        if (active) fallbackToLocal()
      })
      .finally(() => active && setLoading(false))

    function fallbackToLocal() {
      // fallback: API failed or empty
      const local = PLACEHOLDER_SERVICES.find((s) => s.slug === slug)
      if (local) setService(local)
      else setNotFound(true)
    }

    return () => {
      active = false
    }
  }, [slug])

  if (loading) return <LoadingSpinner label="Loading service..." />

  if (notFound || !service) {
    return (
      <section className="section-padding container-app text-center">
        <h1 className="section-heading mb-4">Service Not Found</h1>
        <p className="text-textSecondary mb-8">We couldn't find the service you're looking for.</p>
        <Link to="/services" className="btn-primary inline-flex">
          <FiArrowLeft /> Back to Services
        </Link>
      </section>
    )
  }

  return (
    <>
      <SEO title={service.name} description={service.shortDescription} />

      <section className="section-padding bg-white">
        <div className="container-app grid lg:grid-cols-[280px_1fr] gap-10">
          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="bg-darkCoffee rounded-2xl overflow-hidden">
              <h2 className="font-heading font-bold text-white text-lg px-6 py-5 border-b border-white/10">
                Our Services
              </h2>
              <nav className="py-2">
                {allServices.map((s) => (
                  <NavLink
                    key={s._id || s.slug}
                    to={`/services/${s.slug}`}
                    className={({ isActive }) =>
                      `block px-6 py-2.5 text-sm font-semibold border-b border-white/5 last:border-0 transition ${
                        isActive || s.slug === slug ? 'text-gold bg-white/5' : 'text-beige/90 hover:text-gold'
                      }`
                    }
                  >
                    {s.name}
                  </NavLink>
                ))}
              </nav>
            </div>

            <div className="admin-card mt-6">
              <h3 className="font-heading font-bold text-lg text-textMain mb-2">Need Help?</h3>
              <p className="text-textSecondary text-sm mb-4">Contact our team for professional guidance.</p>
              <Link to="/contact" className="btn-primary w-full justify-center">
                BOOK APPOINTMENT
              </Link>
            </div>
          </aside>

          <article>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl text-textMain mb-6">{service.name}</h1>

            <p className="text-textSecondary leading-relaxed mb-8">{service.description}</p>

            {service.image && (
              <div className="rounded-2xl overflow-hidden mb-8 aspect-video">
                <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
              </div>
            )}

            <h2 className="font-heading font-bold text-2xl text-textMain mb-4">What is {service.name}?</h2>
            <p className="text-textSecondary leading-relaxed mb-8">{service.shortDescription}</p>

            {service.benefits?.length > 0 && (
              <div className="mb-8">
                <h2 className="font-heading font-bold text-2xl text-textMain mb-4">
                  How {service.name} Supports Your Recovery
                </h2>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {service.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-textMain text-sm">
                      <FiCheckCircle className="text-gold flex-shrink-0" /> {b}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {service.whoCanBenefit?.length > 0 && (
              <div className="mb-8">
                <h2 className="font-heading font-bold text-2xl text-textMain mb-4">Who Can Benefit</h2>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {service.whoCanBenefit.map((w) => (
                    <li key={w} className="flex items-center gap-2 text-textMain text-sm">
                      <FiCheckCircle className="text-gold flex-shrink-0" /> {w}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {service.conditionsTreated?.length > 0 && (
              <div className="mb-8">
                <h2 className="font-heading font-bold text-2xl text-textMain mb-4">Conditions Treated</h2>
                <div className="flex flex-wrap gap-3">
                  {service.conditionsTreated.map((c) => (
                    <span key={c} className="bg-beige/50 text-darkCoffee text-sm px-4 py-2 rounded-full">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {service.treatmentProcess?.length > 0 && (
              <div className="mb-8">
                <h2 className="font-heading font-bold text-2xl text-textMain mb-4">Our Process</h2>
                <ol className="space-y-4">
                  {service.treatmentProcess.map((step, i) => (
                    <li key={step} className="flex gap-4 items-start">
                      <span className="w-8 h-8 rounded-full bg-gold text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-textSecondary pt-1">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </article>
        </div>
      </section>
    </>
  )
}
