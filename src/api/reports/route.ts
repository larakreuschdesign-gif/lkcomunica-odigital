import { NextRequest, NextResponse } from 'next/server'
import { extractMetricsFromImage, generateAIAnalysis } from '@/lib/ocr'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll('files') as File[]
    const clientName = formData.get('clientName') as string
    const month = formData.get('month') as string
    const year = formData.get('year') as string

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No files provided' },
        { status: 400 }
      )
    }

    const results = []

    for (const file of files) {
      const buffer = await file.arrayBuffer()
      const base64 = Buffer.from(buffer).toString('base64')

      const ocrResult = await extractMetricsFromImage(base64, file.name)
      if (ocrResult) {
        results.push(ocrResult)
      }
    }

    return NextResponse.json({
      success: true,
      reportData: {
        clientName,
        month,
        year,
        extractedMetrics: results,
        filesProcessed: files.length,
        metricsFound: results.length,
      },
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to process files' },
      { status: 500 }
    )
  }
}
