import { useEffect, useState } from 'react'
import SEO from '../components/SEO.jsx'
import PageBanner from '../components/PageBanner.jsx'
import BlogCard from '../components/BlogCard.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import EmptyState from '../components/EmptyState.jsx'
import blogsApi from '../services/blogsApi'
import { PLACEHOLDER_BLOGS } from '../utils/placeholderData'

export default function Blog() {
  const [posts, setPosts] = useState(PLACEHOLDER_BLOGS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    blogsApi
      .getAll()
      .then((res) => {
        const data = res?.data?.data || res?.data
        if (active && Array.isArray(data) && data.length) setPosts(data)
      })
      .catch(() => {
        // fallback: API failed or empty
      })
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [])

  return (
    <>
      <SEO
        title="Blog"
        description="Read the latest tips and insights on pain management, physiotherapy, and recovery from Markham Pain Clinic."
      />
      <PageBanner title="Latest News & Blogs" crumb="Blog" />
      <section className="section-padding bg-white">
        <div className="container-app">
          {loading ? (
            <LoadingSpinner />
          ) : posts.length === 0 ? (
            <EmptyState title="No posts yet" message="Check back soon for new articles." />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, i) => (
                <BlogCard key={post._id || post.slug} post={post} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
