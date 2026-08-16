import { Link } from 'react-router-dom'
import { FiUser, FiCreditCard, FiSend, FiUsers, FiList, FiFileText, FiBell, FiSettings, FiLock, FiArrowRight } from 'react-icons/fi'

export default function Settings() {
  const settingsItems = [
    { to: '/profile', icon: FiUser, label: 'Profile', desc: 'Update your personal information', color: 'from-primary-500 to-primary-600' },
    { to: '/account', icon: FiCreditCard, label: 'Account', desc: 'View account details and balance', color: 'from-success-500 to-success-600' },
    { to: '/transfer', icon: FiSend, label: 'Transfer', desc: 'Send money to other accounts', color: 'from-warning-500 to-warning-600' },
    { to: '/beneficiaries', icon: FiUsers, label: 'Beneficiaries', desc: 'Manage your transfer recipients', color: 'from-primary-500 to-primary-600' },
    { to: '/transactions', icon: FiList, label: 'Transactions', desc: 'View transaction history', color: 'from-success-500 to-success-600' },
    { to: '/documents', icon: FiFileText, label: 'Documents', desc: 'Upload KYC documents', color: 'from-warning-500 to-warning-600' },
    { to: '/notifications', icon: FiBell, label: 'Notifications', desc: 'View your notifications', color: 'from-danger-500 to-danger-600' },
    { to: '/change-password', icon: FiLock, label: 'Change Password', desc: 'Update your password', color: 'from-slate-600 to-slate-700' },
  ]

  return (
    <div className="space-y-6 max-w-5xl animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Settings</h1>
        <p className="text-gray-600">Manage your account and preferences</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {settingsItems.map(item => (
          <Link
            key={item.to}
            to={item.to}
            className="card p-6 hover:shadow-glow transition-all group border border-gray-100"
          >
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                <item.icon size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-lg">{item.label}</h3>
                <p className="text-sm text-gray-500 mt-0.5">{item.desc}</p>
              </div>
              <FiArrowRight className="text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" size={20} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
