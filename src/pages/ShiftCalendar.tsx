import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'

const ShiftCalendar: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState('August 2025')
  
  const months = ['Juni 2025', 'August 2025', 'September 2025']
  
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            Schichtkalender
          </h1>
          <p className="text-gray-400">Übersicht der Schichten nach Monaten</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <select 
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-4 py-2 bg-[#1a1b3a] border border-indigo-500/30 rounded-lg focus:outline-none focus:border-indigo-500"
          >
            {months.map(month => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
          <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="rounded-xl bg-gradient-to-br from-[#1a1b3a]/90 to-[#0f1026]/90 backdrop-blur-xl border border-blue-500/30 p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <Calendar className="w-5 h-5 text-blue-400" />
          <h2 className="text-xl font-semibold">{selectedMonth}</h2>
        </div>
        <div className="aspect-[4/3] bg-black/40 rounded-lg flex items-center justify-center">
          <p className="text-gray-400">Kalender wird geladen...</p>
        </div>
      </motion.div>
    </div>
  )
}

export default ShiftCalendar
