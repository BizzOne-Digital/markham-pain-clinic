import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DataTable from '../components/DataTable.jsx'
import ConfirmDeleteModal from '../components/ConfirmDeleteModal.jsx'
import blogsApi from '../../services/blogsApi'
import { formatDate } from '../../utils/formatDate'

export default function BlogManager() {
  const navigate = useNavigate()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState(null)

  function load() {
    setLoading(true)
    blogsApi
      .getAll()
      .then((res) => setItems(res?.data?.data || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  async function handleDelete() {
    try {
      await blogsApi.remove(deleteTarget._id)
      setDeleteTarget(null)
      load()
    } catch {
      alert('Failed to delete blog post.')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl text-textMain">Blog Posts</h1>
        <button type="button" onClick={() => navigate('/admin/blog/new')} className="admin-btn-primary">
          + New Post
        </button>
      </div>

      <div className="admin-card">
        <DataTable
          columns={[
            { key: 'title', label: 'Title' },
            { key: 'category', label: 'Category', render: (row) => row.categories?.[0] || '—' },
            { key: 'status', label: 'Status', render: (row) => (row.status === 'published' ? 'Published' : 'Draft') },
            { key: 'createdAt', label: 'Date', render: (row) => formatDate(row.createdAt) },
          ]}
          data={loading ? [] : items}
          onEdit={(row) => navigate(`/admin/blog/${row._id}/edit`)}
          onDelete={setDeleteTarget}
          emptyMessage={loading ? 'Loading...' : 'No blog posts yet.'}
        />
      </div>

      <ConfirmDeleteModal
        open={Boolean(deleteTarget)}
        title="Delete this blog post?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}
