import { useState } from 'react'
import { ChevronDown, Loader } from 'lucide-react'
import { useScriptStore, Script, Scene } from '../store/useScriptStore'

interface ScriptBuilderProps {
  onGenerated: () => void
}

export function ScriptBuilder({ onGenerated }: ScriptBuilderProps) {
  const { setCurrentScript, setIsGenerating, isGenerating, setError } = useScriptStore()
  const [hook, setHook] = useState('')
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    brand: '',
    niche: '',
    product: '',
    audience: '',
    platform: 'Instagram Reels',
    objective: 'Engajamento',
    duration: '60 segundos',
    tone: 'Conversacional',
    format: 'Talking Head',
    scenes: 'Automática',
    cta: 'Automático',
    requiredInfo: '',
    restrictions: '',
  })

  const handleGenerateScript = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!hook.trim()) {
      setError('Por favor, insira um gancho principal.')
      return
    }

    setIsGenerating(true)
    try {
      const response = await fetch('/api/scripts/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hook,
          ...formData,
        }),
      })

      if (!response.ok) throw new Error('Erro ao gerar roteiro')

      const scriptData = await response.json()

      // Create script object
      const scenes: Scene[] = scriptData.scenes.map((scene: any, index: number) => ({
        id: `scene-${index}`,
        ...scene,
      }))

      const script: Script = {
        id: scriptData.id,
        title: scriptData.title,
        hook: scriptData.hook,
        hookedOptimized: scriptData.hookedOptimized,
        objective: scriptData.objective,
        summary: scriptData.summary,
        generalDescription: scriptData.generalDescription,
        scenes,
        ctaFinal: scriptData.ctaFinal,
        creativDirection: scriptData.creativDirection,
        musicSuggestion: scriptData.musicSuggestion,
        observations: scriptData.observations,
        metadata: {
          brand: formData.brand || undefined,
          niche: formData.niche || undefined,
          platform: formData.platform,
          objective: formData.objective,
          tone: formData.tone,
          format: formData.format,
          duration: formData.duration,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      }

      setCurrentScript(script)
      setIsGenerating(false)
      onGenerated()
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro ao gerar roteiro')
      setIsGenerating(false)
    }
  }

  return (
    <div className="script-builder">
      <div className="container" style={{ padding: '3rem 1.5rem', maxWidth: '900px' }}>
        <form onSubmit={handleGenerateScript}>
          {/* Main Hook Section */}
          <section style={{ marginBottom: '3rem' }}>
            <div className="form-group">
              <label className="form-group__label">Gancho Principal do Vídeo *</label>
              <textarea
                className="textarea"
                placeholder="Ex: Você pode estar perdendo dinheiro todos os meses sem perceber..."
                value={hook}
                onChange={(e) => setHook(e.target.value)}
                style={{ fontSize: '1.125rem', minHeight: '120px' }}
                disabled={isGenerating}
              />
              <div className="form-group__hint">
                Insira uma frase, ideia, pergunta, afirmação, dado, opinião ou conceito que será o coração do seu vídeo.
              </div>
            </div>
          </section>

          {/* Optional Fields - Collapsible Sections */}
          <section style={{ marginBottom: '2rem' }}>
            {[
              {
                id: 'brand-section',
                title: 'Informações da Marca',
                fields: [
                  { key: 'brand', label: 'Nome da marca' },
                  { key: 'niche', label: 'Nicho' },
                  { key: 'product', label: 'Produto ou serviço' },
                  { key: 'audience', label: 'Público-alvo' },
                ],
              },
              {
                id: 'platform-section',
                title: 'Plataforma e Tipo de Conteúdo',
                fields: [
                  {
                    key: 'platform',
                    label: 'Plataforma',
                    type: 'select',
                    options: ['Instagram Reels', 'TikTok', 'YouTube Shorts', 'LinkedIn', 'Anúncio'],
                  },
                  {
                    key: 'objective',
                    label: 'Objetivo',
                    type: 'select',
                    options: ['Alcance', 'Engajamento', 'Autoridade', 'Educação', 'Conversão', 'Venda', 'Geração de leads', 'Posicionamento'],
                  },
                  {
                    key: 'tone',
                    label: 'Tom de voz',
                    type: 'select',
                    options: ['Profissional', 'Conversacional', 'Provocativo', 'Sofisticado', 'Educativo', 'Emocional', 'Inspirador', 'Direto', 'Premium', 'Humor inteligente'],
                  },
                  {
                    key: 'format',
                    label: 'Formato',
                    type: 'select',
                    options: ['Talking Head', 'Storytelling', 'POV', 'Entrevista', 'Vlog', 'Cinematográfico', 'UGC', 'Tutorial', 'Bastidores', 'Institucional', 'Lista', 'Comparativo', 'Quebra de objeção'],
                  },
                  {
                    key: 'duration',
                    label: 'Duração',
                    type: 'select',
                    options: ['15 segundos', '30 segundos', '45 segundos', '60 segundos', '90 segundos'],
                  },
                  {
                    key: 'scenes',
                    label: 'Número de cenas',
                    type: 'select',
                    options: ['Automática', '3 cenas', '5 cenas', '7 cenas'],
                  },
                  {
                    key: 'cta',
                    label: 'CTA desejado',
                    type: 'select',
                    options: ['Automático', 'Comentar', 'Compartilhar', 'Salvar', 'Seguir', 'Clicar no link', 'Enviar mensagem', 'Comprar'],
                  },
                ],
              },
              {
                id: 'special-section',
                title: 'Informações Especiais',
                fields: [
                  { key: 'requiredInfo', label: 'Informações obrigatórias', type: 'textarea', placeholder: 'Dados, números, nomes ou argumentos que devem aparecer no roteiro' },
                  { key: 'restrictions', label: 'Restrições', type: 'textarea', placeholder: 'Palavras proibidas, promessas que não podem ser feitas, informações a evitar' },
                ],
              },
            ].map((section) => (
              <div key={section.id} style={{ marginBottom: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                  className="card card--flat"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 'var(--spacing-lg)',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span style={{ fontSize: '1rem', fontWeight: 500 }}>{section.title}</span>
                  <ChevronDown
                    size={20}
                    style={{
                      transform: expandedSection === section.id ? 'rotate(180deg)' : 'rotate(0)',
                      transition: 'transform 200ms',
                    }}
                  />
                </button>

                {expandedSection === section.id && (
                  <div style={{ padding: '0 1rem 1rem 1rem', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                    {section.fields.map((field: any) => (
                      <div key={field.key} style={{ gridColumn: field.type === 'textarea' ? 'span 2' : 'auto' }}>
                        <label className="form-group__label">{field.label}</label>
                        {field.type === 'select' ? (
                          <select
                            className="select"
                            value={formData[field.key as keyof typeof formData]}
                            onChange={(e) =>
                              setFormData({ ...formData, [field.key]: e.target.value })
                            }
                            disabled={isGenerating}
                          >
                            <option value="">{field.label}</option>
                            {field.options?.map((opt: string) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        ) : field.type === 'textarea' ? (
                          <textarea
                            className="textarea"
                            placeholder={field.placeholder}
                            value={formData[field.key as keyof typeof formData]}
                            onChange={(e) =>
                              setFormData({ ...formData, [field.key]: e.target.value })
                            }
                            disabled={isGenerating}
                            style={{ minHeight: '80px' }}
                          />
                        ) : (
                          <input
                            type="text"
                            className="input"
                            placeholder={field.label}
                            value={formData[field.key as keyof typeof formData]}
                            onChange={(e) =>
                              setFormData({ ...formData, [field.key]: e.target.value })
                            }
                            disabled={isGenerating}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </section>

          {/* Submit Button */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', justifyContent: 'center' }}>
            <button
              type="submit"
              className="btn btn--primary btn--lg"
              disabled={isGenerating || !hook.trim()}
              style={{
                opacity: isGenerating || !hook.trim() ? 0.6 : 1,
                cursor: isGenerating || !hook.trim() ? 'not-allowed' : 'pointer',
                display: 'flex',
                gap: '0.5rem',
                fontSize: '1.125rem',
                padding: '0.875rem 2rem',
              }}
            >
              {isGenerating ? (
                <>
                  <Loader size={20} style={{ animation: 'spin 1s linear infinite' }} />
                  Gerando roteiro...
                </>
              ) : (
                'Gerar Roteiro Completo'
              )}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
