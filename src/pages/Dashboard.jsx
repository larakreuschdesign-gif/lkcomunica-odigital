import { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useReport } from '../contexts/ReportContext'
import { useAI } from '../hooks/useAI'
import { buildDashboardData, generateBasicAnalysis } from '../services/dataProcessing'
import { Header, Button, Card, KPICard, Chart, Badge, Container, Spinner } from '../components'

export default function Dashboard() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getReport } = useReport()
  const { generateAnalysis, loading: aiLoading } = useAI()
  const [analysis, setAnalysis] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')

  const report = getReport(id)

  const loadAnalysis = async () => {
    if (!analysis) {
      const summary = await generateAnalysis(report, 'summary')
      setAnalysis(summary)
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
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  📥 Exportar
                </Button>
                <Button variant="outline" size="sm">
                  🔗 Compartilhar
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
                    value={mockMetrics.alcance}
                    icon="📊"
                    variation={mockMetrics.alcanceVar}
                    trend="up"
                    comparison="vs. mês anterior"
                  />
                  <KPICard
                    label="Impressões"
                    value={mockMetrics.impressoes}
                    icon="👀"
                    variation={mockMetrics.impressoesVar}
                    trend="up"
                    comparison="vs. mês anterior"
                  />
                  <KPICard
                    label="Taxa de Engajamento"
                    value={mockMetrics.engajamento}
                    icon="💬"
                    variation={mockMetrics.engajamentoVar}
                    trend="up"
                    unit="%"
                    comparison="vs. mês anterior"
                  />
                  <KPICard
                    label="Novos Seguidores"
                    value={mockMetrics.seguidores}
                    icon="👥"
                    variation={mockMetrics.seguidoresVar}
                    trend="up"
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
                      <span className="font-semibold">{mockMetrics.curtidas.toLocaleString('pt-BR')}</span>
                    </div>
                    <div className="border-t" />
                    <div className="flex justify-between">
                      <span className="text-gray-600">Comentários</span>
                      <span className="font-semibold">{mockMetrics.comentarios}</span>
                    </div>
                    <div className="border-t" />
                    <div className="flex justify-between">
                      <span className="text-gray-600">Compartilhamentos</span>
                      <span className="font-semibold">{mockMetrics.compartilhamentos}</span>
                    </div>
                    <div className="border-t" />
                    <div className="flex justify-between">
                      <span className="text-gray-600">Salvamentos</span>
                      <span className="font-semibold">{mockMetrics.salvamentos}</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* Tab: Analytics */}
          {activeTab === 'analytics' && (
            <Card padding="lg" className="text-center py-12">
              <p className="text-gray-600 text-lg">
                Análises detalhadas com IA serão exibidas aqui na Fase 7
              </p>
            </Card>
          )}

          {/* Tab: Insights */}
          {activeTab === 'insights' && (
            <Card padding="lg" className="text-center py-12">
              <p className="text-gray-600 text-lg">
                Insights automáticos aparecerão aqui na Fase 7
              </p>
            </Card>
          )}

          {/* Tab: Actions */}
          {activeTab === 'actions' && (
            <Card padding="lg" className="text-center py-12">
              <p className="text-gray-600 text-lg">
                Plano de ação será gerado automaticamente na Fase 7
              </p>
            </Card>
          )}
        </Container>
      </div>
    </>
  )
}
