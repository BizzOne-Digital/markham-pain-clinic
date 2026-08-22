import { useEffect, useState } from 'react'
import SectionLabel from '../components/SectionLabel.jsx'
import BlogCard from '../components/BlogCard.jsx'
import blogsApi from '../services/blogsApi'
import { PLACEHOLDER_BLOGS } from '../utils/placeholderData'

export default function BlogPreviewSection() {
  const [posts, setPosts] = useState(PLACEHOLDER_BLOGS)

  useEffect(() => {
    let active = true
    blogsApi
      .getAll()
      .then((res) => {
        const data = res?.data?.data || res?.data
        if (active && Array.isArray(data) && data.length) setPosts(data.slice(0, 3))
      })
      .catch(() => {
        // fallback: API failed or empty
      })
    return () => {
      active = false
    }
  }, [])

  return (
    <section className="section-padding bg-beige/40">
      <div className="container-app">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <SectionLabel>FROM OUR BLOG</SectionLabel>
          <h2 className="section-heading">Tips & Insights for Better Health</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <BlogCard key={post._id || post.slug} post={post} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
