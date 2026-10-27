import React from 'react'
import { motion } from 'framer-motion'
import { Info, Users, Calendar } from 'lucide-react'

const DutysInfos: React.FC = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            Dienste & Infos
          </h1>
          <p className="text-gray-400">Übersicht und Informationen zu Diensten</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl bg-gradient-to-br from-[#1a1b3a]/90 to-[#0f1026]/90 backdrop-blur-xl border border-purple-500/30 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl font-semibold">Dienstplan</h2>
          </div>
          <p className="text-gray-400">Aktueller Dienstplan wird hier angezeigt.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl bg-gradient-to-br from-[#1a1b3a]/90 to-[#0f1026]/90 backdrop-blur-xl border border-pink-500/30 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <Info className="w-5 h-5 text-pink-400" />
            <h2 className="text-xl font-semibold">Informationen</h2>
          </div>
          <p className="text-gray-400">Wichtige Informationen für das Team.</p>
        </motion.div>
      </div>
    </div>
  )
}

export default DutysInfos
