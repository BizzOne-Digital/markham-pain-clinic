import { useEffect, useState } from 'react'
import useCountUp from '../hooks/useCountUp'
import statsApi from '../services/statsApi'
import { PLACEHOLDER_STATS } from '../utils/placeholderData'

function StatItem({ stat }) {
  const [ref, value] = useCountUp(stat.value)
  return (
    <div ref={ref} className="text-center text-white">
      <p className="font-serif text-4xl sm:text-5xl">
        {value}
        {stat.suffix}
      </p>
      <p className="text-beige/80 text-sm sm:text-base mt-2 uppercase tracking-wide">{stat.label}</p>
    </div>
  )
}

export default function StatisticsBar() {
  const [stats, setStats] = useState(PLACEHOLDER_STATS)

  useEffect(() => {
    let active = true
    statsApi
      .getAll()
      .then((res) => {
        const data = res?.data?.data
        if (active && Array.isArray(data) && data.length) setStats(data)
      })
      .catch(() => {
        // Fallback: keep default placeholder statistics
      })
    return () => {
      active = false
    }
  }, [])

  return (
    <section className="bg-gradient-to-r from-coffee to-darkCoffee py-16">
      <div className="container-app grid grid-cols-1 sm:grid-cols-3 gap-10">
        {stats.map((stat) => (
          <StatItem key={stat._id || stat.label} stat={stat} />
        ))}
      </div>
    </section>
  )
}
