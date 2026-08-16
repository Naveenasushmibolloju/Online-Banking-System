import { useState, useEffect } from 'react'
import api from '../../services/api'
import { FiUsers, FiCreditCard, FiList, FiCheck, FiClock, FiX, FiFileText, FiTrendingUp, FiActivity } from 'react-icons/fi'

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const res = await api.get('/admin/dashboard')
      setStats(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-4 border-primary-200 border-t-primary-600 animate-spin"></div>
        </div>
      </div>
    )
  }

  if (!stats) {
    return <div className="text-center py-12 text-gray-500">Failed to load dashboard data</div>
  }

  const statCards = [
    { label: 'Total Customers', value: stats.totalCustomers, icon: FiUsers, color: 'from-primary-500 to-primary-600', bg: 'from-primary-50 to-primary-100/50' },
    { label: 'Active Customers', value: stats.activeCustomers, icon: FiCheck, color: 'from-success-500 to-success-600', bg: 'from-success-50 to-success-100/50' },
    { label: 'Inactive Customers', value: stats.inactiveCustomers, icon: FiX, color: 'from-danger-500 to-danger-600', bg: 'from-danger-50 to-danger-100/50' },
    { label: 'Total Accounts', value: stats.totalAccounts, icon: FiCreditCard, color: 'from-primary-500 to-primary-600', bg: 'from-primary-50 to-primary-100/50' },
    { label: 'Total Transactions', value: stats.totalTransactions, icon: FiList, color: 'from-primary-500 to-primary-600', bg: 'from-primary-50 to-primary-100/50' },
    { label: 'Completed', value: stats.completedTransactions, icon: FiCheck, color: 'from-success-500 to-success-600', bg: 'from-success-50 to-success-100/50' },
    { label: 'Pending', value: stats.pendingTransactions, icon: FiClock, color: 'from-warning-500 to-warning-600', bg: 'from-warning-50 to-warning-100/50' },
    { label: 'Failed', value: stats.failedTransactions, icon: FiX, color: 'from-danger-500 to-danger-600', bg: 'from-danger-50 to-danger-100/50' },
  ]

  return (
    <div className="space-y-6 max-w-7xl animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Admin Dashboard</h1>
        <p className="text-gray-600">System overview and statistics</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {statCards.map(stat => (
          <div key={stat.label} className={`card p-5 bg-gradient-to-br ${stat.bg} border-0 hover:shadow-glow transition-all`}>
            <div className="flex items-center justify-between mb-3">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-md`}>
                <stat.icon size={20} />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-600 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center text-primary-600">
              <FiActivity size={20} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">KYC Statistics</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50/50">
              <span className="text-gray-600 font-medium">Total Documents</span>
              <span className="font-bold text-gray-900">{stats.totalDocuments}</span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-warning-50/50">
              <span className="text-warning-700 font-medium">Pending Review</span>
              <span className="font-bold text-warning-700">{stats.pendingDocuments}</span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-success-50/50">
              <span className="text-success-700 font-medium">Approved</span>
              <span className="font-bold text-success-700">{stats.approvedDocuments}</span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-danger-50/50">
              <span className="text-danger-700 font-medium">Rejected</span>
              <span className="font-bold text-danger-700">{stats.rejectedDocuments}</span>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-success-100 to-success-50 flex items-center justify-center text-success-600">
              <FiTrendingUp size={20} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Quick Links</h3>
          </div>
          <div className="space-y-3">
            {[
              { to: '/admin/customers', icon: FiUsers, label: 'Manage Customers', color: 'from-primary-500 to-primary-600' },
              { to: '/admin/transactions', icon: FiList, label: 'View Transactions', color: 'from-success-500 to-success-600' },
              { to: '/admin/documents', icon: FiFileText, label: 'Review KYC Documents', color: 'from-warning-500 to-warning-600' },
            ].map((link, idx) => (
              <a key={idx} href={link.to} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50/50 hover:bg-gray-50 transition-all border border-gray-100 hover:border-gray-200 group">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
                  <link.icon size={18} />
                </div>
                <span className="font-semibold text-gray-900">{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
