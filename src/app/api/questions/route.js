import { NextResponse } from 'next/server'
import pool from '@/lib/db'
import { getQuestionsByRequestId } from '@/lib/queries'

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const requestId = searchParams.get('requestId')

    if (!requestId) {
        return NextResponse.json(
            { error: 'ID da solicitação é obrigatório' },
            { status: 400 }
        )
    }

    try {
        const { rows } = await pool.query(getQuestionsByRequestId, [requestId])
        return NextResponse.json(rows)
    } catch (error) {
        console.error('Erro ao buscar perguntas e respostas:', error)
        return NextResponse.json(
            { error: 'Erro ao buscar perguntas e respostas' },
            { status: 500 }
        )
    }
} 