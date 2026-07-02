import {
  LineChart,
  BarChart,
  PieChart,
  RadarChart,
  Line,
  Bar,
  Pie,
  Radar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts'

const COLORS = ['#E61E6E', '#F25C93', '#B81253', '#F88AFC8', '#D8CFCB']

export default function Chart({
  type = 'line',
  data = [],
  dataKey = 'value',
  nameKey = 'name',
  width = '100%',
  height = 400,
  title = '',
  showLegend = true,
  showGrid = true,
  showTooltip = true,
  custom = {},
}) {
  const commonProps = {
    width: typeof width === 'number' ? width : undefined,
    height,
    data,
    margin: { top: 5, right: 30, left: 0, bottom: 5 },
  }

  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <LineChart {...commonProps} width={undefined}>
              {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />}
              <XAxis dataKey={nameKey} stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              {showTooltip && <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E7EB' }} />}
              {showLegend && <Legend />}
              <Line
                type="monotone"
                dataKey={dataKey}
                stroke="#E61E6E"
                strokeWidth={2}
                dot={{ fill: '#E61E6E', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )

      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <BarChart {...commonProps} width={undefined}>
              {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />}
              <XAxis dataKey={nameKey} stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              {showTooltip && <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E7EB' }} />}
              {showLegend && <Legend />}
              <Bar dataKey={dataKey} fill="#E61E6E" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )

      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <PieChart>
              <Pie
                data={data}
                dataKey={dataKey}
                nameKey={nameKey}
                cx="50%"
                cy="50%"
                outerRadius={120}
                label
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              {showTooltip && <Tooltip />}
              {showLegend && <Legend />}
            </PieChart>
          </ResponsiveContainer>
        )

      case 'radar':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <RadarChart data={data}>
              <CartesianGrid stroke="#E5E7EB" />
              <XAxis dataKey={nameKey} stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              {showTooltip && <Tooltip />}
              {showLegend && <Legend />}
              <Radar dataKey={dataKey} stroke="#E61E6E" fill="#E61E6E" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
        )

      default:
        return <div>Tipo de gráfico não suportado</div>
    }
  }

  return (
    <div className="w-full">
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
      {renderChart()}
    </div>
  )
}
