import { useEffect, useState } from 'react'
import { useParams, Link, NavLink } from 'react-router-dom'
import { FiCheckCircle, FiArrowLeft } from 'react-icons/fi'
import SEO from '../components/SEO.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import productsApi from '../services/productsApi'

export default function ProductDetail() {
  const { slug } = useParams()
  const [product, setProduct] = useState(null)
  const [allProducts, setAllProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    productsApi
      .getAll()
      .then((res) => {
        const data = res?.data?.data
        if (Array.isArray(data) && data.length) setAllProducts(data)
      })
      .catch(() => {
        // Fallback: keep empty sidebar list if the API is unavailable
      })
  }, [])

  useEffect(() => {
    let active = true
    setLoading(true)
    setNotFound(false)
    setProduct(null)

    productsApi
      .getOne(slug)
      .then((res) => {
        const data = res?.data?.data || res?.data
        if (active && data) setProduct(data)
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

  if (loading) return <LoadingSpinner label="Loading product..." />

  if (notFound || !product) {
    return (
      <section className="section-padding container-app text-center">
        <h1 className="section-heading mb-4">Product Not Found</h1>
        <p className="text-textSecondary mb-8">We couldn't find the product you're looking for.</p>
        <Link to="/products" className="btn-primary inline-flex">
          <FiArrowLeft /> Back to Products
        </Link>
      </section>
    )
  }

  return (
    <>
      <SEO title={product.name} description={product.description} />

      <section className="section-padding bg-white">
        <div className="container-app grid lg:grid-cols-[280px_1fr] gap-10">
          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="bg-darkCoffee rounded-2xl overflow-hidden">
              <h2 className="font-heading font-bold text-white text-lg px-6 py-5 border-b border-white/10">
                Our Products
              </h2>
              <nav className="py-2">
                {allProducts.map((p) => (
                  <NavLink
                    key={p._id || p.slug}
                    to={`/products/${p.slug}`}
                    className={({ isActive }) =>
                      `block px-6 py-2.5 text-sm font-semibold border-b border-white/5 last:border-0 transition ${
                        isActive || p.slug === slug ? 'text-gold bg-white/5' : 'text-beige/90 hover:text-gold'
                      }`
                    }
                  >
                    {p.name}
                  </NavLink>
                ))}
              </nav>
            </div>

            <div className="admin-card mt-6">
              <h3 className="font-heading font-bold text-lg text-textMain mb-2">Need Help?</h3>
              <p className="text-textSecondary text-sm mb-4">Contact our team for professional guidance.</p>
              <Link to="/contact" className="btn-primary w-full justify-center">
                CONTACT US
              </Link>
            </div>
          </aside>

          <article>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl text-textMain mb-6">{product.name}</h1>

            {product.intro && <p className="text-textSecondary leading-relaxed mb-8">{product.intro}</p>}

            {product.image && (
              <div className="rounded-2xl overflow-hidden mb-8 aspect-video">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
            )}

            {product.whatIsIt && (
              <div className="mb-8">
                <h2 className="font-heading font-bold text-2xl text-textMain mb-4">What Is a {product.name}?</h2>
                <p className="text-textSecondary leading-relaxed">{product.whatIsIt}</p>
              </div>
            )}

            {product.howItWorks?.length > 0 && (
              <div className="mb-8">
                <h2 className="font-heading font-bold text-2xl text-textMain mb-4">How It Works</h2>
                <div className="space-y-5">
                  {product.howItWorks.map((h) => (
                    <div key={h.title}>
                      <h3 className="font-heading font-bold text-textMain mb-1">{h.title}</h3>
                      <p className="text-textSecondary text-sm leading-relaxed">{h.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {product.conditionsSupported?.length > 0 && (
              <div className="mb-8">
                <h2 className="font-heading font-bold text-2xl text-textMain mb-4">Common Uses</h2>
                <div className="flex flex-wrap gap-3">
                  {product.conditionsSupported.map((c) => (
                    <span key={c} className="bg-beige/50 text-darkCoffee text-sm px-4 py-2 rounded-full">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {product.keyFeatures?.length > 0 && (
              <div className="mb-8">
                <h2 className="font-heading font-bold text-2xl text-textMain mb-4">Key Features</h2>
                <div className="grid sm:grid-cols-2 gap-5">
                  {product.keyFeatures.map((f) => (
                    <div key={f.title}>
                      <h3 className="font-heading font-bold text-textMain mb-1">{f.title}</h3>
                      <p className="text-textSecondary text-sm leading-relaxed">{f.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {product.whoCanBenefit?.length > 0 && (
              <div className="mb-8">
                <h2 className="font-heading font-bold text-2xl text-textMain mb-4">Who Can Benefit</h2>
                <div className="grid sm:grid-cols-2 gap-5">
                  {product.whoCanBenefit.map((w) => (
                    <div key={w.title}>
                      <h3 className="font-heading font-bold text-textMain mb-1">{w.title}</h3>
                      <p className="text-textSecondary text-sm leading-relaxed">{w.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {product.commonUses?.length > 0 && (
              <div className="mb-8">
                <h2 className="font-heading font-bold text-2xl text-textMain mb-4">Common Uses</h2>
                <div className="grid sm:grid-cols-2 gap-5">
                  {product.commonUses.map((u) => (
                    <div key={u.title}>
                      <h3 className="font-heading font-bold text-textMain mb-1">{u.title}</h3>
                      <p className="text-textSecondary text-sm leading-relaxed">{u.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {product.safetyTips?.length > 0 && (
              <div className="mb-8">
                <h2 className="font-heading font-bold text-2xl text-textMain mb-4">How to Use Safely</h2>
                <div className="grid sm:grid-cols-2 gap-5">
                  {product.safetyTips.map((s) => (
                    <div key={s.title}>
                      <h3 className="font-heading font-bold text-textMain mb-1">{s.title}</h3>
                      <p className="text-textSecondary text-sm leading-relaxed">{s.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {product.benefits?.length > 0 && (
              <div className="mb-8">
                <h2 className="font-heading font-bold text-2xl text-textMain mb-4">Key Advantages</h2>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {product.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-textMain text-sm">
                      <FiCheckCircle className="text-gold flex-shrink-0" /> {b}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product.whyChooseUs?.length > 0 && (
              <div className="mb-8">
                <h2 className="font-heading font-bold text-2xl text-textMain mb-4">Why Choose Us</h2>
                <div className="grid sm:grid-cols-2 gap-5">
                  {product.whyChooseUs.map((w) => (
                    <div key={w.title}>
                      <h3 className="font-heading font-bold text-textMain mb-1">{w.title}</h3>
                      <p className="text-textSecondary text-sm leading-relaxed">{w.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {product.closingText && (
              <div className="bg-beige/40 rounded-2xl p-6 mt-4">
                <p className="text-textMain leading-relaxed">{product.closingText}</p>
              </div>
            )}
          </article>
        </div>
      </section>
    </>
  )
}
