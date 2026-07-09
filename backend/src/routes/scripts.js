import express from 'express'
import { generateScript, generateHookVariations } from '../services/aiService.js'
import { analyzeScript, generateScriptVariation, suggestScriptImprovements } from '../services/scriptAnalyzer.js'
import { getDatabase } from '../services/database.js'

const router = express.Router()

// Generate new script
router.post('/generate', async (req, res) => {
  try {
    const db = getDatabase()
    const scriptData = await generateScript(req.body)

    // Save script to database
    const now = new Date().toISOString()
    await db.run(
      `INSERT INTO scripts (id, title, hook, hookedOptimized, objective, summary, generalDescription, ctaFinal, creativDirection, musicSuggestion, observations, brand, niche, platform, objective_meta, tone, format, duration, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        scriptData.id,
        scriptData.title,
        scriptData.hook,
        scriptData.hookedOptimized || null,
        scriptData.objective,
        scriptData.summary,
        scriptData.generalDescription,
        scriptData.ctaFinal,
        scriptData.creativDirection,
        scriptData.musicSuggestion,
        scriptData.observations,
        req.body.brand || null,
        req.body.niche || null,
        req.body.platform,
        req.body.objective,
        req.body.tone,
        req.body.format,
        req.body.duration,
        now,
        now,
      ]
    )

    // Save scenes
    for (let i = 0; i < scriptData.scenes.length; i++) {
      const scene = scriptData.scenes[i]
      const sceneId = `${scriptData.id}-scene-${i}`
      await db.run(
        `INSERT INTO scenes (id, scriptId, sceneIndex, duration, objective, environment, description, framing, expression, bodyMovement, cameraMovement, spokenText, onScreenText, emotion, creativeDirection, transition)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          sceneId,
          scriptData.id,
          i,
          scene.duration,
          scene.objective,
          scene.environment,
          scene.description,
          scene.framing,
          scene.expression,
          scene.bodyMovement,
          scene.cameraMovement,
          scene.spokenText,
          scene.onScreenText,
          scene.emotion,
          scene.creativeDirection,
          scene.transition,
        ]
      )
    }

    res.json(scriptData)
  } catch (error) {
    console.error('Error generating script:', error)
    res.status(500).json({ error: error.message })
  }
})

// Get all scripts
router.get('/', async (req, res) => {
  try {
    const db = getDatabase()
    const scripts = await db.all(
      `SELECT s.*, GROUP_CONCAT(sc.id) as sceneIds FROM scripts s
       LEFT JOIN scenes sc ON s.id = sc.scriptId
       GROUP BY s.id
       ORDER BY s.createdAt DESC`
    )

    // Fetch full script data with scenes
    const fullScripts = await Promise.all(
      scripts.map(async (script) => {
        const scenes = await db.all(
          'SELECT * FROM scenes WHERE scriptId = ? ORDER BY sceneIndex',
          [script.id]
        )
        return {
          ...script,
          scenes: scenes || [],
        }
      })
    )

    res.json(fullScripts)
  } catch (error) {
    console.error('Error fetching scripts:', error)
    res.status(500).json({ error: error.message })
  }
})

// Get single script
router.get('/:id', async (req, res) => {
  try {
    const db = getDatabase()
    const script = await db.get('SELECT * FROM scripts WHERE id = ?', [req.params.id])

    if (!script) {
      return res.status(404).json({ error: 'Script not found' })
    }

    const scenes = await db.all(
      'SELECT * FROM scenes WHERE scriptId = ? ORDER BY sceneIndex',
      [req.params.id]
    )

    res.json({ ...script, scenes })
  } catch (error) {
    console.error('Error fetching script:', error)
    res.status(500).json({ error: error.message })
  }
})

