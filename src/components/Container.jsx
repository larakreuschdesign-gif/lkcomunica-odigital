export default function Container({
  children,
  className = '',
  size = 'normal',
}) {
  const sizes = {
    sm: 'max-w-2xl',
    normal: 'max-w-4xl',
    lg: 'max-w-6xl',
    full: 'max-w-full',
  }

  return (
    <div className={`container mx-auto px-4 md:px-6 ${sizes[size]} ${className}`}>
      {children}
    </div>
  )
}
