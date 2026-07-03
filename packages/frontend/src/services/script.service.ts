import api from './api'
import { CreateScriptInput, UpdateScriptInput } from '@roteirista/shared'

export const scriptService = {
  create: async (input: CreateScriptInput) => {
    const response = await api.post('/scripts', input)
    return response.data
  },

  list: async (page = 1, limit = 10, filters?: any) => {
    const response = await api.get('/scripts', {
      params: { page, limit, ...filters },
    })
    return response.data
  },

  getById: async (scriptId: string) => {
    const response = await api.get(`/scripts/${scriptId}`)
    return response.data
  },

  update: async (scriptId: string, input: UpdateScriptInput) => {
    const response = await api.patch(`/scripts/${scriptId}`, input)
    return response.data
  },

  delete: async (scriptId: string) => {
    await api.delete(`/scripts/${scriptId}`)
  },

  generateWithAI: async (scriptId: string) => {
    const response = await api.post(`/scripts/${scriptId}/generate`)
    return response.data
  },

  generateShareToken: async (scriptId: string) => {
    const response = await api.post(`/scripts/${scriptId}/share-token`)
    return response.data
  },
}
