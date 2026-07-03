export const SYSTEM_PROMPT = `Você é um especialista em roteirização profissional para conteúdo audiovisual, com experiência em:
- Redes sociais (TikTok, Instagram Reels, YouTube Shorts)
- Campanhas publicitárias
- Vídeos institucionais
- Anúncios de produtos
- Conteúdo educacional

Sua tarefa é gerar roteiros estruturados e profissionais baseado nas informações fornecidas.

IMPORTANTE: Sempre responda em JSON válido com a seguinte estrutura:
{
  "videoTitle": "Título do vídeo",
  "hook": "Gancho inicial (3-5 segundos que prendem atenção)",
  "strategicObjective": "Objetivo estratégico do vídeo",
  "scenes": [
    {
      "id": "scene-1",
      "order": 1,
      "title": "Título da cena",
      "description": "Descrição clara e visual",
      "duration": 5,
      "spokenText": "Texto exato falado",
      "screenText": "Texto que aparece na tela",
      "environment": "Ambiente/locação",
      "expression": "Expressão facial/corporal",
      "cameraMovement": "Movimento de câmera (pan, zoom, etc)",
      "emotions": ["emoção1", "emoção2"],
      "creativeDirection": "Direção criativa específica",
      "musicSuggestion": "Sugestão de trilha sonora",
      "notes": "Observações técnicas"
    }
  ],
  "finalCTA": "Call-to-action final",
  "observations": "Observações gerais de produção",
  "estimatedDuration": 30,
  "wordCount": 150
}`

export const generateScriptPrompt = (input: {
  clientName: string
  objective: string
  platform: string
  contentType: string
  duration: number
  voiceTone: string
  targetAudience: string
  structure?: string
  cta?: string
  references?: string[]
  ideas?: string
}): string => {
  return `Gere um roteiro profissional com as seguintes informações:

CLIENTE: ${input.clientName}
OBJETIVO: ${input.objective}
PLATAFORMA: ${input.platform}
TIPO DE CONTEÚDO: ${input.contentType}
DURAÇÃO ESTIMADA: ${input.duration} segundos
TOM DE VOZ: ${input.voiceTone}
PÚBLICO-ALVO: ${input.targetAudience}
${input.structure ? `ESTRUTURA DESEJADA: ${input.structure}` : ''}
${input.cta ? `CALL-TO-ACTION: ${input.cta}` : ''}
${input.ideas ? `IDEIAS PRINCIPAIS:\n${input.ideas}` : ''}
${input.references && input.references.length > 0 ? `REFERÊNCIAS:\n${input.references.join('\n')}` : ''}

Gere um roteiro estruturado com cenas bem definidas, diálogos naturais mas persuasivos, e indicações técnicas de produção.
O roteiro deve ser executável por um produtor audiovisual profissional.
Cada cena deve ter duração calculada para atingir exatamente ${input.duration} segundos no total.`
}

export const HOOK_TEMPLATES = {
  product: [
    'Você está perdendo dinheiro se não conhece este produto...',
    'Espera até o final para saber o preço...',
    'Poucos sabem, mas existe uma solução para isso...',
  ],
  educational: [
    '3 coisas que você precisa saber sobre isso...',
    'Aprenda isso em menos de 60 segundos...',
    'Este método mudou minha vida e pode mudar a sua também...',
  ],
  entertainment: [
    'Você não vai acreditar no que acontece depois...',
    'Este é o vídeo mais engraçado do dia...',
    'Espera pela reviravolta no final...',
  ],
  institutional: [
    'Conheça a história por trás da marca...',
    'Aqui está por que 100 mil pessoas escolhem a gente...',
    'Transparência total sobre como funciona...',
  ],
}

export const CTA_TEMPLATES = {
  product: [
    'Clique no link na bio para aproveitar a promoção',
    'Saiba mais no link do comentário fixado',
    'Compre agora e ganhe 20% de desconto',
  ],
  engagement: [
    'Deixe um comentário com sua opinião',
    'Compartilhe com quem você acha que vai gostar',
    'Salve este vídeo para assistir depois',
  ],
  follow: [
    'Siga para mais conteúdo como este',
    'Se você gostou, siga para ficar por dentro',
    'Ativa as notificações para não perder nada',
  ],
  subscribe: [
    'Se inscreva no canal para ver a continuação',
    'Curta, comente e se inscreva',
    'Subscribe para receber as novidades',
  ],
}

export const PLATFORM_SPECS = {
  TIKTOK: {
    minDuration: 3,
    maxDuration: 600,
    recommendedDuration: 15,
    aspectRatio: '9:16',
    fps: 30,
  },
  INSTAGRAM: {
    minDuration: 3,
    maxDuration: 60,
    recommendedDuration: 15,
    aspectRatio: '9:16',
    fps: 30,
  },
  YOUTUBE: {
    minDuration: 10,
    maxDuration: 3600,
    recommendedDuration: 180,
    aspectRatio: '16:9',
    fps: 30,
  },
  LINKEDIN: {
    minDuration: 3,
    maxDuration: 600,
    recommendedDuration: 30,
    aspectRatio: '1:1',
    fps: 24,
  },
  OTHER: {
    minDuration: 5,
    maxDuration: 600,
    recommendedDuration: 30,
    aspectRatio: '16:9',
    fps: 30,
  },
}
