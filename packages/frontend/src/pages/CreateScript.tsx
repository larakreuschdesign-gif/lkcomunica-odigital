import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { scriptService } from '@/services/script.service'
import toast from 'react-hot-toast'

type Platform = 'TIKTOK' | 'INSTAGRAM' | 'YOUTUBE' | 'LINKEDIN' | 'OTHER'

export default function CreateScriptPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)

  const [formData, setFormData] = useState({
    clientName: '',
    objective: '',
    platform: 'TIKTOK' as Platform,
    contentType: '',
    duration: 30,
    voiceTone: '',
    targetAudience: '',
    structure: '',
    cta: '',
    references: [] as string[],
    ideas: '',
  })

  const [referenceInput, setReferenceInput] = useState('')

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'duration' ? parseInt(value) : value,
    }))
  }

  const addReference = () => {
    if (referenceInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        references: [...prev.references, referenceInput],
      }))
      setReferenceInput('')
    }
  }

  const removeReference = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      references: prev.references.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.clientName || !formData.objective) {
      toast.error('Preencha os campos obrigatórios')
      return
    }

    setLoading(true)

    try {
      const script = await scriptService.create(formData)
      toast.success('Roteiro criado com sucesso!')
      navigate(`/scripts/${script.id}`)
    } catch (error: any) {
      const message =
        error.response?.data?.error || 'Erro ao criar roteiro'
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--off-white)', padding: '2rem' }}>
      <div className="container" style={{ maxWidth: '700px' }}>
        <button
          onClick={() => navigate('/dashboard')}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--pink)',
            cursor: 'pointer',
            fontSize: '1rem',
            marginBottom: '2rem',
            fontWeight: '600',
          }}
        >
          ← Voltar
        </button>

        <div
          style={{
            background: 'var(--white)',
            padding: '3rem',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <h1 style={{ marginBottom: '0.5rem' }}>Criar Novo Roteiro</h1>
          <p style={{ color: 'var(--text-mid)', marginBottom: '2rem' }}>
            Preencha as informações para gerar um roteiro profissional
          </p>

          {/* Stepper */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '2rem',
            }}
          >
            {[1, 2, 3].map((s) => (
              <div key={s} style={{ flex: 1, position: 'relative' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    background: step >= s ? 'var(--grad)' : 'var(--gray-200)',
                    color: step >= s ? 'white' : 'var(--text-mid)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '600',
                    margin: '0 auto',
                  }}
                >
                  {s}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Basics */}
            {step === 1 && (
              <div>
                <h3 style={{ marginBottom: '1.5rem' }}>Dados Básicos</h3>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                    Nome do Cliente *
                  </label>
                  <input
                    type="text"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleInputChange}
                    placeholder="Ex: Nike, Coca-Cola, Startup XYZ"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid var(--gray-200)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '1rem',
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                    Objetivo do Vídeo *
                  </label>
                  <textarea
                    name="objective"
                    value={formData.objective}
                    onChange={handleInputChange}
                    placeholder="Descreva o objetivo principal do vídeo..."
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid var(--gray-200)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '1rem',
                      minHeight: '100px',
                      fontFamily: 'var(--font-body)',
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                    Plataforma de Destino
                  </label>
                  <select
                    name="platform"
                    value={formData.platform}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid var(--gray-200)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '1rem',
                    }}
                  >
                    <option value="TIKTOK">TikTok</option>
                    <option value="INSTAGRAM">Instagram Reels</option>
                    <option value="YOUTUBE">YouTube Shorts</option>
                    <option value="LINKEDIN">LinkedIn</option>
                    <option value="OTHER">Outro</option>
                  </select>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                    Tipo de Conteúdo
                  </label>
                  <input
                    type="text"
                    name="contentType"
                    value={formData.contentType}
                    onChange={handleInputChange}
                    placeholder="Ex: Tutorial, Demonstração, Story, Educacional"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid var(--gray-200)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '1rem',
                    }}
                  />
                </div>
              </div>
            )}

            {/* Step 2: Details */}
            {step === 2 && (
              <div>
                <h3 style={{ marginBottom: '1.5rem' }}>Especificações</h3>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                    Duração Estimada (segundos)
                  </label>
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    min="5"
                    max="600"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid var(--gray-200)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '1rem',
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                    Tom de Voz
                  </label>
                  <input
                    type="text"
                    name="voiceTone"
                    value={formData.voiceTone}
                    onChange={handleInputChange}
                    placeholder="Ex: Profissional, Casual, Energético, Técnico"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid var(--gray-200)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '1rem',
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                    Público-Alvo
                  </label>
                  <textarea
                    name="targetAudience"
                    value={formData.targetAudience}
                    onChange={handleInputChange}
                    placeholder="Descreva o público-alvo (idade, interesses, etc)"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid var(--gray-200)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '1rem',
                      minHeight: '100px',
                      fontFamily: 'var(--font-body)',
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                    Call-to-Action (CTA)
                  </label>
                  <input
                    type="text"
                    name="cta"
                    value={formData.cta}
                    onChange={handleInputChange}
                    placeholder="Ex: Clique no link, Siga para mais, Conheça a promoção"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid var(--gray-200)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '1rem',
                    }}
                  />
                </div>
              </div>
            )}

            {/* Step 3: References & Ideas */}
            {step === 3 && (
              <div>
                <h3 style={{ marginBottom: '1.5rem' }}>Referências e Ideias</h3>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                    Referências (URLs)
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <input
                      type="url"
                      value={referenceInput}
                      onChange={(e) => setReferenceInput(e.target.value)}
                      placeholder="https://..."
                      style={{
                        flex: 1,
                        padding: '0.75rem',
                        border: '1px solid var(--gray-200)',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '1rem',
                      }}
                    />
                    <button
                      type="button"
                      onClick={addReference}
                      style={{
                        padding: '0.75rem 1.5rem',
                        background: 'var(--pink)',
                        color: 'white',
                        border: 'none',
                        borderRadius: 'var(--radius-md)',
                        cursor: 'pointer',
                      }}
                    >
                      Adicionar
                    </button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {formData.references.map((ref, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '0.5rem',
                          background: 'var(--cream)',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '0.9rem',
                        }}
                      >
                        <a href={ref} target="_blank" rel="noopener noreferrer"
                          style={{ color: 'var(--pink)', textDecoration: 'underline' }}>
                          {ref.slice(0, 40)}...
                        </a>
                        <button
                          type="button"
                          onClick={() => removeReference(idx)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--pink)',
                            cursor: 'pointer',
                            fontSize: '1.2rem',
                          }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                    Ideias Principais
                  </label>
                  <textarea
                    name="ideas"
                    value={formData.ideas}
                    onChange={handleInputChange}
                    placeholder="Descreva as principais ideias, conceitos, ou estrutura desejada..."
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid var(--gray-200)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '1rem',
                      minHeight: '150px',
                      fontFamily: 'var(--font-body)',
                    }}
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div
              style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'space-between',
                marginTop: '2rem',
              }}
            >
              <button
                type="button"
                onClick={() => setStep(Math.max(1, step - 1))}
                disabled={step === 1}
                style={{
                  padding: '0.75rem 2rem',
                  background: 'var(--gray-200)',
                  color: 'var(--text-dark)',
                  border: 'none',
                  borderRadius: 'var(--radius-full)',
                  cursor: step === 1 ? 'not-allowed' : 'pointer',
                  opacity: step === 1 ? 0.5 : 1,
                }}
              >
                Anterior
              </button>

              {step < 3 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  style={{
                    padding: '0.75rem 2rem',
                    background: 'var(--grad)',
                    color: 'white',
                    border: 'none',
                    borderRadius: 'var(--radius-full)',
                    cursor: 'pointer',
                    fontWeight: '600',
                  }}
                >
                  Próximo
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    padding: '0.75rem 2rem',
                    background: loading ? 'var(--gray-400)' : 'var(--grad)',
                    color: 'white',
                    border: 'none',
                    borderRadius: 'var(--radius-full)',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontWeight: '600',
                    opacity: loading ? 0.6 : 1,
                  }}
                >
                  {loading ? 'Criando...' : 'Criar Roteiro'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
