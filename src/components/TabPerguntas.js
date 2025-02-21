'use client'

import { useState, useEffect } from 'react'
import Card from './Card'

export default function TabPerguntas({ solicitacaoId }) {
    const [perguntas, setPerguntas] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchQuestions() {
            if (!solicitacaoId) {
                setPerguntas([])
                return
            }

            setLoading(true)
            setError(null)

            try {
                const response = await fetch(`/api/questions?requestId=${solicitacaoId}`)
                if (!response.ok) {
                    throw new Error('Falha ao buscar perguntas e respostas')
                }
                const data = await response.json()
                setPerguntas(data)
            } catch (err) {
                setError(err.message)
                console.error('Erro ao buscar perguntas e respostas:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchQuestions()
    }, [solicitacaoId])

    if (loading) {
        return (
            <div className="text-center py-12 text-gray-500">
                Carregando perguntas e respostas...
            </div>
        )
    }

    if (error) {
        return (
            <div className="text-center py-12 text-red-500">
                Erro ao carregar perguntas e respostas: {error}
            </div>
        )
    }

    if (perguntas.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500">
                {solicitacaoId
                    ? 'Nenhuma pergunta e resposta encontrada para este ID'
                    : 'Digite um ID de solicitação para visualizar as perguntas e respostas'
                }
            </div>
        )
    }

    return (
        <div className="space-y-8">
            {perguntas.map((pergunta) => (
                <div key={pergunta.id} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card
                        title="Pergunta"
                        content={`${pergunta.question_id}: ${pergunta.question_prompt}`}
                    />
                    <Card
                        title="Prompt Completo"
                        content={pergunta.prompt}
                    />
                    <Card
                        title="Resposta"
                        content={[
                            {
                                role: 'Resposta',
                                content: pergunta.answer
                            },
                            {
                                role: 'Justificativa',
                                content: pergunta.justification
                            },
                            {
                                role: 'Referências',
                                content: JSON.stringify(pergunta.references, null, 2)
                            }
                        ]}
                    />
                </div>
            ))}
        </div>
    )
} 