import React from 'react'
import { motion } from 'framer-motion'
import { History } from 'lucide-react'

const ShiftHistory: React.FC = () => {
  const base = (import.meta as any).env?.BASE_URL || '/'
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">
            Shifthistory
          </h1>
          <p className="text-gray-400">Schichtverlauf</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="rounded-xl bg-gradient-to-br from-[#1a1b3a]/90 to-[#0f1026]/90 backdrop-blur-xl border border-indigo-500/30 overflow-hidden shadow-lg"
      >
        <div className="p-4 border-b border-indigo-500/30 flex items-center gap-3">
          <History className="w-5 h-5 text-indigo-400" />
          <h2 className="text-xl font-semibold">Shifthistory</h2>
        </div>
        <div className="w-full h-[90vh]">
          <iframe 
            src={`${base}shifthistory.html`}
            className="w-full h-full border-0"
            title="Shifthistory"
          />
        </div>
      </motion.div>
    </div>
  )
}

export default ShiftHistory
