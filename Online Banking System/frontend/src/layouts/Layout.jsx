import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import {
  FiHome, FiUser, FiCreditCard, FiSend, FiUsers,
  FiList, FiFileText, FiBell, FiSettings, FiLock,
  FiLogOut, FiMenu, FiX
} from 'react-icons/fi'
import { useState } from 'react'

const navItems = [
  { to: '/dashboard', icon: FiHome, label: 'Dashboard' },
  { to: '/profile', icon: FiUser, label: 'Profile' },
  { to: '/account', icon: FiCreditCard, label: 'Account' },
  { to: '/transfer', icon: FiSend, label: 'Transfer' },
  { to: '/beneficiaries', icon: FiUsers, label: 'Beneficiaries' },
  { to: '/transactions', icon: FiList, label: 'Transactions' },
  { to: '/documents', icon: FiFileText, label: 'Documents' },
  { to: '/notifications', icon: FiBell, label: 'Notifications' },
  { to: '/settings', icon: FiSettings, label: 'Settings' },
  { to: '/change-password', icon: FiLock, label: 'Change Password' },
]

export default function Layout({ children }) {
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
      <div className="lg:hidden bg-white/80 backdrop-blur-xl border-b border-gray-200/60 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center">
            <FiCreditCard className="text-white" size={16} />
          </div>
          <span className="text-lg font-bold gradient-text">BankApp</span>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
          {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200/60 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:block ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center shadow-lg shadow-primary-200">
                <FiCreditCard className="text-white" size={20} />
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">BankApp</h1>
                <p className="text-xs text-gray-500">Online Banking</p>
              </div>
            </div>
          </div>

          <nav className="p-4 space-y-1">
            {navItems.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive ? 'bg-gradient-to-r from-primary-50 to-primary-100/50 text-primary-700 shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`
                }
              >
                <item.icon size={18} />
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center text-primary-700 font-bold text-sm">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{user?.firstName} {user?.lastName}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
            </div>
            <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2.5 text-danger-600 hover:bg-danger-50 rounded-xl text-sm font-semibold transition-colors">
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
