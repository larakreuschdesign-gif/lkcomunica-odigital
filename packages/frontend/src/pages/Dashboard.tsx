import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { scriptService } from '@/services/script.service'
import toast from 'react-hot-toast'

export default function DashboardPage() {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  const [scripts, setScripts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadScripts()
  }, [])

  const loadScripts = async () => {
    try {
      setLoading(true)
      const data = await scriptService.list(1, 10)
      setScripts(data.scripts)
    } catch (error) {
      toast.error('Erro ao carregar roteiros')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--off-white)' }}>
      {/* Header */}
      <header
        style={{
          background: 'var(--white)',
          padding: '1.5rem 2rem',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1 style={{ fontSize: '1.5rem' }}>Roteirista.IA</h1>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ color: 'var(--text-mid)' }}>{user?.name}</span>
          <button
            onClick={handleLogout}
            style={{
              padding: '0.5rem 1.5rem',
              background: 'var(--pink)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-full)',
              cursor: 'pointer',
            }}
          >
            Sair
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ padding: '3rem 2rem' }}>
        <div className="container-lg">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '3rem',
            }}
          >
            <div>
              <h2 style={{ marginBottom: '0.5rem' }}>Meus Roteiros</h2>
              <p style={{ color: 'var(--text-mid)' }}>
                Gerencie todos os seus roteiros em um único lugar
              </p>
            </div>
            <button
              onClick={() => navigate('/create-script')}
              style={{
                padding: '0.875rem 2rem',
                background: 'var(--grad)',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--radius-full)',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              + Criar Novo Roteiro
            </button>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <p style={{ color: 'var(--text-mid)' }}>Carregando...</p>
            </div>
          ) : scripts.length === 0 ? (
            <div
              style={{
                background: 'var(--white)',
                padding: '4rem 2rem',
                textAlign: 'center',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <h3 style={{ marginBottom: '1rem' }}>Nenhum roteiro criado</h3>
              <p style={{ color: 'var(--text-mid)', marginBottom: '2rem' }}>
                Comece criando seu primeiro roteiro com IA
              </p>
              <button
                onClick={() => navigate('/create-script')}
                style={{
                  padding: '0.875rem 2rem',
                  background: 'var(--grad)',
                  color: 'white',
                  border: 'none',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-md)',
                }}
              >
                Criar Primeiro Roteiro
              </button>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {scripts.map((script) => (
                <div
                  key={script.id}
                  onClick={() => navigate(`/scripts/${script.id}`)}
                  style={{
                    background: 'var(--white)',
                    padding: '1.5rem',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-sm)',
                    cursor: 'pointer',
                    transition: 'var(--transition)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = 'var(--shadow-md)'
                    e.currentTarget.style.transform = 'translateY(-4px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
                    e.currentTarget.style.transform = 'none'
                  }}
                >
                  <h3 style={{ marginBottom: '0.5rem' }}>{script.title}</h3>
                  <p style={{ color: 'var(--text-mid)', fontSize: '0.9rem' }}>
                    Cliente: {script.clientName}
                  </p>
                  <p style={{ color: 'var(--text-mid)', fontSize: '0.9rem' }}>
                    Plataforma: {script.platform}
                  </p>
                  <div
                    style={{
                      display: 'inline-block',
                      marginTop: '1rem',
                      padding: '0.25rem 0.75rem',
                      background:
                        script.status === 'DRAFT' ? 'var(--pink-xlight)' : 'var(--cream)',
                      color:
                        script.status === 'DRAFT' ? 'var(--pink)' : 'var(--text-dark)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                    }}
                  >
                    {script.status}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
