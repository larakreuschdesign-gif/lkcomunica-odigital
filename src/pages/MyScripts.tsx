import { useEffect, useState } from 'react'
import { Trash2, Eye, Search } from 'lucide-react'
import { useScriptStore } from '../store/useScriptStore'

interface MyScriptsProps {
  onSelectScript: () => void
}

export function MyScripts({ onSelectScript }: MyScriptsProps) {
  const { scripts, fetchScripts, setCurrentScript, deleteScript } = useScriptStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchScripts()
      .then(() => setLoading(false))
      .catch(() => setLoading(false))
  }, [])

  const filteredScripts = scripts.filter(
    (script) =>
      script.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      script.hook.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="my-scripts">
      <div className="container" style={{ padding: '3rem 1.5rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>Meus Roteiros</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Gerencie todos os roteiros que você criou
        </p>

        {/* Search */}
        <div className="form-group" style={{ marginBottom: '2rem' }}>
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
            <input
              type="text"
              className="input"
              placeholder="Buscar roteiros..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '2.5rem' }}
            />
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <div className="skeleton" style={{ height: '100px', borderRadius: 'var(--radius-lg)' }} />
          </div>
        ) : filteredScripts.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', marginBottom: '1rem' }}>
              Nenhum roteiro encontrado
            </p>
            <p style={{ color: 'var(--text-tertiary)' }}>Comece criando um novo roteiro</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {filteredScripts.map((script) => (
              <div key={script.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div
                  style={{ flex: 1, cursor: 'pointer' }}
                  onClick={() => {
                    setCurrentScript(script)
                    onSelectScript()
                  }}
                >
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                    {script.title}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }} title={script.hook}>
                    {script.hook.substring(0, 100)}...
                  </p>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: 'var(--text-tertiary)' }}>
                    <span>{script.scenes.length} cenas</span>
                    <span>•</span>
                    <span>{script.metadata.platform}</span>
                    <span>•</span>
                    <span>{new Date(script.metadata.createdAt).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    className="btn btn--secondary btn--sm"
                    onClick={() => {
                      setCurrentScript(script)
                      onSelectScript()
                    }}
                  >
                    <Eye size={16} />
                    Ver
                  </button>
                  <button
                    className="btn btn--secondary btn--sm"
                    onClick={() => deleteScript(script.id)}
                  >
                    <Trash2 size={16} />
                    Deletar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
