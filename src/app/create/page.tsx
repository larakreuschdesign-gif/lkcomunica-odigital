'use client'

import React, { useState } from 'react'
import { ScriptForm } from '@/components/create/ScriptForm'
import { ProjectInput, ScriptTemplate } from '@/types'
import { generateScript, generateSuggestions } from '@/lib/ai'
import { Button } from '@/components/ui'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function CreatePage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [generatedScript, setGeneratedScript] = useState<ScriptTemplate | null>(null)

  const handleSubmit = async (input: ProjectInput) => {
    try {
      setLoading(true)
      setError(null)

      const script = await generateScript(input)
      setGeneratedScript(script)

      // Aqui você salvaria no banco de dados
      console.log('Script gerado:', script)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao gerar roteiro')
    } finally {
      setLoading(false)
    }
  }

  if (generatedScript) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Link href="/create">
          <Button variant="ghost" icon={<ArrowLeft className="w-4 h-4" />}>
            Voltar
          </Button>
        </Link>

        <div className="mt-8 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {generatedScript.title}
          </h1>

          <div className="prose dark:prose-invert max-w-none mt-8">
            <p className="text-lg italic text-brand-600 mb-4">{generatedScript.gancho}</p>

            <h2 className="text-2xl font-bold mt-6 mb-4">Objetivo Estratégico</h2>
            <p>{generatedScript.strategicObjective}</p>

            {generatedScript.scenes.map((scene) => (
              <div key={scene.number} className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold mb-4">
                  Cena {scene.number}: {scene.title} ({scene.duration}s)
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  {scene.description && (
                    <div>
                      <strong>Descrição:</strong>
                      <p>{scene.description}</p>
                    </div>
                  )}

                  {scene.environment && (
                    <div>
                      <strong>Ambiente:</strong>
                      <p>{scene.environment}</p>
                    </div>
                  )}

                  {scene.voiceOver && (
                    <div className="col-span-2">
                      <strong>Voz Over:</strong>
                      <p className="italic">"{scene.voiceOver}"</p>
                    </div>
                  )}

                  {scene.onScreenText && (
                    <div>
                      <strong>Texto na Tela:</strong>
                      <p>{scene.onScreenText}</p>
                    </div>
                  )}

                  {scene.cameraMovement && (
                    <div>
                      <strong>Movimento de Câmera:</strong>
                      <p>{scene.cameraMovement}</p>
                    </div>
                  )}

                  {scene.musicSuggestion && (
                    <div>
                      <strong>Sugestão de Trilha:</strong>
                      <p>{scene.musicSuggestion}</p>
                    </div>
                  )}

                  {scene.emotions && (
                    <div>
                      <strong>Emoções:</strong>
                      <p>{scene.emotions}</p>
                    </div>
                  )}

                  {scene.creativeDirection && (
                    <div>
                      <strong>Direção Criativa:</strong>
                      <p>{scene.creativeDirection}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}

            <div className="mt-8 p-6 bg-brand-50 dark:bg-brand-900/20 rounded-lg border border-brand-200 dark:border-brand-800">
              <h3 className="text-xl font-bold mb-4">Call-to-Action</h3>
              <p className="text-lg">{generatedScript.cta}</p>
            </div>

            {generatedScript.observations && (
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">Observações</h3>
                <p>{generatedScript.observations}</p>
              </div>
            )}

            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 flex gap-4">
              <Button size="lg">Salvar Roteiro</Button>
              <Button variant="secondary" size="lg">Exportar PDF</Button>
              <Button variant="ghost" size="lg">Editar</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Criar Novo Roteiro
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Preencha as informações abaixo e nossa IA gerará um roteiro profissional
        </p>
      </div>

      {error && (
        <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      <ScriptForm onSubmit={handleSubmit} loading={loading} />
    </div>
  )
}
