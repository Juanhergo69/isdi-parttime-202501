import { getUsers, saveUsers } from './storage'

export const findUserByEmail = (email) => {
    const users = getUsers()
    return users.find(u => u.email === email)
}

export const checkUserExists = (username, email) => {
    const users = getUsers()
    const usernameExists = users.some(user => user.username === username)
    const emailExists = users.some(user => user.email === email)

    if (usernameExists && emailExists) {
        throw new Error('Username and email already exist')
    } else if (usernameExists) {
        throw new Error('Username already exists')
    } else if (emailExists) {
        throw new Error('Email already exists')
    }
}

export const createUser = (userData) => {
    const { username, email, password } = userData
    const users = getUsers()

    const newUser = {
        id: Date.now(),
        username,
        email,
        password,
        favorites: null,
        avatar: null,
    }

    users.push(newUser)
    saveUsers(users)
    return newUser
}

export const authenticateUser = (email, password) => {
    const user = findUserByEmail(email)
    if (!user || user.password !== password) {
        throw new Error('Invalid email or password')
    }
    return user
}