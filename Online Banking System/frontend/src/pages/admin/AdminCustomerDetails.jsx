import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../../services/api'
import { FiArrowLeft, FiCreditCard, FiList, FiAlertCircle, FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import { formatCurrency, formatDate } from '../../utils/format'

export default function AdminCustomerDetails() {
  const { id } = useParams()
  const [customer, setCustomer] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadCustomer()
  }, [id])

  const loadCustomer = async () => {
    try {
      const res = await api.get(`/admin/customers/${id}`)
      setCustomer(res.data.customer)
    } catch (err) {
      setError('Customer not found')
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

  if (error || !customer) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-danger-50 flex items-center justify-center">
          <FiAlertCircle className="text-danger-500" size={32} />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Customer Not Found</h2>
        <Link to="/admin/customers" className="btn-primary mt-4">Back to Customers</Link>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-6xl animate-fade-in">
      <div className="flex items-center gap-4">
        <Link to="/admin/customers" className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors">
          <FiArrowLeft size={22} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">{customer.firstName} {customer.lastName}</h1>
          <p className="text-gray-600">Customer Details</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center text-primary-600">
              <FiMail size={20} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-semibold text-gray-900">{customer.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-semibold text-gray-900">{customer.phone || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="font-semibold text-gray-900">{customer.address || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">KYC Status</p>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold mt-1 ${customer.kycStatus === 'approved' ? 'bg-success-100 text-success-700' : customer.kycStatus === 'rejected' ? 'bg-danger-100 text-danger-700' : 'bg-warning-100 text-warning-700'}`}>
                {customer.kycStatus}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Account Status</p>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold mt-1 ${customer.isActive ? 'bg-success-100 text-success-700' : 'bg-gray-100 text-gray-700'}`}>
                {customer.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-success-100 to-success-50 flex items-center justify-center text-success-600">
                <FiCreditCard size={20} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Accounts</h3>
            </div>
            {customer.accounts?.length === 0 ? (
              <p className="text-gray-500">No accounts found</p>
            ) : (
              <div className="space-y-3">
                {customer.accounts?.map(account => (
                  <div key={account._id} className="p-4 rounded-xl bg-gray-50/50 border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900 capitalize">{account.accountType} Account</p>
                        <p className="text-sm text-gray-500 font-mono mt-0.5">{account.accountNumber}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">{formatCurrency(account.balance)}</p>
                        <p className={`text-xs font-medium mt-0.5 ${account.status === 'active' ? 'text-success-600' : 'text-gray-500'}`}>{account.status}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="card p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center text-primary-600">
                <FiList size={20} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
            </div>
            {customer.recentTransactions?.length === 0 ? (
              <p className="text-gray-500">No transactions found</p>
            ) : (
              <div className="space-y-3">
                {customer.recentTransactions?.map(txn => (
                  <div key={txn._id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="font-semibold text-gray-900">{txn.description || txn.type}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{formatDate(txn.createdAt)}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${txn.type === 'received' ? 'text-success-600' : 'text-gray-900'}`}>
                        {txn.type === 'received' ? '+' : '-'}{formatCurrency(txn.amount)}
                      </p>
                      <p className={`text-xs font-medium mt-0.5 ${txn.status === 'completed' ? 'text-success-600' : 'text-warning-600'}`}>{txn.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
