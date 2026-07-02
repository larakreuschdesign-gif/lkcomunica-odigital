'use client'

import { useState } from 'react'
import { BarChart3, TrendingUp, Users, MessageSquare } from 'lucide-react'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import { motion } from 'framer-motion'

export default function Analytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('month')

  const stats = [
    {
      label: 'Relatórios Gerados',
      value: '24',
      icon: BarChart3,
      trend: '+5 este mês',
    },
    {
      label: 'Engajamento Médio',
      value: '7.2%',
      icon: Users,
      trend: '+0.8% vs último mês',
    },
    {
      label: 'Clientes Ativos',
      value: '12',
      icon: TrendingUp,
      trend: '+2 novos',
    },
    {
      label: 'Insights Gerados',
      value: '156',
      icon: MessageSquare,
      trend: '+45 este mês',
    },
  ]

  return (
    <div className="flex h-screen bg-lk-cream">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <div className="p-8 max-w-7xl mx-auto w-full">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Análises Consolidadas
              </h1>
              <p className="text-gray-600">
                Visão geral de todos os seus relatórios e clientes
              </p>
            </motion.div>

            {/* Period Selector */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex gap-4 mb-8"
            >
              {['week', 'month', 'quarter'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-6 py-2 rounded-xl font-semibold transition-all ${
                    selectedPeriod === period
                      ? 'bg-lk-pink text-white shadow-soft'
                      : 'bg-white text-gray-700 border border-lk-gray-rose hover:border-lk-pink'
                  }`}
                >
                  {period === 'week'
                    ? 'Esta Semana'
                    : period === 'month'
                    ? 'Este Mês'
                    : 'Este Trimestre'}
                </button>
              ))}
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card-lg"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-600 font-medium mb-1">
                        {stat.label}
                      </p>
                      <p className="text-3xl font-bold text-gray-900">
                        {stat.value}
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-lk-pink/10 flex items-center justify-center">
                      <stat.icon size={24} className="text-lk-pink" />
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 border-t border-lk-gray-rose pt-3">
                    {stat.trend}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Coming Soon Message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="card-lg text-center py-16"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Análises Avançadas
              </h3>
              <p className="text-gray-600 mb-6">
                Comparativas entre clientes, benchmarking de mercado e
                projeções de crescimento em breve
              </p>
              <div className="inline-block px-6 py-3 bg-lk-pink/10 rounded-xl">
                <p className="text-sm font-semibold text-lk-pink">
                  ✨ Disponível em breve
                </p>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}
