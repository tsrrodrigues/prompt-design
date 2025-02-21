'use client'

import { useState, useEffect } from 'react'
import { Worker, Viewer } from '@react-pdf-viewer/core'
import '@react-pdf-viewer/core/lib/styles/index.css'
import { renderAsync } from 'docx-preview'

export default function FilePreview({ url, type, documentId, documentName }) {
    const [preview, setPreview] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!url) {
            setLoading(false)
            return
        }

        const loadPreview = async () => {
            try {
                setLoading(true)
                setError(null)

                // Se for um campo de texto, apenas mostra o valor
                if (type === 'field') {
                    setPreview(url)
                    setLoading(false)
                    return
                }

                const fileExtension = url.split('.').pop().toLowerCase()

                switch (fileExtension) {
                    case 'pdf':
                        setPreview(url)
                        break

                    case 'docx':
                        const response = await fetch(url)
                        const blob = await response.blob()
                        const container = document.createElement('div')
                        await renderAsync(blob, container)
                        setPreview(container.innerHTML)
                        break

                    case 'png':
                    case 'jpg':
                    case 'jpeg':
                    case 'gif':
                        setPreview(
                            <img
                                src={url}
                                alt="Preview"
                                className="max-w-full h-auto"
                            />
                        )
                        break

                    case 'mp4':
                    case 'webm':
                        setPreview(
                            <video
                                controls
                                className="max-w-full"
                            >
                                <source src={url} type={`video/${fileExtension}`} />
                                Seu navegador não suporta o elemento de vídeo.
                            </video>
                        )
                        break

                    case 'mp3':
                    case 'wav':
                        setPreview(
                            <audio
                                controls
                                className="w-full"
                            >
                                <source src={url} type={`audio/${fileExtension}`} />
                                Seu navegador não suporta o elemento de áudio.
                            </audio>
                        )
                        break

                    default:
                        setPreview(url)
                }
            } catch (err) {
                setError('Erro ao carregar preview')
                console.error('Erro ao carregar preview:', err)
            } finally {
                setLoading(false)
            }
        }

        loadPreview()
    }, [url, type])

    const DocumentId = () => (
        <div className="text-xs text-gray-500 mb-2">
            ID do documento: {documentId} - {documentName}
        </div>
    )

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-full text-red-500 text-center p-4">
                {error}
            </div>
        )
    }

    if (!preview) {
        return (
            <div className="flex items-center justify-center h-full text-gray-500 text-center p-4">
                Nenhum preview disponível
            </div>
        )
    }

    if (url?.toLowerCase().endsWith('.pdf')) {
        return (
            <div className="h-full flex flex-col items-center justify-center p-4">
                <DocumentId />
                <button
                    onClick={() => window.open(url, '_blank')}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                >
                    <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                    </svg>
                    Visualizar PDF
                </button>
            </div>
        )
    }

    if (typeof preview === 'string' && url?.toLowerCase().endsWith('.docx')) {
        return (
            <div className="h-full overflow-auto p-4">
                <DocumentId />
                <div dangerouslySetInnerHTML={{ __html: preview }} />
            </div>
        )
    }

    // Para campos de texto simples
    if (type === 'field') {
        return (
            <div className="h-full p-6 overflow-auto">
                <DocumentId />
                <div className="text-sm text-gray-600 whitespace-pre-wrap">
                    {preview}
                </div>
            </div>
        )
    }

    // Para outros tipos de preview (imagens, vídeos, áudios)
    return (
        <div className="h-full flex flex-col items-center justify-center p-4 overflow-auto">
            <DocumentId />
            {preview}
        </div>
    )
}