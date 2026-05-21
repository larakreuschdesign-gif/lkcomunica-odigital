import type { Metadata } from 'next'
import { Layout } from '@/components/layout/Layout'
import './globals.css'

export const metadata: Metadata = {
  title: 'Roteiro Pro - Gerador de Roteiros Profissionais',
  description: 'Plataforma SaaS inteligente para geração automática de roteiros profissionais para vídeos em redes sociais e campanhas publicitárias.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="bg-white dark:bg-gray-950">
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  )
}
