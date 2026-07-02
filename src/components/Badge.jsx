export default function Badge({
  children,
  status = 'default',
  size = 'md',
  className = '',
}) {
  const statusStyles = {
    default: 'bg-gray-100 text-gray-700',
    excellent: 'bg-green-100 text-green-700',
    attention: 'bg-yellow-100 text-yellow-700',
    critical: 'bg-red-100 text-red-700',
    pink: 'bg-pink-100 text-pink-700',
  }

  const sizes = {
    sm: 'px-3 py-1 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  }

  const statusIcons = {
    excellent: '🟢',
    attention: '🟡',
    critical: '🔴',
  }

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full font-medium ${statusStyles[status]} ${sizes[size]} ${className}`}
    >
      {statusIcons[status] && <span>{statusIcons[status]}</span>}
      {children}
    </span>
  )
}
