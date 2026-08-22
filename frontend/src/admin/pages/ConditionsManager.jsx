import { useEffect, useState } from 'react'
import DataTable from '../components/DataTable.jsx'
import FormField from '../components/FormField.jsx'
import ConfirmDeleteModal from '../components/ConfirmDeleteModal.jsx'
import conditionsApi from '../../services/conditionsApi'

export default function ConditionsManager() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [name, setName] = useState('')
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [showForm, setShowForm] = useState(false)

  function load() {
    setLoading(true)
    conditionsApi
      .getAll()
      .then((res) => setItems(res?.data?.data || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  function openCreate() {
    setEditing(null)
    setName('')
    setShowForm(true)
  }

  function openEdit(item) {
    setEditing(item)
    setName(item.name || '')
    setShowForm(true)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      if (editing) await conditionsApi.update(editing._id, { name })
      else await conditionsApi.create({ name })
      setShowForm(false)
      load()
    } catch {
      alert('Failed to save condition. Please check the backend connection.')
    }
  }

  async function handleDelete() {
    try {
      await conditionsApi.remove(deleteTarget._id)
      setDeleteTarget(null)
      load()
    } catch {
      alert('Failed to delete condition.')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl text-textMain">Conditions</h1>
        <button type="button" onClick={openCreate} className="admin-btn-primary">
          + Add Condition
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="admin-card space-y-5">
          <h2 className="font-serif text-lg text-textMain">{editing ? 'Edit Condition' : 'New Condition'}</h2>
          <FormField label="Name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
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
          columns={[{ key: 'name', label: 'Name' }]}
          data={loading ? [] : items}
          onEdit={openEdit}
          onDelete={setDeleteTarget}
          emptyMessage={loading ? 'Loading...' : 'No conditions yet.'}
        />
      </div>

      <ConfirmDeleteModal
        open={Boolean(deleteTarget)}
        title="Delete this condition?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}
