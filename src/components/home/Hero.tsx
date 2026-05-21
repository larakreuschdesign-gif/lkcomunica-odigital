'use client'

import React from 'react'
import { Button } from '@/components/ui'
import { Sparkles, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative py-20 sm:py-32 overflow-hidden">
      {/* Background gradiente */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-50 to-brand-100 dark:from-brand-950/20 dark:to-brand-900/20"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-100/50 dark:bg-brand-900/30 mb-8 border border-brand-200 dark:border-brand-800">
            <Sparkles className="w-4 h-4 text-brand-600" />
            <span className="text-sm font-semibold text-brand-600">Novo: Geração por IA Integrada</span>
          </div>

          {/* Título */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
            Roteiros Profissionais
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-brand-600">
              em Segundos
            </span>
          </h1>

          {/* Descrição */}
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
            Plataforma SaaS inteligente que transforma ideias em roteiros profissionais estruturados, prontos para apresentação ao cliente.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
            <Link href="/create">
              <Button
                size="lg"
                icon={<ArrowRight className="w-5 h-5" />}
              >
                Começar Agora
              </Button>
            </Link>
            <Link href="/demo">
              <Button
                variant="secondary"
                size="lg"
              >
                Ver Demonstração
              </Button>
            </Link>
          </div>

          {/* Imagem/Mockup */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-500/20 to-brand-600/20 rounded-2xl blur-3xl"></div>
            <div className="relative bg-gradient-to-b from-gray-100 dark:from-gray-800 to-gray-50 dark:to-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 shadow-xl">
              <div className="aspect-video bg-gradient-to-br from-brand-500/10 to-brand-600/10 rounded-lg flex items-center justify-center border border-gray-300 dark:border-gray-700">
                <p className="text-gray-600 dark:text-gray-400">Dashboard Preview</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
