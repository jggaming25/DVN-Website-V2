import React from 'react'
import { motion } from 'framer-motion'
import { Activity, Calendar } from 'lucide-react'

const DutyTF: React.FC = () => {
  const duties = [
    { id: 1, name: 'TRIEBFAHRZEUGFÜHRER', date: '12.07.2025', time: '18:00 - 22:00', status: 'Besetzt' },
    { id: 2, name: 'TRIEBFAHRZEUGFÜHRER', date: '13.07.2025', time: '14:00 - 18:00', status: 'Frei' },
    { id: 3, name: 'FAHRDIENSTLEITER', date: '12.07.2025', time: '16:00 - 20:00', status: 'Besetzt' },
    { id: 4, name: 'DISPATCH', date: '12.07.2025', time: '17:00 - 21:00', status: 'Besetzt' },
  ]

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
            TF-Dienste
          </h1>
          <p className="text-gray-400">Triebfahrzeugführer & Fahrdienstleiter Dienste</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="rounded-xl bg-gradient-to-br from-[#1a1b3a]/90 to-[#0f1026]/90 backdrop-blur-xl border border-cyan-500/30 overflow-hidden shadow-lg"
      >
        <div className="p-6 border-b border-cyan-500/30">
          <div className="flex items-center gap-3">
            <Activity className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-semibold">Dienstübersicht</h2>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-gray-400 font-medium">Dienst</th>
                <th className="text-left p-4 text-gray-400 font-medium">Datum</th>
                <th className="text-left p-4 text-gray-400 font-medium">Zeit</th>
                <th className="text-left p-4 text-gray-400 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {duties.map((duty, index) => (
                <motion.tr
                  key={duty.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="p-4 font-medium">{duty.name}</td>
                  <td className="p-4 text-gray-300 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {duty.date}
                  </td>
                  <td className="p-4 text-gray-300">{duty.time}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${duty.status === 'Besetzt' ? 'text-red-400 bg-red-500/20' : 'text-green-400 bg-green-500/20'}`}>
                      {duty.status}
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

export default DutyTF
