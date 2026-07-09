import { Wand2, Zap, Brain, Sparkles } from 'lucide-react'

interface DashboardProps {
  onStartNew: () => void
}

export function Dashboard({ onStartNew }: DashboardProps) {
  return (
    <div className="dashboard">
      <div className="container" style={{ padding: '3rem 1.5rem' }}>
        {/* Hero Section */}
        <section className="dashboard__hero" style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <div style={{ marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>
              Transforme um gancho em um roteiro pronto para gravar
            </h1>
            <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)' }}>
              Insira sua ideia principal. A IA estrutura estratégia, cenas, falas e direção criativa.
            </p>
          </div>

          <button
            onClick={onStartNew}
            className="btn btn--primary btn--lg"
            style={{ fontSize: '1.125rem', padding: '1rem 2rem' }}
          >
            <Wand2 size={24} />
            Gerar Roteiro Completo
          </button>
        </section>

        {/* Features Grid */}
        <section style={{ marginTop: '4rem' }}>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 600, marginBottom: '2rem', textAlign: 'center' }}>
            Por que usar ROTEIRO AI?
          </h2>

          <div className="grid-3" style={{ gap: '2rem' }}>
            {[
              {
                icon: Brain,
                title: 'Inteligência Criativa',
                description: 'IA especializada em estratégia de conteúdo, storytelling e copywriting para redes sociais.',
              },
              {
                icon: Zap,
                title: 'Geração Instantânea',
                description: 'De um gancho para um roteiro profissional em segundos. Sem fila, sem espera.',
              },
              {
                icon: Sparkles,
                title: 'Pronto para Gravação',
                description: 'Cada roteiro vem com direção de câmera, movimentos, expressões e textos completos.',
              },
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="card">
                  <div style={{ marginBottom: '1rem' }}>
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '0.5rem',
                        background: 'var(--primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                      }}
                    >
                      <Icon size={24} />
                    </div>
                  </div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                    {feature.title}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{feature.description}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Quick Stats */}
        <section style={{ marginTop: '4rem', padding: '2rem', background: 'var(--surface)', borderRadius: 'var(--radius-lg)' }}>
          <div className="grid-3" style={{ gap: '2rem' }}>
            {[
              { label: 'Roteiros Gerados', value: '0' },
              { label: 'Horas Economizadas', value: '0' },
              { label: 'Conteúdos Publicados', value: '0' },
            ].map((stat, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.5rem' }}>
                  {stat.value}
                </div>
                <div style={{ color: 'var(--text-secondary)' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ marginTop: '4rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem' }}>
            Pronto para começar?
          </h2>
          <button
            onClick={onStartNew}
            className="btn btn--primary btn--lg"
            style={{ fontSize: '1rem', padding: '0.875rem 2rem' }}
          >
            Criar Novo Roteiro →
          </button>
        </section>
      </div>
    </div>
  )
}
