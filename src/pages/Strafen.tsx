import React from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, Clock, User } from 'lucide-react'

const Strafen: React.FC = () => {
  const fines = [
    { name: 'Hamsti', time: '3', reason: 'Abmeldung (Kein FA, abmeldung wegen Gartenfeier) HP0Über Hp0, fährt durch Bhf, Diskutiert in Staff sign up', workedOff: '1,4', saldo: '1,6' },
    { name: 'Der_Sani', time: '1', reason: 'HP0', workedOff: '0', saldo: '1' },
    { name: 'MiguelHDscm', time: '1', reason: 'Fehlleitung', workedOff: '0', saldo: '1' },
    { name: 'Onkel_Berndt', time: '4', reason: 'Fürs Lizenz Training Angemeldet, auch auf Nachfrage nicht erschienen, Bricht in Dispo ein', workedOff: '1', saldo: '3' },
    { name: 'Cduvsafd', time: '6,5', reason: 'Geht afk Während der Notbremse (blockiert Weidenheim), hp0, Spontane Abmeldung, falsche GSM-R Nummer, Abmeldung nach Frist(2h)', workedOff: '3,4', saldo: '3,1' },
    { name: 'Murmel', time: '1,5', reason: 'Verursacht Verspätung und hinterlegt selten Gleisänderungen', workedOff: '0', saldo: '1,5' },
    { name: 'Finimal', time: '5', reason: 'Fährt auf HP0 auf, Fährt obwohl er nicht mehr auf dem Tfz sein soll, Leerpark mit RB Zugnummer, Liest Duty beschreibung nicht und sorgt für Verspätungen. Falsche GSMR nummer', workedOff: '2', saldo: '3' },
    { name: 'JGGgaming', time: '1', reason: 'HP0', workedOff: '0', saldo: '1' },
    { name: 'mahdiwt', time: '2', reason: 'Vergisst mehrmals zu blocken &amp; Telefon aufzulegen', workedOff: '0,5', saldo: '1,5' },
    { name: 'Der_Hamster', time: '3,9', reason: 'HP0, Unerlaubte Hilfe beim Training/Betrug', workedOff: '2', saldo: '1,9' },
    { name: 'Upstart190113', time: '3,5', reason: 'Hp0, Freche anlüge des HR Teams, zwangsschließen ohne ansage, Sagt einem Zug das er vor Plan abfahren soll', workedOff: '0', saldo: '3,5' },
    { name: 'Hu_go', time: '3,5', reason: 'HP0, abmeldung nach frist, Trollt', workedOff: '0', saldo: '3,5' },
  ]

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-2">
            Strafen
          </h1>
          <p className="text-gray-400">Strafentabelle</p>
        </div>
        <div className="px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-sm text-red-400">
          <Clock className="w-4 h-4 inline mr-2" />
          Wichtig! Ab 4 Std muss Abgearbeitet werden! Solltest du mehr als 4 Stunden haben kriegst du eine Frist und musst auf unter 4,0 Stunden abarbeiten!
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="rounded-xl bg-gradient-to-br from-[#1a1b3a]/90 to-[#0f1026]/90 backdrop-blur-xl border border-red-500/30 overflow-hidden shadow-lg"
      >
        <div className="p-6 border-b border-red-500/30">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <h2 className="text-xl font-semibold">Strafentabelle</h2>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-gray-400 font-medium">Name</th>
                <th className="text-left p-4 text-gray-400 font-medium">Zeit</th>
                <th className="text-left p-4 text-gray-400 font-medium">Grund/Gründe</th>
                <th className="text-left p-4 text-gray-400 font-medium">Abgearbeitet</th>
                <th className="text-left p-4 text-gray-400 font-medium">Saldo</th>
              </tr>
            </thead>
            <tbody>
              {fines.map((fine, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.02 }}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="p-4 font-medium flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" />
                    {fine.name}
                  </td>
                  <td className="p-4 text-orange-400 font-medium">{fine.time}h</td>
                  <td className="p-4 text-gray-300 max-w-md">{fine.reason}</td>
                  <td className="p-4 text-green-400">{fine.workedOff}h</td>
                  <td className={`p-4 font-bold ${parseFloat(fine.saldo.replace(',', '.')) >= 4 ? 'text-red-400' : parseFloat(fine.saldo.replace(',', '.')) > 0 ? 'text-orange-400' : 'text-green-400'}`}>
                    {fine.saldo}h
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

export default Strafen
