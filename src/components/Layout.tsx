import React, { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Activity, 
  FileText, 
  AlertTriangle,
  Settings,
  LogOut,
  Menu,
  X,
  Sparkles,
  Gavel,
  Train,
  Info,
  Map,
  History
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { getRoleColor, getRoleLabel } from '../lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

const Layout: React.FC = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/shifts', icon: Calendar, label: 'Schichten' },
    { path: '/duty', icon: Activity, label: 'Dienste' },
    { path: '/strafen', icon: Gavel, label: 'Strafen' },
    { path: '/dutys-infos', icon: Info, label: 'Dienste & Infos' },
    { path: '/map', icon: Map, label: 'Map' },
    { path: '/shifthistory', icon: History, label: 'Schichtverlauf' },
    { path: '/shiftcalendar', icon: Calendar, label: 'Schichtkalender' },
    { path: '/staff', icon: Users, label: 'Mitarbeiter', adminOnly: false },
    { path: '/activity', icon: Activity, label: 'Activity' },
    { path: '/fines', icon: AlertTriangle, label: 'Strafen (Alt)' },
    { path: '/history', icon: FileText, label: 'Verlauf' },
  ]

  const canAccess = (item: any) => {
    if (!item.adminOnly) return true
    if (!user) return false
    return ['CEO', 'VORSTAND', 'ADMINISTRATOR', 'ADMIN', 'BOARD', 'MANAGEMENT'].includes(user.role)
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || window.innerWidth >= 1024) && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed lg:sticky top-0 left-0 h-screen w-72 bg-gradient-to-b from-[#1a1b3a]/95 to-[#0f1026]/95 backdrop-blur-xl border-r border-indigo-500/30 z-50 flex flex-col"
          >
            {/* Logo */}
            <div className="p-6 border-b border-indigo-500/30">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/50">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                    DVN Portal
                  </h1>
                  <p className="text-xs text-gray-400">Staff Activity System</p>
                </div>
              </div>
            </div>

            {/* User Info */}
            <div className="p-4 border-b border-indigo-500/30">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 border border-indigo-500/30">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getRoleColor(user?.role || 'PERSONAL')} flex items-center justify-center font-bold text-white shadow-lg`}>
                  {user?.displayName.substring(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{user?.displayName}</p>
                  <p className={`text-xs bg-gradient-to-r ${getRoleColor(user?.role || 'PERSONAL')} bg-clip-text text-transparent font-medium`}>
                    {getRoleLabel(user?.role || 'PERSONAL')}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              {navItems.map((item) => {
                if (!canAccess(item)) return null
                const Icon = item.icon
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/'}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                        isActive
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/50'
                          : 'text-gray-300 hover:bg-white/5 hover:text-white'
                      }`
                    }
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                      <Sparkles className="w-4 h-4" />
                    </div>
                  </NavLink>
                )
              })}
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-indigo-500/30">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-red-500/10 hover:text-red-400 transition-all duration-300 group"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Abmelden</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-40 bg-[#0f1026]/80 backdrop-blur-xl border-b border-indigo-500/30 px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div className="hidden lg:block">
              <h2 className="text-lg font-semibold">Staff Activity System</h2>
              <p className="text-sm text-gray-400">Willkommen zurück, {user?.displayName}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium">{new Date().toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                <p className="text-xs text-gray-400">{new Date().toLocaleTimeString('de-DE', { timeZone: 'Europe/Berlin' })}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}

export default Layout
