import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import { FiSearch, FiEye, FiX, FiCheck, FiRefreshCw, FiAlertCircle, FiUsers } from 'react-icons/fi'
import { formatDate } from '../../utils/format'

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [message, setMessage] = useState('')

  const loadCustomers = async () => {
    setLoading(true)
    try {
      const params = { page, limit: 20, search }
      const res = await api.get('/admin/customers', { params })
      setCustomers(res.data.customers)
      setTotal(res.data.total)
    } catch (err) {
      setMessage('Failed to load customers')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCustomers()
  }, [page])

  const toggleStatus = async (id) => {
    try {
      await api.put(`/admin/customers/${id}/toggle-status`)
      loadCustomers()
      setMessage('Customer status updated')
    } catch (err) {
      setMessage('Failed to update status')
    }
  }

  const totalPages = Math.ceil(total / 20)

  if (loading && customers.length === 0) {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Customers</h1>
          <p className="text-gray-600">Manage customer accounts</p>
        </div>
        <button onClick={loadCustomers} className="btn-secondary flex items-center gap-2 self-start">
          <FiRefreshCw size={16} />
          Refresh
        </button>
      </div>

      {message && (
        <div className={`p-4 rounded-xl text-sm flex items-center gap-3 font-medium ${message.includes('success') || message.includes('updated') ? 'bg-success-50 text-success-700 border border-success-100' : 'bg-danger-50 text-danger-700 border border-danger-100'}`}>
          {message.includes('success') || message.includes('updated') ? <FiCheck size={18} /> : <FiAlertCircle size={18} />}
          {message}
        </div>
      )}

      <div className="card p-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-4 top-3 text-gray-400" size={18} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && loadCustomers()}
              placeholder="Search customers by name or email..."
              className="input pl-11"
            />
          </div>
          <button onClick={loadCustomers} className="btn-primary">
            <FiSearch size={18} />
          </button>
        </div>
      </div>

      <div className="card overflow-hidden">
        {customers.length === 0 ? (
          <div className="p-12 text-center">
            <FiUsers className="mx-auto text-gray-300 mb-4" size={48} />
            <p className="text-gray-500 font-medium">No customers found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">KYC</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Joined</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {customers.map(customer => (
                  <tr key={customer._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center text-primary-700 font-bold text-sm mr-3">
                          {customer.firstName?.[0]}{customer.lastName?.[0]}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{customer.firstName} {customer.lastName}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{customer.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${customer.kycStatus === 'approved' ? 'bg-success-100 text-success-700' : customer.kycStatus === 'rejected' ? 'bg-danger-100 text-danger-700' : 'bg-warning-100 text-warning-700'}`}>
                        {customer.kycStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${customer.isActive ? 'bg-success-100 text-success-700' : 'bg-gray-100 text-gray-700'}`}>
                        {customer.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(customer.createdAt)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex gap-2">
                        <Link to={`/admin/customers/${customer._id}`} className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                          <FiEye size={16} />
                        </Link>
                        <button onClick={() => toggleStatus(customer._id)} className={`p-2 rounded-lg transition-colors ${customer.isActive ? 'text-danger-600 hover:bg-danger-50' : 'text-success-600 hover:bg-success-50'}`}>
                          {customer.isActive ? <FiX size={16} /> : <FiCheck size={16} />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

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
