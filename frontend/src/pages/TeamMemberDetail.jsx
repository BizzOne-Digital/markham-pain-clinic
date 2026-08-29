import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FiArrowLeft, FiMail, FiPhone } from 'react-icons/fi'
import SEO from '../components/SEO.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import TeamCard from '../components/TeamCard.jsx'
import AppointmentCTA from '../sections/AppointmentCTA.jsx'
import teamApi from '../services/teamApi'
import { PLACEHOLDER_TEAM, CLINIC_INFO } from '../utils/placeholderData'

export default function TeamMemberDetail() {
  const { slug } = useParams()
  const [member, setMember] = useState(null)
  const [otherMembers, setOtherMembers] = useState(PLACEHOLDER_TEAM)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    teamApi
      .getAll()
      .then((res) => {
        const data = res?.data?.data
        if (Array.isArray(data) && data.length) setOtherMembers(data)
      })
      .catch(() => {
        // Fallback: keep default placeholder team members
      })
  }, [])

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
      <section className="section-padding bg-white">
        <div className="container-app grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-2xl overflow-hidden shadow-soft">
            <img src={member.photo} alt={member.name} className="w-full aspect-[4/5] object-cover" />
            <Link
              to="/contact"
              className="btn-primary absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap"
            >
              BOOK APPOINTMENT
            </Link>
          </div>

          <div>
            <h1 className="section-heading mb-2">{member.name}</h1>
            <p className="text-gold font-semibold italic mb-6">{member.role}</p>

            <p className="text-textSecondary leading-relaxed mb-4">{member.bio}</p>

            <ul className="space-y-3 mt-6">
              {member.specialization && (
                <li className="text-textMain">
                  <strong className="font-heading font-bold">Specialization:</strong> {member.specialization}
                </li>
              )}
              {member.expertise?.length > 0 && (
                <li className="flex flex-wrap items-center gap-2 text-textMain">
                  <strong className="font-heading font-bold">Expertise:</strong>
                  {member.expertise.map((e) => (
                    <span key={e} className="bg-beige/60 text-darkCoffee text-xs font-semibold px-3 py-1.5 rounded-full">
                      {e}
                    </span>
                  ))}
                </li>
              )}
              {member.qualifications?.length > 0 && (
                <li className="text-textMain">
                  <strong className="font-heading font-bold block mb-1">Qualifications:</strong>
                  <ul className="list-disc list-inside text-textSecondary text-sm space-y-1">
                    {member.qualifications.map((q) => (
                      <li key={q}>{q}</li>
                    ))}
                  </ul>
                </li>
              )}
              <li>
                <a href={`mailto:${CLINIC_INFO.email}`} className="flex items-center gap-2 text-textMain hover:text-gold transition">
                  <FiMail className="text-gold" /> <strong className="font-heading font-bold">Email:</strong> {CLINIC_INFO.email}
                </a>
              </li>
              <li>
                <a href={`tel:${CLINIC_INFO.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-textMain hover:text-gold transition">
                  <FiPhone className="text-gold" /> <strong className="font-heading font-bold">Phone:</strong> {CLINIC_INFO.phone}
                </a>
              </li>
            </ul>

            {member.philosophy && (
              <blockquote className="border-l-4 border-gold pl-5 italic text-textMain font-serif text-lg mt-6">
                &ldquo;{member.philosophy}&rdquo;
              </blockquote>
            )}
          </div>
        </div>
      </section>

      <section className="section-padding bg-ivory">
        <div className="container-app">
          <h2 className="font-heading font-bold text-2xl text-textMain text-center mb-10">Other Team Members</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherMembers
              .filter((m) => m.slug !== slug)
              .map((m, i) => (
                <TeamCard key={m._id || m.slug} member={m} index={i} />
              ))}
          </div>
        </div>
      </section>

      <AppointmentCTA />
    </>
  )
}
