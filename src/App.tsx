import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Layout from './components/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Shifts from './pages/Shifts'
import Duty from './pages/Duty'
import Staff from './pages/Staff'
import Activity from './pages/Activity'
import Fines from './pages/Fines'
import History from './pages/History'
import Strafen from './pages/Strafen'
import DutyTF from './pages/DutyTF'
import DutysInfos from './pages/DutysInfos'
import MapDVN from './pages/MapDVN'
import ShiftHistory from './pages/ShiftHistory'
import ShiftCalendar from './pages/ShiftCalendar'

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth()
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
      </div>
    )
  }
  
  if (!user) {
    return <Navigate to="/login" replace />
  }
  
  return <>{children}</>
}

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="shifts" element={<Shifts />} />
        <Route path="duty" element={<Duty />} />
        <Route path="staff" element={<Staff />} />
        <Route path="activity" element={<Activity />} />
        <Route path="fines" element={<Fines />} />
        <Route path="history" element={<History />} />
        <Route path="strafen" element={<Strafen />} />
        <Route path="tf-duty" element={<DutyTF />} />
        <Route path="dutys-infos" element={<DutysInfos />} />
        <Route path="map" element={<MapDVN />} />
        <Route path="shifthistory" element={<ShiftHistory />} />
        <Route path="shiftcalendar" element={<ShiftCalendar />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App
