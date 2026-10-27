import React from 'react'
import { motion } from 'framer-motion'
import { Users, Shield, Star, Crown } from 'lucide-react'
import { getRoleColor, getRoleLabel } from '../lib/utils'

const Staff: React.FC = () => {
  const staff = [
    { id: 1, name: 'jggaming2518', role: 'VORSTAND', unit: 'Leitung', status: 'active' },
    { id: 2, name: 'AdminUser', role: 'ADMINISTRATOR', unit: 'Verwaltung', status: 'active' },
    { id: 3, name: 'Manager1', role: 'MANAGEMENT', unit: 'Management', status: 'active' },
    { id: 4, name: 'Officer1', role: 'PERSONAL', unit: 'Einsatz', status: 'active' },
    { id: 5, name: 'Officer2', role: 'PERSONAL', unit: 'Einsatz', status: 'active' },
  ]

  const getRoleIcon = (role: string) => {
    if (role === 'VORSTAND' || role === 'CEO') return <Crown className="w-4 h-4" />
    if (role === 'ADMINISTRATOR' || role === 'ADMIN' || role === 'MANAGEMENT' || role === 'BOARD') return <Shield className="w-4 h-4" />
    return <Star className="w-4 h-4" />
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent mb-2">
          Mitarbeiterverwaltung
        </h1>
        <p className="text-gray-400">Übersicht aller Mitarbeiter und deren Ränge</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="rounded-xl bg-gradient-to-br from-[#1a1b3a]/90 to-[#0f1026]/90 backdrop-blur-xl border border-indigo-500/30 overflow-hidden shadow-lg"
      >
        <div className="p-6 border-b border-indigo-500/30">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-semibold">Mitarbeiterliste</h2>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-gray-400 font-medium">Name</th>
                <th className="text-left p-4 text-gray-400 font-medium">Rang</th>
                <th className="text-left p-4 text-gray-400 font-medium">Einheit</th>
                <th className="text-left p-4 text-gray-400 font-medium">Status</th>
                <th className="text-left p-4 text-gray-400 font-medium">Aktionen</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((member, index) => (
                <motion.tr
                  key={member.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getRoleColor(member.role)} flex items-center justify-center text-white font-bold`}>
                        {member.name.substring(0, 2).toUpperCase()}
                      </div>
                      <span className="font-medium">{member.name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className={`bg-gradient-to-r ${getRoleColor(member.role)} bg-clip-text text-transparent font-medium flex items-center gap-1`}>
                        {getRoleIcon(member.role)}
                        {getRoleLabel(member.role)}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-300">{member.unit}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium">
                      Aktiv
                    </span>
                  </td>
                  <td className="p-4">
                    <button className="px-3 py-1 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-400 rounded-lg text-sm transition-colors">
                      Bearbeiten
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}

export default Staff
