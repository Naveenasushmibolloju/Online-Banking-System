import { useState, useEffect } from 'react'
import api from '../services/api'
import { FiSave, FiAlertCircle, FiUser, FiMail, FiPhone, FiMapPin, FiCamera } from 'react-icons/fi'

export default function Profile() {
  const [user, setUser] = useState(null)
  const [formData, setFormData] = useState({ firstName: '', lastName: '', phone: '', address: '' })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      const res = await api.get('/auth/profile')
      const userData = res.data
      setUser(userData)
      setFormData({
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        phone: userData.phone || '',
        address: userData.address || '',
      })
    } catch (err) {
      setMessage('Failed to load profile')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')
    try {
      const res = await api.put('/auth/profile', formData)
      setUser(res.data.user)
      setMessage('Profile updated successfully')
    } catch (err) {
      setMessage(err.response?.data?.message || 'Update failed')
    } finally {
      setSaving(false)
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
    <div className="space-y-6 max-w-4xl animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-1">My Profile</h1>
        <p className="text-gray-600">Manage your personal information</p>
      </div>

      {message && (
        <div className={`p-4 rounded-xl text-sm flex items-center gap-3 font-medium ${message.includes('success') || message.includes('updated') ? 'bg-success-50 text-success-700 border border-success-100' : 'bg-danger-50 text-danger-700 border border-danger-100'}`}>
          <FiAlertCircle size={18} />
          {message}
        </div>
      )}

      <div className="card overflow-hidden">
        {/* Profile Header */}
        <div className="h-32 bg-gradient-to-r from-primary-600 to-primary-800 relative">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-30"></div>
        </div>
        <div className="px-8 pb-8">
          <div className="relative -mt-16 mb-6">
            <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-50 border-4 border-white shadow-xl flex items-center justify-center">
              <span className="text-4xl font-bold text-primary-700">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </span>
            </div>
            <button className="absolute bottom-2 right-2 w-8 h-8 rounded-lg bg-primary-600 text-white flex items-center justify-center shadow-lg hover:bg-primary-700 transition-colors">
              <FiCamera size={14} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="label">First Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <FiUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="input pl-11" required />
                </div>
              </div>
              <div>
                <label className="label">Last Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <FiUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="input pl-11" required />
                </div>
              </div>
            </div>

            <div>
              <label className="label">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-gray-400" />
                </div>
                <input type="email" value={user?.email || ''} className="input pl-11 bg-gray-50" disabled />
              </div>
              <p className="text-xs text-gray-500 mt-1.5">Email cannot be changed</p>
            </div>

            <div>
              <label className="label">Phone</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <FiPhone className="h-5 w-5 text-gray-400" />
                </div>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="input pl-11" />
              </div>
            </div>

            <div>
              <label className="label">Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <FiMapPin className="h-5 w-5 text-gray-400" />
                </div>
                <textarea name="address" value={formData.address} onChange={handleChange} className="input pl-11" rows="3" />
              </div>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2">
                <FiSave size={18} />
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              {saving && (
                <div className="w-5 h-5 border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
