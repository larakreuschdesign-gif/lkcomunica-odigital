import { useState, useCallback } from 'react'

interface UseApiOptions {
  onSuccess?: (data: any) => void
  onError?: (error: Error) => void
}

export function useApi() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const request = useCallback(
    async (method: string, endpoint: string, data?: any, options?: UseApiOptions) => {
      setLoading(true)
      setError(null)

      try {
        const config: RequestInit = {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
        }

        if (data) {
          config.body = JSON.stringify(data)
        }

        const response = await fetch(`/api${endpoint}`, config)

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Request failed')
        }

        const result = await response.json()

        if (options?.onSuccess) {
          options.onSuccess(result)
        }

        setLoading(false)
        return result
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error')
        setError(error)

        if (options?.onError) {
          options.onError(error)
        }

        setLoading(false)
        throw error
      }
    },
    []
  )

  const get = useCallback(
    (endpoint: string, options?: UseApiOptions) => request('GET', endpoint, undefined, options),
    [request]
  )

  const post = useCallback(
    (endpoint: string, data: any, options?: UseApiOptions) => request('POST', endpoint, data, options),
    [request]
  )

  const patch = useCallback(
    (endpoint: string, data: any, options?: UseApiOptions) => request('PATCH', endpoint, data, options),
    [request]
  )

  const del = useCallback(
    (endpoint: string, options?: UseApiOptions) => request('DELETE', endpoint, undefined, options),
    [request]
  )

  return {
    loading,
    error,
    get,
    post,
    patch,
    delete: del,
  }
}
