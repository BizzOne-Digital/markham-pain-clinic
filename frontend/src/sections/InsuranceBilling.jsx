import SectionLabel from '../components/SectionLabel.jsx'

const INSURERS = [
  'Canada Life', 'Desjardins Insurance', 'Sun Life', 'Manulife', 'Equitable Life',
  'Beneva', 'Green Shield Canada', 'Chambers of Commerce Group', 'Union Benefits',
  'Coughlin & Associates', 'D.A. Townley', 'Cowan Insurance',
]

export default function InsuranceBilling() {
  const loop = [...INSURERS, ...INSURERS]

  return (
    <section className="py-14 bg-white border-y border-beige/70 overflow-hidden">
      <div className="container-app text-center mb-8">
        <SectionLabel>Direct Billing</SectionLabel>
        <h2 className="font-heading font-bold text-2xl sm:text-3xl text-textMain">
          Direct Billing with Major Insurance Providers
        </h2>
        <p className="text-textSecondary text-sm mt-3 max-w-xl mx-auto">
          We handle the claims process on your behalf with most major insurance providers, so your
          visit is as convenient as possible.
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10" />
        <div className="flex gap-10 w-max animate-marquee">
          {loop.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="flex-shrink-0 text-sm sm:text-base font-serif text-textSecondary/70 border border-beige rounded-full px-6 py-3 whitespace-nowrap"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
