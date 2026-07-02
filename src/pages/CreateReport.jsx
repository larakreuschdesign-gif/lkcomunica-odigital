import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useReport } from '../contexts/ReportContext'
import { useOCR } from '../hooks/useOCR'
import { Header, Button, Card, Input, Textarea, Dropzone, Spinner, Container, Badge } from '../components'

export default function CreateReport() {
  const navigate = useNavigate()
  const { createReport } = useReport()
  const { extractMetrics, processFiles, loading: ocrLoading, progress: ocrProgress } = useOCR()

  const [step, setStep] = useState(1) // 1: Form, 2: Upload, 3: Processing
  const [formData, setFormData] = useState({
    clientName: '',
    company: '',
    month: '',
    year: new Date().getFullYear(),
    objective: '',
    platforms: [],
  })
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [ocrResults, setOcrResults] = useState(null)
  const [processedFiles, setProcessedFiles] = useState(new Set())

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handlePlatformChange = (platform) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform]
    }))
  }

  const handleFilesAccepted = async (files) => {
    setUploadedFiles(prev => [...prev, ...files])

    // Processar todos os arquivos com OCR
    try {
      const results = await processFiles(files)
      setOcrResults(results)
      setProcessedFiles(new Set(files.map(f => f.name)))
    } catch (err) {
      console.error('Erro ao processar arquivos:', err)
    }
  }

  const handleCreateReport = () => {
    const reportData = {
      ...formData,
      uploadedFiles: uploadedFiles.length,
      ocrResults: ocrResults,
      metrics: ocrResults?.consolidated?.metrics || {},
    }
    const id = createReport(reportData)
    navigate(`/report/${id}`)
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-cream-100 to-white">
        <Container size="sm" className="py-16">
          {/* Progress Indicator */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-8">
              {[1, 2, 3].map(num => (
                <div key={num} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                      num === step
                        ? 'bg-pink-500 text-white ring-4 ring-pink-100'
                        : num < step
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {num < step ? '✓' : num}
                  </div>
                  {num < 3 && (
                    <div
                      className={`flex-1 h-1 mx-4 transition-all ${
                        num < step ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-sm font-semibold text-gray-600">
              <span>Informações</span>
              <span>Upload</span>
              <span>Processamento</span>
            </div>
          </div>

          {/* Step 1: Form */}
          {step === 1 && (
            <Card padding="lg">
              <h2 className="text-3xl font-bold mb-8">Informações do Relatório</h2>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Nome do Cliente"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    label="Empresa"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Mês <span className="text-pink-500">*</span>
                    </label>
                    <select
                      name="month"
                      value={formData.month}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-pink-500"
                      required
                    >
                      <option value="">Selecionar mês</option>
                      {[...Array(12)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {new Date(0, i).toLocaleDateString('pt-BR', { month: 'long' })}
                        </option>
                      ))}
                    </select>
                  </div>
                  <Input
                    label="Ano"
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                  />
                </div>

                <Textarea
                  label="Objetivo do Cliente"
                  name="objective"
                  value={formData.objective}
                  onChange={handleInputChange}
                  placeholder="Descreva o objetivo principal para este período..."
                />

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-4">
                    Plataformas Utilizadas
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {['Instagram', 'Facebook', 'LinkedIn'].map(platform => (
                      <button
                        key={platform}
                        onClick={() => handlePlatformChange(platform)}
                        className={`px-6 py-2 rounded-lg font-medium transition-all ${
                          formData.platforms.includes(platform)
                            ? 'bg-pink-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {platform}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => navigate('/')}
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="primary"
                    disabled={!formData.clientName || !formData.month}
                    onClick={() => setStep(2)}
                    className="flex-1"
                  >
                    Continuar para Upload
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Step 2: Upload */}
          {step === 2 && (
            <Card padding="lg">
              <h2 className="text-3xl font-bold mb-2">Upload de Prints</h2>
              <p className="text-gray-600 mb-8">
                Envie quantos prints forem necessários. Vamos extrair as métricas automaticamente.
              </p>

              <div className="mb-8">
                <Dropzone
                  onFilesAccepted={handleFilesAccepted}
                  acceptedFormats={['image/png', 'image/jpeg', 'application/pdf']}
                />
              </div>

              {uploadedFiles.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-semibold text-lg mb-4">
                    Arquivos Enviados ({uploadedFiles.length})
                  </h3>
                  <div className="space-y-2">
                    {uploadedFiles.map((file, idx) => {
                      const isProcessing = ocrLoading && !processedFiles.has(file.name)
                      const isProcessed = processedFiles.has(file.name)

                      return (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">
                              {isProcessing ? '⏳' : isProcessed ? '✓' : '📄'}
                            </span>
                            <div>
                              <p className="font-medium">{file.name}</p>
                              <p className="text-sm text-gray-500">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          {isProcessing && (
                            <Badge status="attention" size="sm">
                              Processando OCR...
                            </Badge>
                          )}
                          {isProcessed && (
                            <Badge status="excellent" size="sm">
                              Processado
                            </Badge>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                >
                  Voltar
                </Button>
                <Button
                  variant="primary"
                  disabled={uploadedFiles.length === 0}
                  onClick={() => setStep(3)}
                  className="flex-1"
                >
                  Gerar Relatório
                </Button>
              </div>
            </Card>
          )}

          {/* Step 3: Processing */}
          {step === 3 && (
            <Card padding="lg" className="text-center">
              <div className="py-12">
                <Spinner size="lg" label="Processando arquivos e gerando análises..." />
                <p className="text-gray-600 mt-8 max-w-md mx-auto">
                  Estamos extraindo as métricas de seus prints e gerando análises estratégicas com IA. Isso pode levar alguns momentos...
                </p>
              </div>

              <div className="mt-12 flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => setStep(2)}
                  disabled={ocrLoading}
                >
                  Voltar
                </Button>
                <Button
                  variant="primary"
                  onClick={handleCreateReport}
                  disabled={ocrLoading}
                  className="flex-1"
                >
                  {ocrLoading ? 'Processando...' : 'Ver Relatório'}
                </Button>
              </div>
            </Card>
          )}
        </Container>
      </div>
    </>
  )
}
