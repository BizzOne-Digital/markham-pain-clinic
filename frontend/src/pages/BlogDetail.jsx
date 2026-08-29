import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import SEO from '../components/SEO.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import { formatDate } from '../utils/formatDate'
import { truncateText } from '../utils/truncateText'
import NotFound from './NotFound.jsx'
import blogsApi from '../services/blogsApi'
import { PLACEHOLDER_BLOGS } from '../utils/placeholderData'

export default function BlogDetail() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [otherPosts, setOtherPosts] = useState(PLACEHOLDER_BLOGS)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    blogsApi
      .getAll()
      .then((res) => {
        const data = res?.data?.data
        if (Array.isArray(data) && data.length) setOtherPosts(data)
      })
      .catch(() => {
        // Fallback: keep default placeholder posts
      })
  }, [])

  useEffect(() => {
    let active = true
    setLoading(true)
    setNotFound(false)
    blogsApi
      .getOne(slug)
      .then((res) => {
        const data = res?.data?.data
        if (active && data) setPost(data)
        else if (active) fallback()
      })
      .catch(() => {
        if (active) fallback()
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    function fallback() {
      // Fallback: match against local placeholder blog posts by slug
      const local = PLACEHOLDER_BLOGS.find((p) => p.slug === slug)
      if (local) setPost(local)
      else setNotFound(true)
    }

    return () => {
      active = false
    }
  }, [slug])

  if (loading) return <LoadingSpinner label="Loading article..." />
  if (notFound || !post) return <NotFound />

  const related = otherPosts.filter((p) => p.slug !== slug).slice(0, 4)

  return (
    <>
      <SEO title={post.title} description={post.excerpt} />
      <article className="section-padding bg-white">
        <div className="container-app grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-darkCoffee hover:text-gold transition mb-8">
              <FiArrowLeft /> Back to Blog
            </Link>
            <div className="flex items-center gap-3 text-xs text-textSecondary mb-4">
              <span className="text-gold font-semibold uppercase tracking-wide">{post.category}</span>
              <span>•</span>
              <span>{formatDate(post.createdAt)}</span>
            </div>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl text-textMain mb-8 leading-tight">{post.title}</h1>
            <div className="rounded-2xl overflow-hidden mb-10 aspect-video">
              <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover" />
            </div>
            <p className="text-textSecondary leading-relaxed whitespace-pre-line">{post.content}</p>
          </div>

          <aside className="lg:sticky lg:top-24 h-fit space-y-6">
            <div className="bg-darkCoffee rounded-2xl overflow-hidden">
              <h3 className="font-heading font-bold text-white text-lg text-center px-6 py-5 border-b border-white/10">
                Latest Blogs
              </h3>
              <div className="p-4 space-y-1">
                {otherPosts.slice(0, 3).map((p) => (
                  <Link
                    key={p._id || p.slug}
                    to={`/blog/${p.slug}`}
                    className="block px-2 py-2.5 text-sm font-medium text-beige/90 hover:text-gold border-b border-white/5 last:border-0"
                  >
                    {truncateText(p.title, 60)}
                  </Link>
                ))}
              </div>
            </div>

            <div className="admin-card">
              <h3 className="font-heading font-bold text-lg text-textMain mb-2">Need Help?</h3>
              <p className="text-textSecondary text-sm mb-4">Contact our physiotherapy experts for professional guidance.</p>
              <Link to="/contact" className="btn-primary w-full justify-center">
                Contact Us
              </Link>
            </div>
          </aside>
        </div>
      </article>

      {related.length > 0 && (
        <section className="section-padding bg-ivory pt-0">
          <div className="container-app">
            <h2 className="font-heading font-bold text-2xl text-textMain text-center mb-10">Related Blogs</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <Link
                  key={p._id || p.slug}
                  to={`/blog/${p.slug}`}
                  className="bg-darkCoffee rounded-xl h-28 flex items-center justify-center text-center p-4 hover:bg-gold transition"
                >
                  <h6 className="text-white text-sm font-semibold">{truncateText(p.title, 50)}</h6>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
