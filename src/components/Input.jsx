export default function Input({
  type = 'text',
  label = null,
  placeholder = '',
  value = '',
  onChange = null,
  error = null,
  className = '',
  required = false,
  disabled = false,
  ...props
}) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          {label}
          {required && <span className="text-pink-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`
          w-full px-4 py-2 rounded-lg
          border-2 border-gray-200
          text-gray-900 placeholder-gray-500
          transition-colors duration-200
          focus:outline-none focus:border-pink-500
          disabled:bg-gray-100 disabled:cursor-not-allowed
          ${error ? 'border-red-500' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  )
}