// Update script
router.patch('/:id', async (req, res) => {
  try {
    const db = getDatabase()
    const { scenes, ...scriptData } = req.body

    const now = new Date().toISOString()

    // Update script
    await db.run(
      `UPDATE scripts SET
       title = ?, hook = ?, hookedOptimized = ?, objective = ?, summary = ?,
       generalDescription = ?, ctaFinal = ?, creativDirection = ?, musicSuggestion = ?,
       observations = ?, updatedAt = ?
       WHERE id = ?`,
      [
        scriptData.title,
        scriptData.hook,
        scriptData.hookedOptimized,
        scriptData.objective,
        scriptData.summary,
        scriptData.generalDescription,
        scriptData.ctaFinal,
        scriptData.creativDirection,
        scriptData.musicSuggestion,
        scriptData.observations,
        now,
        req.params.id,
      ]
    )

    // Update scenes if provided
    if (scenes) {
      for (let i = 0; i < scenes.length; i++) {
        const scene = scenes[i]
        const sceneId = scene.id
        await db.run(
          `UPDATE scenes SET
           duration = ?, objective = ?, environment = ?, description = ?,
           framing = ?, expression = ?, bodyMovement = ?, cameraMovement = ?,
           spokenText = ?, onScreenText = ?, emotion = ?, creativeDirection = ?, transition = ?
           WHERE id = ?`,
          [
            scene.duration,
            scene.objective,
            scene.environment,
            scene.description,
            scene.framing,
            scene.expression,
            scene.bodyMovement,
            scene.cameraMovement,
            scene.spokenText,
            scene.onScreenText,
            scene.emotion,
            scene.creativeDirection,
            scene.transition,
            sceneId,
          ]
        )
      }
    }

    const updated = await db.get('SELECT * FROM scripts WHERE id = ?', [req.params.id])
    const updatedScenes = await db.all(
      'SELECT * FROM scenes WHERE scriptId = ? ORDER BY sceneIndex',
      [req.params.id]
    )

    res.json({ ...updated, scenes: updatedScenes })
  } catch (error) {
    console.error('Error updating script:', error)
    res.status(500).json({ error: error.message })
  }
})

// Delete script
router.delete('/:id', async (req, res) => {
  try {
    const db = getDatabase()
    await db.run('DELETE FROM scenes WHERE scriptId = ?', [req.params.id])
    await db.run('DELETE FROM scripts WHERE id = ?', [req.params.id])
    res.json({ success: true })
  } catch (error) {
    console.error('Error deleting script:', error)
    res.status(500).json({ error: error.message })
  }
})

// Generate hook variations
router.post('/:id/hook-variations', async (req, res) => {
  try {
    const { hook } = req.body
    const variations = await generateHookVariations(hook)
    res.json(variations)
  } catch (error) {
    console.error('Error generating variations:', error)
    res.status(500).json({ error: error.message })
  }
})

// Analyze script
router.post('/:id/analyze', async (req, res) => {
  try {
    const db = getDatabase()
    const script = await db.get('SELECT * FROM scripts WHERE id = ?', [req.params.id])

    if (!script) {
      return res.status(404).json({ error: 'Script not found' })
    }

    const scenes = await db.all(
      'SELECT * FROM scenes WHERE scriptId = ? ORDER BY sceneIndex',
      [req.params.id]
    )

    const analysis = await analyzeScript({ ...script, scenes })
    res.json(analysis)
  } catch (error) {
    console.error('Error analyzing script:', error)
    res.status(500).json({ error: error.message })
  }
})

// Generate script variation
router.post('/:id/variations', async (req, res) => {
  try {
    const db = getDatabase()
    const { variationType } = req.body

    const script = await db.get('SELECT * FROM scripts WHERE id = ?', [req.params.id])

    if (!script) {
      return res.status(404).json({ error: 'Script not found' })
    }

    const scenes = await db.all(
      'SELECT * FROM scenes WHERE scriptId = ? ORDER BY sceneIndex',
      [req.params.id]
    )

    const variation = await generateScriptVariation({ ...script, scenes }, variationType)
    res.json(variation)
  } catch (error) {
    console.error('Error generating variation:', error)
    res.status(500).json({ error: error.message })
  }
})

// Get script improvements
router.post('/:id/improvements', async (req, res) => {
  try {
    const db = getDatabase()
    const script = await db.get('SELECT * FROM scripts WHERE id = ?', [req.params.id])

    if (!script) {
      return res.status(404).json({ error: 'Script not found' })
    }

    const scenes = await db.all(
      'SELECT * FROM scenes WHERE scriptId = ? ORDER BY sceneIndex',
      [req.params.id]
    )

    const improvements = await suggestScriptImprovements({ ...script, scenes })
    res.json(improvements)
  } catch (error) {
    console.error('Error getting improvements:', error)
    res.status(500).json({ error: error.message })
  }
})

// Get script statistics
router.get('/stats/overview', async (req, res) => {
  try {
    const db = getDatabase()
    const scripts = await db.all('SELECT * FROM scripts')

    const totalScripts = scripts.length
    const totalScenes = await db.get('SELECT COUNT(*) as count FROM scenes')
    const platformDistribution = await db.all(
      'SELECT platform, COUNT(*) as count FROM scripts GROUP BY platform'
    )

    res.json({
      totalScripts,
      totalScenes: totalScenes.count,
      platformDistribution,
    })
  } catch (error) {
    console.error('Error getting stats:', error)
    res.status(500).json({ error: error.message })
  }
})

export default router
