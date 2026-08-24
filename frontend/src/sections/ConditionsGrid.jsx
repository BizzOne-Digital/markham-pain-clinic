import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SectionLabel from '../components/SectionLabel.jsx'
import conditionsApi from '../services/conditionsApi'
import { PLACEHOLDER_CONDITIONS } from '../utils/placeholderData'

export default function ConditionsGrid() {
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
        // Fallback: keep default placeholder conditions list
      })
    return () => {
      active = false
    }
  }, [])

  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="container-app">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <SectionLabel>Conditions We Treat</SectionLabel>
          <h2 className="section-heading">Comprehensive Care for Every Condition</h2>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 px-5 sm:px-8 lg:px-10 scrollbar-hide"
      >
        {conditions.map((condition, i) => (
          <Link
            key={condition._id || condition.name}
            to="/services"
            className="group flex-shrink-0 w-56 snap-start rounded-2xl bg-lightBeige border border-beige/70 hover:border-gold/50 hover:shadow-card transition-all overflow-hidden"
          >
            <div className="h-36 overflow-hidden">
              <img
                src={`https://images.unsplash.com/photo-${['1571019613454-1cb2f99b2d8b', '1519824145371-296894a0daa9', '1544161515-4ab6ce6db874', '1600334129128-685c5582fd35'][i % 4]}?q=80&w=600&auto=format&fit=crop`}
                alt={condition.name}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-5 text-center">
              <p className="font-serif text-textMain">{condition.name}</p>
            </div>
          </Link>
        ))}
      </motion.div>
    </section>
  )
}
