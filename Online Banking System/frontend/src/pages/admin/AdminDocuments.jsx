import { useState, useEffect } from 'react'
import api from '../../services/api'
import { FiFileText, FiCheck, FiX, FiEye, FiRefreshCw, FiAlertCircle, FiClock } from 'react-icons/fi'
import { formatDate } from '../../utils/format'

export default function AdminDocuments() {
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [reviewingId, setReviewingId] = useState(null)
  const [reviewData, setReviewData] = useState({ status: 'approved', rejectionReason: '' })

  useEffect(() => {
    loadDocuments()
  }, [])

  const loadDocuments = async () => {
    try {
      const res = await api.get('/admin/documents')
      setDocuments(res.data)
    } catch (err) {
      setMessage('Failed to load documents')
    } finally {
      setLoading(false)
    }
  }

  const openReview = (doc) => {
    setReviewingId(doc._id)
    setReviewData({ status: 'approved', rejectionReason: '' })
  }

  const submitReview = async () => {
    try {
      await api.put(`/admin/documents/${reviewingId}/review`, reviewData)
      setMessage('Document reviewed successfully')
      setReviewingId(null)
      loadDocuments()
    } catch (err) {
      setMessage(err.response?.data?.message || 'Review failed')
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

  return (
    <div className="space-y-6 max-w-7xl animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">KYC Documents</h1>
          <p className="text-gray-600">Review and manage customer KYC submissions</p>
        </div>
        <button onClick={loadDocuments} className="btn-secondary flex items-center gap-2 self-start">
          <FiRefreshCw size={16} />
          Refresh
        </button>
      </div>

      {message && (
        <div className={`p-4 rounded-xl text-sm flex items-center gap-3 font-medium ${message.includes('success') || message.includes('reviewed') ? 'bg-success-50 text-success-700 border border-success-100' : 'bg-danger-50 text-danger-700 border border-danger-100'}`}>
          {message.includes('success') || message.includes('reviewed') ? <FiCheck size={18} /> : <FiAlertCircle size={18} />}
          {message}
        </div>
      )}

      {documents.length === 0 ? (
        <div className="card p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-50 flex items-center justify-center">
            <FiFileText className="text-gray-300" size={32} />
          </div>
          <p className="text-gray-500 font-medium">No documents submitted yet</p>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Document</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Submitted</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {documents.map(doc => (
                  <tr key={doc._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{doc.customerId?.firstName} {doc.customerId?.lastName}</p>
                        <p className="text-xs text-gray-500">{doc.customerId?.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{doc.originalName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 capitalize">{doc.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${doc.status === 'approved' ? 'bg-success-100 text-success-700' : doc.status === 'rejected' ? 'bg-danger-100 text-danger-700' : 'bg-warning-100 text-warning-700'}`}>
                        {doc.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(doc.createdAt)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {doc.status === 'pending' && (
                        <button onClick={() => openReview(doc)} className="inline-flex items-center gap-1 text-primary-600 hover:text-primary-700 font-semibold">
                          <FiEye size={16} />
                          Review
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {reviewingId && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 lg:p-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center text-primary-600">
                <FiFileText size={20} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Review Document</h3>
            </div>
            <div className="space-y-5">
              <div>
                <label className="label">Decision</label>
                <select value={reviewData.status} onChange={(e) => setReviewData(prev => ({ ...prev, status: e.target.value }))} className="input">
                  <option value="approved">Approve</option>
                  <option value="rejected">Reject</option>
                </select>
              </div>
              {reviewData.status === 'rejected' && (
                <div>
                  <label className="label">Rejection Reason</label>
                  <textarea
                    value={reviewData.rejectionReason}
                    onChange={(e) => setReviewData(prev => ({ ...prev, rejectionReason: e.target.value }))}
                    className="input"
                    rows="3"
                    placeholder="Please provide a reason for rejection..."
                  />
                </div>
              )}
              <div className="flex gap-3 pt-2">
                <button onClick={() => setReviewingId(null)} className="btn-secondary flex-1">Cancel</button>
                <button onClick={submitReview} className="btn-primary flex-1">Submit Review</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
