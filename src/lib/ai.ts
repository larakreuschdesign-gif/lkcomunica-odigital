import Anthropic from '@anthropic-ai/sdk'
import { ProjectInput, ScriptTemplate } from '@/types'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const SCRIPT_GENERATION_PROMPT = `Você é um diretor criativo experiente em produção de vídeos para redes sociais e campanhas publicitárias.
Crie um roteiro profissional completo e detalhado para um vídeo.

INFORMAÇÕES DO PROJETO:
- Nome do Cliente: {clientName}
- Título do Vídeo: {videoTitle}
- Objetivo: {objective}
- Plataformas: {platforms}
- Tipo de Conteúdo: {contentType}
- Duração Estimada: {duration} segundos
- Tom de Voz: {toneOfVoice}
- Público-alvo: {targetAudience}
- Informações da Marca: {brandInfo}
- Referências: {references}
- CTA Desejado: {ctaText}
- Ideias Principais: {mainIdeas}
- Textos Base: {baseTexts}
- Observações Estratégicas: {strategicNotes}

ESTRUTURA EXIGIDA DO ROTEIRO (formato JSON):
{
  "title": "Título do vídeo",
  "gancho": "Gancho inicial impactante de 1-2 linhas",
  "strategicObjective": "Objetivo estratégico claro",
  "scenes": [
    {
      "number": 1,
      "title": "Título da cena",
      "duration": número_em_segundos,
      "description": "Descrição detalhada",
      "environment": "Descrição do ambiente",
      "expression": "Expressão do ator/locutor",
      "cameraMovement": "Movimento de câmera",
      "voiceOver": "Texto falado",
      "onScreenText": "Texto que aparece na tela",
      "emotions": "Emoções transmitidas",
      "creativeDirection": "Direção criativa específica",
      "musicSuggestion": "Sugestão de trilha sonora"
    }
  ],
  "cta": "Call-to-action final",
  "observations": "Observações importantes para produção",
  "estimatedDuration": número_total_segundos,
  "wordCount": número_palavras
}

Crie um roteiro altamente profissional, criativo, envolvente e otimizado para as plataformas especificadas.
Cada cena deve ser descrita com detalhes de produção, movimentação de câmera, expressões e emoções.
O gancho deve ser impactante para capturar atenção nos primeiros segundos.
O roteiro deve respeitar rigorosamente o tempo de duração estimado.
Retorne APENAS o JSON válido, sem explicações adicionais.`

export async function generateScript(input: ProjectInput): Promise<ScriptTemplate> {
  const prompt = SCRIPT_GENERATION_PROMPT
    .replace('{clientName}', input.clientName)
    .replace('{videoTitle}', input.videoTitle || 'Sem título')
    .replace('{objective}', input.objective)
    .replace('{platforms}', input.platform.join(', '))
    .replace('{contentType}', input.contentType)
    .replace('{duration}', input.duration.toString())
    .replace('{toneOfVoice}', input.toneOfVoice)
    .replace('{targetAudience}', input.targetAudience)
    .replace('{brandInfo}', input.brandInfo || 'Não informado')
    .replace('{references}', input.references || 'Não informado')
    .replace('{ctaText}', input.ctaText || 'Padrão da marca')
    .replace('{mainIdeas}', input.mainIdeas || 'Sem ideias específicas')
    .replace('{baseTexts}', input.baseTexts || 'Sem textos base')
    .replace('{strategicNotes}', input.strategicNotes || 'Sem observações')

  try {
    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4000,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    })

    const content = message.content[0]
    if (content.type !== 'text') {
      throw new Error('Resposta não é texto')
    }

    // Extrair JSON da resposta
    const jsonMatch = content.text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('Não foi possível extrair JSON da resposta')
    }

    const script = JSON.parse(jsonMatch[0]) as ScriptTemplate
    return script
  } catch (error) {
    console.error('Erro ao gerar roteiro:', error)
    throw new Error('Falha ao gerar roteiro com IA')
  }
}

export async function generateSuggestions(input: ProjectInput) {
  const suggestionsPrompt = `Você é um especialista em marketing digital e criação de conteúdo viral.

Analise as informações do projeto e sugira:

PROJETO: ${input.videoTitle}
OBJETIVO: ${input.objective}
PLATAFORMA: ${input.platform.join(', ')}
PÚBLICO-ALVO: ${input.targetAudience}

Retorne APENAS um JSON com:
{
  "hookIdeas": ["gancho 1", "gancho 2", "gancho 3"],
  "ctaSuggestions": ["cta 1", "cta 2", "cta 3"],
  "musicSuggestions": ["música 1", "música 2", "música 3"],
  "cameraAngleSuggestions": ["ângulo 1", "ângulo 2", "ângulo 3"],
  "editingSuggestions": ["sugestão 1", "sugestão 2", "sugestão 3"]
}

Retorne APENAS JSON válido.`

  try {
    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2000,
      messages: [
        {
          role: 'user',
          content: suggestionsPrompt,
        },
      ],
    })

    const content = message.content[0]
    if (content.type !== 'text') {
      throw new Error('Resposta não é texto')
    }

    const jsonMatch = content.text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('Não foi possível extrair JSON')
    }

    return JSON.parse(jsonMatch[0])
  } catch (error) {
    console.error('Erro ao gerar sugestões:', error)
    throw new Error('Falha ao gerar sugestões')
  }
}
