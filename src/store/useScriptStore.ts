import { create } from 'zustand'

export interface Scene {
  id: string
  duration: string
  objective: string
  environment: string
  description: string
  framing: string
  expression: string
  bodyMovement: string
  cameraMovement: string
  spokenText: string
  onScreenText: string
  emotion: string
  creativeDirection: string
  transition: string
}

export interface Script {
  id: string
  title: string
  hook: string
  hookedOptimized?: string
  objective: string
  summary: string
  generalDescription: string
  scenes: Scene[]
  ctaFinal: string
  creativDirection: string
  musicSuggestion: string
  observations: string
  metadata: {
    brand?: string
    niche?: string
    platform?: string
    objective?: string
    tone?: string
    format?: string
    duration?: string
    createdAt: Date
    updatedAt: Date
  }
}

interface ScriptStore {
  scripts: Script[]
  currentScript: Script | null
  isGenerating: boolean
  error: string | null

  // Script operations
  setCurrentScript: (script: Script | null) => void
  saveScript: (script: Script) => Promise<void>
  updateScript: (id: string, updates: Partial<Script>) => Promise<void>
  deleteScript: (id: string) => Promise<void>
  fetchScripts: () => Promise<void>

  // Scene operations
  updateScene: (sceneId: string, updates: Partial<Scene>) => void
  addScene: (scene: Scene) => void
  deleteScene: (sceneId: string) => void
  reorderScenes: (scenes: Scene[]) => void

  // State management
  setIsGenerating: (value: boolean) => void
  setError: (error: string | null) => void
}

export const useScriptStore = create<ScriptStore>((set) => ({
  scripts: [],
  currentScript: null,
  isGenerating: false,
  error: null,

  setCurrentScript: (script) => set({ currentScript: script }),

  saveScript: async (script) => {
    try {
      const response = await fetch('/api/scripts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(script),
      })
      if (!response.ok) throw new Error('Erro ao salvar roteiro')
      const saved = await response.json()
      set((state) => ({
        scripts: [...state.scripts, saved],
        currentScript: saved,
      }))
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Erro ao salvar' })
      throw error
    }
  },

  updateScript: async (id, updates) => {
    try {
      const response = await fetch(`/api/scripts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })
      if (!response.ok) throw new Error('Erro ao atualizar roteiro')
      const updated = await response.json()
      set((state) => ({
        scripts: state.scripts.map((s) => (s.id === id ? updated : s)),
        currentScript: state.currentScript?.id === id ? updated : state.currentScript,
      }))
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Erro ao atualizar' })
      throw error
    }
  },

  deleteScript: async (id) => {
    try {
      const response = await fetch(`/api/scripts/${id}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Erro ao deletar roteiro')
      set((state) => ({
        scripts: state.scripts.filter((s) => s.id !== id),
        currentScript: state.currentScript?.id === id ? null : state.currentScript,
      }))
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Erro ao deletar' })
      throw error
    }
  },

  fetchScripts: async () => {
    try {
      const response = await fetch('/api/scripts')
      if (!response.ok) throw new Error('Erro ao carregar roteiros')
      const scripts = await response.json()
      set({ scripts })
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Erro ao carregar' })
      throw error
    }
  },

  updateScene: (sceneId, updates) => {
    set((state) => {
      if (!state.currentScript) return state
      return {
        currentScript: {
          ...state.currentScript,
          scenes: state.currentScript.scenes.map((s) =>
            s.id === sceneId ? { ...s, ...updates } : s
          ),
        },
      }
    })
  },

  addScene: (scene) => {
    set((state) => {
      if (!state.currentScript) return state
      return {
        currentScript: {
          ...state.currentScript,
          scenes: [...state.currentScript.scenes, scene],
        },
      }
    })
  },

  deleteScene: (sceneId) => {
    set((state) => {
      if (!state.currentScript) return state
      return {
        currentScript: {
          ...state.currentScript,
          scenes: state.currentScript.scenes.filter((s) => s.id !== sceneId),
        },
      }
    })
  },

  reorderScenes: (scenes) => {
    set((state) => {
      if (!state.currentScript) return state
      return {
        currentScript: {
          ...state.currentScript,
          scenes,
        },
      }
    })
  },

  setIsGenerating: (value) => set({ isGenerating: value }),
  setError: (error) => set({ error }),
}))
