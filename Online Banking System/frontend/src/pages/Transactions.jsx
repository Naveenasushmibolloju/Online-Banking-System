import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'
import { FiSearch, FiFilter, FiArrowRight, FiRefreshCw, FiDownload } from 'react-icons/fi'
import { formatCurrency, formatDate } from '../utils/format'

export default function Transactions() {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [filters, setFilters] = useState({ type: '', status: '', search: '' })

  const loadTransactions = async () => {
    setLoading(true)
    setError('')
    try {
      const params = { page, limit: 20, ...filters }
      const res = await api.get('/transactions', { params })
      setTransactions(res.data.transactions || [])
      setTotal(res.data.total || 0)
    } catch (err) {
      setError('Failed to load transactions')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTransactions()
  }, [page])

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters(prev => ({ ...prev, [name]: value }))
  }

  const applyFilters = () => {
    setPage(1)
    loadTransactions()
  }

  const totalPages = Math.ceil(total / 20)

  if (loading && transactions.length === 0) {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Transactions</h1>
          <p className="text-gray-600">View and manage your transaction history</p>
        </div>
        <button className="btn-secondary flex items-center gap-2 self-start">
          <FiDownload size={16} />
          Export
        </button>
      </div>

      {error && (
        <div className="p-4 bg-danger-50 border border-danger-100 rounded-xl text-danger-700 flex items-center justify-between">
          <span className="font-medium">{error}</span>
          <button onClick={loadTransactions} className="text-danger-600 hover:text-danger-700">
            <FiRefreshCw size={18} />
          </button>
        </div>
      )}

      {/* Filters */}
      <div className="card p-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="sm:col-span-2 relative">
            <FiSearch className="absolute left-4 top-3 text-gray-400" size={18} />
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search by reference or description..."
              className="input pl-11"
            />
          </div>
          <select name="type" value={filters.type} onChange={handleFilterChange} className="input">
            <option value="">All Types</option>
            <option value="transfer">Transfer</option>
            <option value="deposit">Deposit</option>
            <option value="withdrawal">Withdrawal</option>
            <option value="received">Received</option>
            <option value="payment">Payment</option>
          </select>
          <select name="status" value={filters.status} onChange={handleFilterChange} className="input">
            <option value="">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>
        <div className="mt-4 flex justify-end">
          <button onClick={applyFilters} className="btn-primary flex items-center gap-2">
            <FiFilter size={16} />
            Apply Filters
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="card overflow-hidden">
        {transactions.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-50 flex items-center justify-center">
              <FiSearch className="text-gray-300" size={32} />
            </div>
            <p className="text-gray-500 font-medium">No transactions found</p>
            <p className="text-sm text-gray-400 mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Reference</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {transactions.map(txn => (
                  <tr key={txn._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono font-semibold text-gray-900">{txn.reference}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(txn.createdAt)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900 capitalize">{txn.type}</span>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-bold ${txn.type === 'received' ? 'text-success-600' : 'text-gray-900'}`}>
                      {txn.type === 'received' ? '+' : '-'}{formatCurrency(txn.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${txn.status === 'completed' ? 'bg-success-100 text-success-700' : txn.status === 'pending' ? 'bg-warning-100 text-warning-700' : 'bg-danger-100 text-danger-700'}`}>
                        {txn.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Link to={`/transactions/${txn._id}`} className="text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-1">
                        View <FiArrowRight size={14} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">Page {page} of {totalPages}</p>
          <div className="flex gap-2">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="btn-secondary disabled:opacity-50">
              Previous
            </button>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="btn-secondary disabled:opacity-50">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
