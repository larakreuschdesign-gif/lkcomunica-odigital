import jsPDF from 'jspdf'
import { Project, ScriptTemplate } from '@/types'

const BRAND_COLOR = '#8f39ff'
const TEXT_COLOR = '#1f2937'
const LIGHT_GRAY = '#f3f4f6'
const BORDER_COLOR = '#e5e7eb'

export async function generateScriptPDF(project: Project, script: ScriptTemplate) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  })

  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 20
  const contentWidth = pageWidth - margin * 2
  let yPosition = margin

  // Função auxiliar para adicionar quebra de página
  const checkPageBreak = (height: number) => {
    if (yPosition + height > pageHeight - margin) {
      doc.addPage()
      yPosition = margin
    }
  }

  // CAPA
  doc.setFillColor(143, 57, 255)
  doc.rect(0, 0, pageWidth, pageHeight, 'F')

  // Logo/Título na capa
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(36)
  doc.setFont('helvetica', 'bold')
  doc.text('ROTEIRO', margin, 80, { maxWidth: contentWidth, align: 'center' })

  doc.setFontSize(28)
  doc.setFont('helvetica', 'normal')
  doc.text('AUDIOVISUAL', margin, 110, { maxWidth: contentWidth, align: 'center' })

  // Dados na capa
  doc.setFontSize(14)
  doc.setFont('helvetica', 'normal')
  doc.text(`Cliente: ${project.clientName}`, margin, 160, { maxWidth: contentWidth })
  doc.text(`Projeto: ${script.title}`, margin, 170)
  doc.text(`Data: ${new Date().toLocaleDateString('pt-BR')}`, margin, 180)

  // PÁGINA 2 - SUMÁRIO
  doc.addPage()
  doc.setTextColor(31, 41, 55)
  doc.setFontSize(24)
  doc.setFont('helvetica', 'bold')
  doc.text('SUMÁRIO', margin, 20)

  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  const tableOfContents = [
    '1. Informações do Projeto',
    '2. Resumo Executivo',
    '3. Roteiro Detalhado',
    '4. Sugestões Criativas',
  ]

  tableOfContents.forEach((item, index) => {
    doc.text(item, margin + 5, 35 + index * 10)
  })

  // PÁGINA 3 - INFORMAÇÕES DO PROJETO
  doc.addPage()
  yPosition = margin

  // Cabeçalho
  doc.setFillColor(143, 57, 255)
  doc.rect(margin, yPosition, contentWidth, 8, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('INFORMAÇÕES DO PROJETO', margin + 5, yPosition + 5)

  yPosition += 15

  // Informações em grid
  doc.setTextColor(31, 41, 55)
  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')

  const infoData = [
    ['CLIENTE', project.clientName],
    ['PROJETO', script.title],
    ['OBJETIVO', project.input.objective],
    ['PLATAFORMAS', project.input.platform.join(', ')],
    ['TIPO DE CONTEÚDO', project.input.contentType],
    ['DURAÇÃO ESTIMADA', `${project.input.duration} segundos`],
    ['TOM DE VOZ', project.input.toneOfVoice],
    ['PÚBLICO-ALVO', project.input.targetAudience],
  ]

  infoData.forEach(([label, value]) => {
    checkPageBreak(8)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9)
    doc.text(label + ':', margin + 2, yPosition)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    const textHeight = doc.getTextDimensions(String(value)).h
    doc.text(String(value), margin + 35, yPosition, { maxWidth: contentWidth - 35 })
    yPosition += 8
  })

  // PÁGINA 4+ - ROTEIRO DETALHADO
  doc.addPage()
  yPosition = margin

  doc.setFillColor(143, 57, 255)
  doc.rect(margin, yPosition, contentWidth, 8, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('ROTEIRO DETALHADO', margin + 5, yPosition + 5)

  yPosition += 15

  // Gancho
  doc.setTextColor(31, 41, 55)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.text('GANCHO INICIAL', margin, yPosition)

  yPosition += 7
  doc.setFont('helvetica', 'italic')
  doc.setFontSize(10)
  doc.setTextColor(143, 57, 255)
  doc.text(script.gancho, margin + 2, yPosition, { maxWidth: contentWidth - 4 })

  yPosition += 12

  // Objetivo Estratégico
  doc.setTextColor(31, 41, 55)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.text('OBJETIVO ESTRATÉGICO', margin, yPosition)

  yPosition += 7
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.text(script.strategicObjective, margin + 2, yPosition, { maxWidth: contentWidth - 4 })

  yPosition += 12

  // Cenas
  script.scenes.forEach((scene, index) => {
    checkPageBreak(40)

    // Cabeçalho da cena
    doc.setFillColor(240, 242, 245)
    doc.rect(margin, yPosition, contentWidth, 7, 'F')
    doc.setTextColor(31, 41, 55)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text(
      `CENA ${scene.number} - ${scene.title} (${scene.duration}s)`,
      margin + 3,
      yPosition + 4.5
    )

    yPosition += 10

    // Descrição
    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(55, 65, 81)
    doc.text('DESCRIÇÃO:', margin + 2, yPosition)
    yPosition += 5
    doc.text(scene.description, margin + 4, yPosition, { maxWidth: contentWidth - 6 })

    const descLines = doc.splitTextToSize(scene.description, contentWidth - 6).length
    yPosition += descLines * 4 + 3

    // Informações da cena em colunas
    if (scene.environment) {
      doc.setFont('helvetica', 'bold')
      doc.text('Ambiente:', margin + 2, yPosition)
      doc.setFont('helvetica', 'normal')
      doc.text(scene.environment, margin + 25, yPosition)
      yPosition += 6
    }

    if (scene.voiceOver) {
      checkPageBreak(8)
      doc.setFont('helvetica', 'bold')
      doc.text('Voz Over:', margin + 2, yPosition)
      yPosition += 5
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(8)
      doc.text(`"${scene.voiceOver}"`, margin + 4, yPosition, { maxWidth: contentWidth - 6 })
      const voLines = doc.splitTextToSize(scene.voiceOver, contentWidth - 6).length
      yPosition += voLines * 4 + 3
      doc.setFontSize(9)
    }

    if (scene.onScreenText) {
      doc.setFont('helvetica', 'bold')
      doc.text('Texto na Tela:', margin + 2, yPosition)
      doc.setFont('helvetica', 'normal')
      doc.text(scene.onScreenText, margin + 4, yPosition + 5, { maxWidth: contentWidth - 6 })
      yPosition += 10
    }

    if (scene.cameraMovement) {
      doc.setFont('helvetica', 'bold')
      doc.text('Câmera:', margin + 2, yPosition)
      doc.setFont('helvetica', 'normal')
      doc.text(scene.cameraMovement, margin + 15, yPosition)
      yPosition += 6
    }

    if (scene.musicSuggestion) {
      doc.setFont('helvetica', 'bold')
      doc.text('Música:', margin + 2, yPosition)
      doc.setFont('helvetica', 'normal')
      doc.text(scene.musicSuggestion, margin + 15, yPosition)
      yPosition += 6
    }

    yPosition += 8
  })

  // CTA Final
  checkPageBreak(20)
  doc.setFillColor(143, 57, 255)
  doc.rect(margin, yPosition, contentWidth, 8, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.text('CALL-TO-ACTION FINAL', margin + 5, yPosition + 5)

  yPosition += 12
  doc.setTextColor(31, 41, 55)
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text(script.cta, margin + 2, yPosition, { maxWidth: contentWidth - 4 })

  // Rodapé
  doc.setFontSize(8)
  doc.setTextColor(107, 114, 128)
  doc.text(
    `Roteiro Pro © ${new Date().getFullYear()} | ${project.clientName} | ${script.title}`,
    margin,
    pageHeight - 10,
    { align: 'center' }
  )

  return doc
}

export function downloadPDF(doc: jsPDF, filename: string) {
  doc.save(`${filename}.pdf`)
}
