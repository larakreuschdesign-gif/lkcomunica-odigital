'use client'

import { useState } from 'react'
import { Plus, Search, Calendar, Filter } from 'lucide-react'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import ReportCard from '@/components/ReportCard'
import { motion } from 'framer-motion'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedMonth, setSelectedMonth] = useState('current')
  const [selectedPlatform, setSelectedPlatform] = useState('all')

  const mockReports = [
    {
      id: '1',
      clientName: 'Tech Startup XYZ',
      month: 'Junho 2024',
      platforms: ['Instagram', 'Facebook'],
      reach: 45230,
      engagement: 8.5,
      createdAt: new Date('2024-06-30'),
    },
    {
      id: '2',
      clientName: 'E-commerce Beauty',
      month: 'Junho 2024',
      platforms: ['Instagram', 'LinkedIn'],
      reach: 32100,
      engagement: 6.2,
      createdAt: new Date('2024-06-28'),
    },
    {
      id: '3',
      clientName: 'SaaS Company',
      month: 'Maio 2024',
      platforms: ['LinkedIn'],
      reach: 18500,
      engagement: 4.8,
      createdAt: new Date('2024-05-25'),
    },
  ]

  return (
    <div className="flex h-screen bg-lk-cream">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <div className="p-8 max-w-7xl mx-auto w-full">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                LK Analytics AI
              </h1>
              <p className="text-lg text-gray-600">
                Análise de Desempenho e Relatórios Inteligentes
              </p>
            </motion.div>

            {/* Action Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="mb-8"
            >
              <button className="btn-primary flex items-center gap-2 mb-8">
                <Plus size={20} />
                Novo Relatório
              </button>
            </motion.div>

            {/* Filters Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
            >
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Pesquisar clientes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12"
                />
              </div>

              {/* Month Filter */}
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="pl-12"
                >
                  <option value="current">Mês Atual</option>
                  <option value="last">Mês Passado</option>
                  <option value="last3">Últimos 3 Meses</option>
                  <option value="last6">Últimos 6 Meses</option>
                </select>
              </div>

              {/* Platform Filter */}
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <select
                  value={selectedPlatform}
                  onChange={(e) => setSelectedPlatform(e.target.value)}
                  className="pl-12"
                >
                  <option value="all">Todas as Plataformas</option>
                  <option value="instagram">Instagram</option>
                  <option value="facebook">Facebook</option>
                  <option value="linkedin">LinkedIn</option>
                </select>
              </div>
            </motion.div>

            {/* Reports Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {mockReports.map((report, index) => (
                <ReportCard key={report.id} report={report} index={index} />
              ))}
            </motion.div>

            {/* Empty State */}
            {mockReports.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="card-lg text-center py-16"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Nenhum relatório encontrado
                </h3>
                <p className="text-gray-600 mb-6">
                  Crie seu primeiro relatório clicando no botão acima
                </p>
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
