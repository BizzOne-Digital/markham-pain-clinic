import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import SectionLabel from '../components/SectionLabel.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import ServiceCardSkeleton from '../components/ServiceCardSkeleton.jsx'
import ErrorState from '../components/ErrorState.jsx'
import servicesApi from '../services/servicesApi'
import { PLACEHOLDER_SERVICES } from '../utils/placeholderData'

export default function ServicesPreview() {
  const [services, setServices] = useState(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let active = true
    servicesApi
      .getAll()
      .then((res) => {
        const data = res?.data?.data
        if (active) setServices(Array.isArray(data) && data.length ? data : PLACEHOLDER_SERVICES)
      })
      .catch(() => {
        // Fallback: backend unreachable, use local placeholder services
        if (active) {
          setFailed(true)
          setServices(PLACEHOLDER_SERVICES)
        }
      })
    return () => {
      active = false
    }
  }, [])

  return (
    <section className="section-padding bg-white">
      <div className="container-app">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <SectionLabel>Our Services</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-heading"
          >
            Comprehensive Care for Every Step of Your Recovery
          </motion.h2>
        </div>

        {failed && <ErrorState message="Live services unavailable — showing sample services." />}

        {services === null ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <ServiceCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <ServiceCard key={service._id || service.slug} service={service} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
