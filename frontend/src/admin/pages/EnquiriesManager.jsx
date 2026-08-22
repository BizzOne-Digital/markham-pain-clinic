import { useEffect, useState } from 'react'
import DataTable from '../components/DataTable.jsx'
import ConfirmDeleteModal from '../components/ConfirmDeleteModal.jsx'
import enquiriesApi from '../../services/enquiriesApi'
import { formatDate } from '../../utils/formatDate'

export default function EnquiriesManager() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [viewing, setViewing] = useState(null)

  function load() {
    setLoading(true)
    enquiriesApi
      .getAll()
      .then((res) => setItems(res?.data?.data || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  async function handleDelete() {
    try {
      await enquiriesApi.remove(deleteTarget._id)
      setDeleteTarget(null)
      load()
    } catch {
      alert('Failed to delete enquiry.')
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="font-serif text-2xl text-textMain">Enquiries</h1>

      <div className="admin-card">
        <DataTable
          columns={[
            { key: 'fullName', label: 'Name' },
            { key: 'email', label: 'Email' },
            { key: 'phone', label: 'Phone' },
            { key: 'serviceInterested', label: 'Service' },
            { key: 'createdAt', label: 'Date', render: (row) => formatDate(row.createdAt) },
          ]}
          data={loading ? [] : items}
          onEdit={setViewing}
          onDelete={setDeleteTarget}
          emptyMessage={loading ? 'Loading...' : 'No enquiries yet.'}
        />
      </div>

      {viewing && (
        <div className="admin-card max-w-lg">
          <h2 className="font-serif text-lg text-textMain mb-4">Enquiry Detail</h2>
          <dl className="space-y-2 text-sm">
            <div>
              <dt className="text-textSecondary">Name</dt>
              <dd className="text-textMain font-medium">{viewing.fullName}</dd>
            </div>
            <div>
              <dt className="text-textSecondary">Email</dt>
              <dd className="text-textMain font-medium">{viewing.email}</dd>
            </div>
            <div>
              <dt className="text-textSecondary">Phone</dt>
              <dd className="text-textMain font-medium">{viewing.phone}</dd>
            </div>
            <div>
              <dt className="text-textSecondary">Message</dt>
              <dd className="text-textMain">{viewing.message}</dd>
            </div>
          </dl>
          <button type="button" onClick={() => setViewing(null)} className="btn-secondary !py-2 !px-5 text-xs mt-5">
            Close
          </button>
        </div>
      )}

      <ConfirmDeleteModal
        open={Boolean(deleteTarget)}
        title="Delete this enquiry?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}
