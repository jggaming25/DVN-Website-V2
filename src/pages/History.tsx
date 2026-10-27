import React from 'react'
import { motion } from 'framer-motion'
import { FileText, Calendar, Clock, User } from 'lucide-react'

const History: React.FC = () => {
  const history = [
    { id: 1, type: 'shift', action: 'Schicht abgeschlossen', user: 'jggaming2518', shift: 'Frühschicht 06:00-14:00', time: '27.10.2026 14:05' },
    { id: 2, type: 'fine', action: 'Strafe ausgestellt', user: 'AdminUser', target: 'Officer1', time: '25.10.2026 16:30' },
    { id: 3, type: 'login', action: 'Anmeldung', user: 'jggaming2518', time: '27.10.2026 05:58' },
    { id: 4, type: 'duty', action: 'Dienst übernommen', user: 'Officer2', duty: 'Streifen', time: '27.10.2026 06:00' },
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'shift': return <Calendar className="w-4 h-4" />
      case 'fine': return <FileText className="w-4 h-4" />
      case 'login': return <User className="w-4 h-4" />
      case 'duty': return <Clock className="w-4 h-4" />
      default: return <FileText className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'shift': return 'text-blue-400 bg-blue-500/20'
      case 'fine': return 'text-red-400 bg-red-500/20'
      case 'login': return 'text-green-400 bg-green-500/20'
      case 'duty': return 'text-purple-400 bg-purple-500/20'
      default: return 'text-gray-400 bg-gray-500/20'
    }
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent mb-2">
          Verlauf
        </h1>
        <p className="text-gray-400">Historie aller Aktivitäten im System</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="rounded-xl bg-gradient-to-br from-[#1a1b3a]/90 to-[#0f1026]/90 backdrop-blur-xl border border-indigo-500/30 overflow-hidden shadow-lg"
      >
        <div className="p-6 border-b border-indigo-500/30">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-semibold">Aktivitätsverlauf</h2>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {history.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getTypeColor(item.type)}`}>
                  {getTypeIcon(item.type)}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{item.action}</p>
                  <p className="text-sm text-gray-400">
                    Von: <span className="text-gray-300">{item.user}</span>
                    {item.target && <> • Für: <span className="text-gray-300">{item.target}</span></>}
                    {item.shift && <> • <span className="text-gray-300">{item.shift}</span></>}
                    {item.duty && <> • <span className="text-gray-300">{item.duty}</span></>}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {item.time}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default History
