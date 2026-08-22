import { useEffect, useState } from 'react'
import SEO from '../components/SEO.jsx'
import SectionLabel from '../components/SectionLabel.jsx'
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
      <section className="section-padding bg-ivory text-center">
        <div className="container-app max-w-3xl mx-auto">
          <SectionLabel>OUR TEAM</SectionLabel>
          <h1 className="section-heading mb-6">Meet the Experts Behind Your Recovery</h1>
          <p className="text-textSecondary leading-relaxed">
            Our team of licensed, experienced clinicians is dedicated to helping you recover with
            evidence-based, compassionate care.
          </p>
        </div>
      </section>
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
