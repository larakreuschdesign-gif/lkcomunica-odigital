'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface KPICardProps {
  label: string
  value: string
  variation: number
  icon: LucideIcon
  index: number
}

export default function KPICard({
  label,
  value,
  variation,
  icon: Icon,
  index,
}: KPICardProps) {
  const isPositive = variation >= 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="card-lg group hover:shadow-soft-lg"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm text-gray-600 font-medium mb-1">{label}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-lk-pink/10 flex items-center justify-center group-hover:bg-lk-pink/20 transition-colors">
          <Icon size={24} className="text-lk-pink" />
        </div>
      </div>

      {/* Variation */}
      <div className="flex items-center gap-2 pt-4 border-t border-lk-gray-rose">
        <div
          className={`flex items-center gap-1 text-sm font-semibold ${
            isPositive ? 'text-green-600' : 'text-red-600'
          }`}
        >
          <span>{isPositive ? '↑' : '↓'}</span>
          <span>{Math.abs(variation)}%</span>
        </div>
        <span className="text-xs text-gray-600">vs. mês anterior</span>
      </div>
    </motion.div>
  )
}
