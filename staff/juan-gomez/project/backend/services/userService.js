import bcrypt from 'bcrypt'
import { readFile, writeFile } from '../utils/fileStorage.js'
import * as userRepository from '../data/userRepository.js'
import {
    UserNotFoundError,
    UsernameTakenError,
    EmailInUseError,
    ForbiddenError,
    InvalidPasswordError
} from 'common'

export const getUserById = (id) => {
    const user = userRepository.findUserById(id)
    if (!user) throw new UserNotFoundError()
    return user
}

export const updateUser = async (id, updates, currentUserId) => {
    if (id !== currentUserId) {
        throw new ForbiddenError()
    }

    const users = userRepository.getUserData()
    const userIndex = users.findIndex(user => user.id === id)

    if (userIndex === -1) {
        throw new UserNotFoundError()
    }

    const user = users[userIndex]

    if (updates.username && updates.username !== user.username) {
        const existingUser = userRepository.findUserByUsername(updates.username)
        if (existingUser) {
            throw new UsernameTakenError()
        }
    }

    if (updates.email && updates.email !== user.email) {
        const existingUser = userRepository.findUserByEmail(updates.email)
        if (existingUser) {
            throw new EmailInUseError()
        }
    }

    if (updates.password) {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/
        if (!passwordRegex.test(updates.password)) {
            throw new InvalidPasswordError()
        }

        updates.password = await bcrypt.hash(updates.password, 10)
    }

    const allowedUpdates = ['username', 'email', 'avatar', 'password']
    const filteredUpdates = Object.keys(updates)
        .filter(key => allowedUpdates.includes(key))
        .reduce((obj, key) => {
            obj[key] = updates[key]
            return obj
        }, {})


    return userRepository.updateUser(id, filteredUpdates)
}

export const addUserFavorite = (userId, gameId, currentUserId) => {
    if (userId !== currentUserId) {
        throw new ForbiddenError()
    }

    const users = userRepository.getUserData()
    const userIndex = users.findIndex(user => user.id === userId)

    if (userIndex === -1) throw new UserNotFoundError()

    if (!users[userIndex].favorites) {
        users[userIndex].favorites = []
    }

    if (!users[userIndex].favorites.includes(gameId)) {
        users[userIndex].favorites.push(gameId)
        userRepository.saveUserData(users)
    }

    const { password, ...userData } = users[userIndex]
    return userData
}

export const removeUserFavorite = (userId, gameId, currentUserId) => {
    if (userId !== currentUserId) {
        throw new ForbiddenError()
    }

    const users = userRepository.getUserData()
    const userIndex = users.findIndex(user => user.id === userId)

    if (userIndex === -1) throw new UserNotFoundError()

    if (!users[userIndex].favorites) {
        users[userIndex].favorites = []
    }

    users[userIndex].favorites = users[userIndex].favorites.filter(
        id => id !== gameId
    )

    userRepository.saveUserData(users)

    const { password, ...userData } = users[userIndex]
    return userData
}

export const getUserFavorites = (userId) => {
    const user = userRepository.findUserById(userId)
    if (!user) throw new UserNotFoundError()
    return user.favorites || []
}

export const deleteUser = (id, currentUserId) => {
    if (id !== currentUserId) {
        throw new ForbiddenError()
    }

    const users = userRepository.getUserData()
    const userIndex = users.findIndex(user => user.id === id)

    if (userIndex === -1) {
        throw new UserNotFoundError()
    }

    users.splice(userIndex, 1)
    userRepository.saveUserData(users)

    const games = readFile('games.json')
    const updatedGames = games.map(game => ({
        ...game,
        likes: game.likes?.filter(userId => userId !== id) || [],
        dislikes: game.dislikes?.filter(userId => userId !== id) || [],
        highscores: game.highscores?.filter(score => score.userId !== id) || [],
        messages: game.messages?.filter(msg => msg.userId !== id) || []
    }))
    writeFile('games.json', updatedGames)
}

