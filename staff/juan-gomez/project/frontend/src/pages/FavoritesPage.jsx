import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useFavorites } from '../contexts/FavoritesContext'
import { useNavigate } from 'react-router-dom'
import { getAllGames } from '../logic/games/repositories/gameRepository'
import Avatar from '../components/ui/Avatar'
import GameCard from '../components/GameCard'
import HighScores from '../components/HighScores'
import Messages from '../components/Messages'
import Button from '../components/ui/Button'

function FavoritesPage() {
    const { user } = useAuth()
    const { favoriteGames, isLoading, refreshFavorites } = useFavorites()
    const navigate = useNavigate()
    const [selectedGame, setSelectedGame] = useState(null)
    const [displayMode, setDisplayMode] = useState(null)
    const [allGames, setAllGames] = useState([])

    useEffect(() => {
        const loadGames = () => {
            const games = getAllGames()
            setAllGames(games)
        }

        loadGames()

        const handleGamesUpdate = () => {
            loadGames()
            refreshFavorites()
        }

        window.addEventListener('retroGamesUpdated', handleGamesUpdate)
        return () => window.removeEventListener('retroGamesUpdated', handleGamesUpdate)
    }, [refreshFavorites])

    const handleGameSelect = (game, mode) => {
        if (game && mode) {
            const currentGame = allGames.find(game => game.id === game.id) || game
            setSelectedGame(currentGame)
            setDisplayMode(mode)
        } else {
            setSelectedGame(null)
            setDisplayMode(null)
        }
    }

    const getCurrentFavorites = () => {
        return allGames.filter(game => favoriteGames.includes(game.id))
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-retro-dark p-4 flex items-center justify-center">
                <div className="text-retro-yellow font-retro">Loading your favorites...</div>
            </div>
        )
    }

    const currentFavorites = getCurrentFavorites()

    return (
        <div className="min-h-screen bg-retro-dark p-4">
            <div className="max-w-7xl mx-auto">
                <header className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-4">
                        <Avatar
                            src={user?.avatar}
                            alt={user?.username}
                            text={user?.username?.charAt(0).toUpperCase()}
                            className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-retro-yellow flex-shrink-0"
                        />
                        <h1 className="text-retro-pink font-retro text-2xl md:text-3xl">
                            Favorite Games
                        </h1>
                    </div>
                    <Button
                        onClick={() => navigate('/home')}
                        variant="secondary"
                        className="font-retro flex items-center gap-1 px-3 py-2"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span className="sr-only md:not-sr-only">HOME</span>
                    </Button>
                </header>

                {currentFavorites.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-retro-gray font-retro text-xl mb-4">
                            You haven't favorited any games yet!
                        </p>
                        <Button
                            onClick={() => navigate('/home')}
                            variant="primary"
                        >
                            Browse Games
                        </Button>
                    </div>
                ) : (
                    <>
                        <section className="mb-12">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {currentFavorites.map(game => (
                                    <GameCard
                                        key={game.id}
                                        game={game}
                                        userId={user?.id}
                                        onSelect={handleGameSelect}
                                    />
                                ))}
                            </div>
                        </section>

                        {selectedGame && (
                            <section className="mb-12">
                                {displayMode === 'scores' && (
                                    <>
                                        <h2 className="text-retro-blue font-retro text-2xl mb-4">
                                            {selectedGame.name} Highscores
                                        </h2>
                                        <HighScores game={selectedGame} />
                                    </>
                                )}
                                {displayMode === 'messages' && (
                                    <>
                                        <h2 className="text-retro-green font-retro text-2xl mb-4">
                                            {selectedGame.name} Chat
                                        </h2>
                                        <Messages game={{
                                            ...selectedGame,
                                            messages: allGames.find(game => game.id === selectedGame.id)?.messages || []
                                        }} />
                                    </>
                                )}
                            </section>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default FavoritesPage