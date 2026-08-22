import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
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
    <section className="section-padding bg-white">
      <div className="container-app">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <SectionLabel>Conditions We Treat</SectionLabel>
          <h2 className="section-heading">Conditions We Help Treat</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {conditions.map((condition, i) => (
            <motion.div
              key={condition._id || condition.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: (i % 8) * 0.05 }}
              whileHover={{ y: -3 }}
              className="rounded-xl bg-lightBeige border border-beige/70 hover:border-gold/50 hover:shadow-card transition-all p-5 text-center"
            >
              <p className="font-medium text-textMain text-sm">{condition.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
