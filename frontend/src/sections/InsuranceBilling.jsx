import SectionLabel from '../components/SectionLabel.jsx'

const INSURERS = [
  { name: 'Canada Life', logo: '/insurance-logos/Canada-Life.png' },
  { name: 'Desjardins Insurance', logo: '/insurance-logos/Desjardins-Insurance.png' },
  { name: 'Beneva', logo: '/insurance-logos/Beneva.png' },
  { name: 'BPA', logo: '/insurance-logos/BPA_logo.png' },
  { name: 'Canadian Construction Workers Union', logo: '/insurance-logos/Canadian-Construction-Workers-Union-C.C.W.U.png' },
  { name: 'Chambers of Commerce Group', logo: '/insurance-logos/Chambers-of-Commerce-Johnston-Group.png' },
  { name: 'CINUP', logo: '/insurance-logos/CINUP-Johnston-Group.png' },
  { name: 'ClaimSecure', logo: '/insurance-logos/ClaimSecure.png' },
  { name: 'Coughlin & Associates', logo: '/insurance-logos/Coughlin-Associates-Ltd.png' },
  { name: 'Cowan / Express Scripts Canada', logo: '/insurance-logos/Cowan-Express-Scripts-Canada.png' },
  { name: 'D.A. Townley', logo: '/insurance-logos/D.A.-Townley.png' },
  { name: 'ABC Logo Package', logo: '/insurance-logos/ABC-Logo-Package.webp' },
]

export default function InsuranceBilling() {
  const loop = [...INSURERS, ...INSURERS]

  return (
    <section className="py-14 bg-white border-y border-beige/70 overflow-hidden">
      <div className="container-app text-center mb-8">
        <SectionLabel>Billing Convenience</SectionLabel>
        <h2 className="font-heading font-bold text-2xl sm:text-3xl text-textMain">
          Direct Billing with Major Insurance Companies
        </h2>
        <p className="text-textSecondary text-sm mt-3 max-w-xl mx-auto">
          We offer direct billing to most major insurance providers to make your care more accessible
          and stress-free.
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10" />
        <div className="flex gap-10 w-max animate-marquee items-center">
          {loop.map((insurer, i) => (
            <div
              key={`${insurer.name}-${i}`}
              className="flex-shrink-0 h-16 w-40 flex items-center justify-center border border-beige rounded-xl px-4 bg-white"
            >
              <img
                src={insurer.logo}
                alt={insurer.name}
                loading="lazy"
                className="max-h-10 max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
