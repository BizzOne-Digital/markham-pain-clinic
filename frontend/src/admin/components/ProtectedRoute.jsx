import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import LoadingSpinner from '../../components/LoadingSpinner.jsx'

export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth()

  if (loading) return <LoadingSpinner label="Checking session..." />
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />
  return <Outlet />
}
