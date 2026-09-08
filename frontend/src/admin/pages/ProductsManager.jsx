import { useEffect, useState } from 'react'
import DataTable from '../components/DataTable.jsx'
import FormField from '../components/FormField.jsx'
import ImageUploader from '../components/ImageUploader.jsx'
import ConfirmDeleteModal from '../components/ConfirmDeleteModal.jsx'
import productsApi from '../../services/productsApi'

export default function ProductsManager() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [showForm, setShowForm] = useState(false)

  function load() {
    setLoading(true)
    productsApi
      .getAll()
      .then((res) => setItems(res?.data?.data || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  function openCreate() {
    setEditing(null)
    setName('')
    setDescription('')
    setPrice('')
    setImage(null)
    setShowForm(true)
  }

  function openEdit(item) {
    setEditing(item)
    setName(item.name || '')
    setDescription(item.description || '')
    setPrice(item.price || '')
    setImage(null)
    setShowForm(true)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const payload = new FormData()
    payload.append('name', name)
    payload.append('description', description)
    payload.append('price', price)
    if (image) payload.append('image', image)

    try {
      if (editing) await productsApi.update(editing._id, payload)
      else await productsApi.create(payload)
      setShowForm(false)
      load()
    } catch {
      alert('Failed to save product. Please check the backend connection.')
    }
  }

  async function handleDelete() {
    try {
      await productsApi.remove(deleteTarget._id)
      setDeleteTarget(null)
      load()
    } catch {
      alert('Failed to delete product.')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl text-textMain">Products</h1>
        <button type="button" onClick={openCreate} className="admin-btn-primary">
          + Add Product
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="admin-card space-y-5">
          <h2 className="font-serif text-lg text-textMain">{editing ? 'Edit Product' : 'New Product'}</h2>
          <FormField label="Name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
          <FormField label="Price" name="price" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g. $49" />
          <div>
            <label className="admin-label" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="admin-input resize-none"
            />
          </div>
          <ImageUploader label="Product Image" value={editing?.image} onChange={setImage} />
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
            { key: 'price', label: 'Price' },
          ]}
          data={loading ? [] : items}
          onEdit={openEdit}
          onDelete={setDeleteTarget}
          emptyMessage={loading ? 'Loading...' : 'No products yet.'}
        />
      </div>

      <ConfirmDeleteModal
        open={Boolean(deleteTarget)}
        title="Delete this product?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}
