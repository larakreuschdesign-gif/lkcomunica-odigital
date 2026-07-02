'use client'

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { motion } from 'framer-motion'

const engagementData = [
  { day: '1', engagement: 6.2, reach: 3200 },
  { day: '5', engagement: 7.8, reach: 4100 },
  { day: '10', engagement: 8.5, reach: 4800 },
  { day: '15', engagement: 9.2, reach: 5400 },
  { day: '20', engagement: 8.9, reach: 5100 },
  { day: '25', engagement: 8.7, reach: 4900 },
  { day: '30', engagement: 8.5, reach: 4600 },
]

const contentFormatData = [
  { name: 'Reels', value: 8500, fill: '#E61E6E' },
  { name: 'Carrosséis', value: 5200, fill: '#F25C93' },
  { name: 'Posts', value: 3100, fill: '#F88AFC' },
  { name: 'Stories', value: 2400, fill: '#D8CFCB' },
]

const platformData = [
  { name: 'Instagram', users: 45230 },
  { name: 'Facebook', users: 28100 },
  { name: 'LinkedIn', users: 18500 },
]

export default function ChartSection() {
  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Análise Detalhada</h2>
        <p className="text-gray-600">Visualize o desempenho de suas métricas</p>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Engagement Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card-lg"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Evolução de Engajamento
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#D8CFCB" />
              <XAxis dataKey="day" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #D8CFCB',
                  borderRadius: '12px',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="engagement"
                stroke="#E61E6E"
                strokeWidth={3}
                dot={{ fill: '#E61E6E', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Platform Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-lg"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Desempenho por Plataforma
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={platformData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#D8CFCB" />
              <XAxis dataKey="name" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #D8CFCB',
                  borderRadius: '12px',
                }}
              />
              <Bar dataKey="users" fill="#E61E6E" radius={[12, 12, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Content Format */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card-lg"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Distribuição por Formato
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={contentFormatData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {contentFormatData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #D8CFCB',
                  borderRadius: '12px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Reach vs Engagement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card-lg"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Alcance vs Engajamento
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#D8CFCB" />
              <XAxis dataKey="day" stroke="#999" />
              <YAxis stroke="#999" yAxisId="left" />
              <YAxis stroke="#999" yAxisId="right" orientation="right" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #D8CFCB',
                  borderRadius: '12px',
                }}
              />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="engagement"
                stroke="#E61E6E"
                strokeWidth={2}
                dot={false}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="reach"
                stroke="#F25C93"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  )
}
