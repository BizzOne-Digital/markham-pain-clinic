import { useEffect, useState } from 'react'
import DataTable from '../components/DataTable.jsx'
import FormField from '../components/FormField.jsx'
import ImageUploader from '../components/ImageUploader.jsx'
import ConfirmDeleteModal from '../components/ConfirmDeleteModal.jsx'
import testimonialsApi from '../../services/testimonialsApi'

const emptyForm = { name: '', testimonial: '', rating: 5, serviceCategory: '', published: true }

export default function TestimonialsManager() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [photo, setPhoto] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [showForm, setShowForm] = useState(false)

  function load() {
    setLoading(true)
    testimonialsApi
      .getAll()
      .then((res) => setItems(res?.data?.data || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  function openCreate() {
    setEditing(null)
    setForm(emptyForm)
    setPhoto(null)
    setShowForm(true)
  }

  function openEdit(item) {
    setEditing(item)
    setForm({
      name: item.name || '',
      testimonial: item.testimonial || item.message || '',
      rating: item.rating || 5,
      serviceCategory: item.serviceCategory || '',
      published: item.status !== 'unpublished',
    })
    setPhoto(null)
    setShowForm(true)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const payload = new FormData()
    payload.append('name', form.name)
    payload.append('message', form.testimonial)
    payload.append('rating', form.rating)
    payload.append('serviceCategory', form.serviceCategory)
    payload.append('status', form.published ? 'published' : 'unpublished')
    if (photo) payload.append('image', photo)

    try {
      if (editing) await testimonialsApi.update(editing._id, payload)
      else await testimonialsApi.create(payload)
      setShowForm(false)
      load()
    } catch {
      alert('Failed to save testimonial. Please check the backend connection.')
    }
  }

  async function handleDelete() {
    try {
      await testimonialsApi.remove(deleteTarget._id)
      setDeleteTarget(null)
      load()
    } catch {
      alert('Failed to delete testimonial.')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl text-textMain">Testimonials</h1>
        <button type="button" onClick={openCreate} className="admin-btn-primary">
          + Add Testimonial
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="admin-card space-y-5">
          <h2 className="font-serif text-lg text-textMain">{editing ? 'Edit Testimonial' : 'New Testimonial'}</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            <FormField label="Patient Name" name="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <FormField
              label="Service Category"
              name="serviceCategory"
              value={form.serviceCategory}
              onChange={(e) => setForm({ ...form, serviceCategory: e.target.value })}
            />
          </div>
          <FormField
            label="Testimonial"
            name="testimonial"
            textarea
            value={form.testimonial}
            onChange={(e) => setForm({ ...form, testimonial: e.target.value })}
            required
          />
          <FormField
            label="Rating (1-5)"
            name="rating"
            type="number"
            value={form.rating}
            onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
          />
          <ImageUploader label="Patient Photo (optional)" value={editing?.photo} onChange={setPhoto} />
          <label className="flex items-center gap-2 text-sm text-textMain">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => setForm({ ...form, published: e.target.checked })}
            />
            Published
          </label>
          <div className="flex gap-3">
            <button type="submit" className="admin-btn-primary">
              Save
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="btn-secondary !py-2.5 !px-5 text-sm">
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="admin-card">
        <DataTable
          columns={[
            { key: 'name', label: 'Name' },
            { key: 'rating', label: 'Rating' },
            { key: 'status', label: 'Status', render: (row) => (row.status === 'published' ? 'Published' : 'Unpublished') },
          ]}
          data={loading ? [] : items}
          onEdit={openEdit}
          onDelete={setDeleteTarget}
          emptyMessage={loading ? 'Loading...' : 'No testimonials yet.'}
        />
      </div>

      <ConfirmDeleteModal
        open={Boolean(deleteTarget)}
        title="Delete this testimonial?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}
