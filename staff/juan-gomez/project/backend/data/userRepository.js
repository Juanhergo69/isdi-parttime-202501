import { readFile, writeFile } from "../utils/fileStorage.js"
import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10

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

export const createUser = async (userData) => {
    const users = getUserData();
    const hashedPassword = await bcrypt.hash(userData.password, SALT_ROUNDS)
    const newUser = {
        id: Date.now(),
        username: userData.username,
        email: userData.email,
        password: hashedPassword,
        avatar: null,
        favorites: []
    }

    users.push(newUser)
    saveUserData(users)
    return newUser
}

export const comparePasswords = async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword)
}