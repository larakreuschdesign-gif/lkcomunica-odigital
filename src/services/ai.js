import Anthropic from '@anthropic-ai/sdk'

// Inicializar cliente Anthropic (usar variável de ambiente)
const client = new Anthropic({
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
  defaultHeaders: {
    'user-agent': 'lk-analytics-ai/1.0'
  }
})

/**
 * Formata dados para enviar à IA
 */
function formatDataForAI(reportData, analysisType) {
  const { clientName, company, month, year, platforms, metrics = {} } = reportData
  const metricsText = Object.entries(metrics)
    .map(([key, value]) => `- ${key}: ${value}`)
    .join('\n')

  const contextData = `
Cliente: ${clientName}
Empresa: ${company}
Período: ${month}/${year}
Plataformas: ${platforms?.join(', ') || 'Não especificado'}

Métricas:
${metricsText || 'Dados não disponíveis'}
`

  return contextData
}

/**
 * Gera Resumo Executivo com IA
 */
export async function generateExecutiveSummary(reportData) {
  const contextData = formatDataForAI(reportData, 'summary')

  const message = await client.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: `Você é um estrategista sênior de mídia social analisando dados de desempenho.

${contextData}

Com base nesses dados, escreva um RESUMO EXECUTIVO (150-200 palavras) profissional que:
1. Destaque como foi o mês
2. Identifique principais destaques
3. Aponte pontos positivos e pontos de atenção
4. Forneça uma visão geral estratégica

Seja estratégico, nunca apenas repita números. Use linguagem profissional adequada para apresentação a clientes.`
      }
    ]
  })

  return message.content[0].type === 'text' ? message.content[0].text : ''
}

/**
 * Gera Análises Estratégicas
 */
export async function generateStrategicAnalyses(reportData) {
  const contextData = formatDataForAI(reportData, 'analyses')

  const message = await client.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 2000,
    messages: [
      {
        role: 'user',
        content: `Você é um estrategista sênior de mídia social.

${contextData}

Gere 15 ANÁLISES ESTRATÉGICAS relevantes que:
1. Expliquem padrões e tendências encontradas
2. Ofereçam interpretações não-óbvias dos dados
3. Conectem métricas a implicações estratégicas
4. Considerem possíveis impactos de algoritmos
5. Nunca apenas repitam números

Formate como lista numerada, uma análise por linha.
Cada análise deve ser uma frase completa e profissional.`
      }
    ]
  })

  return message.content[0].type === 'text' ? message.content[0].text : ''
}

/**
 * Gera Insights Automáticos
 */
export async function generateInsights(reportData) {
  const contextData = formatDataForAI(reportData, 'insights')

  const message = await client.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1500,
    messages: [
      {
        role: 'user',
        content: `Você é um estrategista sênior de mídia social analisando dados.

${contextData}

Identifique os TOP 10 INSIGHTS AUTOMÁTICOS mais valiosos, incluindo:
- Maior horário de desempenho
- Melhor formato de conteúdo
- Formato com menor desempenho
- Temas que mais performaram
- Posts com maior potencial
- Padrões emergentes
- Oportunidades identificadas

Formate como lista estruturada com ícones:
🎯 [Insight específico e acionável]

Seja conciso e prático.`
      }
    ]
  })

  return message.content[0].type === 'text' ? message.content[0].text : ''
}

/**
 * Gera Plano de Ação Recomendado
 */
export async function generateActionPlan(reportData) {
  const contextData = formatDataForAI(reportData, 'actionPlan')

  const message = await client.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 2000,
    messages: [
      {
        role: 'user',
        content: `Você é um estrategista sênior de mídia social.

${contextData}

Crie um PLANO DE AÇÃO ESTRUTURADO para o próximo mês com:

1. 5-8 AÇÕES PRIORITÁRIAS:
Para cada ação, especifique:
- Problema/Oportunidade
- Impacto esperado (Alto/Médio/Baixo)
- Recomendação específica e acionável
- Prioridade (Alta/Média/Baixa)
- Prazo estimado

2. RECOMENDAÇÕES DE CONTEÚDO:
- Frequência ideal de Reels por semana
- Frequência ideal de Carrosséis
- Frequência ideal de Stories
- Frequência ideal de Posts Institucionais
- Frequência ideal de Posts Comerciais
- Frequência ideal de Posts Educativos

3. TEMAS SUGERIDOS:
- 5-10 temas de conteúdo para explorar

Formato estruturado, profissional e pronto para implementação.`
      }
    ]
  })

  return message.content[0].type === 'text' ? message.content[0].text : ''
}

/**
 * Chat com IA - Responder perguntas sobre o relatório
 */
export async function askAI(question, reportData) {
  const contextData = formatDataForAI(reportData, 'chat')

  const message = await client.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1000,
    messages: [
      {
        role: 'user',
        content: `Você é um estrategista sênior de mídia social respondendo a perguntas sobre análise de desempenho.

CONTEXTO DO RELATÓRIO:
${contextData}

PERGUNTA: ${question}

Responda de forma concisa e estratégica, usando APENAS os dados do relatório.
Se não tiver informação para responder, seja honesto sobre isso.
Sempre conecte a resposta a implicações estratégicas.`
      }
    ]
  })

  return message.content[0].type === 'text' ? message.content[0].text : ''
}
