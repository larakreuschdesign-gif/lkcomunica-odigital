'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean
  interactive?: boolean
}

export function Card({
  className,
  hoverable = false,
  interactive = false,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 transition-smooth',
        hoverable && 'hover:shadow-md hover:border-gray-300 dark:hover:border-gray-700',
        interactive && 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
