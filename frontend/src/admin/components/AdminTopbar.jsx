import { FiMenu, FiUser } from 'react-icons/fi'
import useAuth from '../../hooks/useAuth'

export default function AdminTopbar({ onMenuClick }) {
  const { admin } = useAuth()

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-beige flex items-center justify-between px-5 py-4">
      <button type="button" className="lg:hidden text-xl text-darkCoffee" onClick={onMenuClick} aria-label="Open sidebar">
        <FiMenu />
      </button>
      <p className="text-sm text-textSecondary hidden lg:block">Welcome back, manage your clinic content here.</p>
      <div className="flex items-center gap-2 text-sm text-textMain font-medium">
        <span className="w-8 h-8 rounded-full bg-beige flex items-center justify-center text-darkCoffee">
          <FiUser />
        </span>
        {admin?.name || admin?.email || 'Admin'}
      </div>
    </header>
  )
}
