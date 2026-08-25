import { useEffect, useState } from 'react'
import SEO from '../components/SEO.jsx'
import PageBanner from '../components/PageBanner.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import EmptyState from '../components/EmptyState.jsx'
import AppointmentCTA from '../sections/AppointmentCTA.jsx'
import socialServicesApi from '../services/socialServicesApi'

export default function SocialService() {
  const [items, setItems] = useState(null)

  useEffect(() => {
    let active = true
    socialServicesApi
      .getAll()
      .then((res) => {
        const data = res?.data?.data
        if (active) setItems(Array.isArray(data) ? data : [])
      })
      .catch(() => {
        if (active) setItems([])
      })
    return () => {
      active = false
    }
  }, [])

  return (
    <>
      <SEO title="Social Service" description="Community and social service initiatives supported by Markham Pain Clinic." />
      <PageBanner title="Social Service" crumb="Social Service" />
      <section className="section-padding bg-white">
        <div className="container-app">
          {items === null && <LoadingSpinner label="Loading..." />}
          {items?.length === 0 && (
            <EmptyState title="Nothing here yet" message="Details on our community initiatives are coming soon." />
          )}
          {items && items.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((item) => (
                <div key={item._id} className="card p-6">
                  <h3 className="font-serif text-lg text-textMain mb-2">{item.name}</h3>
                  {item.description && <p className="text-textSecondary text-sm">{item.description}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <AppointmentCTA />
    </>
  )
}
