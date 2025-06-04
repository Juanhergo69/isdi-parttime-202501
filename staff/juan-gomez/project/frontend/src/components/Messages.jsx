import { useAuth } from '../contexts/AuthContext'
import { useEffect, useState } from 'react'
import { useModal } from '../contexts/ModalContext'
import { getAllGames, deleteUserMessage, updateGame } from '../logic/games/repositories/gameRepository'
import { formatMessageTime } from '../utils/helpers'

function Messages({ game }) {
    const { user } = useAuth()
    const { showModal } = useModal()
    const [newMessage, setNewMessage] = useState('')
    const [messages, setMessages] = useState(game.messages || [])
    const [currentGameId, setCurrentGameId] = useState(game.id)

    // Sincronizar cuando cambia el juego o sus mensajes
    useEffect(() => {
        if (game.id !== currentGameId) {
            setCurrentGameId(game.id)
            setMessages(game.messages || [])
        } else {
            setMessages(prev => {
                // Mantener los mensajes locales si son más recientes
                const currentGameMessages = game.messages || []
                if (JSON.stringify(prev) !== JSON.stringify(currentGameMessages)) {
                    return currentGameMessages
                }
                return prev
            })
        }
    }, [game, currentGameId])

    // Sistema de sincronización mejorado
    useEffect(() => {
        const handleGamesUpdate = () => {
            const games = getAllGames();
            const updatedGame = games.find(g => g.id === game.id);
            if (updatedGame) {
                setMessages(updatedGame.messages || []);
            }
        };

        window.addEventListener('retroGamesUpdated', handleGamesUpdate);
        return () => window.removeEventListener('retroGamesUpdated', handleGamesUpdate);
    }, [game.id]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!newMessage.trim() || !user) return

        const newMsgObj = {
            userId: user.id,
            username: user.username,
            avatar: user.avatar,
            text: newMessage.trim(),
            timestamp: new Date().toISOString()
        }

        try {
            // Optimistic update
            const updatedMessages = [...messages, newMsgObj]
            setMessages(updatedMessages)
            setNewMessage('')

            // Actualización persistente
            const updatedGame = await updateGame(game.id, {
                messages: updatedMessages
            })

            // Disparar evento de actualización global
            window.dispatchEvent(new Event('retroGamesUpdated'))

            return updatedGame
        } catch (error) {
            console.error('Error saving message:', error)
            // Revertir en caso de error
            setMessages(messages)
        }
    }

    const handleDeleteMessage = async (timestamp) => {
        if (!user) return

        showModal(
            'Delete Message',
            'Are you sure you want to delete this message? This action cannot be undone.',
            async () => {
                try {
                    // Optimistic update
                    const filteredMessages = messages.filter(msg =>
                        !(msg.userId === user.id && msg.timestamp === timestamp)
                    )
                    setMessages(filteredMessages)

                    // Actualización persistente
                    const updatedGame = await deleteUserMessage(game.id, user.id, timestamp)
                    window.dispatchEvent(new Event('retroGamesUpdated'))

                    return updatedGame
                } catch (error) {
                    console.error('Error deleting message:', error)
                    // Revertir en caso de error
                    setMessages(messages)
                }
            }
        )
    }

    const renderAvatar = (msg) => {
        const hasAvatar = msg.avatar !== undefined && msg.avatar !== null
        const userInitial = (msg.username || 'U').charAt(0).toUpperCase()

        return hasAvatar ? (
            <img
                src={msg.avatar}
                alt={msg.username || 'User'}
                className="w-8 h-8 rounded-full border-2 border-retro-yellow flex-shrink-0"
                onError={(e) => {
                    e.target.onerror = null
                    e.target.style.display = 'none'
                }}
            />
        ) : (
            <div className="w-8 h-8 rounded-full bg-retro-pink flex items-center justify-center border-2 border-retro-yellow flex-shrink-0">
                <span className="text-sm font-bold text-white">{userInitial}</span>
            </div>
        )
    }

    const renderMessage = (msg, index) => {
        const isCurrentUser = user?.id === msg.userId
        const messageDate = new Date(msg.timestamp)
        const now = new Date()
        const isRecent = (now - messageDate) < 5 * 60 * 1000 // 5 minutos

        return (
            <div
                key={`${msg.userId}-${msg.timestamp}-${index}`}
                className={`p-4 ${isCurrentUser ? 'bg-retro-green/10' : ''} ${isRecent ? 'animate-pulse' : ''}`}
            >
                <div className="flex items-start space-x-3">
                    {renderAvatar(msg)}
                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <span className="font-retro text-retro-yellow">
                                    {msg.username || 'User'}
                                </span>
                                <span
                                    className="text-xs text-retro-gray"
                                    title={messageDate.toLocaleString()}
                                >
                                    {formatMessageTime(messageDate)}
                                </span>
                            </div>
                            {isCurrentUser && (
                                <button
                                    onClick={() => handleDeleteMessage(msg.timestamp)}
                                    className="text-retro-gray hover:text-retro-pink transition-colors p-1 rounded-full hover:bg-retro-dark/50"
                                    aria-label="Delete message"
                                    title="Delete message"
                                >
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        />
                                    </svg>
                                </button>
                            )}
                        </div>
                        <p className="text-white mt-1 break-words">{msg.text}</p>
                    </div>
                </div>
            </div>
        )
    }

    if (!messages || messages.length === 0) {
        return (
            <div className="bg-retro-dark-secondary p-4 rounded-lg border-2 border-retro-green">
                <form onSubmit={handleSubmit} className="mb-4">
                    <div className="flex">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Write a message..."
                            className="flex-1 bg-retro-dark border-2 border-retro-yellow text-white px-3 py-2 rounded-l focus:outline-none"
                            maxLength={500}
                        />
                        <button
                            type="submit"
                            className="bg-retro-green hover:bg-retro-green-dark text-white font-retro px-4 py-2 rounded-r"
                            disabled={!newMessage.trim()}
                        >
                            Send
                        </button>
                    </div>
                </form>
                <p className="text-retro-gray font-retro text-center py-4">
                    No messages yet! Be the first to comment!
                </p>
            </div>
        )
    }

    return (
        <div className="bg-retro-dark-secondary rounded-lg border-2 border-retro-green overflow-hidden">
            <form onSubmit={handleSubmit} className="p-4 border-b border-retro-gray/50">
                <div className="flex">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Write a message..."
                        className="flex-1 bg-retro-dark border-2 border-retro-yellow text-white px-3 py-2 rounded-l focus:outline-none"
                        maxLength={500}
                    />
                    <button
                        type="submit"
                        className="bg-retro-green hover:bg-retro-green-dark text-white font-retro px-4 py-2 rounded-r"
                        disabled={!newMessage.trim()}
                    >
                        Send
                    </button>
                </div>
            </form>

            <div className="divide-y divide-retro-gray/50 max-h-[500px] overflow-y-auto">
                {messages.map(renderMessage)}
            </div>
        </div>
    )
}

export default Messages