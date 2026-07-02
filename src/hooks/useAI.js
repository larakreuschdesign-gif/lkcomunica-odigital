import { useState, useCallback } from 'react'

export function useAI() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const generateAnalysis = useCallback(async (reportData, analysisType) => {
    setLoading(true)
    setError(null)

    try {
      // Placeholder para Claude API
      // Será implementado na Fase 7
      const mockAnalyses = {
        summary: `O mês de ${reportData.month} foi marcado por um crescimento consistente nas métricas de engajamento. O alcance aumentou 15% em relação ao mês anterior, enquanto as impressões tiveram um incremento de 22%. Esses números refletem uma estratégia eficaz de conteúdo e um engajamento cada vez maior da audiência. Destaca-se o desempenho excepcional dos Reels e Stories, que juntos foram responsáveis por mais de 60% do engajamento total.`,

        insights: [
          'O horário de maior desempenho foi entre 19h e 21h',
          'Reels tiveram 3x mais engajamento que posts estáticos',
          'Conteúdo educativo obteve melhor taxa de salvamentos',
          'A audiência cresceu 8% neste mês',
          'Compatilhamentos aumentaram 25% vs. mês anterior',
        ],

        actionPlan: [
          { problema: 'Baixa retenção em Stories', impacto: 'Alto', recomendacao: 'Aumentar frequência e variar formatos', prioridade: 'Alta', prazo: '1 semana' },
          { problema: 'Baixa taxa de conversão em cliques', impacto: 'Médio', recomendacao: 'Melhorar CTA e testar layouts', prioridade: 'Média', prazo: '2 semanas' },
          { problema: 'Falta de conteúdo videoUniverso', impacto: 'Alto', recomendacao: 'Produzir 2-3 vídeos/semana', prioridade: 'Alta', prazo: '1 semana' },
        ],
      }

      return mockAnalyses[analysisType] || mockAnalyses.summary
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    loading,
    error,
    generateAnalysis,
  }
}
