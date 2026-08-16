import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import api from '../services/api'
import { FiPlus, FiEdit, FiTrash2, FiX, FiAlertCircle, FiCheck, FiUsers } from 'react-icons/fi'
import { formatDateShort } from '../utils/format'

export default function Beneficiaries() {
  const [beneficiaries, setBeneficiaries] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { register, handleSubmit, reset, setValue } = useForm()

  useEffect(() => {
    loadBeneficiaries()
  }, [])

  const loadBeneficiaries = async () => {
    try {
      const res = await api.get('/beneficiaries')
      setBeneficiaries(res.data)
    } catch (err) {
      setMessage('Failed to load beneficiaries')
    } finally {
      setLoading(false)
    }
  }

  const openAddModal = () => {
    setEditingId(null)
    reset({ name: '', accountNumber: '', bankName: '', ifscCode: '', email: '', phone: '' })
    setShowModal(true)
  }

  const openEditModal = (ben) => {
    setEditingId(ben._id)
    setValue('name', ben.name)
    setValue('accountNumber', ben.accountNumber)
    setValue('bankName', ben.bankName || '')
    setValue('ifscCode', ben.ifscCode || '')
    setValue('email', ben.email || '')
    setValue('phone', ben.phone || '')
    setShowModal(true)
  }

  const onSubmit = async (data) => {
    setSubmitting(true)
    setMessage('')
    try {
      if (editingId) {
        await api.put(`/beneficiaries/${editingId}`, data)
        setMessage('Beneficiary updated successfully')
      } else {
        await api.post('/beneficiaries', data)
        setMessage('Beneficiary added successfully')
      }
      setShowModal(false)
      loadBeneficiaries()
    } catch (err) {
      setMessage(err.response?.data?.message || 'Operation failed')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to remove this beneficiary?')) return
    try {
      await api.delete(`/beneficiaries/${id}`)
      setMessage('Beneficiary removed')
      loadBeneficiaries()
    } catch (err) {
      setMessage('Failed to remove beneficiary')
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
    <div className="space-y-6 max-w-6xl animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Beneficiaries</h1>
          <p className="text-gray-600">Manage your transfer recipients</p>
        </div>
        <button onClick={openAddModal} className="btn-primary flex items-center gap-2 self-start">
          <FiPlus size={18} />
          Add Beneficiary
        </button>
      </div>

      {message && (
        <div className={`p-4 rounded-xl text-sm flex items-center gap-3 font-medium ${message.includes('success') || message.includes('added') || message.includes('updated') || message.includes('removed') ? 'bg-success-50 text-success-700 border border-success-100' : 'bg-danger-50 text-danger-700 border border-danger-100'}`}>
          {message.includes('success') || message.includes('added') || message.includes('updated') || message.includes('removed') ? <FiCheck size={18} /> : <FiAlertCircle size={18} />}
          {message}
        </div>
      )}

      {beneficiaries.length === 0 ? (
        <div className="card p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-50 flex items-center justify-center">
            <FiUsers className="text-gray-300" size={40} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No beneficiaries yet</h3>
          <p className="text-gray-500 mb-6 max-w-sm mx-auto">Add a beneficiary to start making transfers easily and quickly.</p>
          <button onClick={openAddModal} className="btn-primary">Add Your First Beneficiary</button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {beneficiaries.map(ben => (
            <div key={ben._id} className="card p-6 hover:shadow-glow transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center text-primary-700 font-bold">
                    {ben.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{ben.name}</h3>
                    <p className="text-sm text-gray-500 font-mono">{ben.accountNumber}</p>
                  </div>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEditModal(ben)} className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                    <FiEdit size={16} />
                  </button>
                  <button onClick={() => handleDelete(ben._id)} className="p-2 text-gray-400 hover:text-danger-600 hover:bg-danger-50 rounded-lg transition-colors">
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
              {ben.bankName && <p className="text-sm text-gray-600 mb-1">{ben.bankName}</p>}
              {ben.email && <p className="text-sm text-gray-500 mb-1">{ben.email}</p>}
              {ben.phone && <p className="text-sm text-gray-500">{ben.phone}</p>}
              <div className="mt-4 pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-400">Added {formatDateShort(ben.createdAt)}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 lg:p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">{editingId ? 'Edit Beneficiary' : 'Add Beneficiary'}</h3>
              <button onClick={() => setShowModal(false)} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <FiX size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="label">Name</label>
                <input {...register('name', { required: 'Name is required' })} className="input" required />
              </div>
              <div>
                <label className="label">Account Number</label>
                <input {...register('accountNumber', { required: 'Account number is required' })} className="input" required />
              </div>
              <div>
                <label className="label">Bank Name</label>
                <input {...register('bankName')} className="input" />
              </div>
              <div>
                <label className="label">IFSC Code</label>
                <input {...register('ifscCode')} className="input" />
              </div>
              <div>
                <label className="label">Email</label>
                <input type="email" {...register('email')} className="input" />
              </div>
              <div>
                <label className="label">Phone</label>
                <input {...register('phone')} className="input" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary flex-1">Cancel</button>
                <button type="submit" disabled={submitting} className="btn-primary flex-1">{submitting ? 'Saving...' : 'Save'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
