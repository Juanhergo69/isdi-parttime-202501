import { useAuth } from '../contexts/AuthContext'
import { useEffect, useState } from 'react'
import { getAllGames } from '../logic/games/repositories/gameRepository'

function HighScores({ game }) {
    const { user } = useAuth()
    const [currentGame, setCurrentGame] = useState(game)

    useEffect(() => {
        const games = getAllGames()
        const updatedGame = games.find(g => g.id === game.id)
        if (updatedGame) {
            setCurrentGame(updatedGame)
        }
    }, [game.id])

    if (!currentGame.highscores || currentGame.highscores.length === 0) {
        return (
            <div className="bg-retro-dark-secondary p-4 rounded-lg border-2 border-retro-blue">
                <p className="text-retro-gray font-retro text-center py-4">
                    No highscores yet! Be the first to play!
                </p>
            </div>
        )
    }

    return (
        <div className="bg-retro-dark-secondary rounded-lg border-2 border-retro-blue overflow-hidden">
            <table className="w-full font-retro">
                <thead>
                    <tr className="bg-retro-purple text-retro-yellow">
                        <th className="p-3 text-left">Rank</th>
                        <th className="p-3 text-left">Player</th>
                        <th className="p-3 text-right">Score</th>
                    </tr>
                </thead>
                <tbody>
                    {game.highscores.map((hs, index) => (
                        <tr
                            key={`${hs.userId}-${index}`}
                            className={`border-b border-retro-gray/50 ${user?.id === hs.userId ? 'bg-retro-blue/10 text-retro-yellow' : 'text-white'
                                }`}
                        >
                            <td className="p-3 font-bold">{index + 1}</td>
                            <td className="p-3">
                                <div className="flex items-center space-x-3">
                                    {hs.avatar ? (
                                        <img
                                            src={hs.avatar}
                                            alt={hs.username || 'Player'}
                                            className="w-8 h-8 rounded-full border-2 border-retro-green"
                                        />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-retro-pink flex items-center justify-center border-2 border-retro-yellow">
                                            <span className="text-sm font-bold text-white">
                                                {(hs.username || 'P').charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                    )}
                                    <span className="font-medium">{hs.username || 'Player'}</span>
                                </div>
                            </td>
                            <td className="p-3 text-right font-mono text-lg">{hs.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default HighScores
