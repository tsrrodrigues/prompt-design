export default function MessageContent({ message }) {
    if (!message) return null

    const roleColors = {
        system: 'bg-gray-100',
        developer: 'bg-gray-100',
        user: 'bg-blue-50',
        assistant: 'bg-green-50',
    }

    return (
        <div className={`p-4 rounded-lg mb-3 ${roleColors[message.role]}`}>
            <div className="text-xs font-medium text-gray-500 mb-2 uppercase">
                {message.role}
            </div>
            {Array.isArray(message.content) ? (
                <div className="space-y-2">
                    {message.content.map((item, index) => (
                        <div key={index}>
                            {item.type === 'text' && (
                                <div className="text-sm text-gray-600 whitespace-pre-wrap">
                                    {item.text}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-sm text-gray-600 whitespace-pre-wrap">
                    {message.content}
                </div>
            )}
        </div>
    )
} 