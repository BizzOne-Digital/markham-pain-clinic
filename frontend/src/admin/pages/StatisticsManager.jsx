import { useEffect, useState } from 'react'
import DataTable from '../components/DataTable.jsx'
import FormField from '../components/FormField.jsx'
import ConfirmDeleteModal from '../components/ConfirmDeleteModal.jsx'
import statsApi from '../../services/statsApi'

const emptyForm = { label: '', value: '', suffix: '' }

export default function StatisticsManager() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [showForm, setShowForm] = useState(false)

  function load() {
    setLoading(true)
    statsApi
      .getAll()
      .then((res) => setItems(res?.data?.data || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  function openCreate() {
    setEditing(null)
    setForm(emptyForm)
    setShowForm(true)
  }

  function openEdit(item) {
    setEditing(item)
    setForm({ label: item.label || '', value: item.value ?? '', suffix: item.suffix || '' })
    setShowForm(true)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const payload = { ...form, value: Number(form.value) }
      if (editing) await statsApi.update(editing._id, payload)
      else await statsApi.create(payload)
      setShowForm(false)
      load()
    } catch {
      alert('Failed to save statistic. Please check the backend connection.')
    }
  }

  async function handleDelete() {
    try {
      await statsApi.remove(deleteTarget._id)
      setDeleteTarget(null)
      load()
    } catch {
      alert('Failed to delete statistic.')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl text-textMain">Statistics</h1>
        <button type="button" onClick={openCreate} className="admin-btn-primary">
          + Add Statistic
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="admin-card space-y-5">
          <h2 className="font-serif text-lg text-textMain">{editing ? 'Edit Statistic' : 'New Statistic'}</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            <FormField label="Label" name="label" value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} required />
            <FormField label="Value" name="value" type="number" value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} required />
            <FormField label="Suffix" name="suffix" value={form.suffix} onChange={(e) => setForm({ ...form, suffix: e.target.value })} placeholder="+ or %" />
          </div>
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
            { key: 'label', label: 'Label' },
            { key: 'value', label: 'Value' },
            { key: 'suffix', label: 'Suffix' },
          ]}
          data={loading ? [] : items}
          onEdit={openEdit}
          onDelete={setDeleteTarget}
          emptyMessage={loading ? 'Loading...' : 'No statistics yet.'}
        />
      </div>

      <ConfirmDeleteModal
        open={Boolean(deleteTarget)}
        title="Delete this statistic?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}
