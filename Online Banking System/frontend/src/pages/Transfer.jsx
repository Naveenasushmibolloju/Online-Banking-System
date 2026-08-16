import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import { FiSend, FiAlertCircle, FiCheck, FiUsers } from 'react-icons/fi'
import { formatCurrency } from '../utils/format'

export default function Transfer() {
  const [accounts, setAccounts] = useState([])
  const [beneficiaries, setBeneficiaries] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    beneficiaryId: '',
    receiverAccountNumber: '',
    amount: '',
    description: '',
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setError('')
    try {
      const [accRes, benRes] = await Promise.all([
        api.get('/accounts'),
        api.get('/beneficiaries'),
      ])
      setAccounts(Array.isArray(accRes.data) ? accRes.data : [])
      setBeneficiaries(Array.isArray(benRes.data) ? benRes.data : [])
    } catch (err) {
      setError('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (name === 'beneficiaryId') {
      const ben = beneficiaries.find(b => b._id === value)
      if (ben) {
        setFormData(prev => ({ ...prev, receiverAccountNumber: ben.accountNumber }))
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    setSuccess(null)

    try {
      const res = await api.post('/transactions/transfer', {
        receiverAccountNumber: formData.receiverAccountNumber,
        amount: parseFloat(formData.amount),
        description: formData.description,
        beneficiaryId: formData.beneficiaryId || undefined,
      })
      setSuccess(res.data)
      setFormData({ beneficiaryId: '', receiverAccountNumber: '', amount: '', description: '' })
      setTimeout(() => navigate('/transactions'), 2000)
    } catch (err) {
      setError(err.response?.data?.message || 'Transfer failed')
    } finally {
      setSubmitting(false)
    }
  }

  const account = accounts[0]
  const balance = account?.balance || 0
  const exceedsBalance = formData.amount && parseFloat(formData.amount) > balance && balance > 0

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
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Transfer Money</h1>
        <p className="text-gray-600">Send money securely to another account</p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-50 border border-green-100 rounded-xl text-green-700">
          {success.message}
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
              <p className="text-blue-100 text-sm mb-1">Available Balance</p>
              <p className="text-3xl font-bold">{formatCurrency(balance)}</p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Select Beneficiary (Optional)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <FiUsers className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    name="beneficiaryId"
                    value={formData.beneficiaryId}
                    onChange={handleChange}
                    className="block w-full rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2.5 border bg-white pl-11"
                  >
                    <option value="">-- Select beneficiary --</option>
                    {beneficiaries.map(b => (
                      <option key={b._id} value={b._id}>{b.name} - {b.accountNumber}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Receiver Account Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <FiSend className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="receiverAccountNumber"
                    value={formData.receiverAccountNumber}
                    onChange={handleChange}
                    className="block w-full rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2.5 border bg-white pl-11"
                    placeholder="Enter receiver account number"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Amount</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <span className="text-gray-400 font-semibold">$</span>
                  </div>
                  <input
                    type="number"
                    step="0.01"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    className={`block w-full rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2.5 border bg-white pl-10 ${exceedsBalance ? 'border-red-300' : ''}`}
                    placeholder="0.00"
                    required
                  />
                </div>
                {exceedsBalance && (
                  <p className="text-red-600 text-sm mt-1.5 font-medium">Amount exceeds available balance</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description (Optional)</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="block w-full rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2.5 border bg-white"
                  placeholder="What's this transfer for?"
                />
              </div>

              <button
                type="submit"
                disabled={submitting || exceedsBalance}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Processing...' : (
                  <>
                    <FiSend size={18} />
                    Send Money
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">Recent Beneficiaries</h3>
            </div>
            <div className="p-4">
              {beneficiaries.length === 0 ? (
                <div className="text-center py-8">
                  <FiUsers className="mx-auto text-gray-300 mb-3" size={40} />
                  <p className="text-gray-500 text-sm font-medium">No beneficiaries yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {beneficiaries.slice(0, 5).map(b => (
                    <div key={b._id} className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <p className="font-semibold text-gray-900 text-sm">{b.name}</p>
                      <p className="text-xs text-gray-500 font-mono">{b.accountNumber}</p>
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
