const gamesData = [
    {
        id: 1,
        name: 'Snake',
        description: 'Classic Nokia Snake game',
        image: '/images/Snake.jpg',
        likes: [],
        dislikes: [],
        highscores: [],
        messages: []
    },
    {
        id: 2,
        name: 'Tetris',
        description: 'From Russia with love',
        image: '/images/Tetris.jpg',
        likes: [],
        dislikes: [],
        highscores: [],
        messages: []
    }
]

const initializeGames = () => {
    const storedGames = sessionStorage.getItem('retroGames')
    if (!storedGames) {
        sessionStorage.setItem('retroGames', JSON.stringify(gamesData))
    }
}

initializeGames()

export const getAllGames = () => {
    const storedGames = sessionStorage.getItem('retroGames')
    try {
        const games = storedGames ? JSON.parse(storedGames) : gamesData
        return games.map(game => ({
            ...game,
            likes: game.likes || [],
            dislikes: game.dislikes || [],
            highscores: game.highscores || [],
            messages: game.messages || []
        }))
    } catch (error) {
        console.error('Error parsing games data:', error)
        return gamesData
    }
}

export const getGameIndexById = (gameId) => {
    const games = getAllGames()
    const gameIndex = games.findIndex(game => game.id === gameId)
    if (gameIndex === -1) throw new Error('Game not found')
    return gameIndex
}

export const saveAllGames = (games) => {
    sessionStorage.setItem('retroGames', JSON.stringify(games))
}

export const getGameById = (gameId) => {
    const games = getAllGames()
    const gameIndex = games.findIndex(game => game.id === gameId)
    if (gameIndex === -1) return null
    return games[gameIndex]
}

export const updateGame = (gameId, updates) => {
    const games = getAllGames()
    const gameIndex = games.findIndex(game => game.id === gameId)
    if (gameIndex === -1) throw new Error('Game not found')

    games[gameIndex] = { ...games[gameIndex], ...updates }
    saveAllGames(games)
    return games[gameIndex]
}

export const deleteUserMessage = (gameId, userId, timestamp) => {
    const games = getAllGames()
    const gameIndex = games.findIndex(g => g.id === gameId)

    if (gameIndex === -1) throw new Error('Game not found')

    const updatedMessages = games[gameIndex].messages?.filter(
        msg => !(msg.userId === userId && msg.timestamp === timestamp)
    ) || []

    games[gameIndex].messages = updatedMessages
    saveAllGames(games)

    return games[gameIndex]
}
