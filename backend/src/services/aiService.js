import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const SYSTEM_PROMPT = `Você é um estrategista sênior de conteúdo, roteirista audiovisual, copywriter de resposta direta e diretor criativo especializado em vídeos para redes sociais.

Sua função é transformar um gancho principal em um roteiro profissional, estratégico, natural e pronto para gravação.

REGRAS OBRIGATÓRIAS:
1. Conteúdo genérico é proibido
2. Começar com tensão, curiosidade ou identificação
3. Escrever para fala (som natural, não como artigo)
4. Frases curtas
5. Uma ideia por bloco de cena
6. Não repetir o gancho depois dele
7. Evitar excesso de explicação
8. Priorizar retenção (mudança a cada 3-7 segundos)
9. CTA contextual
10. Não inventar dados ou benefícios
11. Não usar emojis no texto falado
12. Não criar roteiros com cara de IA
13. Evitar repetições
14. Preservar identidade da marca

RETORNE UM JSON COM ESTA ESTRUTURA:
{
  "id": "script-{timestamp}",
  "title": "Título estratégico do vídeo",
  "hook": "O gancho fornecido",
  "hookedOptimized": "Versão otimizada do gancho (se diferente)",
  "objective": "Objetivo estratégico em 1-2 frases",
  "summary": "Resumo criativo com conceito e progressão narrativa",
  "generalDescription": "Descrição visual e de ritmo geral",
  "scenes": [
    {
      "duration": "0s a Xs",
      "objective": "Objetivo da cena",
      "environment": "Descrição do ambiente",
      "description": "O que acontece na cena",
      "framing": "Close/Plano médio/etc",
      "expression": "Descrição de expressão facial",
      "bodyMovement": "Movimentos corporais",
      "cameraMovement": "Movimento de câmera",
      "spokenText": "EXATAMENTE o que a pessoa deve dizer",
      "onScreenText": "Texto que aparece na tela",
      "emotion": "Emoção principal",
      "creativeDirection": "Como executar a cena",
      "transition": "Como conectar com a próxima"
    }
  ],
  "ctaFinal": "CTA específico e contextual",
  "creativDirection": "Ritmo, estética, cortes, B-roll, legendas, elementos gráficos",
  "musicSuggestion": "Estilo musical, BPM, energia, momento de entrada",
  "observations": "Cuidados, pontos críticos, pausas importantes"
}

O texto falado DEVE soar como algo que uma pessoa real diria diante de câmera.
Cada cena deve ter função narrativa clara.
O roteiro deve avançar constantemente.`

export async function generateScript(hookData) {
  try {
    const userPrompt = `Gere um roteiro profissional com base nestas informações:

GANCHO: "${hookData.hook}"

${hookData.brand ? `Marca: ${hookData.brand}` : ''}
${hookData.niche ? `Nicho: ${hookData.niche}` : ''}
${hookData.product ? `Produto/Serviço: ${hookData.product}` : ''}
${hookData.audience ? `Público-alvo: ${hookData.audience}` : ''}
Plataforma: ${hookData.platform}
Objetivo: ${hookData.objective}
Duração: ${hookData.duration}
Tom: ${hookData.tone}
Formato: ${hookData.format}
${hookData.requiredInfo ? `Informações obrigatórias: ${hookData.requiredInfo}` : ''}
${hookData.restrictions ? `Restrições: ${hookData.restrictions}` : ''}

Gere um roteiro pronto para gravação com todas as cenas, direções de câmera, texto falado natural e estratégia clara.`

    const message = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: userPrompt,
        },
      ],
    })

    const content = message.content[0]
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from Claude')
    }

    // Extract JSON from response
    const jsonMatch = content.text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('Could not extract JSON from response')
    }

    const scriptData = JSON.parse(jsonMatch[0])
    scriptData.id = `script-${Date.now()}`

    return scriptData
  } catch (error) {
    console.error('AI Service error:', error)
    throw error
  }
}

export async function generateHookVariations(currentHook) {
  try {
    const message = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2048,
      system: `Você é um expert em copywriting e hooks viralidade. Gere 8 variações de hooks em diferentes ângulos.

      Retorne um JSON:
      {
        "variations": [
          { "category": "Curiosidade", "hook": "..." },
          { "category": "Provocação", "hook": "..." },
          ...
        ]
      }`,
      messages: [
        {
          role: 'user',
          content: `Crie variações para este hook: "${currentHook}"`,
        },
      ],
    })

    const content = message.content[0]
    if (content.type !== 'text') {
      throw new Error('Unexpected response type')
    }

    const jsonMatch = content.text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('Could not extract JSON')
    }

    return JSON.parse(jsonMatch[0])
  } catch (error) {
    console.error('Hook variations error:', error)
    throw error
  }
}
