import { useEffect, useState } from 'react'
import SectionLabel from '../components/SectionLabel.jsx'
import Accordion from '../components/Accordion.jsx'
import Button from '../components/Button.jsx'
import faqsApi from '../services/faqsApi'
import { PLACEHOLDER_FAQS } from '../utils/placeholderData'

export default function FAQPreview() {
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
    <section className="section-padding bg-ivory">
      <div className="container-app max-w-3xl">
        <div className="text-center mb-12">
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="section-heading">Frequently Asked Questions</h2>
        </div>
        <Accordion items={faqs.slice(0, 6)} />
        <div className="text-center mt-10">
          <Button to="/faq" variant="secondary">
            VIEW ALL FAQS
          </Button>
        </div>
      </div>
    </section>
  )
}
