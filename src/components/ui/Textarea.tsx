'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  characterLimit?: number
}

export function Textarea({
  className,
  label,
  error,
  characterLimit,
  value,
  ...props
}: TextareaProps) {
  const charCount = typeof value === 'string' ? value.length : 0

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}
      <textarea
        className={cn(
          'w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-smooth text-gray-900 dark:text-gray-50 placeholder-gray-400 dark:placeholder-gray-500 resize-vertical',
          error && 'border-red-500 focus:ring-red-500',
          className
        )}
        value={value}
        {...props}
      />
      <div className="flex justify-between items-center mt-2">
        {error && <p className="text-sm text-red-500">{error}</p>}
        {characterLimit && (
          <p className={cn('text-sm', charCount > characterLimit * 0.9 ? 'text-amber-500' : 'text-gray-500')}>
            {charCount} / {characterLimit}
          </p>
        )}
      </div>
    </div>
  )
}
