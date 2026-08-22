import { useEffect, useState } from 'react'
import SEO from '../components/SEO.jsx'
import SectionLabel from '../components/SectionLabel.jsx'
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
      <section className="section-padding bg-ivory text-center">
        <div className="container-app max-w-3xl mx-auto">
          <SectionLabel>TESTIMONIALS</SectionLabel>
          <h1 className="section-heading mb-6">Real Stories From Real Patients</h1>
          <p className="text-textSecondary leading-relaxed">
            Hear directly from patients who have experienced lasting relief and recovery through our
            personalized treatment plans.
          </p>
        </div>
      </section>
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
