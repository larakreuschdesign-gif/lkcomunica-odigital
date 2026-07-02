import { useState, useCallback } from 'react'
import { processImageWithOCR, processMultipleImages, groupOCRResults, consolidateMetrics } from '../services/ocr'

export function useOCR() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [progress, setProgress] = useState(null)

  const extractMetrics = useCallback(async (file) => {
    setLoading(true)
    setError(null)

    try {
      const result = await processImageWithOCR(file)
      return result
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const processFiles = useCallback(async (files) => {
    setLoading(true)
    setError(null)
    setProgress(null)

    try {
      const results = await processMultipleImages(files, (prog) => {
        setProgress(prog)
      })

      const grouped = groupOCRResults(results)
      const consolidated = consolidateMetrics(results)

      return {
        results,
        grouped,
        consolidated,
        success: results.filter(r => r.success).length > 0
      }
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
      setProgress(null)
    }
  }, [])

  return {
    loading,
    error,
    progress,
    extractMetrics,
    processFiles,
  }
}
