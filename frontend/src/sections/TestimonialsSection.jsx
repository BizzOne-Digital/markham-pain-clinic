import { useEffect, useState } from 'react'
import SectionLabel from '../components/SectionLabel.jsx'
import TestimonialSlider from '../components/TestimonialSlider.jsx'
import testimonialsApi from '../services/testimonialsApi'
import { PLACEHOLDER_TESTIMONIALS } from '../utils/placeholderData'

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState(PLACEHOLDER_TESTIMONIALS)

  useEffect(() => {
    let active = true
    testimonialsApi
      .getAll()
      .then((res) => {
        const data = res?.data?.data
        if (active && Array.isArray(data) && data.length) setTestimonials(data)
      })
      .catch(() => {
        // Fallback: keep default placeholder testimonials
      })
    return () => {
      active = false
    }
  }, [])

  return (
    <section className="section-padding bg-beige/40">
      <div className="container-app">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <SectionLabel>Social Proof</SectionLabel>
          <h2 className="section-heading mb-4">Excellence Reflected in Feedback</h2>
          <p className="text-textSecondary leading-relaxed">
            See what our patients say about their journey and how our care has helped them move with
            confidence.
          </p>
        </div>
        <TestimonialSlider testimonials={testimonials} />
      </div>
    </section>
  )
}
