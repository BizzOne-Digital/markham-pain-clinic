import { useEffect, useState } from 'react'
import DataTable from '../components/DataTable.jsx'
import FormField from '../components/FormField.jsx'
import ConfirmDeleteModal from '../components/ConfirmDeleteModal.jsx'
import faqsApi from '../../services/faqsApi'

const emptyForm = { question: '', answer: '' }

export default function FAQManager() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [showForm, setShowForm] = useState(false)

  function load() {
    setLoading(true)
    faqsApi
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
    setForm({ question: item.question || '', answer: item.answer || '' })
    setShowForm(true)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      if (editing) await faqsApi.update(editing._id, form)
      else await faqsApi.create(form)
      setShowForm(false)
      load()
    } catch {
      alert('Failed to save FAQ. Please check the backend connection.')
    }
  }

  async function handleDelete() {
    try {
      await faqsApi.remove(deleteTarget._id)
      setDeleteTarget(null)
      load()
    } catch {
      alert('Failed to delete FAQ.')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl text-textMain">FAQs</h1>
        <button type="button" onClick={openCreate} className="admin-btn-primary">
          + Add FAQ
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="admin-card space-y-5">
          <h2 className="font-serif text-lg text-textMain">{editing ? 'Edit FAQ' : 'New FAQ'}</h2>
          <FormField label="Question" name="question" value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} required />
          <FormField label="Answer" name="answer" textarea value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} required />
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
          columns={[{ key: 'question', label: 'Question' }]}
          data={loading ? [] : items}
          onEdit={openEdit}
          onDelete={setDeleteTarget}
          emptyMessage={loading ? 'Loading...' : 'No FAQs yet.'}
        />
      </div>

      <ConfirmDeleteModal open={Boolean(deleteTarget)} title="Delete this FAQ?" onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />
    </div>
  )
}
