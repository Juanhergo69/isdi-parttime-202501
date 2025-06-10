import { readFile, writeFile } from '../utils/fileStorage.js'

const getUserData = () => readFile('users.json')
const saveUserData = (data) => writeFile('users.json', data)

export const findUserById = (id) => {
    const users = getUserData()
    return users.find(user => user.id === id)
}

export const findUserByEmail = (email) => {
    const users = getUserData()
    return users.find(user => user.email === email)
}

export const findUserByUsername = (username) => {
    const users = getUserData()
    return users.find(user => user.username === username)
}

export const createUser = (userData) => {
    const users = getUserData();
    const newUser = {
        id: Date.now(),
        username: userData.username,
        email: userData.email,
        password: userData.password,
        avatar: null,
        favorites: []
    }

    users.push(newUser)
    saveUserData(users)
    return newUser
}

export const updateUser = (id, updates) => {
    const users = getUserData()
    const userIndex = users.findIndex(user => user.id === id)

    if (userIndex === -1) {
        throw new Error('User not found')
    }

    const updatedUser = { ...users[userIndex], ...updates }
    users[userIndex] = updatedUser
    saveUserData(users)
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
    const users = getUserData()
    const userIndex = users.findIndex(user => user.id === userId)

    if (userIndex === -1) {
        throw new Error('User not found')
    }

    users.splice(userIndex, 1)
    saveUserData(users)

    deleteUserInteractions(userId)
}

export const addUserFavorite = (userId, gameId) => {
    const users = getUserData()
    const userIndex = users.findIndex(user => user.id === userId)

    if (userIndex === -1) throw new Error('User not found')

    if (!users[userIndex].favorites.includes(gameId)) {
        users[userIndex].favorites = [...users[userIndex].favorites, gameId]
        saveUserData(users)
    }

    const { password, ...userData } = users[userIndex]
    return userData
}

export const removeUserFavorite = (userId, gameId) => {
    const users = getUserData()
    const userIndex = users.findIndex(user => user.id === userId)

    if (userIndex === -1) throw new Error('User not found')

    users[userIndex].favorites = users[userIndex].favorites.filter(
        id => id !== gameId
    )

    saveUserData(users)

    const { password, ...userData } = users[userIndex]
    return userData
}

export const getUserFavorites = (userId) => {
    const user = findUserById(userId)
    return user ? user.favorites || [] : []
}

