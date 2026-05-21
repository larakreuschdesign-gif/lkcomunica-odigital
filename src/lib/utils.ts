import { clsx, type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatDate(date: string | Date): string {
  const d = new Date(date)
  return d.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}m ${secs}s`
}

export function calculateReadingTime(wordCount: number): number {
  return Math.ceil(wordCount / 200)
}

export function truncateText(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length) + '...'
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 11)
}

export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/-+/g, '-')
    .trim()
}

export async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    console.error('Erro ao copiar:', err)
    return false
  }
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export const platformEmojis: Record<string, string> = {
  reels: '📷',
  tiktok: '🎵',
  youtube: '📺',
  linkedin: '💼',
  instagram: '📸',
  'tiktok-shop': '🛍️',
}

export const contentTypeLabels: Record<string, string> = {
  promotional: 'Promocional',
  educational: 'Educacional',
  entertainment: 'Entretenimento',
  testimonial: 'Depoimento',
  tutorial: 'Tutorial',
  'behind-scenes': 'Bastidores',
}

export const toneLabels: Record<string, string> = {
  professional: 'Profissional',
  casual: 'Casual',
  humorous: 'Humorístico',
  inspirational: 'Inspiracional',
  playful: 'Lúdico',
  authoritative: 'Autoritário',
}
