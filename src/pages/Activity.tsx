import React from 'react'
import { motion } from 'framer-motion'
import { Activity as ActivityIcon, TrendingUp, Clock, CheckCircle, AlertTriangle } from 'lucide-react'
import { formatMinutes } from '../lib/utils'

const Activity: React.FC = () => {
  const activityData = [
    { name: 'jggaming2518', unit: 'Leitung', credited: 1560, target: 1440, status: 'met', shifts: 24 },
    { name: 'AdminUser', unit: 'Verwaltung', credited: 1380, target: 1440, status: 'warning', shifts: 21 },
    { name: 'Manager1', unit: 'Management', credited: 1500, target: 1440, status: 'met', shifts: 23 },
    { name: 'Officer1', unit: 'Einsatz', credited: 1200, target: 1440, status: 'missed', shifts: 18 },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'met': return 'text-green-400 bg-green-500/20'
      case 'warning': return 'text-yellow-400 bg-yellow-500/20'
      case 'missed': return 'text-red-400 bg-red-500/20'
      default: return 'text-gray-400 bg-gray-500/20'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'met': return 'Erfüllt'
      case 'warning': return 'Warnung'
      case 'missed': return 'Nicht erfüllt'
      default: return status
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'met': return <CheckCircle className="w-4 h-4" />
      case 'warning': return <AlertTriangle className="w-4 h-4" />
      case 'missed': return <AlertTriangle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent mb-2">
          Activity Kontrolle
        </h1>
        <p className="text-gray-400">Monatliche Aktivitätsübersicht - Oktober 2026</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl bg-gradient-to-br from-[#1a1b3a]/90 to-[#0f1026]/90 backdrop-blur-xl border border-indigo-500/30 p-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-gray-400">Ziel erfüllt</span>
          </div>
          <p className="text-2xl font-bold">2</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl bg-gradient-to-br from-[#1a1b3a]/90 to-[#0f1026]/90 backdrop-blur-xl border border-indigo-500/30 p-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
            <span className="text-gray-400">Warnung</span>
          </div>
          <p className="text-2xl font-bold">1</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl bg-gradient-to-br from-[#1a1b3a]/90 to-[#0f1026]/90 backdrop-blur-xl border border-indigo-500/30 p-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <span className="text-gray-400">Nicht erfüllt</span>
          </div>
          <p className="text-2xl font-bold">1</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="rounded-xl bg-gradient-to-br from-[#1a1b3a]/90 to-[#0f1026]/90 backdrop-blur-xl border border-indigo-500/30 overflow-hidden shadow-lg"
      >
        <div className="p-6 border-b border-indigo-500/30">
          <div className="flex items-center gap-3">
            <ActivityIcon className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-semibold">Activity Übersicht</h2>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-gray-400 font-medium">Mitarbeiter</th>
                <th className="text-left p-4 text-gray-400 font-medium">Einheit</th>
                <th className="text-left p-4 text-gray-400 font-medium">Angerechnet</th>
                <th className="text-left p-4 text-gray-400 font-medium">Ziel</th>
                <th className="text-left p-4 text-gray-400 font-medium">Shifts</th>
                <th className="text-left p-4 text-gray-400 font-medium">Fehlend</th>
                <th className="text-left p-4 text-gray-400 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {activityData.map((item, index) => {
                const missing = Math.max(0, item.target - item.credited)
                const percentage = Math.round((item.credited / item.target) * 100)
                return (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="p-4 font-medium">{item.name}</td>
                    <td className="p-4 text-gray-300">{item.unit}</td>
                    <td className="p-4">
                      <div>
                        <span className="font-medium">{formatMinutes(item.credited)}</span>
                        <div className="w-24 bg-gray-700 rounded-full h-1.5 mt-1">
                          <div
                            className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                            style={{ width: `${Math.min(100, percentage)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-gray-300">{formatMinutes(item.target)}</td>
                    <td className="p-4 text-gray-300">{item.shifts}</td>
                    <td className="p-4 text-gray-300">{missing > 0 ? formatMinutes(missing) : '-'}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${getStatusColor(item.status)}`}>
                        {getStatusIcon(item.status)}
                        {getStatusText(item.status)}
                      </span>
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}

export default Activity
