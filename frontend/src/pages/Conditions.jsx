import { useEffect, useState } from 'react'
import SEO from '../components/SEO.jsx'
import PageBanner from '../components/PageBanner.jsx'
import AppointmentCTA from '../sections/AppointmentCTA.jsx'
import conditionsApi from '../services/conditionsApi'
import { PLACEHOLDER_CONDITIONS } from '../utils/placeholderData'

export default function Conditions() {
  const [conditions, setConditions] = useState(PLACEHOLDER_CONDITIONS)

  useEffect(() => {
    let active = true
    conditionsApi
      .getAll()
      .then((res) => {
        const data = res?.data?.data
        if (active && Array.isArray(data) && data.length) setConditions(data)
      })
      .catch(() => {
        // Fallback: keep default placeholder conditions
      })
    return () => {
      active = false
    }
  }, [])

  return (
    <>
      <SEO title="Conditions Treated" description="Conditions treated at Markham Pain Clinic including back pain, sports injuries, sciatica and more." />
      <PageBanner title="Conditions We Treat" crumb="Conditions Treated" />
      <section className="section-padding bg-white">
        <div className="container-app grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {conditions.map((condition) => (
            <div
              key={condition._id || condition.name}
              className="rounded-xl bg-lightBeige border border-beige/70 hover:border-gold/50 hover:shadow-card transition-all p-5 text-center"
            >
              <p className="font-medium text-textMain text-sm">{condition.name}</p>
            </div>
          ))}
        </div>
      </section>
      <AppointmentCTA />
    </>
  )
}
