import React from 'react'
import { motion } from 'framer-motion'
import { Map } from 'lucide-react'

const MapDVN: React.FC = () => {
  const base = (import.meta as any).env?.BASE_URL || '/'
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
            Map
          </h1>
          <p className="text-gray-400">DVN Netzkarte</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="rounded-xl bg-gradient-to-br from-[#1a1b3a]/90 to-[#0f1026]/90 backdrop-blur-xl border border-green-500/30 overflow-hidden shadow-lg"
      >
        <div className="p-4 border-b border-green-500/30 flex items-center gap-3">
          <Map className="w-5 h-5 text-green-400" />
          <h2 className="text-xl font-semibold">Map DVN</h2>
        </div>
        <div className="w-full h-[80vh]">
          <iframe 
            src={`${base}map_dvn.html`}
            className="w-full h-full border-0"
            title="Map DVN"
          />
        </div>
      </motion.div>
    </div>
  )
}

export default MapDVN
