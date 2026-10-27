import React from 'react'
import { motion } from 'framer-motion'
import { 
  Calendar, 
  Clock, 
  Users, 
  TrendingUp, 
  Award,
  AlertCircle,
  CheckCircle,
  Activity
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { formatMinutes, getRoleColor, getRoleLabel } from '../lib/utils'

const Dashboard: React.FC = () => {
  const { user } = useAuth()

  const stats = [
    { label: 'Aktive Schichten', value: '12', icon: Calendar, color: 'from-blue-500 to-cyan-500' },
    { label: 'Meine Stunden (Monat)', value: '32.5h', icon: Clock, color: 'from-green-500 to-emerald-500' },
    { label: 'Mitarbeiter Online', value: '24', icon: Users, color: 'from-purple-500 to-pink-500' },
    { label: 'Activity Status', value: 'Erfüllt', icon: TrendingUp, color: 'from-orange-500 to-red-500' },
  ]

  const recentShifts = [
    { id: 1, title: 'Frühschicht 06:00-14:00', date: 'Heute', status: 'active', participants: 5 },
    { id: 2, title: 'Spätschicht 14:00-22:00', date: 'Heute', status: 'upcoming', participants: 4 },
    { id: 3, title: 'Nachtschicht 22:00-06:00', date: 'Morgen', status: 'planned', participants: 3 },
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
        {/* Recent Shifts */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-xl bg-gradient-to-br from-[#1a1b3a]/90 to-[#0f1026]/90 backdrop-blur-xl border border-indigo-500/30 overflow-hidden shadow-lg"
        >
          <div className="p-6 border-b border-indigo-500/30">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-indigo-400" />
              <h2 className="text-xl font-semibold">Aktuelle Schichten</h2>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {recentShifts.map((shift) => (
              <motion.div
                key={shift.id}
                whileHover={{ x: 5 }}
                className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${
                    shift.status === 'active' ? 'bg-green-400 animate-pulse' :
                    shift.status === 'upcoming' ? 'bg-yellow-400' : 'bg-gray-400'
                  }`}></div>
                  <div>
                    <p className="font-medium">{shift.title}</p>
                    <p className="text-sm text-gray-400">{shift.date} • {shift.participants} Teilnehmer</p>
                  </div>
                </div>
                <div>
                  {shift.status === 'active' && (
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium flex items-center gap-1">
                      <Activity className="w-3 h-3" />
                      Aktiv
                    </span>
                  )}
                  {shift.status === 'upcoming' && (
                    <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-medium">
                      Demnächst
                    </span>
                  )}
                  {shift.status === 'planned' && (
                    <span className="px-3 py-1 bg-gray-500/20 text-gray-400 rounded-full text-xs font-medium">
                      Geplant
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Activity Overview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="rounded-xl bg-gradient-to-br from-[#1a1b3a]/90 to-[#0f1026]/90 backdrop-blur-xl border border-indigo-500/30 overflow-hidden shadow-lg"
        >
          <div className="p-6 border-b border-indigo-500/30">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <h2 className="text-xl font-semibold">Activity Übersicht</h2>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Monatsziel</span>
                <span className="text-sm font-medium">32.5 / 40 Std.</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '81.25%' }}
                  transition={{ delay: 0.8, duration: 1 }}
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">7.5 Stunden verbleibend</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/30">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-sm font-medium">Ziel erfüllt</p>
                  <p className="text-xs text-gray-400">Alle Anforderungen für diesen Monat erfüllt</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
                <AlertCircle className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-sm font-medium">Nächste Auswertung</p>
                  <p className="text-xs text-gray-400">Ende des Monats</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard
