'use client'

import React from 'react'
import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Sobre */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Roteiro Pro</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Plataforma SaaS inteligente para geração automática de roteiros profissionais.
            </p>
          </div>

          {/* Produto */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Produto</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link href="/features" className="hover:text-gray-900 dark:hover:text-white transition-smooth">
                  Recursos
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-gray-900 dark:hover:text-white transition-smooth">
                  Preços
                </Link>
              </li>
              <li>
                <Link href="/templates" className="hover:text-gray-900 dark:hover:text-white transition-smooth">
                  Templates
                </Link>
              </li>
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link href="/about" className="hover:text-gray-900 dark:hover:text-white transition-smooth">
                  Sobre
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-gray-900 dark:hover:text-white transition-smooth">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gray-900 dark:hover:text-white transition-smooth">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link href="/privacy" className="hover:text-gray-900 dark:hover:text-white transition-smooth">
                  Privacidade
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-gray-900 dark:hover:text-white transition-smooth">
                  Termos
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {currentYear} Roteiro Pro. Todos os direitos reservados.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-smooth">
                Twitter
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-smooth">
                LinkedIn
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-smooth">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
