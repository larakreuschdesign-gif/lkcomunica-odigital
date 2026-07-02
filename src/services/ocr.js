import Tesseract from 'tesseract.js'

// Padrões regex para extrair métricas
const METRICS_PATTERNS = {
  alcance: /(?:alcance|reach|audience reached)[\s:]*([0-9.,KMB]+)/i,
  impressoes: /(?:impressões|impressions|imp)[\s:]*([0-9.,KMB]+)/i,
  engajamento: /(?:engajamento|engagement rate|taxa de engajamento)[\s:]*([0-9.,]+%?)/i,
  seguidores: /(?:seguidores|followers|new followers)[\s:]*(?:\+)?([0-9.,KMB]+)/i,
  curtidas: /(?:curtidas|likes)[\s:]*([0-9.,KMB]+)/i,
  comentarios: /(?:comentários|comments)[\s:]*([0-9.,KMB]+)/i,
  compartilhamentos: /(?:compartilhamentos|shares)[\s:]*([0-9.,KMB]+)/i,
  salvamentos: /(?:salvamentos|saves)[\s:]*([0-9.,KMB]+)/i,
  cliques: /(?:cliques|clicks)[\s:]*([0-9.,KMB]+)/i,
  visualizacoes: /(?:visualizações|views)[\s:]*([0-9.,KMB]+)/i,
  contas_alcancadas: /(?:contas alcançadas|accounts reached)[\s:]*([0-9.,KMB]+)/i,
  contas_engajadas: /(?:contas engajadas|accounts engaged)[\s:]*([0-9.,KMB]+)/i,
  visitasPerfil: /(?:visitas ao perfil|profile visits)[\s:]*([0-9.,KMB]+)/i,
}

// Detectar plataforma baseado em keywords
const PLATFORM_KEYWORDS = {
  instagram: ['instagram', 'insights', 'reels', 'stories', 'feed', 'ig'],
  facebook: ['facebook', 'meta business', 'página'],
  linkedin: ['linkedin', 'connections', 'followers'],
  tiktok: ['tiktok', 'tiktok', 'fyp'],
}

// Categorias de conteúdo
const CONTENT_CATEGORIES = {
  reels: ['reels', 'vídeos curtos', 'short form'],
  stories: ['stories', 'stories', 'histórias'],
  posts: ['posts', 'feed', 'publicações'],
  carroseis: ['carrossel', 'carousel', 'slides'],
}

/**
 * Converte valores com K, M, B para números
 */
function parseMetricValue(value) {
  if (!value) return 0

  value = String(value).trim().toUpperCase()
  const multipliers = { K: 1000, M: 1000000, B: 1000000000 }

  // Extrair número e sufixo
  const match = value.match(/^([0-9.,]+)([KMB%]?)/)
  if (!match) return 0

  let num = parseFloat(match[1].replace(/[.,]/g, '').replace(/,/g, '.'))
  const suffix = match[2]

  if (suffix && multipliers[suffix]) {
    num *= multipliers[suffix]
  }

  return Math.round(num)
}

/**
 * Detecta plataforma baseado em keywords do texto
 */
function detectPlatform(text) {
  const lowerText = text.toLowerCase()

  for (const [platform, keywords] of Object.entries(PLATFORM_KEYWORDS)) {
    if (keywords.some(kw => lowerText.includes(kw))) {
      return platform
    }
  }

  return 'unknown'
}

/**
 * Detecta categoria de conteúdo
 */
function detectCategory(text) {
  const lowerText = text.toLowerCase()

  for (const [category, keywords] of Object.entries(CONTENT_CATEGORIES)) {
    if (keywords.some(kw => lowerText.includes(kw))) {
      return category
    }
  }

  return 'insights'
}

/**
 * Extrai métricas do texto usando regex patterns
 */
function extractMetrics(text) {
  const metrics = {}

  for (const [metricName, pattern] of Object.entries(METRICS_PATTERNS)) {
    const match = text.match(pattern)
    if (match && match[1]) {
      metrics[metricName] = parseMetricValue(match[1])
    }
  }

  return metrics
}

/**
 * Processa arquivo de imagem com Tesseract OCR
 */
export async function processImageWithOCR(file) {
  try {
    // Ler arquivo como data URL
    const imageData = await new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => resolve(e.target.result)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })

    // Usar Tesseract para extrair texto
    const { data: { text } } = await Tesseract.recognize(
      imageData,
      'por', // Português
      {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            console.log(`OCR Progress: ${Math.round(m.progress * 100)}%`)
          }
        }
      }
    )

    // Extrair informações
    const platform = detectPlatform(text)
    const category = detectCategory(text)
    const metrics = extractMetrics(text)

    return {
      file: file.name,
      platform,
      category,
      metrics,
      rawText: text,
      timestamp: new Date().toISOString(),
      success: Object.keys(metrics).length > 0
    }
  } catch (error) {
    console.error('Erro no OCR:', error)
    throw error
  }
}

/**
 * Processa múltiplos arquivos em paralelo
 */
export async function processMultipleImages(files, onProgress = null) {
  const results = []

  for (let i = 0; i < files.length; i++) {
    try {
      const result = await processImageWithOCR(files[i])
      results.push(result)

      if (onProgress) {
        onProgress({
          current: i + 1,
          total: files.length,
          percentage: Math.round(((i + 1) / files.length) * 100)
        })
      }
    } catch (error) {
      console.error(`Erro ao processar ${files[i].name}:`, error)
      results.push({
        file: files[i].name,
        error: error.message,
        success: false
      })
    }
  }

  return results
}

/**
 * Agrupa resultados de OCR por plataforma e categoria
 */
export function groupOCRResults(ocrResults) {
  const grouped = {}

  ocrResults.forEach(result => {
    if (!result.success) return

    const platform = result.platform || 'unknown'
    const category = result.category || 'other'

    if (!grouped[platform]) {
      grouped[platform] = {}
    }

    if (!grouped[platform][category]) {
      grouped[platform][category] = []
    }

    grouped[platform][category].push(result)
  })

  return grouped
}

/**
 * Consolida métricas de múltiplos prints
 */
export function consolidateMetrics(ocrResults) {
  const consolidated = {
    totalFiles: ocrResults.length,
    successfulFiles: ocrResults.filter(r => r.success).length,
    metrics: {
      alcance: 0,
      impressoes: 0,
      engajamento: 0,
      seguidores: 0,
      curtidas: 0,
      comentarios: 0,
      compartilhamentos: 0,
      salvamentos: 0,
      cliques: 0,
      visualizacoes: 0,
    },
    byPlatform: {},
  }

  ocrResults.forEach(result => {
    if (!result.success) return

    const platform = result.platform || 'unknown'

    // Inicializar plataforma se não existir
    if (!consolidated.byPlatform[platform]) {
      consolidated.byPlatform[platform] = {
        files: 0,
        metrics: { ...consolidated.metrics }
      }
    }

    consolidated.byPlatform[platform].files++

    // Somar métricas
    Object.entries(result.metrics).forEach(([key, value]) => {
      if (consolidated.metrics[key] !== undefined) {
        consolidated.metrics[key] += value || 0
        consolidated.byPlatform[platform].metrics[key] += value || 0
      }
    })
  })

  return consolidated
}
