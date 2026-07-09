import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function analyzeScript(script) {
  try {
    const scriptText = `
TÍTULO: ${script.title}
GANCHO: ${script.hook}
OBJETIVO: ${script.objective}

CENAS:
${script.scenes
  .map(
    (s, i) => `
CENA ${i + 1} (${s.duration}):
${s.spokenText}
Emoção: ${s.emotion}
`
  )
  .join('\n')}

CTA: ${script.ctaFinal}
    `

    const message = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      system: `Você é um expert em análise de conteúdo para redes sociais.
      Avalie o roteiro em escala 0-100 para cada métrica.
      Retorne um JSON com pontuações e recomendações.`,
      messages: [
        {
          role: 'user',
          content: `Analise este roteiro e retorne um JSON:
{
  "scores": {
    "hookStrength": 0-100,
    "clarity": 0-100,
    "retention": 0-100,
    "naturalness": 0-100,
    "shareability": 0-100,
    "ctaStrength": 0-100,
    "easeOfFilming": 0-100,
    "narrativeCoherence": 0-100
  },
  "overallScore": 0-100,
  "diagnosis": "uma frase sobre os pontos fortes",
  "recommendations": ["recomendação 1", "recomendação 2", "recomendação 3"]
}

${scriptText}`,
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
    console.error('Script analysis error:', error)
    throw error
  }
}

export async function generateScriptVariation(script, variationType) {
  try {
    const variationPrompts = {
      provocative: 'Reescreva o roteiro de forma mais provocativa e arriscada, quebrando mais padrões.',
      shorter: 'Reduza o roteiro para a metade da duração, mantendo o impacto.',
      emotional: 'Aumente o apelo emocional do roteiro, tornando-o mais tocante e inspirador.',
      professional: 'Torne o roteiro mais profissional e corporativo, adequado para LinkedIn.',
      viral: 'Reescreva para máxima viralidade, com pattern interrupts constantes e surpresas.',
      sophisticated: 'Aumente a sofisticação e elegância do roteiro, reduzindo gírias.',
      natural: 'Torne o texto mais natural e coloquial, como se a pessoa estivesse falando do sofá.',
      commercial: 'Reescreva com foco em conversão e vendas, destacando benefícios.',
      educational: 'Transforme em conteúdo educativo, explicando conceitos de forma clara.',
      retentive: 'Adicione mais mudanças de enquadramento, cortes e pattern interrupts.',
    }

    const message = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4096,
      system: `Você é um expert em roteiros para vídeos. Reescreva roteiros mantendo a estrutura mas alterando o tom e estilo conforme pedido.
      Retorne um JSON com o roteiro modificado na mesma estrutura original.`,
      messages: [
        {
          role: 'user',
          content: `${variationPrompts[variationType] || 'Crie uma variação única'}

Script atual:
${JSON.stringify(script, null, 2)}

Retorne um JSON com a mesma estrutura mas com as mudanças aplicadas.`,
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
    console.error('Variation generation error:', error)
    throw error
  }
}

export async function suggestScriptImprovements(script) {
  try {
    const message = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2048,
      system: `Você é um diretor criativo sênior. Analise roteiros e sugira melhorias específicas.
      Retorne um JSON com sugestões detalhadas.`,
      messages: [
        {
          role: 'user',
          content: `Analise este roteiro e sugira 5 melhorias específicas e acionáveis:

${JSON.stringify(script, null, 2)}

Retorne:
{
  "improvements": [
    {
      "area": "área a melhorar",
      "current": "o que está agora",
      "suggestion": "o que mudar",
      "impact": "impacto esperado",
      "priority": "alta/média/baixa"
    }
  ]
}`,
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
    console.error('Improvement suggestions error:', error)
    throw error
  }
}
