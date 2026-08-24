import { useEffect, useState } from 'react'
import SectionLabel from '../components/SectionLabel.jsx'
import TeamCard from '../components/TeamCard.jsx'
import Button from '../components/Button.jsx'
import teamApi from '../services/teamApi'
import { PLACEHOLDER_TEAM } from '../utils/placeholderData'

export default function TeamPreview() {
  const [team, setTeam] = useState(PLACEHOLDER_TEAM)

  useEffect(() => {
    let active = true
    teamApi
      .getAll()
      .then((res) => {
        const data = res?.data?.data
        if (active && Array.isArray(data) && data.length) setTeam(data)
      })
      .catch(() => {
        // Fallback: keep default placeholder team members
      })
    return () => {
      active = false
    }
  }, [])

  return (
    <section className="section-padding bg-white">
      <div className="container-app">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <SectionLabel>Our Team</SectionLabel>
          <h2 className="section-heading mb-6">Your Trusted Therapy Professionals</h2>
          <Button to="/team" variant="secondary">
            OUR ALL MEMBERS
          </Button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
          {team.slice(0, 4).map((member, i) => (
            <TeamCard key={member._id || member.slug} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
