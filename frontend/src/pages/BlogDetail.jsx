import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import SEO from '../components/SEO.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import { formatDate } from '../utils/formatDate'
import NotFound from './NotFound.jsx'
import blogsApi from '../services/blogsApi'
import { PLACEHOLDER_BLOGS } from '../utils/placeholderData'

export default function BlogDetail() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

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

  return (
    <>
      <SEO title={post.title} description={post.excerpt} />
      <article className="section-padding bg-white">
        <div className="container-app max-w-3xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-darkCoffee hover:text-gold transition mb-8">
            <FiArrowLeft /> Back to Blog
          </Link>
          <div className="flex items-center gap-3 text-xs text-textSecondary mb-4">
            <span className="text-gold font-semibold uppercase tracking-wide">{post.category}</span>
            <span>•</span>
            <span>{formatDate(post.createdAt)}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-textMain mb-8 leading-tight">{post.title}</h1>
          <div className="rounded-2xl overflow-hidden mb-10 aspect-video">
            <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover" />
          </div>
          <p className="text-textSecondary leading-relaxed whitespace-pre-line">{post.content}</p>
        </div>
      </article>
    </>
  )
}
