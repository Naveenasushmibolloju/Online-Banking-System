import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../services/api'
import { FiArrowLeft, FiAlertCircle, FiCheck, FiX, FiDownload, FiShare2 } from 'react-icons/fi'
import { formatCurrency, formatDate } from '../utils/format'

export default function TransactionDetails() {
  const { id } = useParams()
  const [transaction, setTransaction] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadTransaction()
  }, [id])

  const loadTransaction = async () => {
    try {
      const res = await api.get(`/transactions/${id}`)
      setTransaction(res.data)
    } catch (err) {
      setError('Transaction not found')
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

  if (error || !transaction) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-danger-50 flex items-center justify-center">
          <FiAlertCircle className="text-danger-500" size={32} />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Transaction Not Found</h2>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">The transaction you're looking for doesn't exist or you don't have access to it.</p>
        <Link to="/transactions" className="btn-primary">Back to Transactions</Link>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-4xl animate-fade-in">
      <div className="flex items-center gap-4">
        <Link to="/transactions" className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors">
          <FiArrowLeft size={22} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Transaction Details</h1>
          <p className="text-gray-600">Transaction reference: <span className="font-mono font-semibold">{transaction.reference}</span></p>
        </div>
      </div>

      {/* Status Banner */}
      <div className={`card p-6 border-l-4 ${transaction.status === 'completed' ? 'border-success-500 bg-success-50/50' : transaction.status === 'pending' ? 'border-warning-500 bg-warning-50/50' : 'border-danger-500 bg-danger-50/50'}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Status</p>
            <p className={`text-lg font-bold capitalize ${transaction.status === 'completed' ? 'text-success-700' : transaction.status === 'pending' ? 'text-warning-700' : 'text-danger-700'}`}>
              {transaction.status}
            </p>
          </div>
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${transaction.status === 'completed' ? 'bg-success-100 text-success-600' : transaction.status === 'pending' ? 'bg-warning-100 text-warning-600' : 'bg-danger-100 text-danger-600'}`}>
            {transaction.status === 'completed' ? <FiCheck size={28} /> : transaction.status === 'pending' ? <FiAlertCircle size={28} /> : <FiX size={28} />}
          </div>
        </div>
      </div>

      {/* Amount Card */}
      <div className="card p-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-30"></div>
        <div className="relative">
          <p className="text-gray-400 text-sm font-medium mb-2">Transaction Amount</p>
          <p className={`text-4xl font-bold ${transaction.type === 'received' ? 'text-success-400' : 'text-white'}`}>
            {transaction.type === 'received' ? '+' : '-'}{formatCurrency(transaction.amount)}
          </p>
          <p className="text-gray-400 text-sm mt-2 capitalize">{transaction.type} • {transaction.description || 'No description'}</p>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Transaction Info</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Date & Time</p>
              <p className="font-semibold text-gray-900">{formatDate(transaction.createdAt)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Transaction Type</p>
              <p className="font-semibold text-gray-900 capitalize">{transaction.type}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Reference</p>
              <p className="font-mono font-semibold text-gray-900 text-sm">{transaction.reference}</p>
            </div>
            {transaction.description && (
              <div>
                <p className="text-sm text-gray-500">Description</p>
                <p className="font-semibold text-gray-900">{transaction.description}</p>
              </div>
            )}
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Parties Involved</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Sender</p>
              <p className="font-semibold text-gray-900">{transaction.senderId?.firstName} {transaction.senderId?.lastName}</p>
              <p className="text-sm text-gray-500">{transaction.senderId?.email}</p>
            </div>
            <div className="border-t border-gray-100 pt-4">
              <p className="text-sm text-gray-500 mb-1">Receiver</p>
              <p className="font-semibold text-gray-900">{transaction.receiverId?.firstName} {transaction.receiverId?.lastName}</p>
              <p className="text-sm text-gray-500">{transaction.receiverId?.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <Link to="/transactions" className="btn-secondary flex items-center gap-2">
          <FiArrowLeft size={16} />
          Back to Transactions
        </Link>
        <Link to="/transfer" className="btn-primary flex items-center gap-2">
          <FiSend size={16} />
          New Transfer
        </Link>
      </div>
    </div>
  )
}
