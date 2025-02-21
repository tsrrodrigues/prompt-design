import FilePreview from './FilePreview'
import MessageContent from './MessageContent'

export default function Card({ title, content, documentUrl, type, documentId }) {
    // Verifica se o conteúdo é um array de mensagens
    const isMessageArray = Array.isArray(content) && content.length > 0 && 'role' in content[0]

    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden h-full flex flex-col">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center shrink-0">
                <h3 className="text-sm font-medium text-gray-900">{title}</h3>
                {documentUrl && type === 'document' && (
                    <button
                        onClick={() => window.open(documentUrl, '_blank')}
                        className="inline-flex items-center px-3 py-1 text-xs font-medium text-blue-700 hover:text-blue-900 hover:underline"
                    >
                        <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                            />
                        </svg>
                        Download
                    </button>
                )}
            </div>
            <div className="flex-1 min-h-0">
                {documentUrl ? (
                    <FilePreview url={documentUrl} type={type} documentId={documentId} documentName={content} />
                ) : (
                    <div className="p-6 h-full overflow-auto">
                        {isMessageArray ? (
                            <div className="space-y-2">
                                {content.map((message, index) => (
                                    <MessageContent key={index} message={message} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-sm text-gray-600 whitespace-pre-wrap">
                                {content}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
} 