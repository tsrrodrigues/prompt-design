'use client'

import { useState, useEffect } from 'react'
import Card from './Card'

export default function TabTopicos({ solicitacaoId }) {
    const [topicos, setTopicos] = useState([])

    useEffect(() => {
        if (solicitacaoId) {
            // Aqui você implementará a query SQL para buscar os tópicos
            // const query = `SELECT ... FROM ...`
        }
    }, [solicitacaoId])

    return (
        <div className="space-y-8">
            {topicos.map((topico, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card title="Prompt do Tópico" content={topico.prompt} />
                    <Card title="Conteúdo Gerado" content={topico.conteudo} />
                </div>
            ))}
        </div>
    )
} 