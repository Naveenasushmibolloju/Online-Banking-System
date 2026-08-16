import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import {
  FiHome, FiUsers, FiCreditCard, FiList, FiFileText,
  FiBarChart, FiLogOut, FiMenu, FiX
} from 'react-icons/fi'
import { useState } from 'react'

const adminNavItems = [
  { to: '/admin', icon: FiHome, label: 'Dashboard' },
  { to: '/admin/customers', icon: FiUsers, label: 'Customers' },
  { to: '/admin/accounts', icon: FiCreditCard, label: 'Accounts' },
  { to: '/admin/transactions', icon: FiList, label: 'Transactions' },
  { to: '/admin/documents', icon: FiFileText, label: 'KYC Documents' },
]

export default function AdminLayout({ children }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-slate-900/90 backdrop-blur-xl border-b border-white/10 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
            <FiBarChart className="text-white" size={16} />
          </div>
          <span className="text-lg font-bold text-white">BankApp Admin</span>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg text-gray-300 hover:bg-white/10 transition-colors">
          {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:block ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg">
                <FiBarChart className="text-white" size={20} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">BankApp Admin</h1>
                <p className="text-xs text-gray-400">Management Panel</p>
              </div>
            </div>
          </div>

          <nav className="p-4 space-y-1">
            {adminNavItems.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive ? 'bg-white/10 text-white shadow-sm' : 'text-gray-300 hover:bg-white/5'}`
                }
              >
                <item.icon size={18} />
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-sm">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white truncate">{user?.firstName} {user?.lastName}</p>
                <p className="text-xs text-gray-400 truncate">{user?.email}</p>
              </div>
            </div>
            <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2.5 text-gray-300 hover:bg-white/10 hover:text-white rounded-xl text-sm font-semibold transition-colors">
              <FiLogOut size={16} />
              Logout
            </button>
          </div>
        </aside>

        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          <div className="p-4 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
