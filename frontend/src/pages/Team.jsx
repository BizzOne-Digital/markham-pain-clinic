import { useEffect, useState } from 'react'
import SEO from '../components/SEO.jsx'
import PageBanner from '../components/PageBanner.jsx'
import TeamCard from '../components/TeamCard.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import AppointmentCTA from '../sections/AppointmentCTA.jsx'
import teamApi from '../services/teamApi'
import { PLACEHOLDER_TEAM } from '../utils/placeholderData'

export default function Team() {
  const [team, setTeam] = useState(PLACEHOLDER_TEAM)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    teamApi
      .getAll()
      .then((res) => {
        const data = res?.data?.data || res?.data
        if (active && Array.isArray(data) && data.length) setTeam(data)
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
        title="Our Team"
        description="Meet the licensed physiotherapists, acupuncturists, and pain specialists at Markham Pain Clinic."
      />
      <PageBanner title="Our Team" crumb="Our Team" />
      <section className="section-padding bg-white">
        <div className="container-app">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member, i) => (
                <TeamCard key={member._id || member.slug} member={member} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
      <AppointmentCTA />
    </>
  )
}
