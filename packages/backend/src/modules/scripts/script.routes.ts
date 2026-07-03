import { Router } from 'express'
import { scriptController } from './script.controller'
import { authenticateToken } from '../../middleware/auth'

export const scriptRouter = Router()

scriptRouter.post('/', authenticateToken, scriptController.create)
scriptRouter.get('/', authenticateToken, scriptController.list)
scriptRouter.get('/:scriptId', authenticateToken, scriptController.getById)
scriptRouter.patch('/:scriptId', authenticateToken, scriptController.update)
scriptRouter.delete('/:scriptId', authenticateToken, scriptController.delete)
scriptRouter.post('/:scriptId/generate', authenticateToken, scriptController.generateWithAI)
scriptRouter.post('/:scriptId/share-token', authenticateToken, scriptController.shareToken)
