import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Clock, 
  Users, 
  TrendingUp, 
  Award,
  Activity,
  Target
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { getRoleLabel } from '../lib/utils'

const Dashboard: React.FC = () => {
  const { user } = useAuth()
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const stats = [
    { label: 'Mitarbeiter', value: '-', icon: Users, color: 'from-purple-500 to-pink-500' },
    { label: 'Rolle', value: user ? getRoleLabel(user.role) : '-', icon: Award, color: 'from-blue-500 to-cyan-500' },
    { label: 'Activity', value: '-', icon: Activity, color: 'from-green-500 to-emerald-500' },
    { label: 'Status', value: 'Aktiv', icon: TrendingUp, color: 'from-orange-500 to-red-500' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 shadow-2xl"
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <motion.h1
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-4xl font-bold text-white mb-2"
              >
                Willkommen zurück, {user?.displayName}!
              </motion.h1>
              <motion.p
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-white/80 text-lg"
              >
                DVN Staff Activity System - Dashboard
              </motion.p>
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: 'spring' }}
              className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
            >
              <Award className="w-6 h-6 text-yellow-300" />
              <div>
                <p className="text-white font-semibold">{getRoleLabel(user?.role || 'PERSONAL')}</p>
                <p className="text-white/70 text-sm">Rang</p>
              </div>
            </motion.div>
          </div>
        </div>
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"
        />
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#1a1b3a]/90 to-[#0f1026]/90 backdrop-blur-xl border border-indigo-500/30 p-6 shadow-lg hover:shadow-indigo-500/30 transition-all duration-300"
            >
              <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${stat.color} opacity-10 rounded-bl-full`}></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Ziel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-xl bg-gradient-to-br from-[#1a1b3a]/90 to-[#0f1026]/90 backdrop-blur-xl border border-indigo-500/30 overflow-hidden shadow-lg"
        >
          <div className="p-6 border-b border-indigo-500/30">
            <div className="flex items-center gap-3">
              <Target className="w-5 h-5 text-orange-400" />
              <h2 className="text-xl font-semibold">Activity Ziel</h2>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Aktueller Monat</span>
              <span className="text-sm font-medium">{currentTime.toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })}</span>
            </div>
            <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/30 text-center">
              <p className="text-lg font-semibold text-orange-400">Activity Ziel</p>
              <p className="text-sm text-gray-400 mt-1">Wird aus der Activity Website Datenbank geladen</p>
            </div>
          </div>
        </motion.div>

        {/* Zeit */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="rounded-xl bg-gradient-to-br from-[#1a1b3a]/90 to-[#0f1026]/90 backdrop-blur-xl border border-indigo-500/30 overflow-hidden shadow-lg"
        >
          <div className="p-6 border-b border-indigo-500/30">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-cyan-400" />
              <h2 className="text-xl font-semibold">Zeit</h2>
            </div>
          </div>
          <div className="p-6 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl md:text-6xl font-mono font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                {currentTime.toLocaleTimeString('de-DE')}
              </div>
              <p className="text-gray-400">{currentTime.toLocaleDateString('de-DE', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard
