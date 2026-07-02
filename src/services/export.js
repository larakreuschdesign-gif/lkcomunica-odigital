import jsPDF from 'jspdf'
import html2pdf from 'html2pdf.js'
import PptxGenJS from 'pptxgenjs'
import * as XLSX from 'xlsx'

/**
 * Exporta relatório como PDF
 */
export async function exportPDF(reportData, dashboardData) {
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    })

    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    let yPosition = 20

    // Header com rosa
    doc.setFillColor(230, 30, 110)
    doc.rect(0, 0, pageWidth, 50, 'F')

    // Título
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(28)
    doc.setFont('helvetica', 'bold')
    doc.text(`${reportData.clientName}`, 20, 25)

    doc.setFontSize(12)
    doc.setFont('helvetica', 'normal')
    doc.text(`Relatório de Desempenho - ${reportData.month}/${reportData.year}`, 20, 35)

    // Corpo do documento
    doc.setTextColor(17, 24, 39)
    yPosition = 60

    // Métricas principais
    doc.setFontSize(16)
    doc.setFont('helvetica', 'bold')
    doc.text('Principais Métricas', 20, yPosition)
    yPosition += 15

    doc.setFontSize(11)
    doc.setFont('helvetica', 'normal')

    const metrics = dashboardData.metrics
    const metricsArray = [
      [`Alcance: ${metrics.alcance.value.toLocaleString('pt-BR')} ${metrics.alcance.variation}`, ''],
      [`Impressões: ${metrics.impressoes.value.toLocaleString('pt-BR')} ${metrics.impressoes.variation}`, ''],
      [`Engajamento: ${metrics.engajamento.value}% ${metrics.engajamento.variation}`, ''],
      [`Seguidores: ${metrics.seguidores.value.toLocaleString('pt-BR')} ${metrics.seguidores.variation}`, ''],
    ]

    metricsArray.forEach(([metric]) => {
      doc.text(metric, 25, yPosition)
      yPosition += 8
    })

    yPosition += 5

    // Informações adicionais
    doc.setFontSize(16)
    doc.setFont('helvetica', 'bold')
    doc.text('Informações do Relatório', 20, yPosition)
    yPosition += 12

    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.text(`Empresa: ${reportData.company}`, 25, yPosition)
    yPosition += 6
    doc.text(`Plataformas: ${reportData.platforms?.join(', ') || 'Não especificado'}`, 25, yPosition)
    yPosition += 6
    doc.text(`Objetivo: ${reportData.objective || 'Não informado'}`, 25, yPosition)
    yPosition += 6
    doc.text(`Data de Geração: ${new Date().toLocaleDateString('pt-BR')}`, 25, yPosition)

    // Footer
    doc.setFontSize(9)
    doc.setTextColor(107, 114, 128)
    doc.text('LK Analytics AI - Relatório Automático', 20, pageHeight - 10)

    // Salvar
    doc.save(`relatorio-${reportData.clientName}-${reportData.month}-${reportData.year}.pdf`)
    return true
  } catch (error) {
    console.error('Erro ao exportar PDF:', error)
    throw error
  }
}

/**
 * Exporta relatório como PowerPoint
 */
export async function exportPowerPoint(reportData, dashboardData) {
  try {
    const pres = new PptxGenJS()

    // Configurar temas
    pres.defineLayout({ name: 'BLANK', master: true })

    // Slide 1: Título
    let slide = pres.addSlide()
    slide.background = { color: 'E61E6E' }

    slide.addText(reportData.clientName, {
      x: 0.5,
      y: 2,
      w: 8.5,
      h: 1.5,
      fontSize: 54,
      bold: true,
      color: 'FFFFFF',
      align: 'center',
      fontFace: 'Playfair Display'
    })

    slide.addText(`Relatório de Desempenho - ${reportData.month}/${reportData.year}`, {
      x: 0.5,
      y: 3.8,
      w: 8.5,
      h: 0.8,
      fontSize: 24,
      color: 'FFFFFF',
      align: 'center'
    })

    // Slide 2: Métricas
    slide = pres.addSlide()
    slide.addText('Principais Métricas', {
      x: 0.5,
      y: 0.5,
      w: 8.5,
      h: 0.6,
      fontSize: 32,
      bold: true,
      color: 'E61E6E',
      fontFace: 'Playfair Display'
    })

    const metrics = dashboardData.metrics
    const metricsData = [
      {
        title: 'Alcance',
        value: metrics.alcance.value.toLocaleString('pt-BR'),
        variation: metrics.alcance.variation,
        icon: metrics.alcance.icon
      },
      {
        title: 'Impressões',
        value: metrics.impressoes.value.toLocaleString('pt-BR'),
        variation: metrics.impressoes.variation,
        icon: metrics.impressoes.icon
      },
      {
        title: 'Engajamento',
        value: `${metrics.engajamento.value}%`,
        variation: metrics.engajamento.variation,
        icon: metrics.engajamento.icon
      },
      {
        title: 'Seguidores',
        value: metrics.seguidores.value.toLocaleString('pt-BR'),
        variation: metrics.seguidores.variation,
        icon: metrics.seguidores.icon
      }
    ]

    let yPos = 1.5
    metricsData.forEach(metric => {
      slide.addShape('rect', {
        x: 0.5,
        y: yPos,
        w: 8.5,
        h: 1.2,
        fill: { color: 'F5EFEA' },
        line: { color: 'E61E6E', width: 2 }
      })

      slide.addText(`${metric.icon} ${metric.title}`, {
        x: 0.7,
        y: yPos + 0.15,
        w: 5,
        h: 0.4,
        fontSize: 14,
        bold: true,
        color: 'E61E6E'
      })

      slide.addText(metric.value, {
        x: 0.7,
        y: yPos + 0.55,
        w: 5,
        h: 0.4,
        fontSize: 18,
        bold: true,
        color: '111827'
      })

      slide.addText(metric.variation, {
        x: 6,
        y: yPos + 0.3,
        w: 2.3,
        h: 0.6,
        fontSize: 16,
        bold: true,
        color: metric.variation.includes('+') ? '10B981' : 'EF4444',
        align: 'right'
      })

      yPos += 1.4
    })

    // Slide 3: Informações
    slide = pres.addSlide()
    slide.addText('Informações do Relatório', {
      x: 0.5,
      y: 0.5,
      w: 8.5,
      h: 0.6,
      fontSize: 32,
      bold: true,
      color: 'E61E6E',
      fontFace: 'Playfair Display'
    })

    const infoData = [
      { label: 'Cliente', value: reportData.clientName },
      { label: 'Empresa', value: reportData.company },
      { label: 'Plataformas', value: reportData.platforms?.join(', ') || 'Não especificado' },
      { label: 'Objetivo', value: reportData.objective || 'Não informado' },
      { label: 'Data de Geração', value: new Date().toLocaleDateString('pt-BR') }
    ]

    yPos = 1.5
    infoData.forEach(info => {
      slide.addText(`${info.label}:`, {
        x: 1,
        y: yPos,
        w: 3,
        h: 0.4,
        fontSize: 12,
        bold: true,
        color: '111827'
      })

      slide.addText(info.value, {
        x: 4,
        y: yPos,
        w: 4.5,
        h: 0.4,
        fontSize: 12,
        color: '6B7280'
      })

      yPos += 0.7
    })

    // Salvar
    pres.save({
      filename: `relatorio-${reportData.clientName}-${reportData.month}-${reportData.year}.pptx`
    })
    return true
  } catch (error) {
    console.error('Erro ao exportar PowerPoint:', error)
    throw error
  }
}

/**
 * Exporta relatório como Excel
 */
export async function exportExcel(reportData, dashboardData) {
  try {
    const workbook = XLSX.utils.book_new()

    // Aba 1: Resumo
    const summaryData = [
      ['RELATÓRIO DE DESEMPENHO'],
      [''],
      ['Cliente', reportData.clientName],
      ['Empresa', reportData.company],
      ['Período', `${reportData.month}/${reportData.year}`],
      ['Plataformas', reportData.platforms?.join(', ') || 'Não especificado'],
      ['Objetivo', reportData.objective || 'Não informado'],
      ['Data de Geração', new Date().toLocaleDateString('pt-BR')],
      [''],
      ['PRINCIPAIS MÉTRICAS'],
      ['Métrica', 'Valor', 'Variação'],
    ]

    const metrics = dashboardData.metrics
    Object.entries(metrics).forEach(([key, metric]) => {
      if (metric.value !== undefined) {
        summaryData.push([
          key.charAt(0).toUpperCase() + key.slice(1),
          metric.value,
          metric.variation || ''
        ])
      }
    })

    const summarySheet = XLSX.utils.aoa_to_sheet(summaryData)
    XLSX.utils.book_append_sheet(workbook, summarySheet, 'Resumo')

    // Aba 2: Dados Estruturados
    const dataSheet = XLSX.utils.aoa_to_sheet([
      ['Métrica', 'Valor', 'Variação', 'Ícone', 'Unidade'],
      ...Object.entries(metrics).map(([key, metric]) => [
        key,
        metric.value,
        metric.variation,
        metric.icon,
        metric.unit || ''
      ])
    ])
    XLSX.utils.book_append_sheet(workbook, dataSheet, 'Dados')

    // Aba 3: Gráficos (dados para visualização)
    const chartData = dashboardData.charts.line
    const chartSheet = XLSX.utils.aoa_to_sheet([
      ['Período', 'Alcance', 'Impressões', 'Engajamento'],
      ...chartData.map(row => [row.name, row.alcance, row.impressoes, row.engajamento])
    ])
    XLSX.utils.book_append_sheet(workbook, chartSheet, 'Evolução')

    // Salvar
    XLSX.writeFile(workbook, `relatorio-${reportData.clientName}-${reportData.month}-${reportData.year}.xlsx`)
    return true
  } catch (error) {
    console.error('Erro ao exportar Excel:', error)
    throw error
  }
}

/**
 * Gera link compartilhável (codifica dados na URL)
 */
export function generateShareLink(reportData, dashboardData) {
  try {
    const data = {
      report: reportData,
      dashboard: dashboardData,
      timestamp: new Date().toISOString()
    }

    const encoded = btoa(JSON.stringify(data))
    const baseUrl = window.location.origin
    const shareUrl = `${baseUrl}?shared=${encoded}`

    return shareUrl
  } catch (error) {
    console.error('Erro ao gerar link compartilhável:', error)
    throw error
  }
}

/**
 * Copia link para clipboard
 */
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (error) {
    console.error('Erro ao copiar para clipboard:', error)
    throw error
  }
}
