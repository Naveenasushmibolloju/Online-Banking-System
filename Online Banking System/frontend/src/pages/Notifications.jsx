import { useState, useEffect } from 'react'
import api from '../services/api'
import { FiBell, FiCheck, FiTrash2, FiCheckCircle } from 'react-icons/fi'
import { formatDate } from '../utils/format'

export default function Notifications() {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    loadNotifications()
  }, [])

  const loadNotifications = async () => {
    try {
      const res = await api.get('/notifications')
      setNotifications(res.data.notifications || [])
      setUnreadCount(res.data.unreadCount || 0)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (id) => {
    try {
      await api.put(`/notifications/${id}/read`)
      setNotifications(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n))
      setUnreadCount(prev => Math.max(0, prev - 1))
    } catch (err) {
      console.error(err)
    }
  }

  const markAllAsRead = async () => {
    try {
      await api.put('/notifications/read-all')
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })))
      setUnreadCount(0)
    } catch (err) {
      console.error(err)
    }
  }

  const deleteNotification = async (id) => {
    try {
      await api.delete(`/notifications/${id}`)
      setNotifications(prev => prev.filter(n => n._id !== id))
    } catch (err) {
      console.error(err)
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Notifications</h1>
          <p className="text-gray-600">{unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}</p>
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllAsRead} className="btn-secondary flex items-center gap-2 self-start">
            <FiCheckCircle size={16} />
            Mark All Read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="card p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-50 flex items-center justify-center">
            <FiBell className="text-gray-300" size={32} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No notifications</h3>
          <p className="text-gray-500">You don't have any notifications yet.</p>
        </div>
      ) : (
        <div className="card divide-y divide-gray-100">
          {notifications.map(notif => (
            <div key={notif._id} className={`p-5 flex items-start gap-4 transition-colors ${!notif.isRead ? 'bg-primary-50/50' : 'hover:bg-gray-50/50'}`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${!notif.isRead ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-500'}`}>
                <FiBell size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-gray-900">{notif.title}</h4>
                  <span className="text-xs text-gray-500">{formatDate(notif.createdAt)}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
                {!notif.isRead && (
                  <button onClick={() => markAsRead(notif._id)} className="mt-3 text-sm text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-1">
                    <FiCheck size={14} />
                    Mark as read
                  </button>
                )}
              </div>
              <button onClick={() => deleteNotification(notif._id)} className="p-2 text-gray-400 hover:text-danger-600 hover:bg-danger-50 rounded-lg transition-colors flex-shrink-0">
                <FiTrash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
