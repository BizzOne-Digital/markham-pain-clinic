import { useEffect, useState } from 'react'
import DataTable from '../components/DataTable.jsx'
import FormField from '../components/FormField.jsx'
import ImageUploader from '../components/ImageUploader.jsx'
import ConfirmDeleteModal from '../components/ConfirmDeleteModal.jsx'
import teamApi from '../../services/teamApi'

const emptyForm = { name: '', role: '', specialization: '', bio: '', philosophy: '' }

export default function TeamManager() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [photo, setPhoto] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [showForm, setShowForm] = useState(false)

  function load() {
    setLoading(true)
    teamApi
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
      role: item.role || '',
      specialization: item.specialization || '',
      bio: item.bio || '',
      philosophy: item.philosophy || '',
    })
    setPhoto(null)
    setShowForm(true)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const payload = new FormData()
    payload.append('name', form.name)
    payload.append('designation', form.role)
    payload.append('specialization', form.specialization)
    payload.append('bio', form.bio)
    payload.append('philosophy', form.philosophy)
    if (photo) payload.append('image', photo)

    try {
      if (editing) await teamApi.update(editing._id, payload)
      else await teamApi.create(payload)
      setShowForm(false)
      load()
    } catch {
      alert('Failed to save team member. Please check the backend connection.')
    }
  }

  async function handleDelete() {
    try {
      await teamApi.remove(deleteTarget._id)
      setDeleteTarget(null)
      load()
    } catch {
      alert('Failed to delete team member.')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl text-textMain">Team</h1>
        <button type="button" onClick={openCreate} className="admin-btn-primary">
          + Add Team Member
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="admin-card space-y-5">
          <h2 className="font-serif text-lg text-textMain">{editing ? 'Edit Member' : 'New Team Member'}</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            <FormField label="Name" name="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <FormField label="Role" name="role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} required />
          </div>
          <FormField
            label="Specialization"
            name="specialization"
            value={form.specialization}
            onChange={(e) => setForm({ ...form, specialization: e.target.value })}
          />
          <FormField label="Biography" name="bio" textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
          <FormField
            label="Philosophy"
            name="philosophy"
            textarea
            value={form.philosophy}
            onChange={(e) => setForm({ ...form, philosophy: e.target.value })}
          />
          <ImageUploader label="Photo" value={editing?.photo} onChange={setPhoto} />
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
            { key: 'role', label: 'Role', render: (row) => row.designation },
            { key: 'specialization', label: 'Specialization' },
          ]}
          data={loading ? [] : items}
          onEdit={openEdit}
          onDelete={setDeleteTarget}
          emptyMessage={loading ? 'Loading...' : 'No team members yet.'}
        />
      </div>

      <ConfirmDeleteModal
        open={Boolean(deleteTarget)}
        title="Delete this team member?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}
