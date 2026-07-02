'use client'

import { useState } from 'react'
import { Upload, Plus, X } from 'lucide-react'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import { motion } from 'framer-motion'

export default function CreateReport() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    clientName: '',
    company: '',
    month: '',
    year: '',
    objective: '',
    platforms: [] as string[],
  })
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  const platforms = ['Instagram', 'Facebook', 'LinkedIn']

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handlePlatformToggle = (platform: string) => {
    setFormData({
      ...formData,
      platforms: formData.platforms.includes(platform)
        ? formData.platforms.filter((p) => p !== platform)
        : [...formData.platforms, platform],
    })
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles([...uploadedFiles, ...Array.from(e.target.files)])
    }
  }

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))
  }

  return (
    <div className="flex h-screen bg-lk-cream">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <div className="p-8 max-w-4xl mx-auto w-full">
            {/* Progress */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-8"
            >
              <div className="flex items-center justify-between mb-8">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center flex-1">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                        s <= step
                          ? 'bg-lk-pink text-white shadow-soft'
                          : 'bg-lk-gray-rose text-gray-600'
                      }`}
                    >
                      {s}
                    </div>
                    {s < 3 && (
                      <div
                        className={`flex-1 h-1 mx-4 transition-all ${
                          s < step ? 'bg-lk-pink' : 'bg-lk-gray-rose'
                        }`}
                      ></div>
                    )}
                  </div>
                ))}
              </div>

              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {step === 1
                    ? 'Informações do Cliente'
                    : step === 2
                    ? 'Selecione as Plataformas'
                    : 'Upload de Prints'}
                </h2>
                <p className="text-gray-600">
                  {step === 1 && 'Comece com os dados básicos do cliente e da campanha'}
                  {step === 2 && 'Escolha quais plataformas de mídia social você deseja analisar'}
                  {step === 3 && 'Envie os prints das métricas para análise automática com OCR'}
                </p>
              </div>
            </motion.div>

            {/* Step 1: Client Info */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="card-lg space-y-6 mb-8"
              >
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Nome do Cliente *
                    </label>
                    <input
                      type="text"
                      name="clientName"
                      value={formData.clientName}
                      onChange={handleInputChange}
                      placeholder="Ex: João da Silva"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Empresa
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Ex: Tech Startup XYZ"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Mês *
                    </label>
                    <input
                      type="text"
                      name="month"
                      value={formData.month}
                      onChange={handleInputChange}
                      placeholder="Ex: Junho"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Ano *
                    </label>
                    <input
                      type="text"
                      name="year"
                      value={formData.year}
                      onChange={handleInputChange}
                      placeholder="Ex: 2024"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Objetivo do Cliente
                  </label>
                  <textarea
                    name="objective"
                    value={formData.objective}
                    onChange={handleInputChange}
                    placeholder="Descreva o objetivo da campanha..."
                    rows={4}
                  ></textarea>
                </div>
              </motion.div>
            )}

            {/* Step 2: Platforms */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4 mb-8"
              >
                {platforms.map((platform) => (
                  <motion.button
                    key={platform}
                    onClick={() => handlePlatformToggle(platform)}
                    className={`w-full p-6 rounded-2xl border-2 transition-all text-left ${
                      formData.platforms.includes(platform)
                        ? 'border-lk-pink bg-lk-pink/5'
                        : 'border-lk-gray-rose bg-white hover:border-lk-pink-medium'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{platform}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {platform === 'Instagram' && 'Stories, Reels, Carrosséis, Feed'}
                          {platform === 'Facebook' && 'Posts, Vídeos, Engagement'}
                          {platform === 'LinkedIn' && 'Posts, Artigos, Documentos'}
                        </p>
                      </div>
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          formData.platforms.includes(platform)
                            ? 'border-lk-pink bg-lk-pink'
                            : 'border-lk-gray-rose'
                        }`}
                      >
                        {formData.platforms.includes(platform) && (
                          <span className="text-white font-bold">✓</span>
                        )}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            )}

            {/* Step 3: Upload */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6 mb-8"
              >
                {/* Drag & Drop */}
                <div className="card-lg border-2 border-dashed border-lk-pink/30 hover:border-lk-pink transition-colors">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      multiple
                      accept=".png,.jpg,.pdf,.xlsx,.csv"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <div className="flex flex-col items-center justify-center py-16">
                      <Upload size={48} className="text-lk-pink mb-4" />
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Arraste seus prints aqui
                      </h3>
                      <p className="text-gray-600 mb-4">
                        ou clique para selecionar arquivos
                      </p>
                      <p className="text-sm text-gray-500">
                        Aceita PNG, JPG, PDF, Excel e CSV
                      </p>
                    </div>
                  </label>
                </div>

                {/* Uploaded Files */}
                {uploadedFiles.length > 0 && (
                  <div className="card-lg">
                    <h3 className="font-bold text-gray-900 mb-4">
                      Arquivos Carregados ({uploadedFiles.length})
                    </h3>
                    <div className="space-y-2">
                      {uploadedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-lk-cream rounded-lg"
                        >
                          <span className="text-sm font-medium text-gray-900">
                            {file.name}
                          </span>
                          <button
                            onClick={() => removeFile(index)}
                            className="p-1 hover:bg-lk-gray-rose rounded transition-colors"
                          >
                            <X size={18} className="text-gray-600" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={() => setStep(Math.max(1, step - 1))}
                disabled={step === 1}
                className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Voltar
              </button>

              <button
                onClick={() => setStep(Math.min(3, step + 1))}
                className="btn-primary"
              >
                {step === 3 ? 'Gerar Relatório' : 'Próximo'}
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
