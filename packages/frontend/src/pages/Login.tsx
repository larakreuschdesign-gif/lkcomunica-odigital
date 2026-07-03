import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const isLoading = useAuthStore((state) => state.isLoading)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      toast.error('Preencha todos os campos')
      return
    }

    try {
      await login(email, password)
      toast.success('Bem-vindo!')
      navigate('/dashboard')
    } catch (error: any) {
      const message =
        error.response?.data?.error || 'Erro ao fazer login'
      toast.error(message)
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--grad-dark)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}
    >
      <div
        style={{
          background: 'var(--white)',
          padding: '3rem',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-dark)',
          width: '100%',
          maxWidth: '450px',
        }}
      >
        <h1 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Entrar</h1>
        <p
          style={{
            textAlign: 'center',
            color: 'var(--text-mid)',
            marginBottom: '2rem',
          }}
        >
          Acesse sua conta Roteirista.IA
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: 'var(--text-dark)',
              }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: '1px solid var(--gray-200)',
                borderRadius: 'var(--radius-md)',
                fontSize: '1rem',
                fontFamily: 'var(--font-body)',
              }}
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: 'var(--text-dark)',
              }}
            >
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: '1px solid var(--gray-200)',
                borderRadius: 'var(--radius-md)',
                fontSize: '1rem',
                fontFamily: 'var(--font-body)',
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '0.875rem',
              background: isLoading ? 'var(--gray-400)' : 'var(--grad)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-full)',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              boxShadow: 'var(--shadow-md)',
              opacity: isLoading ? 0.6 : 1,
            }}
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p
          style={{
            textAlign: 'center',
            marginTop: '2rem',
            color: 'var(--text-mid)',
          }}
        >
          Não tem conta?{' '}
          <Link
            to="/register"
            style={{
              color: 'var(--pink)',
              fontWeight: '600',
              textDecoration: 'none',
            }}
          >
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  )
}
