import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import FormField from '../components/FormField.jsx'
import ImageUploader from '../components/ImageUploader.jsx'
import blogsApi from '../../services/blogsApi'

const emptyForm = { title: '', slug: '', category: '', excerpt: '', content: '', status: 'draft' }

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export default function BlogEditor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = Boolean(id)
  const [form, setForm] = useState(emptyForm)
  const [featuredImage, setFeaturedImage] = useState(null)
  const [existingImage, setExistingImage] = useState('')
  const [slugTouched, setSlugTouched] = useState(false)
  const [loading, setLoading] = useState(isEditing)

  useEffect(() => {
    if (!isEditing) return
    blogsApi
      .getOne(id)
      .then((res) => {
        const post = res?.data?.data
        if (post) {
          setForm({
            title: post.title || '',
            slug: post.slug || '',
            category: post.category || '',
            excerpt: post.excerpt || '',
            content: post.content || '',
            status: post.status || 'draft',
          })
          setExistingImage(post.featuredImage || '')
          setSlugTouched(true)
        }
      })
      .catch(() => {
        // Fallback: could not load post for editing
      })
      .finally(() => setLoading(false))
  }, [id, isEditing])

  function handleTitleChange(value) {
    setForm((prev) => ({ ...prev, title: value, slug: slugTouched ? prev.slug : slugify(value) }))
  }

  async function handleSubmit(e, publish) {
    e.preventDefault()
    const payload = new FormData()
    payload.append('title', form.title)
    payload.append('slug', form.slug)
    payload.append('categories', form.category)
    payload.append('excerpt', form.excerpt)
    payload.append('content', form.content)
    payload.append('status', publish ? 'published' : form.status)
    if (featuredImage) payload.append('featuredImage', featuredImage)

    try {
      if (isEditing) await blogsApi.update(id, payload)
      else await blogsApi.create(payload)
      navigate('/admin/blog')
    } catch {
      alert('Failed to save blog post. Please check the backend connection.')
    }
  }

  if (loading) return <p className="text-textSecondary text-sm">Loading post...</p>

  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="font-serif text-2xl text-textMain">{isEditing ? 'Edit Post' : 'New Post'}</h1>
      <form className="admin-card space-y-5">
        <FormField label="Title" name="title" value={form.title} onChange={(e) => handleTitleChange(e.target.value)} required />
        <FormField
          label="Slug"
          name="slug"
          value={form.slug}
          onChange={(e) => {
            setSlugTouched(true)
            setForm({ ...form, slug: e.target.value })
          }}
          required
        />
        <FormField label="Category" name="category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
        <FormField
          label="Excerpt"
          name="excerpt"
          textarea
          value={form.excerpt}
          onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
        />
        <FormField
          label="Content"
          name="content"
          textarea
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          required
        />
        <ImageUploader label="Featured Image" value={existingImage} onChange={setFeaturedImage} />
        <div className="flex gap-3">
          <button type="button" onClick={(e) => handleSubmit(e, false)} className="btn-secondary !py-2.5 !px-5 text-sm">
            Save Draft
          </button>
          <button type="button" onClick={(e) => handleSubmit(e, true)} className="admin-btn-primary">
            Publish
          </button>
          <button type="button" onClick={() => navigate('/admin/blog')} className="text-sm text-textSecondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
