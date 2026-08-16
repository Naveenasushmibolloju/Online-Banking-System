import { useState, useEffect } from 'react'
import api from '../services/api'
import { FiCreditCard, FiCopy, FiEye, FiEyeOff, FiTrendingUp } from 'react-icons/fi'
import { formatCurrency, formatDateShort } from '../utils/format'

export default function Account() {
  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showBalance, setShowBalance] = useState(true)

  useEffect(() => {
    loadAccounts()
  }, [])

  const loadAccounts = async () => {
    try {
      const res = await api.get('/accounts')
      setAccounts(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
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

  return (
    <div className="space-y-6 max-w-6xl animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">My Accounts</h1>
          <p className="text-gray-600">View your account details and balances</p>
        </div>
        <button
          onClick={() => setShowBalance(!showBalance)}
          className="btn-ghost flex items-center gap-2"
        >
          {showBalance ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          {showBalance ? 'Hide' : 'Show'} Balance
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map((account, idx) => (
          <div key={account._id} className="card overflow-hidden group hover:shadow-glow transition-all">
            {/* Card Header with gradient */}
            <div className={`h-24 bg-gradient-to-r ${idx % 3 === 0 ? 'from-primary-600 to-primary-800' : idx % 3 === 1 ? 'from-success-600 to-success-800' : 'from-warning-500 to-warning-700'} relative`}>
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-30"></div>
              <div className="absolute top-4 right-4">
                <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <FiCreditCard className="text-white" size={20} />
                </div>
              </div>
              <div className="absolute bottom-4 left-4">
                <p className="text-white/80 text-xs font-medium uppercase tracking-wider">Balance</p>
                <p className="text-white text-xl font-bold">
                  {showBalance ? formatCurrency(account.balance) : '••••••'}
                </p>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500 capitalize">{account.accountType} Account</span>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${account.status === 'active' ? 'bg-success-100 text-success-700' : 'bg-gray-100 text-gray-700'}`}>
                  {account.status}
                </span>
              </div>

              <div className="space-y-3 pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Account Number</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-mono font-semibold text-gray-900">{account.accountNumber}</span>
                    <button onClick={() => copyToClipboard(account.accountNumber)} className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                      <FiCopy size={14} />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Currency</span>
                  <span className="text-sm font-semibold text-gray-900">{account.currency}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Created</span>
                  <span className="text-sm font-medium text-gray-900">{formatDateShort(account.createdAt)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
