import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import SEO from '../components/SEO.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import AppointmentCTA from '../sections/AppointmentCTA.jsx'
import teamApi from '../services/teamApi'
import { PLACEHOLDER_TEAM } from '../utils/placeholderData'

export default function TeamMemberDetail() {
  const { slug } = useParams()
  const [member, setMember] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    let active = true
    setLoading(true)
    setNotFound(false)
    setMember(null)

    teamApi
      .getOne(slug)
      .then((res) => {
        const data = res?.data?.data || res?.data
        if (active && data) setMember(data)
        else if (active) fallbackToLocal()
      })
      .catch(() => {
        if (active) fallbackToLocal()
      })
      .finally(() => active && setLoading(false))

    function fallbackToLocal() {
      // fallback: API failed or empty
      const local = PLACEHOLDER_TEAM.find((m) => m.slug === slug)
      if (local) setMember(local)
      else setNotFound(true)
    }

    return () => {
      active = false
    }
  }, [slug])

  if (loading) return <LoadingSpinner label="Loading team member..." />

  if (notFound || !member) {
    return (
      <section className="section-padding container-app text-center">
        <h1 className="section-heading mb-4">Team Member Not Found</h1>
        <Link to="/team" className="btn-primary inline-flex">
          <FiArrowLeft /> Back to Team
        </Link>
      </section>
    )
  }

  return (
    <>
      <SEO title={member.name} description={member.bio} />
      <section className="section-padding bg-ivory">
        <div className="container-app grid lg:grid-cols-3 gap-12">
          <div className="rounded-3xl overflow-hidden shadow-soft h-fit">
            <img src={member.photo} alt={member.name} className="w-full h-[420px] object-cover" />
          </div>
          <div className="lg:col-span-2">
            <h1 className="section-heading mb-1">{member.name}</h1>
            <p className="text-gold font-semibold mb-1">{member.role}</p>
            {member.specialization && <p className="text-textSecondary text-sm mb-6">{member.specialization}</p>}

            {member.qualifications?.length > 0 && (
              <div className="mb-6">
                <h3 className="font-serif text-lg text-textMain mb-2">Qualifications</h3>
                <ul className="list-disc list-inside text-textSecondary text-sm space-y-1">
                  {member.qualifications.map((q) => (
                    <li key={q}>{q}</li>
                  ))}
                </ul>
              </div>
            )}

            {member.bio && (
              <div className="mb-6">
                <h3 className="font-serif text-lg text-textMain mb-2">About</h3>
                <p className="text-textSecondary leading-relaxed">{member.bio}</p>
              </div>
            )}

            {member.expertise?.length > 0 && (
              <div className="mb-6">
                <h3 className="font-serif text-lg text-textMain mb-2">Areas of Expertise</h3>
                <div className="flex flex-wrap gap-3">
                  {member.expertise.map((e) => (
                    <span key={e} className="bg-beige/50 text-darkCoffee text-sm px-4 py-2 rounded-full">
                      {e}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {member.philosophy && (
              <blockquote className="border-l-4 border-gold pl-5 italic text-textMain font-serif text-lg">
                &ldquo;{member.philosophy}&rdquo;
              </blockquote>
            )}
          </div>
        </div>
      </section>
      <AppointmentCTA />
    </>
  )
}
