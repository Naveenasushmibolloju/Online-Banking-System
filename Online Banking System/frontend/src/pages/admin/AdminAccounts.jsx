import { useState, useEffect } from 'react'
import api from '../../services/api'
import { FiCreditCard, FiSearch, FiRefreshCw, FiFilter } from 'react-icons/fi'
import { formatCurrency, formatDate } from '../../utils/format'

export default function AdminAccounts() {
  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)

  const loadAccounts = async () => {
    setLoading(true)
    try {
      const params = { page, limit: 20, search }
      const res = await api.get('/admin/accounts', { params })
      setAccounts(res.data)
      setTotal(res.data.length)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAccounts()
  }, [page])

  if (loading && accounts.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-4 border-primary-200 border-t-primary-600 animate-spin"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-7xl animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">All Accounts</h1>
          <p className="text-gray-600">View and manage all customer accounts</p>
        </div>
        <button onClick={loadAccounts} className="btn-secondary flex items-center gap-2 self-start">
          <FiRefreshCw size={16} />
          Refresh
        </button>
      </div>

      <div className="card p-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-4 top-3 text-gray-400" size={18} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && loadAccounts()}
              placeholder="Search by account number or customer name..."
              className="input pl-11"
            />
          </div>
          <button onClick={loadAccounts} className="btn-primary">
            <FiFilter size={18} />
          </button>
        </div>
      </div>

      <div className="card overflow-hidden">
        {accounts.length === 0 ? (
          <div className="p-12 text-center">
            <FiCreditCard className="mx-auto text-gray-300 mb-4" size={48} />
            <p className="text-gray-500 font-medium">No accounts found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Account</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Balance</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Created</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {accounts.map(account => (
                  <tr key={account._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono font-semibold text-gray-900">{account.accountNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{account.customerId?.firstName} {account.customerId?.lastName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 capitalize">{account.accountType}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{formatCurrency(account.balance)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${account.status === 'active' ? 'bg-success-100 text-success-700' : 'bg-gray-100 text-gray-700'}`}>
                        {account.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(account.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
