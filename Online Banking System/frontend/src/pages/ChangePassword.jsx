import { useState } from 'react'
import { useForm } from 'react-hook-form'
import api from '../services/api'
import { FiLock, FiAlertCircle, FiCheck, FiEye, FiEyeOff } from 'react-icons/fi'

export default function ChangePassword() {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false })
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm()

  const newPassword = watch('newPassword')

  const onSubmit = async (data) => {
    setLoading(true)
    setMessage('')
    try {
      await api.put('/auth/change-password', {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      })
      setMessage('Password changed successfully')
      reset()
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to change password')
    } finally {
      setLoading(false)
    }
  }

  const PasswordField = ({ name, label, showKey }) => (
    <div>
      <label className="label">{label}</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <FiLock className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type={showPasswords[showKey] ? 'text' : 'password'}
          {...register(name, { required: `${label} is required`, minLength: { value: 8, message: 'Password must be at least 8 characters' } })}
          className="input pl-11 pr-11"
          required
        />
        <button
          type="button"
          onClick={() => setShowPasswords(prev => ({ ...prev, [showKey]: !prev[showKey] }))}
          className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
        >
          {showPasswords[showKey] ? <FiEyeOff size={18} /> : <FiEye size={18} />}
        </button>
      </div>
      {errors[name] && <p className="error-text">{errors[name].message}</p>}
    </div>
  )

  return (
    <div className="space-y-6 max-w-xl animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Change Password</h1>
        <p className="text-gray-600">Update your account password</p>
      </div>

      {message && (
        <div className={`p-4 rounded-xl text-sm flex items-center gap-3 font-medium ${message.includes('success') ? 'bg-success-50 text-success-700 border border-success-100' : 'bg-danger-50 text-danger-700 border border-danger-100'}`}>
          {message.includes('success') ? <FiCheck size={18} /> : <FiAlertCircle size={18} />}
          {message}
        </div>
      )}

      <div className="card p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <PasswordField name="currentPassword" label="Current Password" showKey="current" />
          <PasswordField name="newPassword" label="New Password" showKey="new" />
          <div>
            <label className="label">Confirm New Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <FiLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPasswords.confirm ? 'text' : 'password'}
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: value => value === newPassword || 'Passwords do not match'
                })}
                className="input pl-11 pr-11"
                required
              />
              <button
                type="button"
                onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                {showPasswords.confirm ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && <p className="error-text">{errors.confirmPassword.message}</p>}
          </div>

          <div className="flex items-center gap-4 pt-2">
            <button type="submit" disabled={loading} className="btn-primary flex items-center gap-2">
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Updating...
                </>
              ) : (
                <>
                  <FiCheck size={18} />
                  Update Password
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
