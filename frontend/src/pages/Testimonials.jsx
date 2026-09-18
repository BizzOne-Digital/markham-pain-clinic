import { useEffect, useState } from 'react'
import SEO from '../components/SEO.jsx'
import PageBanner from '../components/PageBanner.jsx'
import TestimonialCard from '../components/TestimonialCard.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import AppointmentCTA from '../sections/AppointmentCTA.jsx'
import testimonialsApi from '../services/testimonialsApi'
import { PLACEHOLDER_TESTIMONIALS } from '../utils/placeholderData'

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState(PLACEHOLDER_TESTIMONIALS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    testimonialsApi
      .getAll()
      .then((res) => {
        const data = res?.data?.data || res?.data
        if (active && Array.isArray(data) && data.length) setTestimonials(data)
      })
      .catch(() => {
        // fallback: API failed or empty
      })
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [])

  return (
    <>
      <SEO
        title="Testimonials"
        description="Read real patient testimonials about their pain relief and recovery experience at Markham Pain Clinic."
      />
      <PageBanner title="Testimonials" crumb="Testimonials" />
      <section className="section-padding bg-white">
        <div className="container-app">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <TestimonialCard key={t._id || i} testimonial={t} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
      <AppointmentCTA />
    </>
  )
}
