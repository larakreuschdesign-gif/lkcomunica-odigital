import { useState } from 'react'
import { Copy, Sparkles, ChevronDown, Check } from 'lucide-react'
import { useApi } from '../hooks/useApi'

interface HookVariationsProps {
  scriptId: string
  currentHook: string
  onSelectVariation?: (hook: string) => void
}

interface Variation {
  category: string
  hook: string
}

export function HookVariations({ scriptId, currentHook, onSelectVariation }: HookVariationsProps) {
  const { post, loading } = useApi()
  const [variations, setVariations] = useState<Variation[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [copiedId, setCopiedId] = useState<number | null>(null)

  const handleGenerateVariations = async () => {
    try {
      const result = await post(`/scripts/${scriptId}/hook-variations`, {
        hook: currentHook,
      })
      setVariations(result.variations || [])
      setIsOpen(true)
    } catch (error) {
      console.error('Erro ao gerar variações:', error)
    }
  }

  const handleCopyHook = (hook: string, index: number) => {
    navigator.clipboard.writeText(hook)
    setCopiedId(index)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleSelectVariation = (hook: string) => {
    if (onSelectVariation) {
      onSelectVariation(hook)
      setIsOpen(false)
    }
  }

  return (
    <div style={{ marginTop: '2rem' }}>
      <button
        onClick={handleGenerateVariations}
        disabled={loading}
        className="btn btn--secondary"
        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: loading ? 0.6 : 1 }}
      >
        <Sparkles size={18} />
        {loading ? 'Gerando variações...' : 'Gerar Variações de Gancho'}
      </button>

      {variations.length > 0 && (
        <div style={{ marginTop: '1rem' }}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="card"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer',
              border: 'none',
              background: 'var(--surface)',
            }}
          >
            <span style={{ fontWeight: 600 }}>
              {variations.length} variações geradas
            </span>
            <ChevronDown
              size={20}
              style={{
                transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                transition: 'transform 200ms',
              }}
            />
          </button>

          {isOpen && (
            <div style={{ marginTop: '1rem', display: 'grid', gap: '1rem' }}>
              {variations.map((variation, index) => (
                <div
                  key={index}
                  className="card"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '1rem',
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        color: 'var(--primary)',
                        marginBottom: '0.5rem',
                        letterSpacing: '0.5px',
                      }}
                    >
                      {variation.category}
                    </div>
                    <p style={{ fontSize: '1rem', lineHeight: 1.5 }}>
                      {variation.hook}
                    </p>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      gap: '0.5rem',
                      flexShrink: 0,
                      flexDirection: 'column',
                    }}
                  >
                    <button
                      className="btn btn--sm btn--secondary"
                      onClick={() => handleCopyHook(variation.hook, index)}
                      title="Copiar gancho"
                    >
                      {copiedId === index ? (
                        <Check size={16} />
                      ) : (
                        <Copy size={16} />
                      )}
                    </button>
                    {onSelectVariation && (
                      <button
                        className="btn btn--sm btn--primary"
                        onClick={() => handleSelectVariation(variation.hook)}
                        title="Usar este gancho"
                      >
                        Usar
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
