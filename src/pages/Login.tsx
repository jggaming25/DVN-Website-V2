import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, User, Lock, ArrowRight } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const Login: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await login(username, password)
      navigate('/')
    } catch (err) {
      setError('Ungültiger Benutzername oder Passwort')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-gradient-to-br from-[#1a1b3a]/90 to-[#0f1026]/90 backdrop-blur-xl rounded-2xl border border-indigo-500/30 shadow-2xl shadow-indigo-500/20 overflow-hidden">
          {/* Header */}
          <div className="p-8 text-center border-b border-indigo-500/30">
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center mb-4"
            >
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/50">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </motion.div>
            <motion.h1
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent mb-2"
            >
              DVN Portal
            </motion.h1>
            <motion.p
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-400"
            >
              Staff Activity System
            </motion.p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-2"
            >
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <User className="w-4 h-4" />
                Benutzername
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-indigo-500/30 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 text-white placeholder-gray-500"
                placeholder="Benutzername eingeben"
                required
              />
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="space-y-2"
            >
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Passwort
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-indigo-500/30 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 text-white placeholder-gray-500"
                placeholder="Passwort eingeben"
                required
              />
            </motion.div>

            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-xl font-semibold text-white shadow-lg shadow-indigo-500/50 hover:shadow-indigo-500/70 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Anmelden
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </form>

          <div className="px-8 pb-6 text-center">
            <p className="text-xs text-gray-500">
              © 2026 DVN - Department of Virtual Network
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Login
