import { Response } from 'express'
import { AuthRequest } from '../../middleware/auth'
import { createScriptSchema, updateScriptSchema } from '@roteirista/shared'
import { scriptService } from './script.service'
import { aiService } from '../ai/ai.service'
import { asyncHandler } from '../../middleware/errorHandler'

export class ScriptController {
  create = asyncHandler(async (req: AuthRequest, res: Response) => {
    if (!req.userId) {
      return res.status(401).json({ error: 'Não autenticado' })
    }

    const input = createScriptSchema.parse(req.body)
    const script = await scriptService.create(req.userId, input)

    res.status(201).json(script)
  })

  list = asyncHandler(async (req: AuthRequest, res: Response) => {
    if (!req.userId) {
      return res.status(401).json({ error: 'Não autenticado' })
    }

    const result = await scriptService.list(req.userId, req.query)
    res.status(200).json(result)
  })

  getById = asyncHandler(async (req: AuthRequest, res: Response) => {
    if (!req.userId) {
      return res.status(401).json({ error: 'Não autenticado' })
    }

    const { scriptId } = req.params
    const script = await scriptService.getById(scriptId, req.userId)

    res.status(200).json(script)
  })

  update = asyncHandler(async (req: AuthRequest, res: Response) => {
    if (!req.userId) {
      return res.status(401).json({ error: 'Não autenticado' })
    }

    const { scriptId } = req.params
    const input = updateScriptSchema.parse(req.body)
    const script = await scriptService.update(scriptId, req.userId, input)

    res.status(200).json(script)
  })

  delete = asyncHandler(async (req: AuthRequest, res: Response) => {
    if (!req.userId) {
      return res.status(401).json({ error: 'Não autenticado' })
    }

    const { scriptId } = req.params
    await scriptService.delete(scriptId, req.userId)

    res.status(204).send()
  })

  generateWithAI = asyncHandler(async (req: AuthRequest, res: Response) => {
    if (!req.userId) {
      return res.status(401).json({ error: 'Não autenticado' })
    }

    const { scriptId } = req.params
    const script = await scriptService.getById(scriptId, req.userId)

    // Generate content with AI
    const generatedContent = await aiService.generateScript(script)

    // Update script with generated content
    const updated = await scriptService.update(scriptId, req.userId, {
      script: generatedContent,
      status: 'GENERATED',
      wordCount: generatedContent.wordCount,
      readingTime: generatedContent.wordCount / 130, // avg reading speed
    })

    res.status(200).json(updated)
  })

  shareToken = asyncHandler(async (req: AuthRequest, res: Response) => {
    if (!req.userId) {
      return res.status(401).json({ error: 'Não autenticado' })
    }

    const { scriptId } = req.params
    const result = await scriptService.generateShareToken(scriptId, req.userId)

    res.status(200).json(result)
  })
}

export const scriptController = new ScriptController()
