import { useEffect, useState } from 'react'
import SEO from '../components/SEO.jsx'
import PageBanner from '../components/PageBanner.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import EmptyState from '../components/EmptyState.jsx'
import AppointmentCTA from '../sections/AppointmentCTA.jsx'
import productsApi from '../services/productsApi'

export default function Products() {
  const [products, setProducts] = useState(null)

  useEffect(() => {
    let active = true
    productsApi
      .getAll()
      .then((res) => {
        const data = res?.data?.data
        if (active) setProducts(Array.isArray(data) ? data : [])
      })
      .catch(() => {
        if (active) setProducts([])
      })
    return () => {
      active = false
    }
  }, [])

  return (
    <>
      <SEO title="Products" description="Wellness products and take-home care items available at Markham Pain Clinic." />
      <PageBanner title="Products" crumb="Products" />
      <section className="section-padding bg-white">
        <div className="container-app">
          {products === null && <LoadingSpinner label="Loading products..." />}
          {products?.length === 0 && (
            <EmptyState title="No products yet" message="Check back soon — our product catalogue is being updated." />
          )}
          {products && products.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div key={product._id} className="card p-6">
                  <h3 className="font-serif text-lg text-textMain mb-2">{product.name}</h3>
                  {product.description && <p className="text-textSecondary text-sm mb-3">{product.description}</p>}
                  {product.price && <p className="text-gold font-semibold">{product.price}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <AppointmentCTA />
    </>
  )
}
