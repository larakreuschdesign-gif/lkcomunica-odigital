import { useState, useCallback } from 'react'

export function useOCR() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const extractMetrics = useCallback(async (file) => {
    setLoading(true)
    setError(null)

    try {
      // Placeholder para Tesseract.js OCR
      // Será implementado na Fase 5
      const mockMetrics = {
        alcance: Math.floor(Math.random() * 50000) + 5000,
        impressoes: Math.floor(Math.random() * 100000) + 10000,
        engajamento: (Math.random() * 10).toFixed(2),
        seguidores: Math.floor(Math.random() * 10000) + 1000,
        curtidas: Math.floor(Math.random() * 5000) + 100,
        comentarios: Math.floor(Math.random() * 500) + 10,
        compartilhamentos: Math.floor(Math.random() * 300) + 5,
        salvamentos: Math.floor(Math.random() * 1000) + 50,
      }

      return mockMetrics
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
    extractMetrics,
  }
}
