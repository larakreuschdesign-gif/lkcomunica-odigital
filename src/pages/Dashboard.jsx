import { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useReport } from '../contexts/ReportContext'
import { useAI } from '../hooks/useAI'
import { buildDashboardData, generateBasicAnalysis } from '../services/dataProcessing'
import { exportPDF, exportPowerPoint, exportExcel, generateShareLink, copyToClipboard } from '../services/export'
import { Header, Button, Card, KPICard, Chart, Badge, Container, Spinner, Table, AIChat } from '../components'

export default function Dashboard() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getReport } = useReport()
  const { generateAnalysis, loading: aiLoading, askQuestion } = useAI()
  const [analysis, setAnalysis] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [showAIChat, setShowAIChat] = useState(false)
  const [allAnalyses, setAllAnalyses] = useState(null)
  const [insights, setInsights] = useState(null)
  const [actionPlan, setActionPlan] = useState(null)
  const [exportLoading, setExportLoading] = useState(null)
  const [shareLink, setShareLink] = useState(null)

  const report = getReport(id)

  const loadAnalysis = async () => {
    if (!analysis) {
      const summary = await generateAnalysis(report, 'summary')
      setAnalysis(summary)
    }
  }

  const loadAllAnalyses = async () => {
    if (!allAnalyses) {
      const analyses = await generateAnalysis(report, 'analysis')
      setAllAnalyses(analyses)
    }
  }

  const loadInsights = async () => {
    if (!insights) {
      const data = await generateAnalysis(report, 'insights')
      setInsights(data)
    }
  }

  const loadActionPlan = async () => {
    if (!actionPlan) {
      const plan = await generateAnalysis(report, 'actionPlan')
      setActionPlan(plan)
    }
  }

  const handleExport = async (format) => {
    try {
      setExportLoading(format)
      const exportData = {
        clientName: report.clientName,
        company: report.company,
        month: report.month,
        year: report.year,
        objective: report.objective,
        platforms: report.platforms
      }

      const dashboardData = buildDashboardData(report?.ocrResults, report)

      if (format === 'pdf') {
        await exportPDF(exportData, dashboardData)
      } else if (format === 'ppt') {
        await exportPowerPoint(exportData, dashboardData)
      } else if (format === 'excel') {
        await exportExcel(exportData, dashboardData)
      }
    } catch (error) {
      console.error(`Erro ao exportar ${format}:`, error)
      alert(`Erro ao exportar relatório: ${error.message}`)
    } finally {
      setExportLoading(null)
    }
  }

  const handleShare = async () => {
    try {
      if (!shareLink) {
        const link = generateShareLink(report, buildDashboardData(report?.ocrResults, report))
        setShareLink(link)
        await copyToClipboard(link)
        alert('Link copiado para a área de transferência!')
      } else {
        await copyToClipboard(shareLink)
        alert('Link copiado novamente!')
      }
    } catch (error) {
      console.error('Erro ao compartilhar:', error)
      alert('Erro ao gerar link compartilhável')
    }
  }

  if (!report) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-cream-100 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Relatório não encontrado</h1>
            <Button onClick={() => navigate('/')}>
              Voltar à Página Inicial
            </Button>
          </div>
        </div>
      </>
    )
  }

  // Processar dados do OCR ou usar mock
  const dashboardData = useMemo(() => {
    return buildDashboardData(report?.ocrResults, report)
  }, [report])

  const mockMetrics = dashboardData.metrics
  const lineChartData = dashboardData.charts.line
  const barChartData = dashboardData.charts.bar
  const pieChartData = dashboardData.charts.pie

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-cream-100 to-white pb-20">
        {/* Header Section */}
        <div className="bg-white border-b border-gray-200 sticky top-16 z-30">
          <Container className="py-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-sm text-gray-600 mb-2">
                  {report.month ? new Date(0, report.month - 1).toLocaleDateString('pt-BR', { month: 'long' }) : ''} {report.year}
                </p>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  {report.clientName}
                </h1>
                <p className="text-gray-600">{report.company}</p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <div className="relative group">
                  <Button variant="outline" size="sm">
                    📥 Exportar
                  </Button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-40">
                    <button
                      onClick={() => handleExport('pdf')}
                      disabled={exportLoading === 'pdf'}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 border-b"
                    >
                      {exportLoading === 'pdf' ? '⌛' : '📄'} PDF
                    </button>
                    <button
                      onClick={() => handleExport('ppt')}
                      disabled={exportLoading === 'ppt'}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 border-b"
                    >
                      {exportLoading === 'ppt' ? '⌛' : '📊'} PowerPoint
                    </button>
                    <button
                      onClick={() => handleExport('excel')}
                      disabled={exportLoading === 'excel'}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
                    >
                      {exportLoading === 'excel' ? '⌛' : '📋'} Excel
                    </button>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                >
                  🔗 Compartilhar
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setShowAIChat(true)}
                >
                  ✨ Perguntar IA
                </Button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 border-t pt-4">
              {['overview', 'analytics', 'insights', 'actions'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 font-semibold transition-colors ${
                    activeTab === tab
                      ? 'text-pink-600 border-b-2 border-pink-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab === 'overview' && '📊 Visão Geral'}
                  {tab === 'analytics' && '📈 Análises'}
                  {tab === 'insights' && '✨ Insights'}
                  {tab === 'actions' && '🎯 Plano de Ação'}
                </button>
              ))}
            </div>
          </Container>
        </div>

        <Container className="py-12">
          {/* Tab: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-12">
              {/* Executive Summary */}
              <Card padding="lg">
                <h2 className="text-2xl font-bold mb-4">Resumo Executivo</h2>
                <div className="flex items-start gap-4 mb-4">
                  {aiLoading && !analysis && (
                    <Spinner size="sm" />
                  )}
                </div>
                {analysis ? (
                  <p className="text-gray-700 leading-relaxed">
                    {analysis}
                  </p>
                ) : (
                  <div className="text-center py-8">
                    <Button
                      variant="primary"
                      onClick={loadAnalysis}
                      disabled={aiLoading}
                    >
                      {aiLoading ? 'Gerando...' : '✨ Gerar Análise com IA'}
                    </Button>
                  </div>
                )}
              </Card>

              {/* KPI Cards */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Principais Métricas</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <KPICard
                    label="Alcance"
                    value={mockMetrics.alcance.value}
                    icon={mockMetrics.alcance.icon}
                    variation={mockMetrics.alcance.variation}
                    trend={mockMetrics.alcance.variation?.includes('+') ? 'up' : 'down'}
                    comparison="vs. mês anterior"
                  />
                  <KPICard
                    label="Impressões"
                    value={mockMetrics.impressoes.value}
                    icon={mockMetrics.impressoes.icon}
                    variation={mockMetrics.impressoes.variation}
                    trend={mockMetrics.impressoes.variation?.includes('+') ? 'up' : 'down'}
                    comparison="vs. mês anterior"
                  />
                  <KPICard
                    label="Taxa de Engajamento"
                    value={mockMetrics.engajamento.value}
                    icon={mockMetrics.engajamento.icon}
                    variation={mockMetrics.engajamento.variation}
                    trend={mockMetrics.engajamento.variation?.includes('+') ? 'up' : 'down'}
                    unit="%"
                    comparison="vs. mês anterior"
                  />
                  <KPICard
                    label="Novos Seguidores"
                    value={mockMetrics.seguidores.value}
                    icon={mockMetrics.seguidores.icon}
                    variation={mockMetrics.seguidores.variation}
                    trend={mockMetrics.seguidores.variation?.includes('+') ? 'up' : 'down'}
                    comparison="vs. mês anterior"
                  />
                </div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card padding="lg">
                  <Chart
                    type="line"
                    data={lineChartData}
                    dataKey="alcance"
                    nameKey="name"
                    title="Evolução de Alcance"
                    height={300}
                  />
                </Card>
                <Card padding="lg">
                  <Chart
                    type="bar"
                    data={barChartData}
                    dataKey="value"
                    nameKey="name"
                    title="Desempenho por Plataforma"
                    height={300}
                  />
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card padding="lg">
                  <Chart
                    type="pie"
                    data={pieChartData}
                    dataKey="value"
                    nameKey="name"
                    title="Distribuição por Formato"
                    height={300}
                  />
                </Card>
                <Card padding="lg">
                  <h3 className="text-lg font-bold mb-6">Outras Métricas</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Curtidas</span>
                      <span className="font-semibold">{mockMetrics.curtidas.value.toLocaleString('pt-BR')}</span>
                    </div>
                    <div className="border-t" />
                    <div className="flex justify-between">
                      <span className="text-gray-600">Comentários</span>
                      <span className="font-semibold">{mockMetrics.comentarios.value}</span>
                    </div>
                    <div className="border-t" />
                    <div className="flex justify-between">
                      <span className="text-gray-600">Compartilhamentos</span>
                      <span className="font-semibold">{mockMetrics.compartilhamentos.value}</span>
                    </div>
                    <div className="border-t" />
                    <div className="flex justify-between">
                      <span className="text-gray-600">Salvamentos</span>
                      <span className="font-semibold">{mockMetrics.salvamentos.value}</span>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Ranking de Conteúdos */}
              <Card padding="lg">
                <h2 className="text-2xl font-bold mb-6">🏆 Ranking de Conteúdos</h2>
                <Table
                  headers={['Post/Conteúdo', 'Formato', 'Alcance', 'Engajamento', 'Salvamentos']}
                  rows={[
                    ['Reel: Tutorial Inovador', 'Reel', '18.5K', '8.2%', '1.2K'],
                    ['Carrossel: Dicas de Design', 'Carrossel', '12.3K', '6.5%', '890'],
                    ['Post: Promoção Flash', 'Post', '8.7K', '4.1%', '320'],
                    ['Story: Behind the Scenes', 'Story', '5.2K', '3.8%', '120'],
                    ['Reel: Tendência do Momento', 'Reel', '4.8K', '2.5%', '95'],
                  ]}
                  medals={true}
                />
              </Card>
            </div>
          )}

          {/* Tab: Analytics */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              {!allAnalyses ? (
                <Card padding="lg" className="text-center py-12">
                  <Button
                    variant="primary"
                    onClick={loadAllAnalyses}
                    disabled={aiLoading}
                  >
                    {aiLoading ? 'Gerando análises...' : '✨ Gerar Análises Estratégicas'}
                  </Button>
                </Card>
              ) : (
                <>
                  {Array.isArray(allAnalyses) ? (
                    <div className="space-y-4">
                      {allAnalyses.map((analysis, idx) => (
                        <Card key={idx} padding="md" className="border-l-4 border-pink-600">
                          <p className="text-gray-700 leading-relaxed">{analysis}</p>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Card padding="lg">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{allAnalyses}</p>
                    </Card>
                  )}
                </>
              )}
            </div>
          )}

          {/* Tab: Insights */}
          {activeTab === 'insights' && (
            <div className="space-y-6">
              {!insights ? (
                <Card padding="lg" className="text-center py-12">
                  <Button
                    variant="primary"
                    onClick={loadInsights}
                    disabled={aiLoading}
                  >
                    {aiLoading ? 'Gerando insights...' : '💡 Gerar Insights'}
                  </Button>
                </Card>
              ) : (
                <>
                  {Array.isArray(insights) ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {insights.map((insight, idx) => (
                        <Card key={idx} padding="md" className="bg-gradient-to-br from-pink-50 to-white border-l-4 border-pink-600">
                          <p className="text-gray-700 leading-relaxed text-sm">{insight}</p>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Card padding="lg">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{insights}</p>
                    </Card>
                  )}
                </>
              )}
            </div>
          )}

          {/* Tab: Actions */}
          {activeTab === 'actions' && (
            <div className="space-y-6">
              {!actionPlan ? (
                <Card padding="lg" className="text-center py-12">
                  <Button
                    variant="primary"
                    onClick={loadActionPlan}
                    disabled={aiLoading}
                  >
                    {aiLoading ? 'Gerando plano...' : '🎯 Gerar Plano de Ação'}
                  </Button>
                </Card>
              ) : (
                <>
                  {Array.isArray(actionPlan) ? (
                    <div className="space-y-3">
                      {actionPlan.map((action, idx) => (
                        <Card key={idx} padding="md" className="border-l-4 border-green-600">
                          <p className="text-gray-700 leading-relaxed text-sm">{action}</p>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Card padding="lg">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{actionPlan}</p>
                    </Card>
                  )}
                </>
              )}
            </div>
          )}
        </Container>

        {/* AIChat Modal */}
        <AIChat
          reportData={report}
          dashboardData={buildDashboardData(report?.ocrResults, report)}
          isOpen={showAIChat}
          onClose={() => setShowAIChat(false)}
        />
      </div>
    </>
  )
}
