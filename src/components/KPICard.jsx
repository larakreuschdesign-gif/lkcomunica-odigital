import Card from './Card'

export default function KPICard({
  label,
  value,
  icon = '📊',
  variation = null,
  trend = 'up',
  comparison = null,
  unit = '',
}) {
  const isPositive = trend === 'up' || variation?.startsWith('+')
  const variationColor = isPositive ? 'text-green-600' : 'text-red-600'
  const variationArrow = isPositive ? '↑' : '↓'

  return (
    <Card padding="lg" rounded="lg" shadow="md">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-gray-600 text-sm font-medium mb-2">{label}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-4xl font-bold text-gray-900">
              {typeof value === 'number' ? value.toLocaleString('pt-BR') : value}
            </p>
            {unit && <span className="text-gray-600 text-sm">{unit}</span>}
          </div>
        </div>
        <div className="text-3xl">{icon}</div>
      </div>

      {variation && (
        <div className={`flex items-center gap-1 mb-2 ${variationColor}`}>
          <span className="text-lg">{variationArrow}</span>
          <span className="font-semibold">{variation}</span>
        </div>
      )}

      {comparison && (
        <p className="text-gray-500 text-xs">{comparison}</p>
      )}
    </Card>
  )
}
