'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui'
import { Menu, LogOut } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

export function Header() {
  const { user, signOut } = useAuth()

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-r from-brand-500 to-brand-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">RP</span>
            </div>
            <div>
              <h1 className="font-bold text-lg text-gray-900 dark:text-white">Roteiro Pro</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Scripts Profissionais</p>
            </div>
          </Link>

          {/* Menu Center - Hidden on mobile */}
          {user && (
            <nav className="hidden md:flex gap-6 items-center">
              <Link
                href="/dashboard"
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-smooth"
              >
                Dashboard
              </Link>
              <Link
                href="/create"
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-smooth"
              >
                Criar Roteiro
              </Link>
              <Link
                href="/templates"
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-smooth"
              >
                Templates
              </Link>
            </nav>
          )}

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <div className="hidden sm:flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 flex items-center justify-center text-white text-sm font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{user.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  icon={<LogOut className="w-4 h-4" />}
                  onClick={signOut}
                >
                  Sair
                </Button>
              </>
            ) : (
              <Button variant="primary" size="sm">
                Entrar
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
