import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Calendar, 
  Clock, 
  Users, 
  Plus,
  MapPin,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react'

const Shifts: React.FC = () => {
  const [view, setView] = useState<'calendar' | 'list'>('calendar')

  const shifts = [
    {
      id: 1,
      title: 'Frühschicht',
      time: '06:00 - 14:00',
      date: '27.10.2026',
      status: 'active',
      participants: 5,
      maxParticipants: 6,
      host: 'Admin Team',
      location: 'Hauptquartier'
    },
    {
      id: 2,
      title: 'Spätschicht',
      time: '14:00 - 22:00',
      date: '27.10.2026',
      status: 'upcoming',
      participants: 4,
      maxParticipants: 6,
      host: 'Shift Lead',
      location: 'Außeneinsatz'
    },
    {
      id: 3,
      title: 'Nachtschicht',
      time: '22:00 - 06:00',
      date: '28.10.2026',
      status: 'planned',
      participants: 0,
      maxParticipants: 4,
      host: 'Night Team',
      location: 'Hauptquartier'
    },
    {
      id: 4,
      title: 'Testschicht',
      time: '18:00 - 20:00',
      date: '28.10.2026',
      status: 'open',
      participants: 2,
      maxParticipants: 8,
      host: 'Ausbildung',
      location: 'Trainingsgelände'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-500/20'
      case 'upcoming': return 'text-yellow-400 bg-yellow-500/20'
      case 'open': return 'text-blue-400 bg-blue-500/20'
      case 'planned': return 'text-gray-400 bg-gray-500/20'
      default: return 'text-gray-400 bg-gray-500/20'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />
      case 'upcoming': return <Clock className="w-4 h-4" />
      case 'open': return <AlertCircle className="w-4 h-4" />
      default: return <Calendar className="w-4 h-4" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Aktiv'
      case 'upcoming': return 'Demnächst'
      case 'open': return 'Offen'
      case 'planned': return 'Geplant'
      default: return status
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            Schichtplan
          </h1>
          <p className="text-gray-400">Verwalte und melde dich für Schichten an</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-[#1a1b3a] rounded-lg p-1 border border-indigo-500/30">
            <button
              onClick={() => setView('calendar')}
              className={`px-4 py-2 rounded-md transition-all ${view === 'calendar' ? 'bg-indigo-500 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Kalender
            </button>
            <button
              onClick={() => setView('list')}
              className={`px-4 py-2 rounded-md transition-all ${view === 'list' ? 'bg-indigo-500 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Liste
            </button>
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-lg font-medium flex items-center gap-2 shadow-lg shadow-indigo-500/30 transition-all">
            <Plus className="w-4 h-4" />
            Neue Schicht
          </button>
        </div>
      </motion.div>

      {/* Shifts Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {shifts.map((shift, index) => (
          <motion.div
            key={shift.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#1a1b3a]/90 to-[#0f1026]/90 backdrop-blur-xl border border-indigo-500/30 shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 cursor-pointer"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-1">{shift.title}</h3>
                  <p className="text-gray-400 text-sm">{shift.date}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(shift.status)}`}>
                  {getStatusIcon(shift.status)}
                  {getStatusText(shift.status)}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-gray-300">
                  <Clock className="w-4 h-4 text-indigo-400" />
                  <span className="text-sm">{shift.time}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm">{shift.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Users className="w-4 h-4 text-purple-400" />
                  <span className="text-sm">{shift.participants} / {shift.maxParticipants} Teilnehmer</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <p className="text-sm text-gray-400 mb-3">Host: <span className="text-gray-300">{shift.host}</span></p>
                {shift.status === 'open' && (
                  <button className="w-full py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-lg font-medium transition-all">
                    Anmelden
                  </button>
                )}
                {shift.status === 'active' && (
                  <button className="w-full py-2 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 rounded-lg font-medium transition-all">
                    Einchecken
                  </button>
                )}
                {(shift.status === 'upcoming' || shift.status === 'planned') && (
                  <button className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg font-medium transition-all">
                    Details
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default Shifts
