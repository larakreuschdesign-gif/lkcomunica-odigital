'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button, Input, Select, Textarea, Card } from '@/components/ui'
import { ContentPlatform, ContentType, ProjectInput, ToneOfVoice } from '@/types'
import { Loader2 } from 'lucide-react'

const scriptFormSchema = z.object({
  clientName: z.string().min(2, 'Nome do cliente obrigatório'),
  videoTitle: z.string().min(3, 'Título obrigatório'),
  objective: z.string().min(10, 'Objetivo deve ter pelo menos 10 caracteres'),
  platform: z.array(z.enum(['reels', 'tiktok', 'youtube', 'linkedin', 'instagram', 'tiktok-shop'])),
  contentType: z.enum(['promotional', 'educational', 'entertainment', 'testimonial', 'tutorial', 'behind-scenes']),
  duration: z.number().min(15).max(300),
  toneOfVoice: z.enum(['professional', 'casual', 'humorous', 'inspirational', 'playful', 'authoritative']),
  targetAudience: z.string().min(10),
  brandInfo: z.string().optional(),
  references: z.string().optional(),
  ctaText: z.string().optional(),
  mainIdeas: z.string().optional(),
  baseTexts: z.string().optional(),
  strategicNotes: z.string().optional(),
})

type ScriptFormData = z.infer<typeof scriptFormSchema>

interface ScriptFormProps {
  onSubmit: (data: ProjectInput) => Promise<void>
  loading?: boolean
}

export function ScriptForm({ onSubmit, loading = false }: ScriptFormProps) {
  const [selectedPlatforms, setSelectedPlatforms] = useState<ContentPlatform[]>([])

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ScriptFormData>({
    resolver: zodResolver(scriptFormSchema),
    defaultValues: {
      duration: 60,
      contentType: 'promotional',
      toneOfVoice: 'professional',
      platform: [],
    },
  })

  const duration = watch('duration')

  const handlePlatformToggle = (platform: ContentPlatform) => {
    setSelectedPlatforms((prev) => {
      const newPlatforms = prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
      setValue('platform', newPlatforms)
      return newPlatforms
    })
  }

  const handleFormSubmit = async (data: ScriptFormData) => {
    await onSubmit({
      ...data,
      platform: selectedPlatforms,
    })
  }

  const platforms: { value: ContentPlatform; label: string }[] = [
    { value: 'reels', label: '📷 Instagram Reels' },
    { value: 'tiktok', label: '🎵 TikTok' },
    { value: 'youtube', label: '📺 YouTube Shorts' },
    { value: 'linkedin', label: '💼 LinkedIn' },
    { value: 'instagram', label: '📸 Instagram Feed' },
    { value: 'tiktok-shop', label: '🛍️ TikTok Shop' },
  ]

  const contentTypes = [
    { value: 'promotional', label: 'Promocional' },
    { value: 'educational', label: 'Educacional' },
    { value: 'entertainment', label: 'Entretenimento' },
    { value: 'testimonial', label: 'Depoimento' },
    { value: 'tutorial', label: 'Tutorial' },
    { value: 'behind-scenes', label: 'Bastidores' },
  ]

  const tones = [
    { value: 'professional', label: 'Profissional' },
    { value: 'casual', label: 'Casual' },
    { value: 'humorous', label: 'Humorístico' },
    { value: 'inspirational', label: 'Inspiracional' },
    { value: 'playful', label: 'Lúdico' },
    { value: 'authoritative', label: 'Autoritário' },
  ]

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
      {/* Seção 1: Informações Básicas */}
      <Card>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Informações Básicas</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Nome do Cliente"
            placeholder="Ex: Lara Kreusch Design"
            {...register('clientName')}
            error={errors.clientName?.message}
          />

          <Input
            label="Título do Vídeo"
            placeholder="Ex: Como Produzir Conteúdo Viral"
            {...register('videoTitle')}
            error={errors.videoTitle?.message}
          />
        </div>

        <div className="mt-6">
          <Textarea
            label="Objetivo do Vídeo"
            placeholder="Descreva o objetivo principal do vídeo, o que você quer alcançar..."
            rows={3}
            {...register('objective')}
            error={errors.objective?.message}
          />
        </div>
      </Card>

      {/* Seção 2: Plataformas e Formato */}
      <Card>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Plataformas e Formato</h2>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Plataformas (Selecione uma ou mais)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {platforms.map((platform) => (
              <button
                key={platform.value}
                type="button"
                onClick={() => handlePlatformToggle(platform.value)}
                className={`p-4 rounded-lg border-2 transition-smooth text-left font-medium ${
                  selectedPlatforms.includes(platform.value)
                    ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                {platform.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Tipo de Conteúdo"
            options={contentTypes}
            {...register('contentType')}
            error={errors.contentType?.message}
          />

          <Select
            label="Tom de Voz"
            options={tones}
            {...register('toneOfVoice')}
            error={errors.toneOfVoice?.message}
          />
        </div>

        <div className="mt-6">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Duração Estimada: {duration} segundos
          </label>
          <input
            type="range"
            min="15"
            max="300"
            step="15"
            {...register('duration', { valueAsNumber: true })}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
            <span>15s</span>
            <span>300s</span>
          </div>
        </div>
      </Card>

      {/* Seção 3: Público-Alvo */}
      <Card>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Público e Marca</h2>

        <Textarea
          label="Público-Alvo"
          placeholder="Descreva quem é o público-alvo: idade, gênero, interesses, comportamentos..."
          rows={3}
          {...register('targetAudience')}
          error={errors.targetAudience?.message}
        />

        <div className="mt-6">
          <Textarea
            label="Informações da Marca (Opcional)"
            placeholder="Descreva sua marca: valores, missão, diferencial, tom de voz..."
            rows={3}
            {...register('brandInfo')}
          />
        </div>
      </Card>

      {/* Seção 4: Detalhes Criiativos */}
      <Card>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Detalhes Criativos</h2>

        <Textarea
          label="Ideias Principais (Opcional)"
          placeholder="Liste as ideias principais, conceitos, pontos-chave para o roteiro..."
          rows={3}
          {...register('mainIdeas')}
        />

        <div className="mt-6">
          <Textarea
            label="Textos Base (Opcional)"
            placeholder="Se tiver algum texto pronto, cole aqui para ser incorporado..."
            rows={3}
            {...register('baseTexts')}
          />
        </div>

        <div className="mt-6">
          <Textarea
            label="Call-to-Action (Opcional)"
            placeholder="Ex: 'Clique no link bio', 'Compartilhe com seus amigos'..."
            {...register('ctaText')}
          />
        </div>

        <div className="mt-6">
          <Textarea
            label="Referências (Opcional)"
            placeholder="Links, vídeos, imagens ou descrições de referências visuais..."
            rows={3}
            {...register('references')}
          />
        </div>

        <div className="mt-6">
          <Textarea
            label="Observações Estratégicas (Opcional)"
            placeholder="Informações adicionais, requisitos especiais, pontos importantes..."
            rows={3}
            {...register('strategicNotes')}
          />
        </div>
      </Card>

      {/* Botão Submit */}
      <div className="flex gap-4">
        <Button
          type="submit"
          size="lg"
          loading={loading}
          icon={loading ? <Loader2 className="w-5 h-5 animate-spin" /> : undefined}
          disabled={selectedPlatforms.length === 0}
        >
          {loading ? 'Gerando Roteiro...' : 'Gerar Roteiro com IA'}
        </Button>
        <Button variant="secondary" size="lg">
          Cancelar
        </Button>
      </div>
    </form>
  )
}
