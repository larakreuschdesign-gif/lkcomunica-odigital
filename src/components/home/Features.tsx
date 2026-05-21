'use client'

import React from 'react'
import { Card } from '@/components/ui'
import {
  Zap,
  FileText,
  Share2,
  Palette,
  Clock,
  Lock,
} from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'IA Generativa',
    description: 'Roteiros profissionais gerados em segundos por inteligência artificial avançada.',
  },
  {
    icon: FileText,
    title: 'Estrutura Profissional',
    description: 'Formato completo com cenas, direção criativa, música, movimentação de câmera.',
  },
  {
    icon: Palette,
    title: 'Customização Total',
    description: 'Edite, ajuste e personalize cada aspecto do roteiro gerado.',
  },
  {
    icon: Share2,
    title: 'Exportação Premium',
    description: 'PDFs e DOCs profissionais prontos para apresentação ao cliente.',
  },
  {
    icon: Clock,
    title: 'Templates Inteligentes',
    description: 'Biblioteca com templates por nicho e tipo de conteúdo.',
  },
  {
    icon: Lock,
    title: 'Organização Segura',
    description: 'Salve, organize e recupere seus roteiros a qualquer momento.',
  },
]

export function Features() {
  return (
    <section className="py-20 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Tudo que você precisa
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Recursos poderosos para criar, editar e exportar roteiros profissionais
          </p>
        </div>

        {/* Grid de Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card key={feature.title} hoverable className="group">
                <div className="flex flex-col">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-brand-500/20 to-brand-600/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-smooth">
                    <Icon className="w-6 h-6 text-brand-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
