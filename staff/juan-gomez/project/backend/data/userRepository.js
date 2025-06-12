import { readFile, writeFile } from "../utils/fileStorage.js"

export const getUserData = () => readFile('users.json')
export const saveUserData = (data) => writeFile('users.json', data)

export const findUserById = (id) => {
    const users = getUserData()
    const user = users.find(user => user.id === id)
    if (!user) throw new UserNotFoundError()
    return user
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
    const users = getUserData();
    const userIndex = users.findIndex(user => user.id === id)

    if (userIndex === -1) {
        throw new UserNotFoundError()
    }

    const updatedUser = { ...users[userIndex], ...updates }
    users[userIndex] = updatedUser
    saveUserData(users)

    return updatedUser
}