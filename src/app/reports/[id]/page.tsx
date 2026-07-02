'use client'

import { useState } from 'react'
import { Download, Share2, Sparkles, TrendingUp } from 'lucide-react'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import { motion } from 'framer-motion'
import KPICard from '@/components/KPICard'
import ChartSection from '@/components/ChartSection'
import InsightsSection from '@/components/InsightsSection'
import ActionPlanSection from '@/components/ActionPlanSection'

export default function ReportView({ params }: { params: { id: string } }) {
  const [showAIAnalysis, setShowAIAnalysis] = useState(false)

  return (
    <div className="flex h-screen bg-lk-cream">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <div className="p-8 max-w-7xl mx-auto w-full">
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    Tech Startup XYZ
                  </h1>
                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <span>Junho 2024</span>
                    <span>•</span>
                    <span>Gerado em 30 de Junho</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="btn-secondary flex items-center gap-2">
                    <Download size={18} />
                    Exportar
                  </button>
                  <button className="btn-primary flex items-center gap-2">
                    <Share2 size={18} />
                    Compartilhar
                  </button>
                </div>
              </div>

              {/* Executive Summary */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="card-lg mb-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Resumo Executivo
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Junho de 2024 foi um mês excepcional de crescimento e engajamento
                  para a Tech Startup XYZ. O alcance total atingiu 45.230 contas,
                  representando um crescimento de 12% em relação ao mês anterior.
                  O engajamento manteve-se em um nível premium de 8.5%, indicando
                  que os conteúdos publicados resonaram fortemente com a audiência.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Os pontos de atenção concentram-se na redução de visualizações
                  em Stories (↓ 8%), possivelmente influenciada por mudanças no
                  algoritmo. Recomenda-se um teste A/B com formatos de conteúdo
                  mais dinâmicos para recuperar este indicador no próximo período.
                </p>
              </motion.div>
            </motion.div>

            {/* KPI Cards */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            >
              <KPICard
                label="Alcance"
                value="45.230"
                variation={12}
                icon={TrendingUp}
                index={0}
              />
              <KPICard
                label="Impressões"
                value="128.450"
                variation={8}
                icon={TrendingUp}
                index={1}
              />
              <KPICard
                label="Engajamento"
                value="8.5%"
                variation={-2}
                icon={TrendingUp}
                index={2}
              />
              <KPICard
                label="Seguidores Novos"
                value="1.243"
                variation={15}
                icon={TrendingUp}
                index={3}
              />
            </motion.div>

            {/* Charts Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-12"
            >
              <ChartSection />
            </motion.div>

            {/* AI Analysis Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mb-12"
            >
              <button
                onClick={() => setShowAIAnalysis(!showAIAnalysis)}
                className="btn-primary flex items-center gap-2 mb-8"
              >
                <Sparkles size={20} />
                ✨ Perguntar para IA
              </button>

              {showAIAnalysis && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card-lg space-y-4 mb-8"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Análise de IA
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Com base na análise dos dados de Junho 2024, identifiquei os
                    seguintes padrões críticos:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <span className="text-lk-pink font-bold">•</span>
                      <span className="text-gray-700">
                        <strong>Horário de pico:</strong> Os melhores engajamentos
                        ocorrem entre 19h-21h, sugerindo uma audiência mais ativa ao
                        final da tarde.
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-lk-pink font-bold">•</span>
                      <span className="text-gray-700">
                        <strong>Formato vencedor:</strong> Reels demonstram 3.2x
                        mais engajamento que posts estáticos, recomenda-se aumentar
                        a frequência semanal para 5-7 reels.
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-lk-pink font-bold">•</span>
                      <span className="text-gray-700">
                        <strong>Tema com melhor performance:</strong> Conteúdo
                        educativo teve 2.1x mais interações que conteúdo promocional.
                      </span>
                    </li>
                  </ul>
                </motion.div>
              )}
            </motion.div>

            {/* Insights Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mb-12"
            >
              <InsightsSection />
            </motion.div>

            {/* Action Plan Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mb-12"
            >
              <ActionPlanSection />
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}
