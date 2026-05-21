'use client'

import React from 'react'
import { Button, Card } from '@/components/ui'
import Link from 'next/link'
import { Plus, FileText, Folder, Trash2, Download, Copy } from 'lucide-react'

export default function DashboardPage() {
  // Simulando dados de projetos
  const projects = [
    {
      id: '1',
      name: 'Campanha Reels Instagram',
      client: 'Lara Kreusch Design',
      platform: 'Reels',
      status: 'completed',
      date: '2024-05-20',
    },
    {
      id: '2',
      name: 'TikTok Shop - Produtos',
      client: 'Cliente X',
      platform: 'TikTok Shop',
      status: 'in-progress',
      date: '2024-05-18',
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Gerencie seus roteiros e projetos</p>
        </div>
        <Link href="/create">
          <Button size="lg" icon={<Plus className="w-5 h-5" />}>
            Novo Roteiro
          </Button>
        </Link>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Total de Roteiros', value: '12' },
          { label: 'Concluídos', value: '8' },
          { label: 'Em Progresso', value: '3' },
          { label: 'Rascunhos', value: '1' },
        ].map((stat) => (
          <Card key={stat.label}>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
          </Card>
        ))}
      </div>

      {/* Filtros e Busca */}
      <div className="flex gap-4 mb-8">
        <input
          type="text"
          placeholder="Buscar roteiros..."
          className="flex-1 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
        <select className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500">
          <option>Todas as Plataformas</option>
          <option>Reels</option>
          <option>TikTok</option>
          <option>YouTube</option>
        </select>
      </div>

      {/* Lista de Projetos */}
      <Card>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Meus Roteiros</h2>

        <div className="space-y-4">
          {projects.length > 0 ? (
            projects.map((project) => (
              <div
                key={project.id}
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-smooth"
              >
                <div className="flex items-center gap-4 flex-1">
                  <FileText className="w-6 h-6 text-brand-500 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{project.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {project.client} • {project.platform}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    project.status === 'completed'
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                      : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                  }`}>
                    {project.status === 'completed' ? 'Concluído' : 'Em Progresso'}
                  </span>

                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" icon={<Copy className="w-4 h-4" />} />
                    <Button variant="ghost" size="sm" icon={<Download className="w-4 h-4" />} />
                    <Button variant="ghost" size="sm" icon={<Trash2 className="w-4 h-4" />} />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <Folder className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400 mb-4">Nenhum roteiro criado ainda</p>
              <Link href="/create">
                <Button>Criar Primeiro Roteiro</Button>
              </Link>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
