'use client'

import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import ReportCard from '@/components/ReportCard'
import { motion } from 'framer-motion'
import { Plus, Search, Filter } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

export default function ReportsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')

  const allReports = [
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
    {
      id: '4',
      clientName: 'Fashion Brand',
      month: 'Junho 2024',
      platforms: ['Instagram', 'Facebook', 'LinkedIn'],
      reach: 67890,
      engagement: 9.2,
      createdAt: new Date('2024-06-27'),
    },
    {
      id: '5',
      clientName: 'Digital Agency',
      month: 'Maio 2024',
      platforms: ['Instagram', 'LinkedIn'],
      reach: 28400,
      engagement: 5.5,
      createdAt: new Date('2024-05-20'),
    },
    {
      id: '6',
      clientName: 'Food Delivery App',
      month: 'Junho 2024',
      platforms: ['Instagram', 'Facebook'],
      reach: 54320,
      engagement: 7.8,
      createdAt: new Date('2024-06-29'),
    },
  ]

  const filteredReports = allReports.filter((report) =>
    report.clientName.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    Todos os Relatórios
                  </h1>
                  <p className="text-gray-600">
                    Gerencie e visualize todos os seus relatórios de clientes
                  </p>
                </div>
                <Link href="/create-report">
                  <button className="btn-primary flex items-center gap-2">
                    <Plus size={20} />
                    Novo Relatório
                  </button>
                </Link>
              </div>

              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <Search
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Pesquisar por cliente..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12"
                  />
                </div>

                <div className="relative">
                  <Filter
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="pl-12"
                  >
                    <option value="all">Todos os Relatórios</option>
                    <option value="recent">Recentes (30 dias)</option>
                    <option value="old">Antigos (&gt;30 dias)</option>
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Reports Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredReports.map((report, index) => (
                <Link key={report.id} href={`/reports/${report.id}`}>
                  <ReportCard report={report} index={index} />
                </Link>
              ))}
            </motion.div>

            {/* Empty State */}
            {filteredReports.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="card-lg text-center py-16"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Nenhum relatório encontrado
                </h3>
                <p className="text-gray-600">
                  {searchQuery
                    ? 'Tente refinar sua busca'
                    : 'Crie seu primeiro relatório clicando no botão acima'}
                </p>
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
