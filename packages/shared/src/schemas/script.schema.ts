import { z } from 'zod'

export const platformEnum = z.enum(['TIKTOK', 'INSTAGRAM', 'YOUTUBE', 'LINKEDIN', 'OTHER'])

export const createScriptSchema = z.object({
  projectId: z.string().optional(),
  clientName: z.string().min(1, 'Nome do cliente obrigatório'),
  objective: z.string().min(10, 'Objetivo deve ter pelo menos 10 caracteres'),
  platform: platformEnum,
  contentType: z.string().min(1, 'Tipo de conteúdo obrigatório'),
  duration: z.number().min(5).max(600, 'Duração entre 5 e 600 segundos'),
  voiceTone: z.string().min(1, 'Tom de voz obrigatório'),
  targetAudience: z.string().min(10, 'Descrição de público-alvo obrigatória'),
  structure: z.string().optional(),
  cta: z.string().optional(),
  references: z.array(z.string().url()).default([]),
  ideas: z.string().optional(),
})

export const updateScriptSchema = createScriptSchema.partial()

export type CreateScriptInput = z.infer<typeof createScriptSchema>
export type UpdateScriptInput = z.infer<typeof updateScriptSchema>
