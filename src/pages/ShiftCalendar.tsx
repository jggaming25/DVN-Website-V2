import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar } from 'lucide-react'

const ShiftCalendar: React.FC = () => {
  const base = (import.meta as any).env?.BASE_URL || '/'
  const [selectedMonth, setSelectedMonth] = useState('august')
  
  const months = [
    { key: 'juni', label: 'Shiftkalender Juni', file: 'shiftkalender_juni.html' },
    { key: 'august', label: 'Shiftkalender August', file: 'shiftkalender_august.html' },
    { key: 'september', label: 'Shiftkalender September', file: 'shiftkalender_september.html' },
  ]
  
  const current = months.find(m => m.key === selectedMonth)
  
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
          <p className="text-gray-400">Shiftkalender</p>
        </div>
        <div className="flex items-center gap-2">
          <select 
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-4 py-2 bg-[#1a1b3a] border border-indigo-500/30 rounded-lg focus:outline-none focus:border-indigo-500"
          >
            {months.map(month => (
              <option key={month.key} value={month.key}>{month.label}</option>
            ))}
          </select>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="rounded-xl bg-gradient-to-br from-[#1a1b3a]/90 to-[#0f1026]/90 backdrop-blur-xl border border-blue-500/30 overflow-hidden shadow-lg"
      >
        <div className="p-4 border-b border-blue-500/30 flex items-center gap-3">
          <Calendar className="w-5 h-5 text-blue-400" />
          <h2 className="text-xl font-semibold">{current?.label}</h2>
        </div>
        <div className="w-full h-[90vh]">
          <iframe 
            src={`${base}${current?.file}`}
            className="w-full h-full border-0"
            title={current?.label}
          />
        </div>
      </motion.div>
    </div>
  )
}

export default ShiftCalendar
