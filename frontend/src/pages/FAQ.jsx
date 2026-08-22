import { useEffect, useState } from 'react'
import SEO from '../components/SEO.jsx'
import SectionLabel from '../components/SectionLabel.jsx'
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
      <section className="pt-16 sm:pt-20 pb-14 bg-white text-center">
        <div className="container-app max-w-2xl mx-auto">
          <SectionLabel>FAQ</SectionLabel>
          <h1 className="section-heading">Frequently Asked Questions</h1>
        </div>
      </section>
      <section className="section-padding bg-ivory pt-0">
        <div className="container-app max-w-3xl">
          <Accordion items={faqs} />
        </div>
      </section>
      <AppointmentCTA />
    </>
  )
}
