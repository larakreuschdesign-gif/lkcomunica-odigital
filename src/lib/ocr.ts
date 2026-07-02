import Anthropic from '@anthropic-ai/sdk'
import { OcrResult, PlatformMetrics } from './types'

const client = new Anthropic()

const PLATFORM_PATTERNS = {
  instagram: {
    keywords: ['instagram', 'followers', 'reach', 'impressions', 'engagement'],
    metrics: [
      'reach',
      'impressions',
      'followers',
      'likes',
      'comments',
      'shares',
      'saves',
      'views',
      'engagement_rate',
    ],
  },
  facebook: {
    keywords: ['facebook', 'page', 'post', 'reactions', 'engagement'],
    metrics: [
      'reach',
      'impressions',
      'post_engagement',
      'page_likes',
      'shares',
      'comments',
      'clicks',
    ],
  },
  linkedin: {
    keywords: ['linkedin', 'connections', 'impressions', 'engagement', 'followers'],
    metrics: [
      'impressions',
      'engagement_rate',
      'followers',
      'clicks',
      'comments',
      'shares',
      'reactions',
    ],
  },
}

export async function extractMetricsFromImage(
  base64Image: string,
  filename: string
): Promise<OcrResult | null> {
  try {
    const response = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: 'image/png',
                data: base64Image,
              },
            },
            {
              type: 'text',
              text: `Analyze this screenshot of social media metrics and extract all the data you can see.

Please provide the response in JSON format with the following structure:
{
  "platform": "Instagram|Facebook|LinkedIn",
  "metrics": {
    "reach": number or null,
    "impressions": number or null,
    "followers": number or null,
    "engagement": number or null,
    "likes": number or null,
    "comments": number or null,
    "shares": number or null,
    "saves": number or null,
    "clicks": number or null,
    "profileVisits": number or null,
    "accountsReached": number or null,
    "accountsEngaged": number or null
  },
  "confidence": 0.0-1.0,
  "notes": "Any additional observations"
}

If you cannot determine a metric, use null. Be precise with numbers.`,
            },
          ],
        },
      ],
    })

    const content = response.content[0]
    if (content.type !== 'text') return null

    const jsonMatch = content.text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) return null

    const parsed = JSON.parse(jsonMatch[0])

    return {
      platform: parsed.platform,
      type: 'insights',
      extractedData: parsed.metrics,
      confidence: parsed.confidence,
    }
  } catch (error) {
    console.error('OCR Error:', error)
    return null
  }
}

export async function generateAIAnalysis(
  metrics: PlatformMetrics,
  previousMetrics?: PlatformMetrics
): Promise<string> {
  try {
    const comparison = previousMetrics
      ? `
Previous month metrics:
- Reach: ${previousMetrics.reach}
- Engagement: ${previousMetrics.engagement}%
- Followers: ${previousMetrics.followers}
`
      : ''

    const response = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1000,
      messages: [
        {
          role: 'user',
          content: `You are an expert social media strategist. Analyze the following metrics and provide strategic insights.

Current Metrics:
- Reach: ${metrics.reach}
- Impressions: ${metrics.impressions}
- Engagement Rate: ${metrics.engagement}%
- Followers: ${metrics.followers}
- Likes: ${metrics.likes}
- Comments: ${metrics.comments}
- Shares: ${metrics.shares}
- Saves: ${metrics.saves}

${comparison}

Provide:
1. 2-3 key insights about the performance
2. 2-3 strategic recommendations
3. Identify any concerning trends

Keep the response concise and professional, suitable for a business executive summary.`,
        },
      ],
    })

    const content = response.content[0]
    return content.type === 'text' ? content.text : ''
  } catch (error) {
    console.error('AI Analysis Error:', error)
    return ''
  }
}

export async function generateExecutiveSummary(
  metrics: PlatformMetrics[],
  clientName: string,
  month: string
): Promise<string> {
  try {
    const avgEngagement =
      metrics.reduce((sum, m) => sum + m.engagement, 0) / metrics.length
    const totalReach = metrics.reduce((sum, m) => sum + m.reach, 0)

    const response = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 800,
      messages: [
        {
          role: 'user',
          content: `Create a professional executive summary for a social media performance report.

Client: ${clientName}
Period: ${month} 2024

Key Metrics:
- Total Reach: ${totalReach.toLocaleString()}
- Average Engagement Rate: ${avgEngagement.toFixed(1)}%
- Number of Platforms: ${metrics.length}

Write a 3-4 paragraph executive summary that:
1. Opens with overall performance assessment
2. Highlights key achievements
3. Identifies areas for improvement
4. Concludes with strategic direction

Keep it professional, data-driven, and suitable for client presentation.`,
        },
      ],
    })

    const content = response.content[0]
    return content.type === 'text' ? content.text : ''
  } catch (error) {
    console.error('Executive Summary Error:', error)
    return ''
  }
}
