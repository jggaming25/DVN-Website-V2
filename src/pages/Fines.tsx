import React from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, DollarSign, Calendar, CheckCircle, XCircle } from 'lucide-react'

const Fines: React.FC = () => {
  const fines = [
    { id: 1, person: 'Officer1', reason: 'Verspätung zur Schicht', amount: 50, status: 'open', date: '25.10.2026', issuedBy: 'AdminTeam' },
    { id: 2, person: 'Officer2', reason: 'Fehlende Ausrüstung', amount: 25, status: 'paid', date: '20.10.2026', issuedBy: 'ShiftLead' },
    { id: 3, person: 'jggaming2518', reason: 'Unentschuldigtes Fehlen', amount: 100, status: 'cancelled', date: '15.10.2026', issuedBy: 'Vorstand' },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'text-red-400 bg-red-500/20'
      case 'paid': return 'text-green-400 bg-green-500/20'
      case 'cancelled': return 'text-gray-400 bg-gray-500/20'
      default: return 'text-gray-400 bg-gray-500/20'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open': return 'Offen'
      case 'paid': return 'Bezahlt'
      case 'cancelled': return 'Storniert'
      default: return status
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <XCircle className="w-4 h-4" />
      case 'paid': return <CheckCircle className="w-4 h-4" />
      case 'cancelled': return <XCircle className="w-4 h-4" />
      default: return <AlertTriangle className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            Strafen
          </h1>
          <p className="text-gray-400">Verwaltung von Strafen und Bußgeldern</p>
        </div>
        <button className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 rounded-lg font-medium flex items-center gap-2 shadow-lg shadow-red-500/30 transition-all">
          <AlertTriangle className="w-4 h-4" />
          Neue Strafe
        </button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl bg-gradient-to-br from-[#1a1b3a]/90 to-[#0f1026]/90 backdrop-blur-xl border border-red-500/30 p-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <XCircle className="w-5 h-5 text-red-400" />
            <span className="text-gray-400">Offene Strafen</span>
          </div>
          <p className="text-2xl font-bold">1</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl bg-gradient-to-br from-[#1a1b3a]/90 to-[#0f1026]/90 backdrop-blur-xl border border-green-500/30 p-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-gray-400">Bezahlt</span>
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
            <DollarSign className="w-5 h-5 text-indigo-400" />
            <span className="text-gray-400">Gesamtbetrag</span>
          </div>
          <p className="text-2xl font-bold">€175</p>
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
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <h2 className="text-xl font-semibold">Strafenübersicht</h2>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-gray-400 font-medium">Mitarbeiter</th>
                <th className="text-left p-4 text-gray-400 font-medium">Grund</th>
                <th className="text-left p-4 text-gray-400 font-medium">Betrag</th>
                <th className="text-left p-4 text-gray-400 font-medium">Datum</th>
                <th className="text-left p-4 text-gray-400 font-medium">Ausgestellt von</th>
                <th className="text-left p-4 text-gray-400 font-medium">Status</th>
                <th className="text-left p-4 text-gray-400 font-medium">Aktionen</th>
              </tr>
            </thead>
            <tbody>
              {fines.map((fine, index) => (
                <motion.tr
                  key={fine.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="p-4 font-medium">{fine.person}</td>
                  <td className="p-4 text-gray-300">{fine.reason}</td>
                  <td className="p-4 font-medium text-red-400">€{fine.amount}</td>
                  <td className="p-4 text-gray-300 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {fine.date}
                  </td>
                  <td className="p-4 text-gray-300">{fine.issuedBy}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${getStatusColor(fine.status)}`}>
                      {getStatusIcon(fine.status)}
                      {getStatusText(fine.status)}
                    </span>
                  </td>
                  <td className="p-4">
                    <button className="px-3 py-1 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-400 rounded-lg text-sm transition-colors">
                      Details
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

export default Fines
