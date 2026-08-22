import { useEffect, useState } from 'react'
import DataTable from '../components/DataTable.jsx'
import FormField from '../components/FormField.jsx'
import ImageUploader from '../components/ImageUploader.jsx'
import ConfirmDeleteModal from '../components/ConfirmDeleteModal.jsx'
import servicesApi from '../../services/servicesApi'

const emptyForm = { name: '', shortDescription: '', description: '', slug: '' }

export default function ServicesManager() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [image, setImage] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [showForm, setShowForm] = useState(false)

  function load() {
    setLoading(true)
    servicesApi
      .getAll()
      .then((res) => setItems(res?.data?.data || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  function openCreate() {
    setEditing(null)
    setForm(emptyForm)
    setImage(null)
    setShowForm(true)
  }

  function openEdit(item) {
    setEditing(item)
    setForm({ name: item.name || '', shortDescription: item.shortDescription || '', description: item.description || '', slug: item.slug || '' })
    setImage(null)
    setShowForm(true)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const payload = new FormData()
    payload.append('title', form.name)
    payload.append('shortDescription', form.shortDescription)
    payload.append('description', form.description)
    if (form.slug) payload.append('slug', form.slug)
    if (image) payload.append('image', image)

    try {
      if (editing) await servicesApi.update(editing._id, payload)
      else await servicesApi.create(payload)
      setShowForm(false)
      load()
    } catch {
      alert('Failed to save service. Please check the backend connection.')
    }
  }

  async function handleDelete() {
    try {
      await servicesApi.remove(deleteTarget._id)
      setDeleteTarget(null)
      load()
    } catch {
      alert('Failed to delete service.')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl text-textMain">Services</h1>
        <button type="button" onClick={openCreate} className="admin-btn-primary">
          + Add Service
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="admin-card space-y-5">
          <h2 className="font-serif text-lg text-textMain">{editing ? 'Edit Service' : 'New Service'}</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            <FormField label="Name" name="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <FormField label="Slug" name="slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="auto-generated if left blank" />
          </div>
          <FormField
            label="Short Description"
            name="shortDescription"
            value={form.shortDescription}
            onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
            required
          />
          <FormField
            label="Full Description"
            name="description"
            textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <ImageUploader label="Service Image" value={editing?.image} onChange={setImage} />
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
            { key: 'shortDescription', label: 'Description' },
          ]}
          data={loading ? [] : items}
          onEdit={openEdit}
          onDelete={setDeleteTarget}
          emptyMessage={loading ? 'Loading...' : 'No services yet.'}
        />
      </div>

      <ConfirmDeleteModal
        open={Boolean(deleteTarget)}
        title="Delete this service?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}
