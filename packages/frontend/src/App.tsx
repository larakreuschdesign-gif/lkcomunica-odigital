import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/authStore'
import { Toaster } from 'react-hot-toast'

// Pages
import HomePage from './pages/Home'
import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'
import DashboardPage from './pages/Dashboard'
import CreateScriptPage from './pages/CreateScript'
import EditScriptPage from './pages/EditScript'

// Components
import ProtectedRoute from './components/auth/ProtectedRoute'

function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth)

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-script"
          element={
            <ProtectedRoute>
              <CreateScriptPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/scripts/:scriptId"
          element={
            <ProtectedRoute>
              <EditScriptPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Toaster position="top-right" />
    </Router>
  )
}

export default App
