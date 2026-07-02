import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useReport } from '../contexts/ReportContext'
import { Header, Button, Card, Badge, Container } from '../components'

export default function Home() {
  const navigate = useNavigate()
  const { reports } = useReport()
  const [filters, setFilters] = useState({
    month: '',
    platform: '',
    search: '',
  })

  const filteredReports = reports.filter(report => {
    const matchSearch = report.clientName.toLowerCase().includes(filters.search.toLowerCase()) ||
      report.company.toLowerCase().includes(filters.search.toLowerCase())
    const matchMonth = !filters.month || report.month === parseInt(filters.month)
    const matchPlatform = !filters.platform || report.platforms?.includes(filters.platform)
    return matchSearch && matchMonth && matchPlatform
  })

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-cream-100 to-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-pink-500 to-pink-700 text-white py-20">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <Badge status="pink" className="mb-4 bg-white bg-opacity-20 text-white justify-center">
                ✨ Transforme dados em estratégia
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold mb-4 font-display">
                LK Analytics AI
              </h1>
              <p className="text-xl mb-8 text-pink-100">
                Transforme prints de métricas em relatórios executivos completos com inteligência artificial
              </p>
              <Button
                variant="ghost"
                size="lg"
                onClick={() => navigate('/create')}
                className="bg-white text-pink-600 hover:bg-pink-50"
              >
                ➜ Criar Novo Relatório
              </Button>
            </div>
          </Container>
        </div>

        {/* Main Content */}
        <Container className="py-16">
          <div className="max-w-6xl mx-auto">
            {/* Filters */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Meus Relatórios</h2>
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <input
                  type="text"
                  placeholder="Buscar cliente ou empresa..."
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-pink-500"
                />
                <select
                  value={filters.month}
                  onChange={(e) => setFilters({ ...filters, month: e.target.value })}
                  className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-pink-500"
                >
                  <option value="">Todos os meses</option>
                  {[...Array(12)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {new Date(0, i).toLocaleDateString('pt-BR', { month: 'long' })}
                    </option>
                  ))}
                </select>
                <select
                  value={filters.platform}
                  onChange={(e) => setFilters({ ...filters, platform: e.target.value })}
                  className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-pink-500"
                >
                  <option value="">Todas as plataformas</option>
                  <option value="Instagram">Instagram</option>
                  <option value="Facebook">Facebook</option>
                  <option value="LinkedIn">LinkedIn</option>
                </select>
              </div>
            </div>

            {/* Reports Grid */}
            {filteredReports.length === 0 ? (
              <Card padding="lg" className="text-center py-16">
                {reports.length === 0 ? (
                  <div>
                    <p className="text-2xl font-semibold text-gray-900 mb-2">
                      Comece criando seu primeiro relatório
                    </p>
                    <p className="text-gray-600 mb-6">
                      Upload de prints, OCR automático e análises com IA
                    </p>
                    <Button
                      variant="primary"
                      onClick={() => navigate('/create')}
                    >
                      Criar Relatório Agora
                    </Button>
                  </div>
                ) : (
                  <p className="text-gray-600">
                    Nenhum relatório encontrado com os filtros selecionados
                  </p>
                )}
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredReports.map(report => (
                  <Card
                    key={report.id}
                    padding="lg"
                    onClick={() => navigate(`/report/${report.id}`)}
                    className="hover:shadow-lg"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-900 mb-1">
                          {report.clientName}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {report.company}
                        </p>
                      </div>
                      <div className="text-2xl">📊</div>
                    </div>

                    <div className="mb-4 flex flex-wrap gap-2">
                      {report.platforms?.map(platform => (
                        <Badge
                          key={platform}
                          status="pink"
                          size="sm"
                        >
                          {platform}
                        </Badge>
                      ))}
                    </div>

                    <div className="border-t pt-4 flex items-center justify-between">
                      <div>
                        <p className="text-gray-500 text-xs">
                          {new Date(report.createdAt).toLocaleDateString('pt-BR')}
                        </p>
                        <p className="text-gray-600 text-sm font-semibold">
                          {report.month ? new Date(0, report.month - 1).toLocaleDateString('pt-BR', { month: 'long' }) : ''} {report.year}
                        </p>
                      </div>
                      <div className="text-pink-500 text-lg">→</div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </Container>
      </div>
    </>
  )
}
