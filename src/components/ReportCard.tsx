'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, Eye, Share2 } from 'lucide-react'

interface Report {
  id: string
  clientName: string
  month: string
  platforms: string[]
  reach: number
  engagement: number
  createdAt: Date
}

export default function ReportCard({ report, index }: { report: Report; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="card hover:shadow-soft-lg cursor-pointer group"
    >
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-lk-pink transition-colors">
          {report.clientName}
        </h3>
        <p className="text-sm text-gray-600">{report.month}</p>
      </div>

      {/* Platforms */}
      <div className="flex flex-wrap gap-2 mb-6">
        {report.platforms.map((platform) => (
          <span
            key={platform}
            className="text-xs font-semibold px-3 py-1 rounded-lg bg-lk-pink-soft text-lk-pink-dark"
          >
            {platform}
          </span>
        ))}
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-lk-gray-rose">
        <div>
          <p className="text-xs text-gray-600 mb-1">Alcance</p>
          <p className="text-lg font-bold text-gray-900">
            {(report.reach / 1000).toFixed(1)}K
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-600 mb-1">Engajamento</p>
          <div className="flex items-center gap-1">
            <p className="text-lg font-bold text-gray-900">{report.engagement}%</p>
            <ArrowUpRight size={16} className="text-green-500" />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-lk-cream text-gray-700 hover:bg-lk-gray-rose transition-colors text-sm font-medium">
          <Eye size={16} />
          Ver
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-lk-cream text-gray-700 hover:bg-lk-gray-rose transition-colors text-sm font-medium">
          <Share2 size={16} />
          Compartilhar
        </button>
      </div>
    </motion.div>
  )
}
