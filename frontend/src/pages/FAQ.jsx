import { useEffect, useState } from 'react'
import SEO from '../components/SEO.jsx'
import PageBanner from '../components/PageBanner.jsx'
import Accordion from '../components/Accordion.jsx'
import AppointmentCTA from '../sections/AppointmentCTA.jsx'
import faqsApi from '../services/faqsApi'
import { PLACEHOLDER_FAQS } from '../utils/placeholderData'

export default function FAQ() {
  const [faqs, setFaqs] = useState(PLACEHOLDER_FAQS)

  useEffect(() => {
    let active = true
    faqsApi
      .getAll()
      .then((res) => {
        const data = res?.data?.data
        if (active && Array.isArray(data) && data.length) setFaqs(data)
      })
      .catch(() => {
        // Fallback: keep default placeholder FAQs
      })
    return () => {
      active = false
    }
  }, [])

  return (
    <>
      <SEO title="FAQ" description="Answers to common questions about appointments, treatments and what to expect at Markham Pain Clinic." />
      <PageBanner title="Frequently Asked Questions" crumb="FAQ" />
      <section className="section-padding bg-ivory">
        <div className="container-app max-w-3xl">
          <Accordion items={faqs} />
        </div>
      </section>
      <AppointmentCTA />
    </>
  )
}
