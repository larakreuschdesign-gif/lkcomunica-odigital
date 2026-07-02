'use client'

import { motion } from 'framer-motion'
import { Lightbulb } from 'lucide-react'

const insights = [
  {
    title: 'Melhor horário de desempenho',
    description: '19h00 - 21h00',
    metric: 'Pico de engajamento 3.2x maior',
  },
  {
    title: 'Formato mais eficaz',
    description: 'Reels',
    metric: '8.500 interações em média',
  },
  {
    title: 'Tema com melhor performance',
    description: 'Conteúdo educativo',
    metric: '2.1x mais engajamento que comercial',
  },
  {
    title: 'Plataforma dominante',
    description: 'Instagram',
    metric: '45.230 contas alcançadas',
  },
  {
    title: 'Taxa de crescimento',
    description: '+12% no período',
    metric: 'Aceleração vs mês anterior',
  },
  {
    title: 'Oportunidade identificada',
    description: 'Formato carrossel',
    metric: 'Potencial 40% não explorado',
  },
]

export default function InsightsSection() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <Lightbulb size={28} className="text-lk-pink" />
          Insights Estratégicos
        </h2>
        <p className="text-gray-600">
          Descobertas e padrões extraídos dos seus dados
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {insights.map((insight, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="card group hover:shadow-soft-lg"
          >
            <h3 className="font-bold text-gray-900 mb-2 text-sm text-lk-pink-dark">
              {insight.title}
            </h3>
            <p className="text-2xl font-bold text-gray-900 mb-3">
              {insight.description}
            </p>
            <p className="text-sm text-gray-600 border-t border-lk-gray-rose pt-3">
              {insight.metric}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
