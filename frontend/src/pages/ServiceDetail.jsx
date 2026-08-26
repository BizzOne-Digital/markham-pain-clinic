import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FiCheckCircle, FiArrowLeft } from 'react-icons/fi'
import SEO from '../components/SEO.jsx'
import Accordion from '../components/Accordion.jsx'
import AppointmentCTA from '../sections/AppointmentCTA.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import servicesApi from '../services/servicesApi'
import { PLACEHOLDER_SERVICES, PLACEHOLDER_FAQS } from '../utils/placeholderData'

export default function ServiceDetail() {
  const { slug } = useParams()
  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

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

      <section className="relative bg-darkCoffee">
        <div className="absolute inset-0">
          <img src={service.image} alt={service.name} className="w-full h-full object-cover opacity-40" />
        </div>
        <div className="relative container-app py-24 sm:py-32 text-center">
          <h1 className="font-serif text-3xl sm:text-5xl text-white">{service.name}</h1>
          <p className="text-beige/80 mt-4 max-w-xl mx-auto">{service.shortDescription}</p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-app grid lg:grid-cols-3 gap-14">
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="font-heading font-bold text-2xl text-textMain mb-4">Overview</h2>
              <p className="text-textSecondary leading-relaxed">{service.description}</p>
            </div>

            {service.benefits?.length > 0 && (
              <div>
                <h2 className="font-heading font-bold text-2xl text-textMain mb-4">Benefits</h2>
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
              <div>
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
              <div>
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
              <div>
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
          </div>

          <div>
            <div className="admin-card sticky top-24">
              <h3 className="font-heading font-bold text-xl text-textMain mb-4">Have Questions?</h3>
              <Accordion items={service.faqs?.length ? service.faqs : PLACEHOLDER_FAQS.slice(0, 3)} />
              <Link to="/contact" className="btn-primary w-full mt-6 justify-center">
                BOOK APPOINTMENT
              </Link>
            </div>
          </div>
        </div>
      </section>

      <AppointmentCTA />
    </>
  )
}
