import { createContext, useEffect, useState } from 'react'
import authApi from '../services/authApi'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('mpc_token')
    const storedAdmin = localStorage.getItem('mpc_admin')
    if (token && storedAdmin) {
      try {
        setAdmin(JSON.parse(storedAdmin))
      } catch {
        localStorage.removeItem('mpc_admin')
      }
    }
    setLoading(false)
  }, [])

  async function login(email, password) {
    const res = await authApi.login({ email, password })
    const token = res?.data?.data?.token || res?.data?.token
    const adminData = res?.data?.data?.admin || res?.data?.admin || { email }
    if (!token) throw new Error('No token returned from server')
    localStorage.setItem('mpc_token', token)
    localStorage.setItem('mpc_admin', JSON.stringify(adminData))
    setAdmin(adminData)
    return adminData
  }

  function logout() {
    localStorage.removeItem('mpc_token')
    localStorage.removeItem('mpc_admin')
    setAdmin(null)
  }

  const isAuthenticated = Boolean(admin && localStorage.getItem('mpc_token'))

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}
