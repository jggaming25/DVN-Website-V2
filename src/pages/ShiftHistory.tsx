import React from 'react'
import { motion } from 'framer-motion'
import { History, Calendar } from 'lucide-react'

const ShiftHistory: React.FC = () => {
  const history = [
    { id: 1, date: '26.10.2026', shift: 'Abendsschicht', duration: '4h', status: 'Abgeschlossen' },
    { id: 2, date: '25.10.2026', shift: 'Tagschicht', duration: '6h', status: 'Abgeschlossen' },
    { id: 3, date: '24.10.2026', shift: 'Nachtschicht', duration: '8h', status: 'Abgeschlossen' },
  ]

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">
            Schichtverlauf
          </h1>
          <p className="text-gray-400">Historie deiner geleisteten Schichten</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="rounded-xl bg-gradient-to-br from-[#1a1b3a]/90 to-[#0f1026]/90 backdrop-blur-xl border border-indigo-500/30 overflow-hidden shadow-lg"
      >
        <div className="p-6 border-b border-indigo-500/30">
          <div className="flex items-center gap-3">
            <History className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-semibold">Letzte Schichten</h2>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-gray-400 font-medium">Datum</th>
                <th className="text-left p-4 text-gray-400 font-medium">Schicht</th>
                <th className="text-left p-4 text-gray-400 font-medium">Dauer</th>
                <th className="text-left p-4 text-gray-400 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {history.map((entry, index) => (
                <motion.tr
                  key={entry.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="p-4 text-gray-300 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {entry.date}
                  </td>
                  <td className="p-4 font-medium">{entry.shift}</td>
                  <td className="p-4 text-gray-300">{entry.duration}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium text-green-400 bg-green-500/20">
                      {entry.status}
                    </span>
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

export default ShiftHistory
