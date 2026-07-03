import { PrismaClient } from '@prisma/client'
import {
  CreateScriptInput,
  UpdateScriptInput,
  ScriptListQuery,
} from '@roteirista/shared'
import { AppError } from '../../middleware/errorHandler'
import { logger } from '../../utils/logger'

const prisma = new PrismaClient()

export class ScriptService {
  async create(userId: string, input: CreateScriptInput) {
    // Check quota
    const user = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      throw new AppError(404, 'Usuário não encontrado')
    }

    // Check monthly quota
    const now = new Date()
    if (now > user.resetQuotaAt) {
      // Reset quota if month has passed
      await prisma.user.update({
        where: { id: userId },
        data: { used: 0, resetQuotaAt: new Date(now.getFullYear(), now.getMonth() + 1, 1) },
      })
    }

    if (user.used >= user.monthlyQuota) {
      throw new AppError(429, 'Limite mensal de roteiros atingido')
    }

    // Create script
    const script = await prisma.script.create({
      data: {
        userId,
        projectId: input.projectId,
        title: `Roteiro - ${input.clientName}`,
        clientName: input.clientName,
        objective: input.objective,
        platform: input.platform,
        contentType: input.contentType,
        duration: input.duration,
        voiceTone: input.voiceTone,
        targetAudience: input.targetAudience,
        structure: input.structure,
        cta: input.cta,
        references: input.references || [],
        ideas: input.ideas,
        script: {
          videoTitle: '',
          hook: '',
          strategicObjective: '',
          scenes: [],
          finalCTA: '',
          observations: '',
          estimatedDuration: input.duration,
          wordCount: 0,
        },
      },
    })

    logger.info(`Script created: ${script.id}`)

    return script
  }

  async list(userId: string, query: ScriptListQuery) {
    const page = query.page || 1
    const limit = query.limit || 10
    const skip = (page - 1) * limit

    const where: any = { userId }

    if (query.status) where.status = query.status
    if (query.platform) where.platform = query.platform
    if (query.projectId) where.projectId = query.projectId
    if (query.search) {
      where.OR = [
        { title: { contains: query.search, mode: 'insensitive' } },
        { clientName: { contains: query.search, mode: 'insensitive' } },
      ]
    }

    const [scripts, total] = await Promise.all([
      prisma.script.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          [query.sortBy || 'createdAt']: query.sortOrder || 'desc',
        },
      }),
      prisma.script.count({ where }),
    ])

    return {
      scripts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    }
  }

  async getById(scriptId: string, userId: string) {
    const script = await prisma.script.findUnique({
      where: { id: scriptId },
    })

    if (!script) {
      throw new AppError(404, 'Roteiro não encontrado')
    }

    // Check ownership
    if (script.userId !== userId) {
      throw new AppError(403, 'Acesso negado')
    }

    return script
  }

  async update(scriptId: string, userId: string, input: UpdateScriptInput) {
    const script = await this.getById(scriptId, userId)

    const updated = await prisma.script.update({
      where: { id: scriptId },
      data: {
        ...input,
        updatedAt: new Date(),
      },
    })

    logger.info(`Script updated: ${scriptId}`)

    return updated
  }

  async delete(scriptId: string, userId: string) {
    const script = await this.getById(scriptId, userId)

    await prisma.script.delete({
      where: { id: scriptId },
    })

    logger.info(`Script deleted: ${scriptId}`)
  }

  async getByShareToken(shareToken: string) {
    const script = await prisma.script.findUnique({
      where: { shareToken },
    })

    if (!script || !script.isPublic) {
      throw new AppError(404, 'Roteiro não encontrado')
    }

    return script
  }

  async generateShareToken(scriptId: string, userId: string) {
    const script = await this.getById(scriptId, userId)

    const token = Math.random().toString(36).substring(2, 15)

    const updated = await prisma.script.update({
      where: { id: scriptId },
      data: {
        shareToken: token,
        isPublic: true,
      },
    })

    return {
      shareToken: token,
      shareUrl: `${process.env.FRONTEND_URL}/share/${token}`,
    }
  }
}

export const scriptService = new ScriptService()
