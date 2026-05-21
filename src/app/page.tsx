'use client'

import React from 'react'
import { Hero } from '@/components/home/Hero'
import { Features } from '@/components/home/Features'
import { Button } from '@/components/ui'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />

      {/* CTA Section */}
      <section className="py-20 sm:py-32 bg-gradient-to-r from-brand-500 to-brand-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Pronto para revolucionar seus roteiros?
          </h2>
          <p className="text-lg text-brand-100 mb-10">
            Junte-se a centenas de produtoras, agências e criadores que já estão usando Roteiro Pro.
          </p>
          <Link href="/create">
            <Button
              size="lg"
              className="bg-white text-brand-600 hover:bg-gray-100"
            >
              Começar Gratuitamente
            </Button>
          </Link>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Planos Flexíveis
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Escolha o plano perfeito para seu negócio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Básico</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Gratuito</p>
              <ul className="space-y-4 mb-8 text-sm text-gray-600 dark:text-gray-400">
                <li>✓ 5 roteiros por mês</li>
                <li>✓ Templates básicos</li>
                <li>✓ Exportar em PDF</li>
                <li>✗ Sugestões de IA</li>
                <li>✗ Suporte prioritário</li>
              </ul>
              <Button variant="secondary" className="w-full">
                Começar
              </Button>
            </div>

            {/* Pro Plan */}
            <div className="bg-gradient-to-b from-brand-50 to-white dark:from-brand-900/20 dark:to-gray-900 rounded-xl border-2 border-brand-500 p-8 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-brand-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Mais Popular
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Profissional</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">R$ 99</span>/mês
              </p>
              <ul className="space-y-4 mb-8 text-sm text-gray-600 dark:text-gray-400">
                <li>✓ Roteiros ilimitados</li>
                <li>✓ Todos os templates</li>
                <li>✓ Exportar PDF, DOCX</li>
                <li>✓ Sugestões de IA avançadas</li>
                <li>✓ Suporte por email</li>
              </ul>
              <Button className="w-full">
                Assinar Agora
              </Button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Enterprise</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Preço customizado</p>
              <ul className="space-y-4 mb-8 text-sm text-gray-600 dark:text-gray-400">
                <li>✓ Tudo do plano Pro</li>
                <li>✓ White-label</li>
                <li>✓ Múltiplos usuários</li>
                <li>✓ API integrada</li>
                <li>✓ Suporte 24/7</li>
              </ul>
              <Button variant="secondary" className="w-full">
                Contatar Vendas
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 sm:py-32 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Perguntas Frequentes
          </h2>

          <div className="space-y-6">
            {[
              {
                q: 'Como funciona a geração de roteiros?',
                a: 'Você preenche um formulário inteligente com as informações do seu projeto, e nossa IA gera um roteiro profissional estruturado em segundos.',
              },
              {
                q: 'Posso editar os roteiros gerados?',
                a: 'Sim! Você pode fazer todas as alterações que quiser no editor integrado antes de exportar.',
              },
              {
                q: 'Quais formatos de exportação estão disponíveis?',
                a: 'Exportamos em PDF (com design premium) e DOCX para melhor compatibilidade.',
              },
              {
                q: 'Há limite de roteiros que posso criar?',
                a: 'No plano Profissional e Enterprise, você pode criar roteiros ilimitados.',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
              >
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{item.q}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
