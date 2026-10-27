import React, { createContext, useContext, useState, useEffect } from 'react'
import { User } from '../types'

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored auth
    const storedUser = localStorage.getItem('dvn_user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (username: string, password: string) => {
    // Mock authentication - in production this would call Supabase
    // Set jggaming2518 as Vorstand as requested
    if (username === 'jggaming2518') {
      const vorstandUser: User = {
        id: '1',
        username: 'jggaming2518',
        displayName: 'jggaming2518',
        role: 'VORSTAND',
        roleLabel: 'Vorstand',
        activityEligible: true,
        isShiftHost: true,
        accountStatus: 'active',
        createdAt: new Date().toISOString()
      }
      setUser(vorstandUser)
      localStorage.setItem('dvn_user', JSON.stringify(vorstandUser))
      return
    }

    // Default mock for other users
    const mockUser: User = {
      id: Math.random().toString(),
      username,
      displayName: username,
      role: 'PERSONAL',
      roleLabel: 'Personal',
      activityEligible: true,
      isShiftHost: false,
      accountStatus: 'active',
      createdAt: new Date().toISOString()
    }
    setUser(mockUser)
    localStorage.setItem('dvn_user', JSON.stringify(mockUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('dvn_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
