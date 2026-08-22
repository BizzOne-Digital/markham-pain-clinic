import { useEffect, useState } from 'react'
import { FiLayers, FiUsers, FiStar, FiFileText, FiMail } from 'react-icons/fi'
import dashboardApi from '../../services/dashboardApi'
import { formatDate } from '../../utils/formatDate'
import LoadingSpinner from '../../components/LoadingSpinner.jsx'

const CARD_CONFIG = [
  { key: 'services', label: 'Services', icon: FiLayers },
  { key: 'team', label: 'Team Members', icon: FiUsers },
  { key: 'testimonials', label: 'Testimonials', icon: FiStar },
  { key: 'blogs', label: 'Blog Posts', icon: FiFileText },
  { key: 'enquiries', label: 'Enquiries', icon: FiMail },
]

export default function Dashboard() {
  const [data, setData] = useState(null)

  useEffect(() => {
    let active = true
    dashboardApi
      .getOverview()
      .then((res) => {
        if (active) setData(res?.data?.data || { totals: {}, recentEnquiries: [] })
      })
      .catch(() => {
        // Fallback: dashboard API unavailable, show empty overview
        if (active) setData({ totals: {}, recentEnquiries: [] })
      })
    return () => {
      active = false
    }
  }, [])

  if (!data) return <LoadingSpinner label="Loading dashboard..." />

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-2xl text-textMain">Dashboard</h1>
        <p className="text-textSecondary text-sm">Overview of your clinic website content.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {CARD_CONFIG.map(({ key, label, icon: Icon }) => (
          <div key={key} className="admin-card flex items-center gap-4">
            <span className="w-11 h-11 rounded-lg bg-beige/60 text-darkCoffee flex items-center justify-center text-lg flex-shrink-0">
              <Icon />
            </span>
            <div>
              <p className="text-2xl font-serif text-textMain">{data.totals?.[key] ?? 0}</p>
              <p className="text-textSecondary text-xs">{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="admin-card">
        <h2 className="font-serif text-lg text-textMain mb-4">Recent Enquiries</h2>
        {!data.recentEnquiries?.length ? (
          <p className="text-textSecondary text-sm">No enquiries yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-darkCoffee border-b border-beige">
                  <th className="py-2 pr-4">Name</th>
                  <th className="py-2 pr-4">Email</th>
                  <th className="py-2 pr-4">Service</th>
                  <th className="py-2 pr-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-beige">
                {data.recentEnquiries.map((enq) => (
                  <tr key={enq._id}>
                    <td className="py-2 pr-4">{enq.fullName}</td>
                    <td className="py-2 pr-4">{enq.email}</td>
                    <td className="py-2 pr-4">{enq.serviceInterested || '—'}</td>
                    <td className="py-2 pr-4">{formatDate(enq.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
