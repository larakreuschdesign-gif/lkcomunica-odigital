import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'

export default function HomePage() {
  const navigate = useNavigate()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Hero Section */}
      <section
        style={{
          background: 'var(--grad-dark)',
          color: 'var(--text-light)',
          padding: '6rem 2rem',
          textAlign: 'center',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ color: 'var(--white)', marginBottom: '1rem' }}>
            Roteirista.IA
          </h1>
          <p
            style={{
              fontSize: '1.25rem',
              marginBottom: '2rem',
              color: 'var(--text-muted)',
            }}
          >
            Gere roteiros profissionais para vídeos em segundos, com inteligência
            artificial.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => navigate('/dashboard')}
                  style={{
                    padding: '1rem 2rem',
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
                  Ir para Dashboard
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/register')}
                  style={{
                    padding: '1rem 2rem',
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
                  Começar Grátis
                </button>
                <button
                  onClick={() => navigate('/login')}
                  style={{
                    padding: '1rem 2rem',
                    background: 'transparent',
                    color: 'white',
                    border: '1.5px solid rgba(255,255,255,0.35)',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  Entrar
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        style={{
          padding: '4rem 2rem',
          background: 'var(--white)',
        }}
      >
        <div className="container">
          <h2
            style={{
              textAlign: 'center',
              marginBottom: '3rem',
              color: 'var(--text-dark)',
            }}
          >
            Recursos Principais
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
            }}
          >
            {[
              {
                title: '🤖 IA Inteligente',
                description:
                  'Gera roteiros estruturados automaticamente usando inteligência artificial',
              },
              {
                title: '📊 Dashboard Completo',
                description: 'Visualize, edite e organize todos os seus roteiros em um único lugar',
              },
              {
                title: '📥 Exportação',
                description: 'Exporte em PDF ou DOCX com design profissional',
              },
              {
                title: '🎥 Múltiplas Plataformas',
                description:
                  'Otimizado para TikTok, Instagram, YouTube, LinkedIn e muito mais',
              },
              {
                title: '🔄 Colaboração',
                description: 'Compartilhe roteiros com sua equipe através de links únicos',
              },
              {
                title: '📱 Interface Moderna',
                description: 'Design intuitivo e responsivo para qualquer dispositivo',
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                style={{
                  padding: '2rem',
                  background: 'var(--cream)',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <h3 style={{ marginBottom: '1rem' }}>{feature.title}</h3>
                <p style={{ color: 'var(--text-mid)' }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          background: 'var(--dark)',
          color: 'var(--text-light)',
          padding: '3rem 2rem',
          textAlign: 'center',
        }}
      >
        <p>© 2024 Roteirista.IA. Todos os direitos reservados.</p>
      </footer>
    </div>
  )
}
