import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { scriptService } from '@/services/script.service'
import toast from 'react-hot-toast'

export default function EditScriptPage() {
  const { scriptId } = useParams<{ scriptId: string }>()
  const navigate = useNavigate()

  const [script, setScript] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)

  useEffect(() => {
    if (scriptId) {
      loadScript(scriptId)
    }
  }, [scriptId])

  const loadScript = async (id: string) => {
    try {
      setLoading(true)
      const data = await scriptService.getById(id)
      setScript(data)
    } catch (error) {
      toast.error('Erro ao carregar roteiro')
      navigate('/dashboard')
    } finally {
      setLoading(false)
    }
  }

  const handleGenerateWithAI = async () => {
    if (!scriptId) return

    try {
      setGenerating(true)
      const updated = await scriptService.generateWithAI(scriptId)
      setScript(updated)
      toast.success('Roteiro gerado com sucesso!')
    } catch (error: any) {
      const message = error.response?.data?.error || 'Erro ao gerar roteiro'
      toast.error(message)
    } finally {
      setGenerating(false)
    }
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--text-mid)' }}>Carregando roteiro...</p>
      </div>
    )
  }

  if (!script) {
    return null
  }

  const hasScript = script.script && script.script.videoTitle

  return (
    <div style={{ minHeight: '100vh', background: 'var(--off-white)', padding: '2rem' }}>
      <div className="container-lg">
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

        {/* Header */}
        <div
          style={{
            background: 'var(--white)',
            padding: '2rem',
            borderRadius: 'var(--radius-lg)',
            marginBottom: '2rem',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'start',
            }}
          >
            <div>
              <h1 style={{ marginBottom: '0.5rem' }}>{script.title}</h1>
              <p style={{ color: 'var(--text-mid)' }}>Cliente: {script.clientName}</p>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {!hasScript && (
                <button
                  onClick={handleGenerateWithAI}
                  disabled={generating}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: generating ? 'var(--gray-400)' : 'var(--grad)',
                    color: 'white',
                    border: 'none',
                    borderRadius: 'var(--radius-full)',
                    cursor: generating ? 'not-allowed' : 'pointer',
                    fontWeight: '600',
                    opacity: generating ? 0.6 : 1,
                  }}
                >
                  {generating ? '⚡ Gerando...' : '✨ Gerar com IA'}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Script Content */}
        {hasScript ? (
          <div
            style={{
              background: 'var(--white)',
              padding: '2rem',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <h2 style={{ marginBottom: '1rem' }}>{script.script.videoTitle}</h2>

            {/* Hook */}
            <div
              style={{
                padding: '1rem',
                background: 'var(--pink-xlight)',
                borderLeft: '4px solid var(--pink)',
                borderRadius: 'var(--radius-md)',
                marginBottom: '2rem',
              }}
            >
              <h4>🎬 Gancho Inicial</h4>
              <p>{script.script.hook}</p>
            </div>

            {/* Strategic Objective */}
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ marginBottom: '0.5rem' }}>🎯 Objetivo Estratégico</h4>
              <p style={{ color: 'var(--text-mid)' }}>{script.script.strategicObjective}</p>
            </div>

            {/* Scenes */}
            {script.script.scenes && script.script.scenes.length > 0 && (
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ marginBottom: '1rem' }}>🎬 Cenas</h3>
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                  {script.script.scenes.map((scene: any, idx: number) => (
                    <div
                      key={idx}
                      style={{
                        border: '1px solid var(--gray-200)',
                        padding: '1.5rem',
                        borderRadius: 'var(--radius-lg)',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'start',
                          marginBottom: '1rem',
                        }}
                      >
                        <h4>Cena {scene.order}: {scene.title}</h4>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                          {scene.duration}s
                        </span>
                      </div>

                      <p style={{ color: 'var(--text-mid)', marginBottom: '1rem' }}>
                        <strong>Descrição:</strong> {scene.description}
                      </p>

                      {scene.spokenText && (
                        <p style={{ color: 'var(--text-mid)', marginBottom: '0.5rem' }}>
                          <strong>💬 Texto Falado:</strong> {scene.spokenText}
                        </p>
                      )}

                      {scene.screenText && (
                        <p style={{ color: 'var(--text-mid)', marginBottom: '0.5rem' }}>
                          <strong>📝 Texto na Tela:</strong> {scene.screenText}
                        </p>
                      )}

                      {scene.environment && (
                        <p style={{ color: 'var(--text-mid)', marginBottom: '0.5rem' }}>
                          <strong>🏠 Ambiente:</strong> {scene.environment}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Final CTA */}
            {script.script.finalCTA && (
              <div
                style={{
                  padding: '1rem',
                  background: 'var(--cream)',
                  borderLeft: '4px solid var(--pink)',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '2rem',
                }}
              >
                <h4>🚀 Call-to-Action Final</h4>
                <p>{script.script.finalCTA}</p>
              </div>
            )}

            {/* Observations */}
            {script.script.observations && (
              <div>
                <h4 style={{ marginBottom: '0.5rem' }}>📌 Observações</h4>
                <p style={{ color: 'var(--text-mid)' }}>{script.script.observations}</p>
              </div>
            )}

            {/* Stats */}
            <div
              style={{
                marginTop: '2rem',
                padding: '1rem',
                background: 'var(--gray-100)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                gap: '2rem',
              }}
            >
              <div>
                <span style={{ color: 'var(--text-mid)' }}>Palavras:</span>
                <p style={{ fontSize: '1.5rem', fontWeight: '600' }}>
                  {script.script.wordCount}
                </p>
              </div>
              <div>
                <span style={{ color: 'var(--text-mid)' }}>Duração:</span>
                <p style={{ fontSize: '1.5rem', fontWeight: '600' }}>
                  {script.script.estimatedDuration}s
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{
              background: 'var(--white)',
              padding: '4rem 2rem',
              textAlign: 'center',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <h3 style={{ marginBottom: '1rem' }}>Roteiro não gerado ainda</h3>
            <p style={{ color: 'var(--text-mid)', marginBottom: '2rem' }}>
              Clique no botão acima para gerar um roteiro com IA baseado nas informações fornecidas
            </p>
            <button
              onClick={handleGenerateWithAI}
              disabled={generating}
              style={{
                padding: '0.875rem 2rem',
                background: generating ? 'var(--gray-400)' : 'var(--grad)',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--radius-full)',
                cursor: generating ? 'not-allowed' : 'pointer',
                fontWeight: '600',
                fontSize: '1rem',
                boxShadow: 'var(--shadow-md)',
                opacity: generating ? 0.6 : 1,
              }}
            >
              {generating ? '⚡ Gerando...' : '✨ Gerar Roteiro com IA'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
