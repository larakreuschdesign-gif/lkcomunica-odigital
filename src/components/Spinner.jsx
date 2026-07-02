export default function Spinner({
  size = 'md',
  color = 'pink',
  label = null,
}) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }

  const colors = {
    pink: 'border-pink-500',
    white: 'border-white',
    gray: 'border-gray-300',
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div className={`${sizes[size]} border-4 border-t-transparent rounded-full border-gray-200 animate-spin`}
        style={{
          borderTopColor: color === 'pink' ? '#E61E6E' : color === 'white' ? '#fff' : '#D1D5DB'
        }}
      />
      {label && (
        <p className="text-gray-600 text-sm">{label}</p>
      )}
    </div>
  )
}
