import { readFile, writeFile } from '../utils/fileStorage.js'

const getGameData = () => readFile('games.json')
const saveGameData = (data) => writeFile('games.json', data)

export const getAllGames = () => {
    const games = getGameData()
    return games.map(game => ({
        ...game,
        likes: game.likes || [],
        dislikes: game.dislikes || [],
        highscores: game.highscores || [],
        messages: game.messages || []
    }))
}

export const getGameById = (id) => {
    const games = getGameData()
    const game = games.find(game => game.id === id)

    if (!game) throw new Error('Game not found')

    return {
        ...game,
        likes: game.likes || [],
        dislikes: game.dislikes || [],
        highscores: game.highscores || [],
        messages: game.messages || []
    }
}

export const updateGame = (id, updates) => {
    const games = getGameData()
    const gameIndex = games.findIndex(game => game.id === id)

    if (gameIndex === -1) throw new Error('Game not found')

    const updatedGame = {
        ...games[gameIndex],
        ...updates,
        likes: updates.likes || games[gameIndex].likes || [],
        dislikes: updates.dislikes || games[gameIndex].dislikes || [],
        highscores: updates.highscores || games[gameIndex].highscores || [],
        messages: updates.messages || games[gameIndex].messages || []
    }

    games[gameIndex] = updatedGame
    saveGameData(games)
    return updatedGame
}

export const toggleInteraction = (gameId, userId, interactionType, oppositeType) => {
    const games = getGameData()
    const gameIndex = games.findIndex(game => game.id === gameId)

    if (gameIndex === -1) throw new Error('Game not found')

    const game = games[gameIndex]
    const interactions = [...(game[interactionType] || [])]
    const oppositeInteractions = [...(game[oppositeType] || [])]

    const userIndex = interactions.indexOf(userId)
    const oppositeUserIndex = oppositeInteractions.indexOf(userId)

    if (oppositeUserIndex !== -1) {
        oppositeInteractions.splice(oppositeUserIndex, 1)
    }

    if (userIndex === -1) {
        interactions.push(userId)
    } else {
        interactions.splice(userIndex, 1)
    }

    const updatedGame = {
        ...game,
        [interactionType]: interactions,
        [oppositeType]: oppositeInteractions
    }

    games[gameIndex] = updatedGame
    saveGameData(games)
    return updatedGame
}

export const addMessage = (gameId, message) => {
    const games = getGameData()
    const gameIndex = games.findIndex(game => game.id === gameId)

    if (gameIndex === -1) throw new Error('Game not found')

    const messages = [...(games[gameIndex].messages || [])]
    messages.push({
        userId: message.userId,
        text: message.text,
        timestamp: message.timestamp
    })

    const updatedGame = {
        ...games[gameIndex],
        messages
    }

    games[gameIndex] = updatedGame
    saveGameData(games)
    return updatedGame
}

export const deleteMessage = (gameId, userId, timestamp) => {
    const games = getGameData()
    const gameIndex = games.findIndex(game => game.id === gameId)

    if (gameIndex === -1) throw new Error('Game not found')

    const messages = games[gameIndex].messages || []

    const targetTime = new Date(timestamp).getTime()

    const messageIndex = messages.findIndex(msg => {
        const msgTime = new Date(msg.timestamp).getTime()
        return msg.userId === userId &&
            Math.abs(msgTime - targetTime) < 1000
    })

    if (messageIndex === -1) {
        throw new Error('Message not found or not authorized')
    }

    const updatedMessages = [...messages]
    updatedMessages.splice(messageIndex, 1)

    const updatedGame = {
        ...games[gameIndex],
        messages: updatedMessages
    }

    games[gameIndex] = updatedGame
    saveGameData(games)
    return updatedGame
}

export const updateHighscore = (gameId, userId, score) => {
    const games = getGameData()
    const gameIndex = games.findIndex(game => game.id === gameId)

    if (gameIndex === -1) throw new Error('Game not found')

    let highscores = [...(games[gameIndex].highscores || [])]
    const existingScoreIndex = highscores.findIndex(hs => hs.userId === userId)

    if (existingScoreIndex !== -1) {
        if (score > highscores[existingScoreIndex].score) {
            highscores[existingScoreIndex] = {
                userId,
                score
            }
        }
    } else {
        highscores.push({
            userId,
            score
        })
    }

    highscores.sort((a, b) => b.score - a.score)
    highscores = highscores.slice(0, 10)

    const updatedGame = {
        ...games[gameIndex],
        highscores
    }

    games[gameIndex] = updatedGame
    saveGameData(games)
    return updatedGame
}

export const getUserHighScore = (gameId, userId) => {
    const games = getGameData()
    const game = games.find(game => game.id === gameId)
    if (!game) throw new Error('Game not found')

    const userScore = game.highscores.find(hs => hs.userId === userId)
    return userScore ? userScore.score : 0
}
