import { useState } from 'react'
import { BarChart3, AlertCircle, CheckCircle, Lightbulb } from 'lucide-react'
import { useApi } from '../hooks/useApi'

interface Score {
  [key: string]: number
}

interface Analysis {
  scores: Score
  overallScore: number
  diagnosis: string
  recommendations: string[]
}

interface ScriptAnalysisProps {
  scriptId: string
}

export function ScriptAnalysis({ scriptId }: ScriptAnalysisProps) {
  const { post, loading } = useApi()
  const [analysis, setAnalysis] = useState<Analysis | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const handleAnalyze = async () => {
    try {
      const result = await post(`/scripts/${scriptId}/analyze`, {})
      setAnalysis(result)
      setIsOpen(true)
    } catch (error) {
      console.error('Erro ao analisar:', error)
    }
  }

  const getScoreColor = (score: number): string => {
    if (score >= 85) return 'var(--success)'
    if (score >= 70) return 'var(--warning)'
    return 'var(--error)'
  }

  const getScoreLabel = (score: number): string => {
    if (score >= 85) return 'Excelente'
    if (score >= 70) return 'Bom'
    if (score >= 50) return 'Pode melhorar'
    return 'Necessita revisão'
  }

  return (
    <div style={{ marginTop: '2rem' }}>
      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="btn btn--secondary"
        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: loading ? 0.6 : 1 }}
      >
        <BarChart3 size={18} />
        {loading ? 'Analisando...' : 'Analisar Qualidade'}
      </button>

      {analysis && isOpen && (
        <div className="card" style={{ marginTop: '1.5rem' }}>
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div
                style={{
                  fontSize: '3rem',
                  fontWeight: 700,
                  color: getScoreColor(analysis.overallScore),
                }}
              >
                {analysis.overallScore}
              </div>
              <div>
                <div style={{ fontSize: '1.125rem', fontWeight: 600 }}>
                  {getScoreLabel(analysis.overallScore)}
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                  {analysis.diagnosis}
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Scores */}
          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ fontWeight: 600, marginBottom: '1rem' }}>Análise Detalhada</h4>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {Object.entries(analysis.scores).map(([key, score]) => (
                <div key={key}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <label style={{ fontSize: '0.9375rem', fontWeight: 500 }}>
                      {formatScoreName(key)}
                    </label>
                    <span
                      style={{
                        fontWeight: 600,
                        color: getScoreColor(score),
                      }}
                    >
                      {score}/100
                    </span>
                  </div>
                  <div
                    style={{
                      height: '8px',
                      background: 'var(--surface)',
                      borderRadius: '4px',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: `${score}%`,
                        background: getScoreColor(score),
                        transition: 'width 400ms ease',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          {analysis.recommendations && analysis.recommendations.length > 0 && (
            <div>
              <h4 style={{ fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Lightbulb size={18} />
                Recomendações
              </h4>
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                {analysis.recommendations.map((rec, index) => (
                  <div
                    key={index}
                    style={{
                      padding: '0.75rem',
                      background: 'var(--surface)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.9375rem',
                      display: 'flex',
                      gap: '0.75rem',
                      alignItems: 'flex-start',
                    }}
                  >
                    <CheckCircle
                      size={18}
                      style={{ color: 'var(--success)', flexShrink: 0, marginTop: '2px' }}
                    />
                    <span>{rec}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function formatScoreName(key: string): string {
  const names: { [key: string]: string } = {
    hookStrength: 'Força do Gancho',
    clarity: 'Clareza',
    retention: 'Retenção',
    naturalness: 'Naturalidade',
    shareability: 'Potencial de Compartilhamento',
    ctaStrength: 'Força do CTA',
    easeOfFilming: 'Facilidade de Gravação',
    narrativeCoherence: 'Coerência Narrativa',
  }
  return names[key] || key
}
