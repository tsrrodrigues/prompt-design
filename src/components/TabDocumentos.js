'use client'

import { useState, useEffect } from 'react'
import Card from './Card'

export default function TabDocumentos({ solicitacaoId }) {
    const [documentos, setDocumentos] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchDocuments() {
            if (!solicitacaoId) {
                setDocumentos([])
                return
            }

            setLoading(true)
            setError(null)

            try {
                const response = await fetch(`/api/documents?requestId=${solicitacaoId}`)
                if (!response.ok) {
                    throw new Error('Falha ao buscar documentos')
                }
                const data = await response.json()
                setDocumentos(data)
            } catch (err) {
                setError(err.message)
                console.error('Erro ao buscar documentos:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchDocuments()
    }, [solicitacaoId])

    if (loading) {
        return (
            <div className="text-center py-12 text-gray-500">
                Carregando documentos...
            </div>
        )
    }

    if (error) {
        return (
            <div className="text-center py-12 text-red-500">
                Erro ao carregar documentos: {error}
            </div>
        )
    }

    if (documentos.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500">
                {solicitacaoId
                    ? 'Nenhum documento encontrado para este ID'
                    : 'Digite um ID de solicitação para visualizar os documentos analisados'
                }
            </div>
        )
    }

    return (
        <div className="space-y-8">
            {documentos.map((doc) => (
                <div key={doc.id} className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card
                        title="Documento/Campo"
                        content={doc.label}
                        documentUrl={doc.value}
                        type={doc.type}
                        documentId={doc.request_document_id}
                    />
                    <Card
                        title="Texto Extraído"
                        content={doc.extracted_text}
                    />
                    <Card
                        title="Prompt"
                        content={doc.prompt}
                    />
                    {console.log('DEBUG', doc.result)}
                    <Card
                        title="Resultado"
                        content={
                            Object.keys(JSON.parse(doc.result)).map(key => ({
                                role: 'user',
                                content: `${key}:\n${JSON.stringify(JSON.parse(doc.result)[key], null, 2)}`
                            }))
                        }
                    />
                </div>
            ))}
        </div>
    )
} 