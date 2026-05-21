import { NextRequest, NextResponse } from 'next/server'
import { generateScript } from '@/lib/ai'
import { supabase } from '@/lib/supabase'
import { ProjectInput } from '@/types'

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticação
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      )
    }

    // Extrair token
    const token = authHeader.replace('Bearer ', '')

    // Verificar token com Supabase
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token)

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Token inválido' },
        { status: 401 }
      )
    }

    // Extrair dados da requisição
    const body = await request.json() as ProjectInput

    // Validar input
    if (!body.clientName || !body.objective) {
      return NextResponse.json(
        { error: 'Informações obrigatórias faltando' },
        { status: 400 }
      )
    }

    // Gerar roteiro com IA
    const script = await generateScript(body)

    // Salvar no banco de dados
    const { data: project, error: saveError } = await supabase
      .from('projects')
      .insert([
        {
          user_id: user.id,
          client_name: body.clientName,
          project_name: body.videoTitle || 'Sem título',
          status: 'draft',
          input: body,
          script: script,
        },
      ])
      .select()
      .single()

    if (saveError) {
      console.error('Erro ao salvar:', saveError)
      return NextResponse.json(
        { error: 'Erro ao salvar roteiro' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        projectId: project.id,
        script: script,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Erro na API:', error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Erro interno do servidor',
      },
      { status: 500 }
    )
  }
}
