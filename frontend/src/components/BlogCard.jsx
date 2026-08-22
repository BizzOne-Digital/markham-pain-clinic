import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { formatDate } from '../utils/formatDate'
import { truncateText } from '../utils/truncateText'

export default function BlogCard({ post, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="card group"
    >
      <div className="overflow-hidden h-52">
        <img
          src={post.featuredImage}
          alt={post.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-3 text-xs text-textSecondary mb-3">
          <span className="text-gold font-semibold uppercase tracking-wide">{post.category}</span>
          <span>•</span>
          <span>{formatDate(post.createdAt)}</span>
        </div>
        <h3 className="font-serif text-lg text-textMain mb-2 leading-snug">{post.title}</h3>
        <p className="text-textSecondary text-sm mb-4">{truncateText(post.excerpt, 110)}</p>
        <Link to={`/blog/${post.slug}`} className="text-sm font-semibold link-underline text-darkCoffee">
          Read More
        </Link>
      </div>
    </motion.div>
  )
}
