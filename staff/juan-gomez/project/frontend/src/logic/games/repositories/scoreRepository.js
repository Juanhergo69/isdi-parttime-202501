import { getAllGames, updateGame } from './gameRepository'

export const updateHighscore = (userId, gameId, score, userData) => {
    try {
        const numericGameId = Number(gameId)
        if (isNaN(numericGameId)) throw new Error('Invalid game ID')

        const games = getAllGames()
        const gameIndex = games.findIndex(game => game.id === numericGameId)

        if (gameIndex === -1) throw new Error(`Game with id ${numericGameId} not found`)

        const game = games[gameIndex]
        let highscores = [...(game.highscores)]
        const existingScoreIndex = highscores.findIndex(hs => hs.userId === userId)

        if (existingScoreIndex !== -1) {
            if (score > highscores[existingScoreIndex].score) {
                highscores[existingScoreIndex] = {
                    ...highscores[existingScoreIndex],
                    score,
                    username: userData.username,
                    avatar: userData.avatar
                }
            }
        } else {
            highscores.push({
                userId,
                score,
                username: userData.username,
                avatar: userData.avatar
            })
        }

        highscores.sort((a, b) => b.score - a.score)
        highscores = highscores.slice(0, 5)

        return updateGame(numericGameId, { highscores })
    } catch (error) {
        console.error('Error updating highscore:', error)
        throw error
    }
}


