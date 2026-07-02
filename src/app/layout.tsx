import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "LK Analytics AI - Social Media Intelligence",
  description: "Transform social media screenshots into executive reports with AI-powered analysis",
  keywords: ["analytics", "social media", "reports", "business intelligence"],
  viewport: "width=device-width, initial-scale=1",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
