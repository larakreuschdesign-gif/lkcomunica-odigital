import OpenAI from 'openai'
import { env } from '../../config/env'
import { SYSTEM_PROMPT, generateScriptPrompt } from '@roteirista/shared'
import { AppError } from '../../middleware/errorHandler'
import { logger } from '../../utils/logger'

const openai = new OpenAI({
  apiKey: env.openaiApiKey,
})

export interface ScriptToGenerate {
  clientName: string
  objective: string
  platform: string
  contentType: string
  duration: number
  voiceTone: string
  targetAudience: string
  structure?: string
  cta?: string
  references?: string[]
  ideas?: string
}

export class AIService {
  async generateScript(script: ScriptToGenerate) {
    try {
      const userPrompt = generateScriptPrompt(script)

      logger.info(`Generating script for client: ${script.clientName}`)

      const response = await openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: SYSTEM_PROMPT,
          },
          {
            role: 'user',
            content: userPrompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 4000,
        response_format: { type: 'json_object' },
      })

      const content = response.choices[0].message.content
      if (!content) {
        throw new Error('No response from OpenAI')
      }

      const generatedContent = JSON.parse(content)

      // Calculate word count
      let wordCount = 0
      if (generatedContent.scenes) {
        generatedContent.scenes.forEach((scene: any) => {
          wordCount += (scene.spokenText || '').split(' ').length
          wordCount += (scene.screenText || '').split(' ').length
        })
      }

      const result = {
        ...generatedContent,
        wordCount,
        readingTime: Math.ceil(wordCount / 130),
      }

      logger.info(`Script generated successfully: ${wordCount} words`)

      return result
    } catch (error) {
      logger.error('AI generation error:', error)
      throw new AppError(500, 'Erro ao gerar roteiro com IA')
    }
  }

  async generateHookSuggestions(
    objective: string,
    contentType: string
  ): Promise<string[]> {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'user',
            content: `Gere 5 ideias de ganchos virais para um vídeo com:
Objetivo: ${objective}
Tipo de conteúdo: ${contentType}

Responda apenas com as 5 ideias, uma por linha, sem numeração.`,
          },
        ],
        temperature: 0.8,
        max_tokens: 500,
      })

      const content = response.choices[0].message.content
      if (!content) {
        return []
      }

      return content.split('\n').filter((hook) => hook.trim().length > 0)
    } catch (error) {
      logger.error('Hook generation error:', error)
      return []
    }
  }

  async generateCTASuggestions(objective: string): Promise<string[]> {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'user',
            content: `Gere 5 ideias de CTA (Call-to-Action) para um vídeo com objetivo: ${objective}

Responda apenas com as 5 ideias, uma por linha, sem numeração.`,
          },
        ],
        temperature: 0.8,
        max_tokens: 500,
      })

      const content = response.choices[0].message.content
      if (!content) {
        return []
      }

      return content.split('\n').filter((cta) => cta.trim().length > 0)
    } catch (error) {
      logger.error('CTA generation error:', error)
      return []
    }
  }
}

export const aiService = new AIService()
