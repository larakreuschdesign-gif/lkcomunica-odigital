import { useState } from 'react'
import { Copy, Download, Eye, Zap, Edit2, Save, X, Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-react'
import { useScriptStore } from '../store/useScriptStore'

export function ScriptResult() {
  const { currentScript, updateScript, updateScene, addScene, deleteScene, reorderScenes } = useScriptStore()
  const [viewMode, setViewMode] = useState<'strategic' | 'recording'>('strategic')
  const [editingSceneId, setEditingSceneId] = useState<string | null>(null)
  const [expandedSceneId, setExpandedSceneId] = useState<string | null>(null)

  if (!currentScript) {
    return <div className="container" style={{ padding: '3rem 1.5rem' }}>Nenhum roteiro carregado</div>
  }

  const handleCopyToClipboard = () => {
    const text = `${currentScript.title}\n\n${currentScript.hook}\n\n${currentScript.scenes
      .map((s) => `Cena: ${s.duration}\n${s.spokenText}`)
      .join('\n\n')}`
    navigator.clipboard.writeText(text)
    alert('Roteiro copiado para a área de transferência!')
  }

  const moveScene = (index: number, direction: 'up' | 'down') => {
    const newScenes = [...currentScript.scenes]
    const swapIndex = direction === 'up' ? index - 1 : index + 1
    if (swapIndex >= 0 && swapIndex < newScenes.length) {
      [newScenes[index], newScenes[swapIndex]] = [newScenes[swapIndex], newScenes[index]]
      reorderScenes(newScenes)
    }
  }

  return (
    <div className="script-result">
      <div className="container" style={{ padding: '2rem 1.5rem' }}>
        {/* Header with Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>{currentScript.title}</h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              {currentScript.scenes.length} cenas • {currentScript.metadata.duration}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button className="btn btn--secondary" onClick={handleCopyToClipboard}>
              <Copy size={18} />
              Copiar
            </button>
            <button className="btn btn--secondary">
              <Download size={18} />
              Exportar PDF
            </button>
            <button className="btn btn--primary" onClick={() => setViewMode(viewMode === 'strategic' ? 'recording' : 'strategic')}>
              <Eye size={18} />
              {viewMode === 'strategic' ? 'Modo Gravação' : 'Modo Estratégico'}
            </button>
          </div>
        </div>

        {/* View Toggle */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
          <button
            onClick={() => setViewMode('strategic')}
            className={`btn btn--sm ${viewMode === 'strategic' ? 'btn--primary' : 'btn--ghost'}`}
          >
            <Zap size={16} />
            Roteiro Estratégico
          </button>
          <button
            onClick={() => setViewMode('recording')}
            className={`btn btn--sm ${viewMode === 'recording' ? 'btn--primary' : 'btn--ghost'}`}
          >
            <Eye size={16} />
            Modo Gravação
          </button>
        </div>

        {/* Strategic View */}
        {viewMode === 'strategic' && (
          <div>
            {/* Strategic Info */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
              <div className="card">
                <h3 style={{ fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: '0.5rem' }}>
                  Gancho Principal
                </h3>
                <p style={{ fontSize: '1.125rem', fontWeight: 500 }}>{currentScript.hook}</p>
              </div>
              <div className="card">
                <h3 style={{ fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: '0.5rem' }}>
                  Objetivo Estratégico
                </h3>
                <p style={{ fontSize: '1rem' }}>{currentScript.objective}</p>
              </div>
            </div>

            <div className="card" style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>Resumo Criativo</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{currentScript.summary}</p>
            </div>

            <div className="card" style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>Descrição Geral</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{currentScript.generalDescription}</p>
            </div>
          </div>
        )}

        {/* Scenes */}
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem' }}>Cenas</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {currentScript.scenes.map((scene, index) => (
              <div key={scene.id} className="card">
                {editingSceneId === scene.id ? (
                  // Edit Mode
                  <div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
                      <div className="form-group">
                        <label className="form-group__label">Duração</label>
                        <input
                          type="text"
                          className="input"
                          value={scene.duration}
                          onChange={(e) => updateScene(scene.id, { duration: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-group__label">Objetivo</label>
                        <input
                          type="text"
                          className="input"
                          value={scene.objective}
                          onChange={(e) => updateScene(scene.id, { objective: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-group__label">Texto Falado</label>
                      <textarea
                        className="textarea"
                        value={scene.spokenText}
                        onChange={(e) => updateScene(scene.id, { spokenText: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-group__label">Texto na Tela</label>
                      <input
                        type="text"
                        className="input"
                        value={scene.onScreenText}
                        onChange={(e) => updateScene(scene.id, { onScreenText: e.target.value })}
                      />
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        className="btn btn--primary btn--sm"
                        onClick={() => setEditingSceneId(null)}
                      >
                        <Save size={16} />
                        Salvar
                      </button>
                      <button
                        className="btn btn--secondary btn--sm"
                        onClick={() => setEditingSceneId(null)}
                      >
                        <X size={16} />
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                      <div>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                          CENA {String(index + 1).padStart(2, '0')}
                        </h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{scene.duration}</p>
                      </div>

                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {index > 0 && (
                          <button
                            className="btn btn--ghost btn--sm"
                            onClick={() => moveScene(index, 'up')}
                            title="Mover para cima"
                          >
                            <ChevronUp size={16} />
                          </button>
                        )}
                        {index < currentScript.scenes.length - 1 && (
                          <button
                            className="btn btn--ghost btn--sm"
                            onClick={() => moveScene(index, 'down')}
                            title="Mover para baixo"
                          >
                            <ChevronDown size={16} />
                          </button>
                        )}
                        <button
                          className="btn btn--ghost btn--sm"
                          onClick={() => setEditingSceneId(scene.id)}
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          className="btn btn--ghost btn--sm"
                          onClick={() => deleteScene(scene.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Content based on view mode */}
                    {viewMode === 'strategic' ? (
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(2, 1fr)',
                          gap: '1rem',
                          fontSize: '0.9375rem',
                          color: 'var(--text-secondary)',
                          lineHeight: 1.6,
                        }}
                      >
                        <div>
                          <strong style={{ color: 'var(--text-primary)' }}>Ambiente:</strong> {scene.environment}
                        </div>
                        <div>
                          <strong style={{ color: 'var(--text-primary)' }}>Enquadramento:</strong> {scene.framing}
                        </div>
                        <div>
                          <strong style={{ color: 'var(--text-primary)' }}>Expressão:</strong> {scene.expression}
                        </div>
                        <div>
                          <strong style={{ color: 'var(--text-primary)' }}>Movimento:</strong> {scene.bodyMovement}
                        </div>
                        <div style={{ gridColumn: 'span 2' }}>
                          <strong style={{ color: 'var(--text-primary)' }}>Câmera:</strong> {scene.cameraMovement}
                        </div>
                        <div style={{ gridColumn: 'span 2' }}>
                          <strong style={{ color: 'var(--text-primary)' }}>Texto Falado:</strong>
                          <p style={{ marginTop: '0.5rem', fontStyle: 'italic', color: 'var(--text-primary)' }}>"{scene.spokenText}"</p>
                        </div>
                        <div style={{ gridColumn: 'span 2' }}>
                          <strong style={{ color: 'var(--text-primary)' }}>Emoção:</strong> {scene.emotion}
                        </div>
                      </div>
                    ) : (
                      // Recording Mode
                      <div style={{ fontSize: '1.25rem', lineHeight: 1.8 }}>
                        <div style={{ marginBottom: '2rem', padding: '1rem', background: 'var(--surface)', borderRadius: 'var(--radius-md)' }}>
                          <div style={{ fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: '0.5rem' }}>
                            Texto na Tela
                          </div>
                          <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{scene.onScreenText}</div>
                        </div>

                        <div style={{ fontSize: '1.25rem', fontStyle: 'italic', marginBottom: '1.5rem' }}>
                          {scene.spokenText}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
                          <div>
                            <strong>Expressão:</strong> {scene.expression}
                          </div>
                          <div>
                            <strong>Câmera:</strong> {scene.cameraMovement}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA and Final Info */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
          <div className="card">
            <h3 style={{ fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: '0.5rem' }}>
              CTA Final
            </h3>
            <p style={{ fontSize: '1.125rem' }}>{currentScript.ctaFinal}</p>
          </div>

          <div className="card">
            <h3 style={{ fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: '0.5rem' }}>
              Sugestão Musical
            </h3>
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>{currentScript.musicSuggestion}</p>
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>Observações</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{currentScript.observations}</p>
        </div>
      </div>
    </div>
  )
}
