export const validateGameExists = (games, gameId) => {
    const gameIndex = games.findIndex(game => game.id === gameId)
    if (gameIndex === -1) {
        throw new Error('Game not found')
    }
    return gameIndex
}

export const validateScore = (score) => {
    if (typeof score !== 'number' || score < 0) {
        throw new Error('Invalid score value')
    }
}
