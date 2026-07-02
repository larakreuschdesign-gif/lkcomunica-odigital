'use client'

import { motion } from 'framer-motion'
import { AlertCircle, TrendingUp } from 'lucide-react'

const actionPlan = [
  {
    problem: 'Queda em visualizações de Stories (-8%)',
    impact: 'Alto',
    recommendation: 'Testar Stories interativas com stickers e enquetes',
    priority: 'Alta',
    deadline: '7 dias',
  },
  {
    problem: 'Baixo aproveitamento de Carrosséis',
    impact: 'Médio',
    recommendation: 'Aumentar frequência para 2x semana com temas educativos',
    priority: 'Média',
    deadline: '14 dias',
  },
  {
    problem: 'Concentração em Instagram',
    impact: 'Médio',
    recommendation: 'Desenvolver estratégia específica para LinkedIn (B2B)',
    priority: 'Média',
    deadline: '21 dias',
  },
  {
    problem: 'Horário de publicação subótimo',
    impact: 'Alto',
    recommendation: 'Realinhar calendário para publ. entre 19h-20h',
    priority: 'Alta',
    deadline: 'Imediato',
  },
]

const suggestedContent = {
  idealFrequency: {
    reels: '5-7 por semana',
    carousels: '2 por semana',
    stories: '10-15 por dia',
    institutional: '2 por semana',
  },
  suggestedThemes: [
    'Dicas e tutoriais (educativo)',
    'Case studies de clientes',
    'Behind the scenes',
    'Conteúdo trending adaptado',
    'Webinars e lives',
  ],
}

export default function ActionPlanSection() {
  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <TrendingUp size={28} className="text-lk-pink" />
          Plano de Ação - Próximo Mês
        </h2>
        <p className="text-gray-600">
          Recomendações estratégicas baseadas em dados
        </p>
      </div>

      {/* Action Items */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="card-lg overflow-x-auto"
      >
        <table className="w-full">
          <thead>
            <tr className="border-b border-lk-gray-rose">
              <th className="text-left py-3 px-4 font-bold text-gray-900">Problema</th>
              <th className="text-left py-3 px-4 font-bold text-gray-900">Impacto</th>
              <th className="text-left py-3 px-4 font-bold text-gray-900">Recomendação</th>
              <th className="text-left py-3 px-4 font-bold text-gray-900">Prioridade</th>
              <th className="text-left py-3 px-4 font-bold text-gray-900">Prazo</th>
            </tr>
          </thead>
          <tbody>
            {actionPlan.map((item, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-lk-gray-rose hover:bg-lk-cream transition-colors"
              >
                <td className="py-4 px-4 text-sm text-gray-700">{item.problem}</td>
                <td className="py-4 px-4">
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${
                      item.impact === 'Alto'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {item.impact}
                  </span>
                </td>
                <td className="py-4 px-4 text-sm text-gray-700">
                  {item.recommendation}
                </td>
                <td className="py-4 px-4">
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${
                      item.priority === 'Alta'
                        ? 'bg-lk-pink-soft text-lk-pink-dark'
                        : 'bg-lk-pink/10 text-lk-pink-dark'
                    }`}
                  >
                    {item.priority}
                  </span>
                </td>
                <td className="py-4 px-4 text-sm font-medium text-gray-700">
                  {item.deadline}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Suggested Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {/* Frequency */}
        <div className="card-lg">
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Frequência Ideal de Conteúdo
          </h3>
          <div className="space-y-4">
            {Object.entries(suggestedContent.idealFrequency).map(
              ([type, frequency]) => (
                <div key={type} className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium capitalize">
                    {type === 'reels' && 'Reels'}
                    {type === 'carousels' && 'Carrosséis'}
                    {type === 'stories' && 'Stories'}
                    {type === 'institutional' && 'Posts Institucionais'}
                  </span>
                  <span className="font-bold text-lk-pink-dark">{frequency}</span>
                </div>
              )
            )}
          </div>
        </div>

        {/* Suggested Themes */}
        <div className="card-lg">
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Temas Sugeridos
          </h3>
          <div className="space-y-3">
            {suggestedContent.suggestedThemes.map((theme, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-lk-pink flex-shrink-0"></div>
                <span className="text-gray-700">{theme}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
