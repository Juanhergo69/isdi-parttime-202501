import { getAllGames, updateGame } from '../repositories/gameRepository'
import { validateGameExists } from '../validators/gameValidators'

const toggleInteraction = (gameId, userId, interactionType, oppositeType) => {
    const games = getAllGames()
    const gameIndex = validateGameExists(games, gameId)

    const game = games[gameIndex]
    const interactions = [...game[interactionType]]
    const oppositeInteractions = [...game[oppositeType]]

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

    return updateGame(gameId, {
        [interactionType]: interactions,
        [oppositeType]: oppositeInteractions
    })
}

export const likeGame = (userId, gameId) => {
    return toggleInteraction(gameId, userId, 'likes', 'dislikes')
}

export const dislikeGame = (userId, gameId) => {
    return toggleInteraction(gameId, userId, 'dislikes', 'likes')
}

