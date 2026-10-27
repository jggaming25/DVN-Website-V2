import React from 'react'
import { motion } from 'framer-motion'
import { Activity, Shield, Car, Radio, MapPin, Clock } from 'lucide-react'

const Duty: React.FC = () => {
  const duties = [
    { id: 1, name: 'Streifen', icon: Car, members: 4, status: 'active', location: 'Stadtgebiet' },
    { id: 2, name: 'Zentrale', icon: Radio, members: 2, status: 'active', location: 'Leitstelle' },
    { id: 3, name: 'Sicherung', icon: Shield, members: 3, status: 'standby', location: 'Eventbereich' },
    { id: 4, name: 'Patrouille', icon: MapPin, members: 6, status: 'active', location: 'Außengebiet' },
  ]

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent mb-2">
          Dienstplan
        </h1>
        <p className="text-gray-400">Aktuelle Dienste und Einsatzbereiche</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {duties.map((duty, index) => {
          const Icon = duty.icon
          return (
            <motion.div
              key={duty.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="rounded-xl bg-gradient-to-br from-[#1a1b3a]/90 to-[#0f1026]/90 backdrop-blur-xl border border-indigo-500/30 p-6 shadow-lg hover:shadow-indigo-500/30 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{duty.name}</h3>
                  <p className="text-gray-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {duty.location}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  duty.status === 'active' ? 'text-green-400 bg-green-500/20' : 'text-yellow-400 bg-yellow-500/20'
                }`}>
                  {duty.status === 'active' ? 'Aktiv' : 'Bereitschaft'}
                </span>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 text-gray-400">
                  <Activity className="w-4 h-4" />
                  <span className="text-sm">{duty.members} Mitglieder</span>
                </div>
                <button className="px-4 py-2 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-400 rounded-lg transition-colors">
                  Details
                </button>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default Duty
