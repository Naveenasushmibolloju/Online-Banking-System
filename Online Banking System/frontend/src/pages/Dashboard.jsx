import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'
import {
  FiCreditCard, FiSend, FiUsers, FiBell, FiTrendingUp, FiArrowRight,
  FiRefreshCw, FiActivity, FiDollarSign, FiPieChart
} from 'react-icons/fi'
import { formatCurrency, formatDate } from '../utils/format'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

export default function Dashboard() {
  const [accounts, setAccounts] = useState([])
  const [transactions, setTransactions] = useState([])
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    setError('')
    try {
      const [accRes, txnRes, notifRes] = await Promise.all([
        api.get('/accounts'),
        api.get('/transactions'),
        api.get('/notifications'),
      ])
      setAccounts(accRes.data)
      setTransactions(txnRes.data.transactions || [])
      setNotifications(notifRes.data.notifications || [])
    } catch (err) {
      setError('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  const account = accounts[0]
  const balance = account?.balance || 0
  const recentTransactions = transactions.slice(0, 5)
  const unreadNotifications = notifications.filter(n => !n.isRead).length

  const pieData = [
    { name: 'Received', value: transactions.filter(t => t.type === 'received').reduce((sum, t) => sum + t.amount, 0), color: '#149948' },
    { name: 'Sent', value: transactions.filter(t => t.type === 'transfer').reduce((sum, t) => sum + t.amount, 0), color: '#dc2626' },
    { name: 'Other', value: transactions.filter(t => !['received', 'transfer'].includes(t.type)).reduce((sum, t) => sum + t.amount, 0), color: '#4c6ef5' },
  ].filter(item => item.value > 0)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-4 border-primary-200 border-t-primary-600 animate-spin"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your financial overview.</p>
        </div>
        <button
          onClick={loadData}
          className="btn-secondary flex items-center gap-2 self-start"
        >
          <FiRefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {error && (
        <div className="p-4 bg-danger-50 border border-danger-100 rounded-xl text-danger-700 flex items-center justify-between">
          <span className="font-medium">{error}</span>
          <button onClick={loadData} className="text-danger-600 hover:text-danger-700">
            <FiRefreshCw size={18} />
          </button>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <div className="card p-6 bg-gradient-to-br from-primary-50 to-white border-primary-100/60 hover:shadow-glow transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white shadow-lg shadow-primary-200">
              <FiDollarSign size={24} />
            </div>
            <span className="badge-success">Active</span>
          </div>
          <p className="text-sm font-medium text-gray-500 mb-1">Current Balance</p>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(balance)}</p>
          <p className="text-xs text-gray-500 mt-2 font-mono">{account?.accountNumber || 'N/A'}</p>
        </div>

        <div className="card p-6 bg-gradient-to-br from-success-50 to-white border-success-100/60 hover:shadow-glow transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-success-500 to-success-600 flex items-center justify-center text-white shadow-lg shadow-success-200">
              <FiActivity size={24} />
            </div>
          </div>
          <p className="text-sm font-medium text-gray-500 mb-1">Transactions</p>
          <p className="text-2xl font-bold text-gray-900">{transactions.length}</p>
          <p className="text-xs text-gray-500 mt-2">All time</p>
        </div>

        <div className="card p-6 bg-gradient-to-br from-warning-50 to-white border-warning-100/60 hover:shadow-glow transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-warning-500 to-warning-600 flex items-center justify-center text-white shadow-lg shadow-warning-200">
              <FiBell size={24} />
            </div>
            {unreadNotifications > 0 && (
              <span className="badge-warning">{unreadNotifications} new</span>
            )}
          </div>
          <p className="text-sm font-medium text-gray-500 mb-1">Notifications</p>
          <p className="text-2xl font-bold text-gray-900">{unreadNotifications}</p>
          <p className="text-xs text-gray-500 mt-2">Unread</p>
        </div>

        <div className="card p-6 bg-gradient-to-br from-slate-50 to-white border-slate-100/60 hover:shadow-glow transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white shadow-lg shadow-slate-200">
              <FiPieChart size={24} />
            </div>
          </div>
          <p className="text-sm font-medium text-gray-500 mb-1">Account Type</p>
          <p className="text-2xl font-bold text-gray-900 capitalize">{account?.accountType || 'N/A'}</p>
          <p className="text-xs text-gray-500 mt-2 capitalize">{account?.status || 'N/A'}</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
                <p className="text-sm text-gray-500">Your latest financial activities</p>
              </div>
              <Link to="/transactions" className="btn-ghost text-primary-600 hover:text-primary-700 text-sm font-semibold flex items-center gap-1">
                View All <FiArrowRight size={14} />
              </Link>
            </div>
            <div className="p-6">
              {recentTransactions.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-50 flex items-center justify-center">
                    <FiActivity className="text-gray-300" size={32} />
                  </div>
                  <p className="text-gray-500 font-medium">No transactions yet</p>
                  <p className="text-sm text-gray-400 mt-1">Your transactions will appear here</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentTransactions.map(txn => (
                    <div key={txn._id} className="flex items-center justify-between p-4 rounded-xl bg-gray-50/50 hover:bg-gray-50 transition-colors border border-gray-100">
                      <div className="flex items-center gap-4">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${txn.type === 'received' ? 'bg-success-100 text-success-600' : txn.type === 'transfer' ? 'bg-danger-100 text-danger-600' : 'bg-primary-100 text-primary-600'}`}>
                          {txn.type === 'received' ? <FiTrendingUp size={18} /> : <FiSend size={18} />}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{txn.description || txn.type}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{formatDate(txn.createdAt)}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold text-sm ${txn.type === 'received' ? 'text-success-600' : 'text-gray-900'}`}>
                          {txn.type === 'received' ? '+' : '-'}{formatCurrency(txn.amount)}
                        </p>
                        <p className={`text-xs font-medium mt-0.5 ${txn.status === 'completed' ? 'text-success-600' : txn.status === 'pending' ? 'text-warning-600' : 'text-danger-600'}`}>
                          {txn.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="card">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
            </div>
            <div className="p-4 space-y-2">
              {[
                { to: '/transfer', icon: FiSend, label: 'Transfer Money', desc: 'Send to beneficiaries', color: 'from-primary-500 to-primary-600' },
                { to: '/beneficiaries', icon: FiUsers, label: 'Beneficiaries', desc: 'Manage recipients', color: 'from-success-500 to-success-600' },
                { to: '/documents', icon: FiCreditCard, label: 'KYC Documents', desc: 'Upload verification', color: 'from-warning-500 to-warning-600' },
              ].map((action, idx) => (
                <Link
                  key={idx}
                  to={action.to}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gray-50/50 hover:bg-gray-50 transition-all border border-gray-100 hover:border-gray-200 group"
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
                    <action.icon size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{action.label}</p>
                    <p className="text-xs text-gray-500">{action.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="card">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                <p className="text-sm text-gray-500">{unreadNotifications > 0 ? `${unreadNotifications} unread` : 'All caught up!'}</p>
              </div>
              <Link to="/notifications" className="text-primary-600 hover:text-primary-700">
                <FiBell size={20} />
              </Link>
            </div>
            <div className="p-4">
              {notifications.length === 0 ? (
                <div className="text-center py-8">
                  <FiBell className="mx-auto text-gray-300 mb-2" size={32} />
                  <p className="text-gray-500 text-sm">No notifications</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {notifications.slice(0, 4).map(notif => (
                    <div key={notif._id} className={`p-3 rounded-xl ${notif.isRead ? 'bg-gray-50' : 'bg-primary-50 border border-primary-100'}`}>
                      <p className="text-sm font-semibold text-gray-900">{notif.title}</p>
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2">{notif.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
