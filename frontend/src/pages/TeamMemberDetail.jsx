import { Link } from 'react-router-dom'
import { FiArrowLeft, FiUser } from 'react-icons/fi'
import SEO from '../components/SEO.jsx'
import AppointmentCTA from '../sections/AppointmentCTA.jsx'

export default function TeamMemberDetail() {
  return (
    <>
      <SEO title="Team Member" description="Team member profiles are coming soon." />
      <section className="section-padding bg-white">
        <div className="container-app text-center max-w-xl mx-auto">
          <div className="w-32 h-32 rounded-full bg-beige/40 flex items-center justify-center mx-auto mb-6">
            <FiUser className="text-darkCoffee/40 text-5xl" />
          </div>
          <h1 className="section-heading mb-4">Coming Soon</h1>
          <p className="text-textSecondary leading-relaxed mb-8">
            Team member profiles are being updated and will be available here shortly.
          </p>
          <Link to="/team" className="btn-primary inline-flex">
            <FiArrowLeft /> Back to Team
          </Link>
        </div>
      </section>
      <AppointmentCTA />
    </>
  )
}
