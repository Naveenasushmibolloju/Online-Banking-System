import { useState, useEffect } from 'react'
import api from '../services/api'
import { FiUpload, FiFileText, FiCheck, FiX, FiAlertCircle, FiRefreshCw, FiEye } from 'react-icons/fi'
import { formatDate } from '../utils/format'

export default function Documents() {
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [documentType, setDocumentType] = useState('other')

  useEffect(() => {
    loadDocuments()
  }, [])

  const loadDocuments = async () => {
    try {
      const res = await api.get('/documents/my')
      setDocuments(res.data)
    } catch (err) {
      setMessage('Failed to load documents')
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0])
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!selectedFile) return

    const formData = new FormData()
    formData.append('document', selectedFile)
    formData.append('type', documentType)

    setUploading(true)
    setMessage('')
    try {
      await api.post('/documents/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      setMessage('Document uploaded successfully')
      setSelectedFile(null)
      loadDocuments()
    } catch (err) {
      setMessage(err.response?.data?.message || 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-success-100 text-success-700'
      case 'rejected':
        return 'bg-danger-100 text-danger-700'
      default:
        return 'bg-warning-100 text-warning-700'
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
    <div className="space-y-6 max-w-5xl animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-1">KYC Documents</h1>
        <p className="text-gray-600">Upload and manage your verification documents</p>
      </div>

      {message && (
        <div className={`p-4 rounded-xl text-sm flex items-center gap-3 font-medium ${message.includes('success') ? 'bg-success-50 text-success-700 border border-success-100' : 'bg-danger-50 text-danger-700 border border-danger-100'}`}>
          <FiAlertCircle size={18} />
          {message}
        </div>
      )}

      {/* Upload Section */}
      <div className="card overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Upload New Document</h3>
        </div>
        <div className="p-6">
          <form onSubmit={handleUpload} className="space-y-5">
            <div>
              <label className="label">Document Type</label>
              <select value={documentType} onChange={(e) => setDocumentType(e.target.value)} className="input">
                <option value="id_card">ID Card</option>
                <option value="passport">Passport</option>
                <option value="drivers_license">Driver's License</option>
                <option value="utility_bill">Utility Bill</option>
                <option value="profile_image">Profile Image</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="label">Select Document</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-primary-400 hover:bg-primary-50/30 transition-colors">
                <div className="space-y-1 text-center">
                  <FiUpload className="mx-auto text-gray-400" size={40} />
                  <div className="flex text-sm text-gray-600 justify-center">
                    <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-primary-600 hover:text-primary-500">
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" accept=".jpg,.jpeg,.png,.pdf" onChange={handleFileChange} required />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">JPG, PNG, PDF up to 5MB</p>
                  {selectedFile && (
                    <p className="text-sm text-primary-600 font-medium mt-2">{selectedFile.name}</p>
                  )}
                </div>
              </div>
            </div>
            <button type="submit" disabled={uploading || !selectedFile} className="btn-primary w-full flex items-center justify-center gap-2">
              {uploading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Uploading...
                </>
              ) : (
                <>
                  <FiUpload size={18} />
                  Upload Document
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Documents List */}
      <div className="card">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Uploaded Documents</h3>
        </div>
        {documents.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-50 flex items-center justify-center">
              <FiFileText className="text-gray-300" size={32} />
            </div>
            <p className="text-gray-500 font-medium">No documents uploaded yet</p>
            <p className="text-sm text-gray-400 mt-1">Upload your first document to get started</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {documents.map(doc => (
              <div key={doc._id} className="p-5 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center text-primary-600">
                    <FiFileText size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{doc.originalName}</p>
                    <p className="text-sm text-gray-500 mt-0.5">Uploaded {formatDate(doc.createdAt)} • {(doc.size / 1024).toFixed(1)} KB</p>
                  </div>
                </div>
                <span className={`px-3 py-1.5 text-xs font-semibold rounded-full ${getStatusBadge(doc.status)}`}>
                  {doc.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
