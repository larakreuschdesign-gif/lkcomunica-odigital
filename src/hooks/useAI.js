import { useState, useCallback } from 'react'
import {
  generateExecutiveSummary,
  generateStrategicAnalyses,
  generateInsights,
  generateActionPlan,
  askAI as callAI
} from '../services/ai'

export function useAI() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const generateSummary = useCallback(async (reportData) => {
    setLoading(true)
    setError(null)

    try {
      const summary = await generateExecutiveSummary(reportData)
      return summary
    } catch (err) {
      setError(err.message)
      console.error('Erro ao gerar resumo:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const generateAnalyses = useCallback(async (reportData) => {
    setLoading(true)
    setError(null)

    try {
      const analyses = await generateStrategicAnalyses(reportData)
      return analyses
    } catch (err) {
      setError(err.message)
      console.error('Erro ao gerar análises:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const generateActionPlanData = useCallback(async (reportData) => {
    setLoading(true)
    setError(null)

    try {
      const actionPlan = await generateActionPlan(reportData)
      return actionPlan
    } catch (err) {
      setError(err.message)
      console.error('Erro ao gerar plano de ação:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const generateInsightsData = useCallback(async (reportData) => {
    setLoading(true)
    setError(null)

    try {
      const insights = await generateInsights(reportData)
      return insights
    } catch (err) {
      setError(err.message)
      console.error('Erro ao gerar insights:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const askQuestion = useCallback(async (question, reportData) => {
    setLoading(true)
    setError(null)

    try {
      const response = await callAI(question, reportData)
      return response
    } catch (err) {
      setError(err.message)
      console.error('Erro ao responder pergunta:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    loading,
    error,
    generateSummary,
    generateAnalyses,
    generateActionPlanData,
    generateInsightsData,
    askQuestion,
  }
}
