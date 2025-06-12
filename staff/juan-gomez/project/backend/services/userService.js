import { readFile, writeFile } from '../utils/fileStorage.js'
import * as userRepository from '../data/userRepository.js'
import { UserNotFoundError, UsernameTakenError, EmailInUseError } from 'common'

export const updateUser = (id, updates) => {
    const users = userRepository.getUserData()
    const userIndex = users.findIndex(user => user.id === id)

    if (userIndex === -1) {
        throw new UserNotFoundError()
    }

    if (updates.username && updates.username !== users[userIndex].username) {
        const usernameExists = users.some(user =>
            user.username === updates.username && user.id !== id
        )
        if (usernameExists) {
            throw new UsernameTakenError()
        }
    }

    if (updates.email && updates.email !== users[userIndex].email) {
        const emailExists = users.some(user =>
            user.email === updates.email && user.id !== id
        )
        if (emailExists) {
            throw new EmailInUseError()
        }
    }

    const updatedUser = { ...users[userIndex], ...updates }
    users[userIndex] = updatedUser
    userRepository.saveUserData(users)
    return updatedUser
}

const deleteUserInteractions = (userId) => {
    const games = readFile('games.json')

    const updatedGames = games.map(game => {
        game.likes = game.likes.filter(id => id !== userId)
        game.dislikes = game.dislikes.filter(id => id !== userId)
        game.highscores = game.highscores.filter(score => score.userId !== userId)
        game.messages = game.messages.filter(msg => msg.userId !== userId)

        return game
    })

    writeFile('games.json', updatedGames)
}

export const deleteUser = (id) => {
    const userId = parseInt(id)
    const users = userRepository.getUserData()
    const userIndex = users.findIndex(user => user.id === userId)

    if (userIndex === -1) {
        throw new UserNotFoundError()
    }

    users.splice(userIndex, 1)
    userRepository.saveUserData(users)

    deleteUserInteractions(userId)
}

export const addUserFavorite = (userId, gameId) => {
    const users = userRepository.getUserData()
    const userIndex = users.findIndex(user => user.id === userId)

    if (userIndex === -1) throw new UserNotFoundError()

    if (!users[userIndex].favorites.includes(gameId)) {
        users[userIndex].favorites = [...users[userIndex].favorites, gameId]
        userRepository.saveUserData(users)
    }

    const { password, ...userData } = users[userIndex]
    return userData
}

export const removeUserFavorite = (userId, gameId) => {
    const users = userRepository.getUserData()
    const userIndex = users.findIndex(user => user.id === userId)

    if (userIndex === -1) throw new UserNotFoundError()

    users[userIndex].favorites = users[userIndex].favorites.filter(
        id => id !== gameId
    )

    userRepository.saveUserData(users)

    const { password, ...userData } = users[userIndex]
    return userData
}

export const getUserFavorites = (userId) => {
    const user = userRepository.findUserById(userId)
    return user ? user.favorites || [] : []
}

