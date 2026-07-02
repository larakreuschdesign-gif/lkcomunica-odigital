export default function Card({
  children,
  className = '',
  padding = 'md',
  rounded = 'lg',
  shadow = 'md',
  onClick = null,
  variant = 'white',
  ...props
}) {
  const paddingSizes = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }

  const radiusSizes = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
  }

  const shadowSizes = {
    none: 'shadow-none',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  }

  const variants = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    pink: 'bg-pink-50',
  }

  const baseStyles = 'transition-all duration-200'
  const hoverStyles = onClick ? 'hover:shadow-lg cursor-pointer hover:translate-y-[-2px]' : ''

  return (
    <div
      className={`${baseStyles} ${variants[variant]} ${paddingSizes[padding]} ${radiusSizes[rounded]} ${shadowSizes[shadow]} ${hoverStyles} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  )
}
