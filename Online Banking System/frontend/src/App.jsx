import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext.jsx'
import Layout from './layouts/Layout.jsx'
import AdminLayout from './layouts/AdminLayout.jsx'
import Landing from './pages/Landing.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Profile from './pages/Profile.jsx'
import Account from './pages/Account.jsx'
import Transfer from './pages/Transfer.jsx'
import Beneficiaries from './pages/Beneficiaries.jsx'
import Transactions from './pages/Transactions.jsx'
import TransactionDetails from './pages/TransactionDetails.jsx'
import Documents from './pages/Documents.jsx'
import Notifications from './pages/Notifications.jsx'
import Settings from './pages/Settings.jsx'
import ChangePassword from './pages/ChangePassword.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import AdminCustomers from './pages/admin/AdminCustomers.jsx'
import AdminCustomerDetails from './pages/admin/AdminCustomerDetails.jsx'
import AdminAccounts from './pages/admin/AdminAccounts.jsx'
import AdminTransactions from './pages/admin/AdminTransactions.jsx'
import AdminDocuments from './pages/admin/AdminDocuments.jsx'

function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth()
  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>
  if (!user) return <Navigate to="/login" replace />
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} replace />
  return children
}

function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} replace /> : <Landing />} />
      <Route path="/login" element={user ? <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} replace /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} replace /> : <Register />} />

      <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['customer']}><Layout><Dashboard /></Layout></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute allowedRoles={['customer']}><Layout><Profile /></Layout></ProtectedRoute>} />
      <Route path="/account" element={<ProtectedRoute allowedRoles={['customer']}><Layout><Account /></Layout></ProtectedRoute>} />
      <Route path="/transfer" element={<ProtectedRoute allowedRoles={['customer']}><Layout><Transfer /></Layout></ProtectedRoute>} />
      <Route path="/beneficiaries" element={<ProtectedRoute allowedRoles={['customer']}><Layout><Beneficiaries /></Layout></ProtectedRoute>} />
      <Route path="/transactions" element={<ProtectedRoute allowedRoles={['customer']}><Layout><Transactions /></Layout></ProtectedRoute>} />
      <Route path="/transactions/:id" element={<ProtectedRoute allowedRoles={['customer']}><Layout><TransactionDetails /></Layout></ProtectedRoute>} />
      <Route path="/documents" element={<ProtectedRoute allowedRoles={['customer']}><Layout><Documents /></Layout></ProtectedRoute>} />
      <Route path="/notifications" element={<ProtectedRoute allowedRoles={['customer']}><Layout><Notifications /></Layout></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute allowedRoles={['customer']}><Layout><Settings /></Layout></ProtectedRoute>} />
      <Route path="/change-password" element={<ProtectedRoute allowedRoles={['customer']}><Layout><ChangePassword /></Layout></ProtectedRoute>} />

      <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminLayout><AdminDashboard /></AdminLayout></ProtectedRoute>} />
      <Route path="/admin/customers" element={<ProtectedRoute allowedRoles={['admin']}><AdminLayout><AdminCustomers /></AdminLayout></ProtectedRoute>} />
      <Route path="/admin/customers/:id" element={<ProtectedRoute allowedRoles={['admin']}><AdminLayout><AdminCustomerDetails /></AdminLayout></ProtectedRoute>} />
      <Route path="/admin/accounts" element={<ProtectedRoute allowedRoles={['admin']}><AdminLayout><AdminAccounts /></AdminLayout></ProtectedRoute>} />
      <Route path="/admin/transactions" element={<ProtectedRoute allowedRoles={['admin']}><AdminLayout><AdminTransactions /></AdminLayout></ProtectedRoute>} />
      <Route path="/admin/documents" element={<ProtectedRoute allowedRoles={['admin']}><AdminLayout><AdminDocuments /></AdminLayout></ProtectedRoute>} />
    </Routes>
  )
}

export default App
