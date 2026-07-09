import { Script, Scene } from '../types'

export function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000)
  if (seconds < 60) return `${seconds}s`
  const minutes = Math.floor(seconds / 60)
  return `${minutes}m ${seconds % 60}s`
}

export function calculateTotalDuration(scenes: Scene[]): string {
  const durationPattern = /(\d+)s/
  let totalSeconds = 0

  scenes.forEach((scene) => {
    const match = scene.duration.match(durationPattern)
    if (match) {
      totalSeconds += parseInt(match[1])
    }
  })

  return formatDuration(totalSeconds * 1000)
}

export function exportScriptAsText(script: Script): string {
  let text = `${script.title}\n`
  text += `${'='.repeat(50)}\n\n`

  text += `GANCHO: ${script.hook}\n`
  if (script.hookedOptimized) {
    text += `OTIMIZADO: ${script.hookedOptimized}\n`
  }
  text += `\nOBJETIVO: ${script.objective}\n`
  text += `\nRESUMO:\n${script.summary}\n`

  text += `\n${'='.repeat(50)}\nCENAS\n${'='.repeat(50)}\n\n`

  script.scenes.forEach((scene, index) => {
    text += `CENA ${index + 1}\nDuração: ${scene.duration}\n`
    text += `Objetivo: ${scene.objective}\n`
    text += `Ambiente: ${scene.environment}\n`
    text += `Câmera: ${scene.cameraMovement}\n`
    text += `Expressão: ${scene.expression}\n`
    text += `Ação: ${scene.bodyMovement}\n`
    text += `\nTEXTO FALADO:\n"${scene.spokenText}"\n`
    text += `\nTEXTO NA TELA: ${scene.onScreenText}\n`
    text += `Emoção: ${scene.emotion}\n`
    text += `\n${'-'.repeat(40)}\n\n`
  })

  text += `CTA FINAL: ${script.ctaFinal}\n`
  text += `\nDIREÇÃO CRIATIVA:\n${script.creativDirection}\n`
  text += `\nMÚSICA:\n${script.musicSuggestion}\n`
  text += `\nOBSERVAÇÕES:\n${script.observations}\n`

  return text
}

export function exportScriptAsMarkdown(script: Script): string {
  let md = `# ${script.title}\n\n`

  md += `## Gancho Principal\n\n`
  md += `> ${script.hook}\n\n`

  if (script.hookedOptimized) {
    md += `### Versão Otimizada\n> ${script.hookedOptimized}\n\n`
  }

  md += `## Objetivo Estratégico\n\n${script.objective}\n\n`

  md += `## Resumo Criativo\n\n${script.summary}\n\n`

  md += `## Descrição Geral\n\n${script.generalDescription}\n\n`

  md += `## Cenas\n\n`

  script.scenes.forEach((scene, index) => {
    md += `### Cena ${index + 1} (${scene.duration})\n\n`
    md += `**Objetivo:** ${scene.objective}\n\n`
    md += `**Ambiente:** ${scene.environment}\n\n`
    md += `**Enquadramento:** ${scene.framing}\n\n`
    md += `**Expressão:** ${scene.expression}\n\n`
    md += `**Câmera:** ${scene.cameraMovement}\n\n`
    md += `**Ação:** ${scene.bodyMovement}\n\n`
    md += `#### Texto Falado\n\n> "${scene.spokenText}"\n\n`
    md += `**Texto na Tela:** ${scene.onScreenText}\n\n`
    md += `**Emoção:** ${scene.emotion}\n\n`
    md += `**Direção:** ${scene.creativeDirection}\n\n`
    md += `**Transição:** ${scene.transition}\n\n`
  })

  md += `## CTA Final\n\n${script.ctaFinal}\n\n`
  md += `## Direção Criativa\n\n${script.creativDirection}\n\n`
  md += `## Sugestão Musical\n\n${script.musicSuggestion}\n\n`
  md += `## Observações\n\n${script.observations}\n`

  return md
}

export function generatePDFContent(script: Script): string {
  // Simplified PDF content - in production, use a library like pdfkit
  return exportScriptAsText(script)
}

export function validateScript(script: Script): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!script.title || script.title.trim().length === 0) {
    errors.push('Título é obrigatório')
  }

  if (!script.hook || script.hook.trim().length === 0) {
    errors.push('Gancho é obrigatório')
  }

  if (!script.objective || script.objective.trim().length === 0) {
    errors.push('Objetivo é obrigatório')
  }

  if (script.scenes.length === 0) {
    errors.push('Pelo menos uma cena é obrigatória')
  }

  script.scenes.forEach((scene, index) => {
    if (!scene.spokenText || scene.spokenText.trim().length === 0) {
      errors.push(`Cena ${index + 1}: Texto falado é obrigatório`)
    }
  })

  return {
    valid: errors.length === 0,
    errors,
  }
}

export function searchScripts(scripts: Script[], query: string): Script[] {
  const q = query.toLowerCase()
  return scripts.filter(
    (script) =>
      script.title.toLowerCase().includes(q) ||
      script.hook.toLowerCase().includes(q) ||
      script.objective.toLowerCase().includes(q) ||
      script.metadata.brand?.toLowerCase().includes(q)
  )
}

export function sortScripts(scripts: Script[], sortBy: 'recent' | 'oldest' | 'title'): Script[] {
  const sorted = [...scripts]
  switch (sortBy) {
    case 'recent':
      return sorted.sort((a, b) => new Date(b.metadata.createdAt).getTime() - new Date(a.metadata.createdAt).getTime())
    case 'oldest':
      return sorted.sort((a, b) => new Date(a.metadata.createdAt).getTime() - new Date(b.metadata.createdAt).getTime())
    case 'title':
      return sorted.sort((a, b) => a.title.localeCompare(b.title))
    default:
      return sorted
  }
}

export function getScriptStats(scripts: Script[]) {
  const total = scripts.length
  const totalScenes = scripts.reduce((sum, s) => sum + s.scenes.length, 0)
  const avgScenesPerScript = total > 0 ? (totalScenes / total).toFixed(1) : 0
  const platforms = [...new Set(scripts.map((s) => s.metadata.platform))].length
  const brands = [...new Set(scripts.filter((s) => s.metadata.brand).map((s) => s.metadata.brand))].length

  return {
    total,
    totalScenes,
    avgScenesPerScript,
    platformsUsed: platforms,
    brandsUsed: brands,
  }
}
