import { useEffect, useState } from 'react'
import { useParams, Link, NavLink } from 'react-router-dom'
import { FiCheckCircle, FiArrowLeft } from 'react-icons/fi'
import SEO from '../components/SEO.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import conditionsApi from '../services/conditionsApi'

export default function ConditionDetail() {
  const { slug } = useParams()
  const [condition, setCondition] = useState(null)
  const [allConditions, setAllConditions] = useState([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    conditionsApi
      .getAll()
      .then((res) => {
        const data = res?.data?.data
        if (Array.isArray(data) && data.length) setAllConditions(data)
      })
      .catch(() => {
        // Fallback: keep empty sidebar list if the API is unavailable
      })
  }, [])

  useEffect(() => {
    let active = true
    setLoading(true)
    setNotFound(false)
    setCondition(null)

    conditionsApi
      .getOne(slug)
      .then((res) => {
        const data = res?.data?.data || res?.data
        if (active && data) setCondition(data)
        else if (active) setNotFound(true)
      })
      .catch(() => {
        if (active) setNotFound(true)
      })
      .finally(() => active && setLoading(false))

    return () => {
      active = false
    }
  }, [slug])

  if (loading) return <LoadingSpinner label="Loading condition..." />

  if (notFound || !condition) {
    return (
      <section className="section-padding container-app text-center">
        <h1 className="section-heading mb-4">Condition Not Found</h1>
        <p className="text-textSecondary mb-8">We couldn't find the condition you're looking for.</p>
        <Link to="/conditions" className="btn-primary inline-flex">
          <FiArrowLeft /> Back to Conditions
        </Link>
      </section>
    )
  }

  return (
    <>
      <SEO title={condition.name} description={condition.description} />

      <section className="section-padding bg-white">
        <div className="container-app grid lg:grid-cols-[280px_1fr] gap-10">
          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="bg-darkCoffee rounded-2xl overflow-hidden max-h-[32rem] overflow-y-auto footer-scroll">
              <h2 className="font-heading font-bold text-white text-lg px-6 py-5 border-b border-white/10 sticky top-0 bg-darkCoffee">
                Conditions We Treat
              </h2>
              <nav className="py-2">
                {allConditions.map((c) => (
                  <NavLink
                    key={c._id || c.slug}
                    to={`/conditions/${c.slug}`}
                    className={({ isActive }) =>
                      `block px-6 py-2.5 text-sm font-semibold border-b border-white/5 last:border-0 transition ${
                        isActive || c.slug === slug ? 'text-gold bg-white/5' : 'text-beige/90 hover:text-gold'
                      }`
                    }
                  >
                    {c.name}
                  </NavLink>
                ))}
              </nav>
            </div>

            <div className="admin-card mt-6">
              <h3 className="font-heading font-bold text-lg text-textMain mb-2">Need Help?</h3>
              <p className="text-textSecondary text-sm mb-4">Contact our team for professional guidance.</p>
              <Link to="/contact" className="btn-primary w-full justify-center">
                BOOK APPOINTMENT
              </Link>
            </div>
          </aside>

          <article>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl text-textMain mb-6">{condition.name}</h1>

            {condition.intro && <p className="text-textSecondary leading-relaxed mb-8">{condition.intro}</p>}

            {condition.whatIsIt && (
              <div className="mb-8">
                <h2 className="font-heading font-bold text-2xl text-textMain mb-4">What Is {condition.name}?</h2>
                <p className="text-textSecondary leading-relaxed">{condition.whatIsIt}</p>
              </div>
            )}

            {condition.symptoms?.length > 0 && (
              <div className="mb-8">
                <h2 className="font-heading font-bold text-2xl text-textMain mb-4">Common Symptoms</h2>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {condition.symptoms.map((s) => (
                    <li key={s} className="flex items-center gap-2 text-textMain text-sm">
                      <FiCheckCircle className="text-gold flex-shrink-0" /> {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {condition.causes?.length > 0 && (
              <div className="mb-8">
                <h2 className="font-heading font-bold text-2xl text-textMain mb-4">Common Causes</h2>
                <div className="flex flex-wrap gap-3">
                  {condition.causes.map((c) => (
                    <span key={c} className="bg-beige/50 text-darkCoffee text-sm px-4 py-2 rounded-full">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {condition.treatmentApproach && (
              <div className="mb-8">
                <h2 className="font-heading font-bold text-2xl text-textMain mb-4">How We Help</h2>
                <p className="text-textSecondary leading-relaxed">{condition.treatmentApproach}</p>
              </div>
            )}

            {condition.benefits?.length > 0 && (
              <div className="mb-8">
                <h2 className="font-heading font-bold text-2xl text-textMain mb-4">Benefits of Treatment</h2>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {condition.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-textMain text-sm">
                      <FiCheckCircle className="text-gold flex-shrink-0" /> {b}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {condition.practicalTips?.length > 0 && (
              <div className="mb-8">
                <h2 className="font-heading font-bold text-2xl text-textMain mb-4">Practical Tips</h2>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {condition.practicalTips.map((t) => (
                    <li key={t} className="flex items-center gap-2 text-textMain text-sm">
                      <FiCheckCircle className="text-gold flex-shrink-0" /> {t}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {condition.whyChooseUs?.length > 0 && (
              <div className="mb-8">
                <h2 className="font-heading font-bold text-2xl text-textMain mb-4">Why Choose Us</h2>
                <div className="grid sm:grid-cols-2 gap-5">
                  {condition.whyChooseUs.map((w) => (
                    <div key={w.title}>
                      <h3 className="font-heading font-bold text-textMain mb-1">{w.title}</h3>
                      <p className="text-textSecondary text-sm leading-relaxed">{w.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {condition.whenToSeekHelp && (
              <div className="bg-beige/40 rounded-2xl p-6 mt-4">
                <h3 className="font-heading font-bold text-textMain mb-2">When to Seek Help</h3>
                <p className="text-textMain leading-relaxed">{condition.whenToSeekHelp}</p>
              </div>
            )}
          </article>
        </div>
      </section>
    </>
  )
}
